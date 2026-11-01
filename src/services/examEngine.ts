import type { Question, Answer, ExamResult, Subject } from '../types';
import { QUESTIONS_BANK } from '../data/questions';

export const ExamEngine = {
  getQuestionsByIds(ids: string[]): Question[] {
    const questionMap = new Map<string, Question>();
    QUESTIONS_BANK.forEach(q => questionMap.set(q.id, q));
    return ids.map(id => questionMap.get(id)).filter((q): q is Question => Boolean(q));
  },

  calculateResult(
    questionIds: string[],
    answers: Record<string, Answer>,
    passPercentage: number = 45
  ): ExamResult {
    const questions = this.getQuestionsByIds(questionIds);
    const total = questions.length;
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach(q => {
      const selected = answers[q.id];
      if (!selected) {
        unanswered += 1;
      } else if (selected === q.correctAnswer) {
        correct += 1;
      } else {
        wrong += 1;
      }
    });

    const attempted = correct + wrong;
    const score = correct; // 1 mark each, no negative marking per AIBE rules
    const accuracy = attempted > 0 ? (correct / attempted) * 100 : 0;
    const completionRate = total > 0 ? (attempted / total) * 100 : 0;
    const scorePercentage = total > 0 ? (score / total) * 100 : 0;
    const passed = scorePercentage >= passPercentage;

    return {
      total,
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
      eligibleSubjects.some(s => s.id === q.subjectId)
    );

    // Shuffle pool deterministically without destroying source data
    const shuffled = [...availablePool].sort(() => Math.random() - 0.5);

    // Respect requested question count
    return shuffled.slice(0, Math.min(requestedCount, shuffled.length));
  },

  getQuestionsBySubject(subjectId: string, limit?: number): Question[] {
    const filtered = QUESTIONS_BANK.filter(q => q.subjectId === subjectId);
    if (limit && limit > 0) {
      return filtered.slice(0, limit);
    }
    return filtered;
  },

  getSubjectAccuracy(
    subjectId: string,
    attempts: { questionIds: string[]; answers: Record<string, Answer> }[]
  ): { totalAttempted: number; correct: number; percentage: number } {
    let totalAttempted = 0;
    let correct = 0;

    const subjectQuestions = new Set(
      QUESTIONS_BANK.filter(q => q.subjectId === subjectId).map(q => q.id)
    );
    const questionAnswerMap = new Map<string, string>();
    QUESTIONS_BANK.forEach(q => questionAnswerMap.set(q.id, q.correctAnswer));

    attempts.forEach(att => {
      att.questionIds.forEach(qid => {
        if (subjectQuestions.has(qid)) {
          const ans = att.answers[qid];
          if (ans) {
            totalAttempted += 1;
            if (ans === questionAnswerMap.get(qid)) {
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
