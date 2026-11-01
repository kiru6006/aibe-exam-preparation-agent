import React, { useState, useEffect } from 'react';
import type { 
  Subject, 
  Exam, 
  Question, 
  Attempt, 
  Answer, 
  ExamResult 
} from './types';
import { OFFICIAL_SUBJECTS } from './data/subjects';
import { OFFICIAL_EXAMS } from './data/exams';
import { QUESTIONS_BANK } from './data/questions';
import { StorageService } from './services/storageService';
import { ExamEngine } from './services/examEngine';

import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { PreviousPapersView } from './components/PreviousPapersView';
import { SubjectsView } from './components/SubjectsView';
import { MockTestView } from './components/MockTestView';
import { PerformanceView } from './components/PerformanceView';
import { QuestionBankSearchView } from './components/QuestionBankSearchView';
import { ExamView } from './components/ExamView';
import { ResultView } from './components/ResultView';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activeSession, setActiveSession] = useState<Attempt | null>(null);
  const [completedResult, setCompletedResult] = useState<{
    attempt: Attempt;
    result: ExamResult;
  } | null>(null);

  // Resume or restore saved session on mount
  useEffect(() => {
    const saved = StorageService.getActiveSession();
    if (saved && !saved.completedAt) {
      setActiveSession(saved);
    }
  }, []);

  const mistakesList = StorageService.getMistakeQuestionIds();

  // Navigation Handler
  const handleSelectTab = (tab: string) => {
    if (activeSession) {
      if (window.confirm("You have an active exam session. Leave this session? Progress will be saved.")) {
        StorageService.saveActiveSession(activeSession);
        setActiveSession(null);
        setCurrentTab(tab);
      }
    } else {
      setCompletedResult(null);
      setCurrentTab(tab);
    }
  };

  // Start Previous Paper
  const handleStartExam = (exam: Exam) => {
    const questions = ExamEngine.getQuestionsByIds(exam.questionIds);
    const newAttempt: Attempt = {
      id: `attempt-exam-${exam.id}-${Date.now()}`,
      type: "previous-paper",
      title: `${exam.name} (${exam.set || 'Set A'})`,
      questionIds: questions.map(q => q.id),
      answers: {},
      markedForReview: [],
      startedAt: new Date().toISOString(),
      durationSeconds: exam.durationMinutes ? exam.durationMinutes * 60 : undefined,
      totalQuestions: questions.length,
      examId: exam.id
    };

    setActiveSession(newAttempt);
    setCompletedResult(null);
  };

  // Start Subject Practice
  const handleStartSubjectPractice = (subjectId: string, limit?: number) => {
    const sub = OFFICIAL_SUBJECTS.find(s => s.id === subjectId);
    const questions = ExamEngine.getQuestionsBySubject(subjectId, limit);

    if (questions.length === 0) {
      alert("No questions are currently available for this subject.");
      return;
    }

    const newAttempt: Attempt = {
      id: `attempt-subject-${subjectId}-${Date.now()}`,
      type: "subject",
      title: `${sub?.name || 'Subject'} Practice (${questions.length} Qs)`,
      questionIds: questions.map(q => q.id),
      answers: {},
      markedForReview: [],
      startedAt: new Date().toISOString(),
      totalQuestions: questions.length,
      subjectId
    };

    setActiveSession(newAttempt);
    setCompletedResult(null);
  };

  // Start Mock Test
  const handleStartMock = (count: 25 | 50 | 100, selectedSubjectIds?: string[]) => {
    const questions = ExamEngine.generateMock(OFFICIAL_SUBJECTS, count, selectedSubjectIds);

    if (questions.length === 0) {
      alert("No eligible questions found for the selected criteria.");
      return;
    }

    const newAttempt: Attempt = {
      id: `attempt-mock-${Date.now()}`,
      type: "mock",
      title: `Practice Mock Test (${questions.length} Qs)`,
      questionIds: questions.map(q => q.id),
      answers: {},
      markedForReview: [],
      startedAt: new Date().toISOString(),
      durationSeconds: count === 25 ? 30 * 60 : count === 50 ? 60 * 60 : 210 * 60,
      totalQuestions: questions.length
    };

    setActiveSession(newAttempt);
    setCompletedResult(null);
  };

  // Start Mistakes Practice
  const handlePracticeMistakes = (specificIds?: string[]) => {
    const ids = specificIds || mistakesList;
    const questions = ExamEngine.getQuestionsByIds(ids);

    if (questions.length === 0) {
      alert("You have no questions marked for mistake revision right now! Keep attempting tests to identify weak points.");
      return;
    }

    const newAttempt: Attempt = {
      id: `attempt-mistakes-${Date.now()}`,
      type: "mistakes",
      title: `Mistakes Revision Session (${questions.length} Qs)`,
      questionIds: questions.map(q => q.id),
      answers: {},
      markedForReview: [],
      startedAt: new Date().toISOString(),
      totalQuestions: questions.length
    };

    setActiveSession(newAttempt);
    setCompletedResult(null);
  };

  // Submit Exam Session
  const handleSubmitSession = (answers: Record<string, Answer>, marked: string[]) => {
    if (!activeSession) return;

    const result = ExamEngine.calculateResult(activeSession.questionIds, answers, 45);

    const completed: Attempt = {
      ...activeSession,
      answers,
      markedForReview: marked,
      completedAt: new Date().toISOString(),
      score: result.score
    };

    // Save to persistent local history
    StorageService.saveAttempt(completed);
    StorageService.saveActiveSession(null);

    // Record question performance outcomes for mastery and mistake tracking
    const questions = ExamEngine.getQuestionsByIds(activeSession.questionIds);
    const outcomes = questions.map(q => ({
      id: q.id,
      correct: answers[q.id] === q.correctAnswer
    }));
    StorageService.recordAnswerOutcomes(outcomes);

    // Set view to results
    setCompletedResult({ attempt: completed, result });
    setActiveSession(null);
  };

  // Render Active Exam View
  if (activeSession) {
    const examQuestions = ExamEngine.getQuestionsByIds(activeSession.questionIds);
    const durationMinutes = activeSession.durationSeconds ? Math.floor(activeSession.durationSeconds / 60) : undefined;

    return (
      <ExamView
        title={activeSession.title}
        questions={examQuestions}
        durationMinutes={durationMinutes}
        initialAnswers={activeSession.answers}
        initialMarked={activeSession.markedForReview}
        onSubmit={handleSubmitSession}
        onExit={() => {
          if (window.confirm("Exit exam session? Your current progress will be preserved locally.")) {
            StorageService.saveActiveSession(activeSession);
            setActiveSession(null);
            setCurrentTab('home');
          }
        }}
      />
    );
  }

  // Render Completed Result & Detailed Review
  if (completedResult) {
    const questions = ExamEngine.getQuestionsByIds(completedResult.attempt.questionIds);

    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#191919] flex flex-col font-sans">
        <Navbar 
          currentTab=""
          onSelectTab={handleSelectTab}
        />
        <main className="flex-1">
          <ResultView
            title={completedResult.attempt.title}
            result={completedResult.result}
            questions={questions}
            answers={completedResult.attempt.answers}
            marked={completedResult.attempt.markedForReview}
            onRetry={() => {
              // Re-run same questions
              const retryAttempt: Attempt = {
                id: `retry-${Date.now()}`,
                type: completedResult.attempt.type,
                title: `${completedResult.attempt.title} (Reattempt)`,
                questionIds: completedResult.attempt.questionIds,
                answers: {},
                markedForReview: [],
                startedAt: new Date().toISOString(),
                durationSeconds: completedResult.attempt.durationSeconds,
                totalQuestions: completedResult.attempt.totalQuestions
              };
              setCompletedResult(null);
              setActiveSession(retryAttempt);
            }}
            onExit={() => {
              setCompletedResult(null);
              setCurrentTab('home');
            }}
            onPracticeMistakes={() => {
              const wrongIds = questions
                .filter(q => completedResult.attempt.answers[q.id] !== q.correctAnswer)
                .map(q => q.id);
              setCompletedResult(null);
              handlePracticeMistakes(wrongIds);
            }}
          />
        </main>
      </div>
    );
  }

  // Render Standard Tabs
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#191919] flex flex-col font-sans">
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
      />

      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            subjects={OFFICIAL_SUBJECTS}
            exams={OFFICIAL_EXAMS}
            questions={QUESTIONS_BANK}
            onNavigate={tab => setCurrentTab(tab)}
            onStartExam={handleStartExam}
            onPracticeMistakes={() => handlePracticeMistakes()}
            mistakesCount={mistakesList.length}
          />
        )}

        {currentTab === 'papers' && (
          <PreviousPapersView
            exams={OFFICIAL_EXAMS}
            questions={QUESTIONS_BANK}
            onStartExam={handleStartExam}
          />
        )}

        {currentTab === 'subjects' && (
          <SubjectsView
            subjects={OFFICIAL_SUBJECTS}
            questions={QUESTIONS_BANK}
            onStartSubjectPractice={handleStartSubjectPractice}
          />
        )}

        {currentTab === 'mock' && (
          <MockTestView
            subjects={OFFICIAL_SUBJECTS}
            questions={QUESTIONS_BANK}
            onStartMock={handleStartMock}
          />
        )}

        {currentTab === 'performance' && (
          <PerformanceView
            subjects={OFFICIAL_SUBJECTS}
            questions={QUESTIONS_BANK}
            onPracticeMistakes={handlePracticeMistakes}
            onPracticeSubject={handleStartSubjectPractice}
          />
        )}

        {currentTab === 'search' && (
          <QuestionBankSearchView
            questions={QUESTIONS_BANK}
            subjects={OFFICIAL_SUBJECTS}
          />
        )}
      </main>

      <footer className="border-t border-[#E8E2DA] bg-[#FAF8F5] py-8 mt-16 text-center text-xs text-[#78716C]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-serif">© {new Date().getFullYear()} AIBE Prep • Free Student Legal Study</p>
          <p className="text-[11px] text-[#A8A29E] font-sans">
            Bar Council of India Previous Year Exam Preparation Engine
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
