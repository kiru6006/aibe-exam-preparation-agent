import React from 'react';
import { Flag, CheckCircle2, Circle } from 'lucide-react';
import type { Answer } from '../types';

interface QuestionPaletteProps {
  totalQuestions: number;
  currentIndex: number;
  questionIds: string[];
  answers: Record<string, Answer>;
  markedForReview: string[];
  onSelectQuestion: (index: number) => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  totalQuestions,
  currentIndex,
  questionIds,
  answers,
  markedForReview,
  onSelectQuestion
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E2DA] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE6] mb-3">
        <h3 className="text-xs font-serif font-medium text-[#191919]">Palette</h3>
        <span className="text-[11px] font-mono text-[#78716C]">
          {Object.values(answers).filter(Boolean).length}/{totalQuestions}
        </span>
      </div>

      {/* Accessible Status Legend (Anthropic warm palette) */}
      <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5C5852] mb-4 pb-3 border-b border-[#F0ECE6]">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded flex items-center justify-center bg-[#F4EFEA] border border-[#2A2825] text-[#2A2825] font-bold text-[9px]">
            ●
          </span>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded flex items-center justify-center bg-[#F7FEE7] border border-[#A3E635] text-[#4D7C0F]">
            <CheckCircle2 className="w-3 h-3" />
          </span>
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded flex items-center justify-center bg-[#FAF8F5] border border-[#E8E2DA] text-[#A8A29E]">
            <Circle className="w-3 h-3" />
          </span>
          <span>Unanswered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded flex items-center justify-center bg-[#FBF4F0] border border-[#F0D5C9] text-[#CC785C]">
            <Flag className="w-3 h-3 fill-[#CC785C]" />
          </span>
          <span>Marked</span>
        </div>
      </div>

      {/* Button Grid */}
      <div 
        className="grid grid-cols-5 gap-1.5 max-h-72 overflow-y-auto pr-1"
        role="group" 
        aria-label="Questions list"
      >
        {questionIds.map((qid, idx) => {
          const isCurrent = currentIndex === idx;
          const isAnswered = Boolean(answers[qid]);
          const isMarked = markedForReview.includes(qid);

          let buttonClasses = "relative h-8 rounded-lg font-mono text-xs transition-all flex items-center justify-center ";
          let statusLabel = `Question ${idx + 1}`;

          if (isCurrent) {
            buttonClasses += "ring-2 ring-[#2A2825] font-bold bg-[#FAF8F5] text-[#191919] border border-[#2A2825]";
            statusLabel += ", Current";
          } else if (isMarked) {
            buttonClasses += "bg-[#FBF4F0] border border-[#F0D5C9] text-[#B66347] hover:bg-[#F7EBE4]";
            statusLabel += ", Marked for review";
          } else if (isAnswered) {
            buttonClasses += "bg-[#F7FEE7] border border-[#D9F99D] text-[#3F6212] hover:bg-[#ECFCCB]";
            statusLabel += ", Answered";
          } else {
            buttonClasses += "bg-[#FAF8F5] border border-[#E8E2DA] text-[#78716C] hover:bg-[#F4EFEA]";
            statusLabel += ", Unanswered";
          }

          return (
            <button
              key={qid}
              onClick={() => onSelectQuestion(idx)}
              className={buttonClasses}
              aria-label={statusLabel}
              aria-current={isCurrent ? "true" : undefined}
            >
              <span>{String(idx + 1).padStart(2, '0')}</span>
              {isMarked && (
                <span className="absolute -top-1 -right-1 text-[#CC785C]">
                  <Flag className="w-2.5 h-2.5 fill-[#CC785C]" />
                </span>
              )}
              {isAnswered && !isMarked && (
                <span className="absolute -bottom-1 -right-1 text-[#65A30D]">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
