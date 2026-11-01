import type { Question, Answer, ExamResult, Subject, Exam, OptionKey } from '../types';
import { QUESTIONS_BANK } from '../data/questions';
import { OFFICIAL_EXAMS } from '../data/exams';
import { OFFICIAL_SUBJECTS } from '../data/subjects';

export const ExamEngine = {
  // Query Helpers according to Section 4
  getAllExams(): Exam[] {
    return OFFICIAL_EXAMS;
  },

  getExamById(id: string): Exam | undefined {
    return OFFICIAL_EXAMS.find(e => e.id === id);
  },

  getQuestionsByIds(ids: string[]): Question[] {
    const questionMap = new Map<string, Question>();
    QUESTIONS_BANK.forEach(q => questionMap.set(q.id, q));
    return ids.map(id => questionMap.get(id)).filter((q): q is Question => Boolean(q));
  },

  getQuestionsByExam(examId: string): Question[] {
    return QUESTIONS_BANK.filter(q => q.examId === examId);
  },

  getQuestionsBySubject(subjectId: string, limit?: number): Question[] {
    const filtered = QUESTIONS_BANK.filter(q => q.subjectId === subjectId);
    if (limit && limit > 0) {
      return filtered.slice(0, limit);
    }
    return filtered;
  },

  getQuestionsByTopic(topicId: string): Question[] {
    return QUESTIONS_BANK.filter(q => q.topicId === topicId);
  },

  getQuestionsByQuestionType(type: string): Question[] {
    return QUESTIONS_BANK.filter(q => q.questionType?.toLowerCase() === type.toLowerCase());
  },

  getQuestionById(id: string): Question | undefined {
    return QUESTIONS_BANK.find(q => q.id === id);
  },

  getWithdrawnQuestions(examId?: string): Question[] {
    return QUESTIONS_BANK.filter(q => {
      const isWithdrawn = q.status === 'withdrawn' || q.scorable === false;
      return examId ? isWithdrawn && q.examId === examId : isWithdrawn;
    });
  },

  getAvailableSubjects(): Subject[] {
    return OFFICIAL_SUBJECTS;
  },

  // Multiple-answer checker helper
  isAnswerCorrect(userAns: Answer, officialAns: OptionKey | OptionKey[] | null): boolean {
    if (!officialAns || !userAns) return false;

    if (Array.isArray(officialAns)) {
      if (Array.isArray(userAns)) {
        if (userAns.length !== officialAns.length) return false;
        return userAns.every(a => officialAns.includes(a));
      } else {
        // If official answer accepted multiple options (e.g. A or C) or user picked one valid
        return officialAns.includes(userAns as OptionKey);
      }
    } else {
      if (Array.isArray(userAns)) {
        return userAns.length === 1 && userAns[0] === officialAns;
      }
      return userAns === officialAns;
    }
  },

  // Scoring engine adhering strictly to Section 5: Withdrawn questions must NOT be counted in score or unanswered
  calculateResult(
    questionIds: string[],
    answers: Record<string, Answer>,
    passPercentage: number = 45
  ): ExamResult {
    const questions = this.getQuestionsByIds(questionIds);
    const total = questions.length;
    let withdrawn = 0;
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach(q => {
      // Check if withdrawn
      if (q.status === 'withdrawn' || q.scorable === false) {
        withdrawn += 1;
        return; // Withdrawn questions are excluded from scoring and unanswered count
      }

      const selected = answers[q.id];
      if (!selected || (Array.isArray(selected) && selected.length === 0)) {
        unanswered += 1;
      } else if (this.isAnswerCorrect(selected, q.correctAnswer)) {
        correct += 1;
      } else {
        wrong += 1;
      }
    });

    const scorableTotal = total - withdrawn;
    const attempted = correct + wrong;
    const score = correct; // 1 mark each, no negative marking
    const accuracy = attempted > 0 ? (correct / attempted) * 100 : 0;
    const completionRate = scorableTotal > 0 ? (attempted / scorableTotal) * 100 : 0;
    const scorePercentage = scorableTotal > 0 ? (score / scorableTotal) * 100 : 0;
    const passed = scorePercentage >= passPercentage;

    return {
      total,
      scorableTotal,
      withdrawn,
      attempted,
      correct,
      wrong,
      unanswered,
      score,
      accuracy,
      completionRate,
      passed
    };
  },

  generateMock(
    subjects: Subject[],
    requestedCount: 25 | 50 | 100,
    selectedSubjectIds?: string[]
  ): Question[] {
    const eligibleSubjects = selectedSubjectIds && selectedSubjectIds.length > 0
      ? subjects.filter(s => selectedSubjectIds.includes(s.id))
      : subjects;

    const availablePool = QUESTIONS_BANK.filter(q =>
      (q.status !== 'withdrawn') && eligibleSubjects.some(s => s.id === q.subjectId)
    );

    // Shuffle pool deterministically
    const shuffled = [...availablePool].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, Math.min(requestedCount, shuffled.length));
  },

  getSubjectAccuracy(
    subjectId: string,
    attempts: { questionIds: string[]; answers: Record<string, Answer> }[]
  ): { totalAttempted: number; correct: number; percentage: number } {
    let totalAttempted = 0;
    let correct = 0;

    const subjectQuestions = new Set(
      QUESTIONS_BANK.filter(q => q.subjectId === subjectId && q.status !== 'withdrawn').map(q => q.id)
    );
    const questionMap = new Map<string, Question>();
    QUESTIONS_BANK.forEach(q => questionMap.set(q.id, q));

    attempts.forEach(att => {
      att.questionIds.forEach(qid => {
        if (subjectQuestions.has(qid)) {
          const ans = att.answers[qid];
          const q = questionMap.get(qid);
          if (ans && q) {
            totalAttempted += 1;
            if (this.isAnswerCorrect(ans, q.correctAnswer)) {
              correct += 1;
            }
          }
        }
      });
    });

    const percentage = totalAttempted > 0 ? (correct / totalAttempted) * 100 : 0;
    return { totalAttempted, correct, percentage };
  }
};
