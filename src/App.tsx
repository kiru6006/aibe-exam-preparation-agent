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
import { StrategyTipsView } from './components/StrategyTipsView';
import { AboutView } from './components/AboutView';
import { ExamView } from './components/ExamView';
import { ResultView } from './components/ResultView';
import { QuickReferenceView } from './components/QuickReferenceView';
import { QuickRefSubjectView } from './components/QuickRefSubjectView';
import { getQuickRef } from './data/quick-reference';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [strategySubTab, setStrategySubTab] = useState<string>('how-to-prepare');
  const [quickRefSubjectId, setQuickRefSubjectId] = useState<string | null>(null);
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

    // Support deep-linking via hash, e.g. #quick-ref/constitutional-law
    const parseHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash.startsWith('quick-ref')) {
        const parts = hash.split('/');
        setCurrentTab('quick-ref');
        if (parts[1]) {
          setQuickRefSubjectId(parts[1]);
        }
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const mistakesList = StorageService.getMistakeQuestionIds();

  // Navigation Handler
  const handleSelectTab = (tab: string, subTab?: string) => {
    if (activeSession) {
      if (window.confirm("You have an active exam session. Leave this session? Progress will be saved.")) {
        StorageService.saveActiveSession(activeSession);
        setActiveSession(null);
        routeToTab(tab, subTab);
      }
    } else {
      setCompletedResult(null);
      routeToTab(tab, subTab);
    }
  };

  const routeToTab = (tab: string, subTab?: string) => {
    if (tab === 'strategy' || tab === 'strategy-overview') {
      setCurrentTab('strategy');
      setStrategySubTab(subTab || 'how-to-prepare');
    } else if (tab === 'strategy-priority') {
      setCurrentTab('strategy');
      setStrategySubTab('subject-priority');
    } else if (tab === 'strategy-repeats') {
      setCurrentTab('strategy');
      setStrategySubTab('what-repeats');
    } else if (tab === 'strategy-question-types') {
      setCurrentTab('strategy');
      setStrategySubTab('question-types');
    } else if (tab === 'strategy-exam-day') {
      setCurrentTab('strategy');
      setStrategySubTab('exam-day');
    } else if (tab === 'strategy-plans') {
      setCurrentTab('strategy');
      setStrategySubTab('plans');
    } else if (tab === 'mistakes') {
      handlePracticeMistakes();
    } else if (tab === 'quick-ref') {
      setCurrentTab('quick-ref');
      if (subTab) {
        setQuickRefSubjectId(subTab);
      }
    } else {
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
      durationSeconds: count === 25 ? 30 * 60 : count === 50 ? 60 * 60 : 180 * 60,
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

  // Submit Active Session
  const handleSubmitSession = (answers: Record<string, Answer>, marked: string[]) => {
    if (!activeSession) return;

    // Use calculateResult with Section 5 withdrawn logic
    const result = ExamEngine.calculateResult(activeSession.questionIds, answers);

    const completed: Attempt = {
      ...activeSession,
      answers,
      markedForReview: marked,
      completedAt: new Date().toISOString(),
      score: result.score,
      scorableQuestions: result.scorableTotal,
      withdrawnQuestions: result.withdrawn,
      result
    };

    // Save to persistent local history
    StorageService.saveAttempt(completed);
    StorageService.saveActiveSession(null);

    // Record question performance outcomes for mastery and mistake tracking
    const questions = ExamEngine.getQuestionsByIds(activeSession.questionIds);
    const outcomes = questions
      .filter(q => q.status !== 'withdrawn' && q.scorable !== false)
      .map(q => ({
        id: q.id,
        correct: ExamEngine.isAnswerCorrect(answers[q.id], q.correctAnswer)
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
      <div className="min-h-screen bg-[#FAF8F5] text-[#2D3748] flex flex-col font-sans">
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
                .filter(q => {
                  const ans = completedResult.attempt.answers[q.id];
                  return !ExamEngine.isAnswerCorrect(ans, q.correctAnswer);
                })
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D3748] flex flex-col font-sans">
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
            onNavigate={handleSelectTab}
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

        {currentTab === 'strategy' && (
          <StrategyTipsView
            initialTab={strategySubTab}
            onPracticeSubject={handleStartSubjectPractice}
            onPracticeMistakes={() => handlePracticeMistakes()}
            onStartMock={handleStartMock}
            mistakesCount={mistakesList.length}
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

        {currentTab === 'quick-ref' && (
          quickRefSubjectId && getQuickRef(quickRefSubjectId) ? (
            <QuickRefSubjectView
              subject={getQuickRef(quickRefSubjectId)!}
              onBackToIndex={() => {
                setQuickRefSubjectId(null);
                window.location.hash = 'quick-ref';
              }}
              onStartPractice={(subjId, limit) => handleStartSubjectPractice(subjId, limit)}
              onSelectSubject={(subjId) => {
                if (getQuickRef(subjId)) {
                  setQuickRefSubjectId(subjId);
                  window.location.hash = `quick-ref/${subjId}`;
                } else {
                  handleStartSubjectPractice(subjId);
                }
              }}
            />
          ) : (
            <QuickReferenceView
              onSelectSubject={(subjId) => {
                setQuickRefSubjectId(subjId);
                window.location.hash = `quick-ref/${subjId}`;
              }}
              onStartPractice={(subjId, limit) => handleStartSubjectPractice(subjId, limit)}
            />
          )
        )}

        {currentTab === 'about' && (
          <AboutView />
        )}
      </main>

      <footer className="border-t border-[#E8E2DA] bg-white py-10 mt-16 text-xs text-[#718096]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-[#1A365D]">AIBE Prep</span>
            <span className="text-[#A0AEC0]">|</span>
            <span>All India Bar Examination Legal Study Platform</span>
          </div>
          <div className="text-[11px] text-[#A0AEC0] font-mono">
            18 BCI Exams • 1,800 Questions • 19 Syllabus Subjects
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
