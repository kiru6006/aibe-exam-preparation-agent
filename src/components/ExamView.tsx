import React, { useState } from 'react';
import type { Question, Answer, OptionKey } from '../types';
import { Timer } from './Timer';
import { QuestionPalette } from './QuestionPalette';
import { Flag, ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';

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
        <h2 className="text-xl font-serif text-[#191919]">No questions available</h2>
        <p className="text-sm text-[#5C5852] mt-2">There are no questions configured for this session.</p>
        <button
          onClick={onExit}
          className="mt-6 px-4 py-2 bg-[#2A2825] text-white rounded-lg hover:bg-black text-xs font-medium"
        >
          Return Home
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id] || null;
  const isMarked = marked.includes(currentQuestion.id);

  const handleSelectOption = (key: OptionKey) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: key
    }));
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

  const answeredCount = Object.values(answers).filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2DA] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-[#E8E2DA] text-[#5C5852] bg-white hover:bg-[#F4EFEA] transition-colors"
            >
              Exit Session
            </button>
            <div>
              <h2 className="text-sm sm:text-base font-serif font-medium text-[#191919] leading-tight">
                {title}
              </h2>
              <span className="text-[11px] text-[#78716C] font-mono">
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
              className="px-3.5 py-1.5 bg-[#2A2825] hover:bg-[#191919] text-[#FAF8F5] text-xs font-medium rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#CC785C]" />
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
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#F0ECE6] text-xs text-[#78716C]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#F4EFEA] text-[#2A2825] font-mono text-[11px]">
                  {currentQuestion.examName || "AIBE"} • {currentQuestion.set || "Official"}
                </span>
                {currentQuestion.verified && (
                  <span className="flex items-center gap-1 text-[#3F6212] bg-[#F7FEE7] px-2 py-0.5 rounded border border-[#D9F99D] text-[11px]">
                    <ShieldCheck className="w-3 h-3 text-[#65A30D]" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleMark}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-xs font-medium transition-colors ${
                    isMarked
                      ? 'bg-[#FBF4F0] text-[#B66347] border-[#F0D5C9]'
                      : 'border-[#E8E2DA] text-[#5C5852] hover:bg-[#F4EFEA]'
                  }`}
                  aria-pressed={isMarked}
                >
                  <Flag className={`w-3 h-3 ${isMarked ? 'fill-[#CC785C] text-[#CC785C]' : ''}`} />
                  <span>{isMarked ? 'Marked' : 'Mark for Review'}</span>
                </button>

                {selectedAnswer && (
                  <button
                    onClick={handleClearAnswer}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#E8E2DA] text-[#78716C] hover:text-[#191919] hover:bg-[#F4EFEA] text-xs transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            {/* Question Text */}
            <div className="py-6">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#CC785C] mb-2">
                Question {currentIndex + 1}
              </div>
              <p className="text-lg sm:text-xl text-[#191919] font-serif leading-relaxed select-text whitespace-pre-wrap">
                {currentQuestion.question}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {(['A', 'B', 'C', 'D'] as OptionKey[]).map(key => {
                const text = currentQuestion.options[key];
                const isSelected = selectedAnswer === key;

                return (
                  <div
                    key={key}
                    onClick={() => handleSelectOption(key)}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'bg-[#FBF4F0] border-[#CC785C] ring-1 ring-[#CC785C] shadow-2xs'
                        : 'bg-white border-[#E8E2DA] hover:border-[#D5CDC2] hover:bg-[#FAF8F5]'
                    }`}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        handleSelectOption(key);
                      }
                    }}
                  >
                    <span 
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#CC785C] text-white font-bold'
                          : 'bg-[#F4EFEA] text-[#5C5852] border border-[#E8E2DA]'
                      }`}
                    >
                      {key}
                    </span>
                    <span className="text-sm sm:text-base text-[#191919] pt-0.5 leading-relaxed font-sans">
                      {text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation Controls */}
          <div className="flex items-center justify-between py-2">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-medium transition-colors ${
                currentIndex === 0
                  ? 'border-[#E8E2DA] text-[#A8A29E] cursor-not-allowed bg-transparent'
                  : 'border-[#E8E2DA] text-[#2A2825] hover:bg-white bg-[#F4EFEA]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-[#78716C] font-mono">
              {currentIndex + 1} / {questions.length}
            </span>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2A2825] hover:bg-[#191919] text-white text-xs font-medium transition-colors"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4 text-[#CC785C]" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#CC785C] hover:bg-[#B66347] text-white text-xs font-semibold shadow-xs transition-colors"
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
        <div className="fixed inset-0 z-50 bg-[#191919]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E8E2DA] max-w-md w-full p-6 shadow-xl space-y-4 font-sans">
            <h3 className="text-lg font-serif font-medium text-[#191919]">Submit Examination?</h3>
            <p className="text-xs text-[#5C5852] leading-relaxed">
              Are you ready to submit your answers and view your performance evaluation?
            </p>

            <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#E8E2DA] grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="block font-serif text-lg text-[#191919]">{questions.length}</span>
                <span className="text-[#78716C] text-[11px]">Total</span>
              </div>
              <div>
                <span className="block font-serif text-lg text-[#3F6212]">{answeredCount}</span>
                <span className="text-[#78716C] text-[11px]">Answered</span>
              </div>
              <div>
                <span className="block font-serif text-lg text-[#B66347]">{unansweredCount}</span>
                <span className="text-[#78716C] text-[11px]">Unanswered</span>
              </div>
            </div>

            {marked.length > 0 && (
              <p className="text-xs text-[#8A5B4C] bg-[#FBF4F0] p-2.5 rounded-lg border border-[#F0D5C9]">
                You have {marked.length} question(s) marked for review.
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2 border border-[#E8E2DA] text-[#5C5852] text-xs font-medium rounded-lg hover:bg-[#F4EFEA]"
              >
                Keep Answering
              </button>
              <button
                onClick={() => {
                  setShowConfirmSubmit(false);
                  onSubmit(answers, marked);
                }}
                className="px-4 py-2 bg-[#2A2825] hover:bg-black text-white text-xs font-semibold rounded-lg"
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
