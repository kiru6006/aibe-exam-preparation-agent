import React from 'react';
import type { Exam, Question } from '../types';
import { Play, CheckCircle2 } from 'lucide-react';

interface PreviousPapersViewProps {
  exams: Exam[];
  questions: Question[];
  onStartExam: (exam: Exam) => void;
}

export const PreviousPapersView: React.FC<PreviousPapersViewProps> = ({
  exams,
  onStartExam
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6 font-sans">
      {/* Header */}
      <div className="pb-6 border-b border-[#E8E2DA]">
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-[#191919]">
          Previous-Year Papers
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5852] mt-1 font-serif max-w-2xl leading-relaxed">
          Simulate timed Bar Council examinations under official exam constraints with verified question sets.
        </p>
      </div>

      {/* Exam Cards Grid adhering strictly to Section 8 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map(exam => {
          const availableCount = exam.questionIds.length;

          return (
            <div
              key={exam.id}
              className="bg-white rounded-2xl border border-[#E8E2DA] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:border-[#CC785C] transition-all flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE6]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A5B43] bg-[#F4EFEA] border border-[#E8E2DA] px-2 py-0.5 rounded">
                    {exam.year} Official Paper
                  </span>
                  <span className="text-xs font-mono text-[#78716C]">
                    {exam.set || "All Sets"}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-medium text-[#191919] mt-4">
                  {exam.name}
                </h3>

                <div className="grid grid-cols-3 gap-2 mt-4 text-xs font-mono">
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]">
                    <span className="text-[#78716C] block text-[11px]">Questions</span>
                    <span className="text-base font-serif text-[#191919] block mt-0.5">
                      {availableCount}
                    </span>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]">
                    <span className="text-[#78716C] block text-[11px]">Duration</span>
                    <span className="text-base font-serif text-[#191919] block mt-0.5">
                      {exam.durationMinutes ? `${exam.durationMinutes}m` : 'Untimed'}
                    </span>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]">
                    <span className="text-[#78716C] block text-[11px]">Pass Mark</span>
                    <span className="text-base font-serif text-[#191919] block mt-0.5">
                      {exam.passPercentage}%
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-xs text-[#5C5852] space-y-1 font-serif">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#65A30D]" />
                    <span>No negative marking (1 mark per correct answer)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#65A30D]" />
                    <span>Original question numbering and verified answer key</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onStartExam(exam)}
                className="w-full py-2.5 bg-[#2A2825] hover:bg-black text-[#FAF8F5] font-medium rounded-xl text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-3 h-3 fill-[#CC785C] text-[#CC785C]" />
                <span>Start Exam Paper</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
