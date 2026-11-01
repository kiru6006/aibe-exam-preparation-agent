import React, { useState, useMemo } from 'react';
import type { Exam, Question } from '../types';
import { Play, CheckCircle2, LayoutGrid, List, Search, Filter } from 'lucide-react';

interface PreviousPapersViewProps {
  exams: Exam[];
  questions: Question[];
  onStartExam: (exam: Exam) => void;
}

export const PreviousPapersView: React.FC<PreviousPapersViewProps> = ({
  exams,
  onStartExam
}) => {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Derive unique years for filter
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(exams.map(e => e.year)));
    return years.sort((a, b) => b - a);
  }, [exams]);

  // Filtered exams
  const filteredExams = useMemo(() => {
    return exams.filter(exam => {
      const matchesYear = selectedYear === 'all' || String(exam.year) === selectedYear;
      const matchesSearch = 
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(exam.year).includes(searchQuery) ||
        (exam.set && exam.set.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesYear && matchesSearch;
    });
  }, [exams, selectedYear, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6 font-sans">
      {/* Header */}
      <div className="pb-6 border-b border-[#E8E2DA]">
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-[#191919]">
          Previous-Year Papers
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5852] mt-1 font-serif max-w-2xl leading-relaxed">
          Simulate timed Bar Council examinations under official exam constraints with verified question sets.
        </p>
      </div>

      {/* Filter and View Controls Bar */}
      <div className="bg-white p-3 rounded-xl border border-[#E8E2DA] shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2.5 w-full sm:w-auto">
          {/* Search by exam name or keywords */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-3.5 h-3.5 text-[#78716C] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search exam name or year..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#FAF8F5] border border-[#E8E2DA] rounded-lg text-xs text-[#191919] placeholder-[#78716C] focus:outline-hidden focus:bg-white"
            />
          </div>

          {/* Filter by Year */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#78716C] shrink-0" />
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="px-2.5 py-1.5 bg-[#FAF8F5] border border-[#E8E2DA] rounded-lg text-xs text-[#2A2825] focus:outline-hidden"
            >
              <option value="all">All Years ({availableYears.length})</option>
              {availableYears.map(yr => (
                <option key={yr} value={String(yr)}>{yr}</option>
              ))}
            </select>
          </div>
        </div>

        {/* View Mode Toggle (Card vs List) */}
        <div className="flex items-center gap-1 self-end sm:self-auto bg-[#FAF8F5] p-1 rounded-lg border border-[#E8E2DA]">
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
            <span className="hidden md:inline font-mono text-[11px]">Card</span>
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
            <span className="hidden md:inline font-mono text-[11px]">List</span>
          </button>
        </div>
      </div>

      {/* Result Status Count */}
      <div className="text-[11px] font-mono text-[#78716C] px-1">
        Showing {filteredExams.length} of {exams.length} examination papers
      </div>

      {/* CARD VIEW */}
      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExams.map(exam => {
            const availableCount = exam.questionIds.length;

            return (
              <div
                key={exam.id}
                className="bg-white rounded-2xl border border-[#E8E2DA] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:border-[#CC785C] transition-all flex flex-col justify-between space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE6]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A5B43] bg-[#F4EFEA] border border-[#E8E2DA] px-2 py-0.5 rounded">
                      {exam.year} Paper
                    </span>
                    <span className="text-xs font-mono text-[#78716C]">
                      {exam.set || "Official"}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-medium text-[#191919] mt-3">
                    {exam.name}
                  </h3>

                  <div className="grid grid-cols-3 gap-2 mt-4 text-xs font-mono">
                    <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA] text-center">
                      <span className="text-[#78716C] block text-[10px]">Questions</span>
                      <span className="text-sm font-serif text-[#191919] block mt-0.5">
                        {availableCount}
                      </span>
                    </div>

                    <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA] text-center">
                      <span className="text-[#78716C] block text-[10px]">Duration</span>
                      <span className="text-sm font-serif text-[#191919] block mt-0.5">
                        {exam.durationMinutes ? `${exam.durationMinutes}m` : 'Untimed'}
                      </span>
                    </div>

                    <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA] text-center">
                      <span className="text-[#78716C] block text-[10px]">Passing</span>
                      <span className="text-sm font-serif text-[#191919] block mt-0.5">
                        {exam.passPercentage}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-[#5C5852] space-y-1 font-serif">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#65A30D] shrink-0" />
                      <span>No negative marking</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#65A30D] shrink-0" />
                      <span>Original order & verified answer key</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onStartExam(exam)}
                  className="w-full py-2 bg-[#2A2825] hover:bg-black text-[#FAF8F5] font-medium rounded-xl text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3 h-3 fill-[#CC785C] text-[#CC785C]" />
                  <span>Start Exam</span>
                </button>
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
                  <th className="px-4 py-3">Examination</th>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Set</th>
                  <th className="px-4 py-3">Questions</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Passing Mark</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0ECE6]">
                {filteredExams.map(exam => (
                  <tr key={exam.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-4 py-3.5 font-serif font-medium text-sm text-[#191919]">
                      {exam.name}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[11px] text-[#7A5B43]">
                      <span className="px-2 py-0.5 rounded bg-[#F4EFEA] border border-[#E8E2DA]">
                        {exam.year}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-[#78716C]">
                      {exam.set || "Official"}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-[#191919]">
                      {exam.questionIds.length} Qs
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-[#78716C]">
                      {exam.durationMinutes ? `${exam.durationMinutes} mins` : 'Untimed'}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-[#3F6212]">
                      {exam.passPercentage}%
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => onStartExam(exam)}
                        className="px-3 py-1 bg-[#2A2825] hover:bg-black text-[#FAF8F5] font-medium rounded-lg text-xs shadow-2xs transition-colors inline-flex items-center gap-1.5"
                      >
                        <Play className="w-3 h-3 fill-[#CC785C] text-[#CC785C]" />
                        <span>Start</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
