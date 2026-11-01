import React, { useState } from 'react';
import type { Question, Subject } from '../types';
import { Search, ShieldCheck } from 'lucide-react';

interface QuestionBankSearchViewProps {
  questions: Question[];
  subjects: Subject[];
}

export const QuestionBankSearchView: React.FC<QuestionBankSearchViewProps> = ({
  questions,
  subjects
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedExam, setSelectedExam] = useState<string>('all');

  const subjectMap = new Map<string, string>();
  subjects.forEach(s => subjectMap.set(s.id, s.name));

  const exams = Array.from(new Set(questions.map(q => q.examName)));

  const filtered = questions.filter(q => {
    const matchesSubject = selectedSubject === 'all' || q.subjectId === selectedSubject;
    const matchesExam = selectedExam === 'all' || q.examName === selectedExam;
    const matchesSearch = 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Object.values(q.options).some(opt => opt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.legalProvision && q.legalProvision.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.caseLaw && q.caseLaw.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSubject && matchesExam && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6 font-sans">
      {/* Header */}
      <div className="pb-6 border-b border-[#E8E2DA]">
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-[#191919]">
          Question Bank Search & Reference
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5852] mt-1 font-serif">
          Search questions, statutory sections, and landmark citations across all papers.
        </p>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-3.5 rounded-xl border border-[#E8E2DA] shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col md:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#78716C] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search keywords, legal provisions, judgments..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#FAF8F5] border border-[#E8E2DA] rounded-lg text-xs text-[#191919] placeholder-[#78716C] focus:outline-hidden focus:bg-white"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="px-3 py-1.5 bg-[#FAF8F5] border border-[#E8E2DA] rounded-lg text-xs font-sans text-[#2A2825]"
          >
            <option value="all">All Subjects</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            value={selectedExam}
            onChange={e => setSelectedExam(e.target.value)}
            className="px-3 py-1.5 bg-[#FAF8F5] border border-[#E8E2DA] rounded-lg text-xs font-sans text-[#2A2825]"
          >
            <option value="all">All Papers</option>
            {exams.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Result Count */}
      <div className="text-[11px] font-mono text-[#78716C] px-1">
        Showing {filtered.length} of {questions.length} questions
      </div>

      {/* Question Cards List */}
      <div className="space-y-4">
        {filtered.map(q => (
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
      </div>
    </div>
  );
};
