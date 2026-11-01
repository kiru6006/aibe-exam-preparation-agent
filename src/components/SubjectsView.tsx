import React, { useState } from 'react';
import type { Subject, Question } from '../types';
import { ArrowRight, Search } from 'lucide-react';

interface SubjectsViewProps {
  subjects: Subject[];
  questions: Question[];
  onStartSubjectPractice: (subjectId: string, count?: number) => void;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({
  subjects,
  questions,
  onStartSubjectPractice
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const questionCountMap: Record<string, number> = {};
  questions.forEach(q => {
    questionCountMap[q.subjectId] = (questionCountMap[q.subjectId] || 0) + 1;
  });

  const filteredSubjects = subjects.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E2DA]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-[#191919]">
            Subject-Wise Practice
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5852] mt-1 font-serif">
            Official BCI 19-Subject syllabus breakdown with verified previous-year question sets.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-[#78716C] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search syllabus..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E8E2DA] rounded-lg text-xs text-[#191919] placeholder-[#78716C] focus:outline-hidden focus:ring-1 focus:ring-[#CC785C] focus:border-[#CC785C]"
          />
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSubjects.map(sub => {
          const availableCount = questionCountMap[sub.id] || 0;

          return (
            <div
              key={sub.id}
              className="bg-white rounded-xl border border-[#E8E2DA] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:border-[#CC785C] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A5B43] bg-[#F4EFEA] border border-[#E8E2DA] px-2 py-0.5 rounded">
                    Weightage: {sub.weightageQuestions} Qs
                  </span>
                  <span className="text-xs font-mono text-[#78716C]">
                    {availableCount} Available
                  </span>
                </div>

                <h3 className="text-base font-serif font-medium text-[#191919] leading-snug">
                  {sub.name}
                </h3>
                {sub.description && (
                  <p className="text-xs text-[#5C5852] mt-2 line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                )}
              </div>

              {/* Action Buttons adhering to Section 17 */}
              <div className="pt-4 border-t border-[#F0ECE6] mt-5 flex items-center gap-2">
                {availableCount > 0 ? (
                  <>
                    <button
                      onClick={() => onStartSubjectPractice(sub.id, 10)}
                      disabled={availableCount < 10}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        availableCount >= 10
                          ? 'border-[#E8E2DA] text-[#2A2825] hover:bg-[#FAF8F5]'
                          : 'border-[#F0ECE6] text-[#A8A29E] cursor-not-allowed'
                      }`}
                    >
                      Practice 10
                    </button>
                    <button
                      onClick={() => onStartSubjectPractice(sub.id, availableCount)}
                      className="flex-1 px-3 py-1.5 bg-[#2A2825] hover:bg-black text-[#FAF8F5] rounded-lg text-xs font-medium shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Practice All ({availableCount})</span>
                      <ArrowRight className="w-3 h-3 text-[#CC785C]" />
                    </button>
                  </>
                ) : (
                  <span className="text-[11px] text-[#A8A29E] italic py-1">
                    Questions undergoing verification
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
