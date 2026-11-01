import React, { useState, useMemo } from 'react';
import type { Question, Subject } from '../types';
import { Search, ShieldCheck, LayoutGrid, List, Filter } from 'lucide-react';

interface QuestionBankSearchViewProps {
  questions: Question[];
  subjects: Subject[];
}

export const QuestionBankSearchView: React.FC<QuestionBankSearchViewProps> = ({
  questions,
  subjects
}) => {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const subjectMap = useMemo(() => {
    const map = new Map<string, string>();
    subjects.forEach(s => map.set(s.id, s.name));
    return map;
  }, [subjects]);

  const exams = useMemo(() => {
    return Array.from(new Set(questions.map(q => q.examName))).sort();
  }, [questions]);

  const years = useMemo(() => {
    return Array.from(new Set(questions.map(q => q.year))).sort((a, b) => b - a);
  }, [questions]);

  const filtered = useMemo(() => {
    return questions.filter(q => {
      const matchesSubject = selectedSubject === 'all' || q.subjectId === selectedSubject;
      const matchesExam = selectedExam === 'all' || q.examName === selectedExam;
      const matchesYear = selectedYear === 'all' || String(q.year) === selectedYear;
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        !searchQuery ||
        q.question.toLowerCase().includes(query) ||
        Object.values(q.options).some(opt => opt.toLowerCase().includes(query)) ||
        (q.legalProvision && q.legalProvision.toLowerCase().includes(query)) ||
        (q.caseLaw && q.caseLaw.toLowerCase().includes(query));

      return matchesSubject && matchesExam && matchesYear && matchesSearch;
    });
  }, [questions, selectedSubject, selectedExam, selectedYear, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6 font-sans">
      {/* Header */}
      <div className="pb-6 border-b border-[#E8E2DA]">
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-[#191919]">
          Question Bank Search & Reference
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5852] mt-1 font-serif">
          Search questions, statutory sections, and landmark citations across all papers with multi-dimensional filtering.
        </p>
      </div>

      {/* Filter and View Controls Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-[#E8E2DA] shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row gap-2.5 items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-3.5 h-3.5 text-[#78716C] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search keywords, provisions, judgments, or options..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#FAF8F5] border border-[#E8E2DA] rounded-lg text-xs text-[#191919] placeholder-[#78716C] focus:outline-hidden focus:bg-white"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 self-end lg:self-auto bg-[#FAF8F5] p-1 rounded-lg border border-[#E8E2DA] shrink-0">
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
              <span className="font-mono text-[11px]">Card</span>
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
              <span className="font-mono text-[11px]">List</span>
            </button>
          </div>
        </div>

        {/* Dropdown Filters Row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F0ECE6]">
          <div className="flex items-center gap-1.5 text-xs text-[#78716C]">
            <Filter className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px] uppercase">Filters:</span>
          </div>

          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="px-2.5 py-1.5 bg-[#FAF8F5] border border-[#E8E2DA] rounded-lg text-xs font-sans text-[#2A2825] focus:outline-hidden"
          >
            <option value="all">All Subjects ({subjects.length})</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          {/* Exam Name Filter */}
          <select
            value={selectedExam}
            onChange={e => setSelectedExam(e.target.value)}
            className="px-2.5 py-1.5 bg-[#FAF8F5] border border-[#E8E2DA] rounded-lg text-xs font-sans text-[#2A2825] focus:outline-hidden"
          >
            <option value="all">All Exam Papers ({exams.length})</option>
            {exams.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            className="px-2.5 py-1.5 bg-[#FAF8F5] border border-[#E8E2DA] rounded-lg text-xs font-sans text-[#2A2825] focus:outline-hidden"
          >
            <option value="all">All Years ({years.length})</option>
            {years.map(yr => (
              <option key={yr} value={String(yr)}>{yr}</option>
            ))}
          </select>

          {(selectedSubject !== 'all' || selectedExam !== 'all' || selectedYear !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedSubject('all');
                setSelectedExam('all');
                setSelectedYear('all');
                setSearchQuery('');
              }}
              className="text-[11px] font-mono text-[#CC785C] hover:underline ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Result Status Count */}
      <div className="text-[11px] font-mono text-[#78716C] px-1">
        Showing {filtered.length} of {questions.length} questions
      </div>

      {/* CARD VIEW */}
      {viewMode === 'card' ? (
        <div className="space-y-4">
          {filtered.slice(0, 50).map(q => (
            <div key={q.id} className="bg-white rounded-xl border border-[#E8E2DA] p-6 space-y-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F0ECE6] text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[#7A5B43] bg-[#F4EFEA] border border-[#E8E2DA] px-2 py-0.5 rounded">
                    {subjectMap.get(q.subjectId) || q.subjectId}
                  </span>
                  <span className="text-[#D5CDC2]">•</span>
                  <span className="text-[#78716C] font-mono text-[11px]">{q.examName} ({q.year}) - Q{q.questionNumber}</span>
                </div>

                {q.verified && (
                  <span className="flex items-center gap-1 text-[#3F6212] bg-[#F7FEE7] px-2 py-0.5 rounded border border-[#D9F99D] text-[10px] font-mono">
                    <ShieldCheck className="w-3 h-3 text-[#65A30D]" />
                    <span>Verified Key</span>
                  </span>
                )}
              </div>

              <p className="text-base text-[#191919] font-serif leading-relaxed">
                {q.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(['A', 'B', 'C', 'D'] as const).map(key => {
                  const isCorrect = q.correctAnswer === key;
                  return (
                    <div
                      key={key}
                      className={`p-3 rounded-lg border flex items-start gap-2.5 ${
                        isCorrect 
                          ? 'bg-[#F7FEE7] border-[#A3E635] text-[#14532D] font-medium'
                          : 'bg-[#FAF8F5] border-[#E8E2DA] text-[#5C5852]'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded flex items-center justify-center text-[11px] font-mono shrink-0 ${
                        isCorrect ? 'bg-[#4D7C0F] text-white font-bold' : 'bg-[#E8E2DA] text-[#5C5852]'
                      }`}>
                        {key}
                      </span>
                      <span className="leading-relaxed">{q.options[key]}</span>
                    </div>
                  );
                })}
              </div>

              {(q.legalProvision || q.caseLaw || q.explanation) && (
                <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E8E2DA] space-y-1.5 text-xs font-serif">
                  {q.legalProvision && (
                    <div>
                      <span className="font-mono text-[11px] text-[#78716C] uppercase">Statute: </span>
                      <span className="text-[#191919] font-mono">{q.legalProvision}</span>
                    </div>
                  )}
                  {q.caseLaw && (
                    <div>
                      <span className="font-mono text-[11px] text-[#78716C] uppercase">Precedent: </span>
                      <span className="text-[#191919] italic">{q.caseLaw}</span>
                    </div>
                  )}
                  {q.explanation && (
                    <p className="text-[#5C5852] pt-1.5 border-t border-[#E8E2DA] leading-relaxed">
                      {q.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
          {filtered.length > 50 && (
            <div className="p-4 text-center text-xs font-mono text-[#78716C] bg-white rounded-xl border border-[#E8E2DA]">
              Showing first 50 results. Use the search bar or filters above to refine your search.
            </div>
          )}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-xl border border-[#E8E2DA] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#5C5852]">
              <thead className="bg-[#FAF8F5] text-[#2A2825] font-medium border-b border-[#E8E2DA]">
                <tr>
                  <th className="px-4 py-3">Q#</th>
                  <th className="px-4 py-3">Question Prompt</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Exam Paper</th>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3 text-center">Correct Answer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0ECE6]">
                {filtered.slice(0, 100).map(q => (
                  <tr key={q.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-4 py-3 font-mono text-[11px] text-[#78716C]">
                      Q{q.questionNumber}
                    </td>
                    <td className="px-4 py-3 font-serif font-medium text-sm text-[#191919] max-w-md">
                      <p className="line-clamp-2">{q.question}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-[#F4EFEA] border border-[#E8E2DA] text-[11px] text-[#7A5B43] font-mono whitespace-nowrap">
                        {subjectMap.get(q.subjectId) || q.subjectId}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#191919] whitespace-nowrap">
                      {q.examName}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#78716C]">
                      {q.year}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex w-6 h-6 items-center justify-center rounded bg-[#F7FEE7] border border-[#D9F99D] font-mono font-bold text-xs text-[#3F6212]">
                        {q.correctAnswer}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length > 100 && (
            <div className="p-3 text-center text-xs font-mono text-[#78716C] border-t border-[#F0ECE6]">
              Showing first 100 table entries. Refine filters to narrow results.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
