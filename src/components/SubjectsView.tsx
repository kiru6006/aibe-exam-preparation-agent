import React, { useState, useMemo } from 'react';
import type { Subject, Question } from '../types';
import { ArrowRight, Search, LayoutGrid, List } from 'lucide-react';

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
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate dynamic question count per subject strictly from questions data
  const questionCountMap = useMemo(() => {
    const map: Record<string, number> = {};
    questions.forEach(q => {
      map[q.subjectId] = (map[q.subjectId] || 0) + 1;
    });
    return map;
  }, [questions]);

  const filteredSubjects = useMemo(() => {
    return subjects.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.shortName && s.shortName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [subjects, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E2DA]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C70234] bg-[#FCE8EF] px-2 py-0.5 rounded border border-[#C70234]/20">
              01 · SYLLABUS BREAKDOWN
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#80868B]">
              BAR COUNCIL CURRICULUM
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#202124]">
            Subject-Wise <span className="text-[#C70234]">Practice</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6368] mt-1 font-serif">
            Official BCI 19-Subject syllabus breakdown with verified previous-year question sets.
          </p>
        </div>

        {/* Search & View Mode Switcher */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-3.5 h-3.5 text-[#78716C] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search syllabus..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#E8E2DA] rounded-lg text-xs text-[#191919] placeholder-[#78716C] focus:outline-hidden focus:ring-1 focus:ring-[#CC785C] focus:border-[#CC785C]"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-lg border border-[#E8E2DA]">
            <button
              onClick={() => setViewMode('card')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1.5 transition-colors ${
                viewMode === 'card'
                  ? 'bg-[#2A2825] text-white shadow-2xs'
                  : 'text-[#5C5852] hover:text-[#191919]'
              }`}
              title="Card View"
              aria-label="Card View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono text-[11px]">Card</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1.5 transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#2A2825] text-white shadow-2xs'
                  : 'text-[#5C5852] hover:text-[#191919]'
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono text-[11px]">List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Result Count */}
      <div className="text-[11px] font-mono text-[#78716C] px-1">
        Showing {filteredSubjects.length} of {subjects.length} subjects
      </div>

      {/* CARD VIEW */}
      {viewMode === 'card' ? (
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
                      No questions in bank yet
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-xl border border-[#E8E2DA] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#5C5852]">
              <thead className="bg-[#FAF8F5] text-[#2A2825] font-medium border-b border-[#E8E2DA]">
                <tr>
                  <th className="px-4 py-3">Subject Name</th>
                  <th className="px-4 py-3">Syllabus Scope</th>
                  <th className="px-4 py-3">Exam Weightage</th>
                  <th className="px-4 py-3">In Question Bank</th>
                  <th className="px-4 py-3 text-right">Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0ECE6]">
                {filteredSubjects.map(sub => {
                  const availableCount = questionCountMap[sub.id] || 0;

                  return (
                    <tr key={sub.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="px-4 py-3.5 font-serif font-medium text-sm text-[#191919]">
                        {sub.name}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-[#78716C] max-w-sm truncate font-serif">
                        {sub.description || '-'}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-[#7A5B43]">
                        {sub.weightageQuestions} marks
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-[#191919]">
                        <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8E2DA]">
                          {availableCount} Qs
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right space-x-2">
                        {availableCount >= 10 && (
                          <button
                            onClick={() => onStartSubjectPractice(sub.id, 10)}
                            className="px-2.5 py-1 border border-[#E8E2DA] hover:bg-white text-[#2A2825] text-xs font-medium rounded-lg"
                          >
                            10 Qs
                          </button>
                        )}
                        <button
                          onClick={() => onStartSubjectPractice(sub.id, availableCount)}
                          disabled={availableCount === 0}
                          className="px-3 py-1 bg-[#2A2825] hover:bg-black disabled:bg-[#E8E2DA] disabled:text-[#A8A29E] text-white text-xs font-medium rounded-lg inline-flex items-center gap-1 shadow-2xs"
                        >
                          <span>All</span>
                          <ArrowRight className="w-3 h-3 text-[#CC785C]" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
