import React, { useState } from 'react';
import type { Question, Answer, OptionKey } from '../types';
import { Timer } from './Timer';
import { QuestionPalette } from './QuestionPalette';
import { 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  RotateCcw, 
  ShieldAlert,
  Info,
  Layers
} from 'lucide-react';

interface ExamViewProps {
  title: string;
  questions: Question[];
  durationMinutes?: number;
  initialAnswers?: Record<string, Answer>;
  initialMarked?: string[];
  onSubmit: (answers: Record<string, Answer>, marked: string[]) => void;
  onExit: () => void;
}

export const ExamView: React.FC<ExamViewProps> = ({
  title,
  questions,
  durationMinutes,
  initialAnswers = {},
  initialMarked = [],
  onSubmit,
  onExit
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>(initialAnswers);
  const [marked, setMarked] = useState<string[]>(initialMarked);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <h2 className="text-xl font-serif text-[#1A365D]">No questions available</h2>
        <p className="text-sm text-[#4A5568] mt-2">There are no questions configured for this session.</p>
        <button
          onClick={onExit}
          className="mt-6 px-4 py-2 bg-[#1A365D] text-white rounded-lg hover:bg-[#2B6CB0] text-xs font-medium"
        >
          Return Home
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isWithdrawn = currentQuestion.status === "withdrawn" || currentQuestion.scorable === false;
  const isMultiAnswer = Array.isArray(currentQuestion.correctAnswer);
  const selectedAnswer = answers[currentQuestion.id] || null;
  const isMarked = marked.includes(currentQuestion.id);

  // Handle single or multi-option selection
  const handleSelectOption = (key: OptionKey) => {
    if (isWithdrawn) return; // Withdrawn questions cannot be scored

    if (isMultiAnswer) {
      setAnswers(prev => {
        const cur = prev[currentQuestion.id];
        let arr: OptionKey[] = [];
        if (Array.isArray(cur)) {
          arr = [...cur];
        } else if (typeof cur === 'string') {
          arr = [cur as OptionKey];
        }

        if (arr.includes(key)) {
          arr = arr.filter(k => k !== key);
        } else {
          arr.push(key);
        }

        return {
          ...prev,
          [currentQuestion.id]: arr.length > 0 ? arr : null
        };
      });
    } else {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: key
      }));
    }
  };

  const handleClearAnswer = () => {
    setAnswers(prev => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  };

  const handleToggleMark = () => {
    setMarked(prev => 
      prev.includes(currentQuestion.id)
        ? prev.filter(id => id !== currentQuestion.id)
        : [...prev, currentQuestion.id]
    );
  };

  // Check if option is selected
  const isOptionSelected = (key: OptionKey): boolean => {
    if (!selectedAnswer) return false;
    if (Array.isArray(selectedAnswer)) {
      return selectedAnswer.includes(key);
    }
    return selectedAnswer === key;
  };

  // Section 5: Withdrawn questions do not count towards answered/unanswered counts
  const scorableQuestions = questions.filter(q => q.status !== 'withdrawn' && q.scorable !== false);
  const answeredCount = scorableQuestions.filter(q => {
    const a = answers[q.id];
    if (Array.isArray(a)) return a.length > 0;
    return !!a;
  }).length;
  const unansweredCount = scorableQuestions.length - answeredCount;
  const withdrawnCount = questions.length - scorableQuestions.length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2DA] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-[#E8E2DA] text-[#4A5568] bg-white hover:bg-[#F4EFEA] transition-colors"
            >
              Exit Session
            </button>
            <div>
              <h2 className="text-sm sm:text-base font-serif font-bold text-[#1A365D] leading-tight">
                {title}
              </h2>
              <span className="text-[11px] text-[#718096] font-mono">
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {durationMinutes && durationMinutes > 0 && (
              <Timer
                durationMinutes={durationMinutes}
                onExpire={() => onSubmit(answers, marked)}
              />
            )}
            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="px-3.5 py-1.5 bg-[#1A365D] hover:bg-[#2B6CB0] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D69E2E]" />
              <span>Submit Exam</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left 3 cols: Question Area */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-[#E8E2DA] p-6 sm:p-8 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#F0ECE6] text-xs text-[#718096]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#FAF8F5] text-[#1A365D] font-mono text-[11px] font-bold border border-[#E8E2DA]">
                  {currentQuestion.examName || `AIBE (${currentQuestion.year})`}
                </span>
                <span className="text-[#A0AEC0]">•</span>
                <span className="font-serif font-medium text-[#4A5568]">
                  {currentQuestion.subjectName || currentQuestion.subjectId}
                </span>
                {currentQuestion.topicId && (
                  <>
                    <span className="text-[#A0AEC0]">•</span>
                    <span className="text-[#718096] text-[11px]">{currentQuestion.topicId}</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isWithdrawn ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA] font-mono text-[10px] font-bold uppercase">
                    <ShieldAlert className="w-3 h-3 text-[#991B1B]" />
                    Withdrawn by BCI (Not Scorable)
                  </span>
                ) : (
                  <span className="font-mono text-[11px] text-[#22543D] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
                    1 Mark
                  </span>
                )}
                <button
                  onClick={handleToggleMark}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    isMarked
                      ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                      : 'border-[#E8E2DA] text-[#718096] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Flag className="w-3 h-3" />
                  <span>{isMarked ? 'Marked' : 'Mark for Review'}</span>
                </button>
              </div>
            </div>

            {/* Withdrawn Notice if applicable */}
            {isWithdrawn && (
              <div className="mt-4 p-3.5 bg-[#FFF5F5] border border-[#FEB2B2] rounded-xl flex items-start gap-2.5 text-xs text-[#9B2C2C]">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong>Withdrawn by Bar Council of India:</strong>
                  <p className="mt-0.5 font-serif">
                    This question was officially cancelled/withdrawn by BCI. It is excluded from total scorable marks and will not be penalized or counted against you.
                  </p>
                </div>
              </div>
            )}

            {/* Multiple Correct Notice if applicable */}
            {isMultiAnswer && !isWithdrawn && (
              <div className="mt-4 p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl flex items-center gap-2 text-xs text-[#1E40AF] font-medium">
                <Info className="w-4 h-4 shrink-0" />
                <span>Multiple correct options recognized by BCI. Select all that apply.</span>
              </div>
            )}

            {/* Question Text */}
            <div className="py-6">
              <div className="text-[11px] font-mono text-[#718096] uppercase mb-1">
                Question {currentIndex + 1}
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#1A365D] leading-relaxed">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {(['A', 'B', 'C', 'D'] as OptionKey[]).map(key => {
                const text = currentQuestion.options[key];
                if (!text) return null;
                const isSelected = isOptionSelected(key);

                return (
                  <div
                    key={key}
                    onClick={() => handleSelectOption(key)}
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                      isWithdrawn
                        ? 'opacity-60 cursor-not-allowed border-[#E8E2DA] bg-[#FAF8F5]'
                        : isSelected
                        ? 'border-[#1A365D] bg-[#1A365D]/5 shadow-xs'
                        : 'border-[#E8E2DA] hover:border-[#1A365D]/40 bg-white hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span
                      className={`inline-flex w-7 h-7 rounded-lg items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#1A365D] text-white'
                          : 'bg-[#FAF8F5] text-[#1A365D] border border-[#E8E2DA]'
                      }`}
                    >
                      {key}
                    </span>
                    <span className="text-sm sm:text-base text-[#2D3748] pt-0.5 leading-relaxed font-sans">
                      {text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Clear selection action */}
            {selectedAnswer && !isWithdrawn && (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleClearAnswer}
                  className="text-xs text-[#718096] hover:text-[#991B1B] font-mono flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear Selection</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Navigation Controls */}
          <div className="flex items-center justify-between py-2">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-medium transition-colors ${
                currentIndex === 0
                  ? 'border-[#E8E2DA] text-[#A0AEC0] cursor-not-allowed bg-transparent'
                  : 'border-[#E8E2DA] text-[#1A365D] hover:bg-white bg-[#FAF8F5]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-[#718096] font-mono">
              {currentIndex + 1} / {questions.length}
            </span>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A365D] hover:bg-[#2B6CB0] text-white text-xs font-semibold transition-colors"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4 text-[#D69E2E]" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C05621] hover:bg-[#9C4221] text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Review & Submit</span>
              </button>
            )}
          </div>
        </div>

        {/* Right 1 col: Question Palette */}
        <div className="lg:col-span-1 space-y-4">
          <QuestionPalette
            totalQuestions={questions.length}
            currentIndex={currentIndex}
            questionIds={questions.map(q => q.id)}
            answers={answers}
            markedForReview={marked}
            onSelectQuestion={idx => setCurrentIndex(idx)}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 bg-[#1A365D]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E8E2DA] max-w-md w-full p-6 shadow-xl space-y-4 font-sans">
            <h3 className="text-lg font-serif font-bold text-[#1A365D]">Submit Examination?</h3>
            <p className="text-xs text-[#4A5568] leading-relaxed">
              Are you ready to submit your answers and generate your official evaluation score?
            </p>

            <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#E8E2DA] grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="block font-serif text-lg font-bold text-[#1A365D]">{scorableQuestions.length}</span>
                <span className="text-[#718096] text-[11px]">Scorable Qs</span>
              </div>
              <div>
                <span className="block font-serif text-lg font-bold text-[#22543D]">{answeredCount}</span>
                <span className="text-[#718096] text-[11px]">Answered</span>
              </div>
              <div>
                <span className="block font-serif text-lg font-bold text-[#C05621]">{unansweredCount}</span>
                <span className="text-[#718096] text-[11px]">Unanswered</span>
              </div>
            </div>

            {withdrawnCount > 0 && (
              <p className="text-[11px] text-[#718096] bg-[#FAF8F5] p-2 rounded-lg border border-[#E8E2DA] font-mono text-center">
                {withdrawnCount} question(s) withdrawn by BCI excluded from score calculation.
              </p>
            )}

            {marked.length > 0 && (
              <p className="text-xs text-[#B45309] bg-[#FFFBEB] p-2.5 rounded-lg border border-[#FDE68A]">
                You have {marked.length} question(s) marked for review.
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2 border border-[#E8E2DA] text-[#4A5568] text-xs font-medium rounded-lg hover:bg-[#FAF8F5]"
              >
                Keep Answering
              </button>
              <button
                onClick={() => {
                  setShowConfirmSubmit(false);
                  onSubmit(answers, marked);
                }}
                className="px-4 py-2 bg-[#1A365D] hover:bg-[#2B6CB0] text-white text-xs font-semibold rounded-lg"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
