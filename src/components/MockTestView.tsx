import React, { useState } from 'react';
import type { Subject, Question } from '../types';
import { Sparkles, Play, ShieldAlert, CheckSquare, Square } from 'lucide-react';

interface MockTestViewProps {
  subjects: Subject[];
  questions: Question[];
  onStartMock: (count: 25 | 50 | 100, selectedSubjectIds?: string[]) => void;
}

export const MockTestView: React.FC<MockTestViewProps> = ({
  subjects,
  questions,
  onStartMock
}) => {
  const [questionCount, setQuestionCount] = useState<25 | 50 | 100>(25);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<"all" | "custom">("all");

  const toggleSubject = (id: string) => {
    setSelectedSubjectIds(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedSubjectIds(subjects.map(s => s.id));
  };

  const handleClearAll = () => {
    setSelectedSubjectIds([]);
  };

  const totalEligibleQuestions = questions.filter(q => 
    filterMode === "all" || selectedSubjectIds.includes(q.subjectId)
  ).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 font-sans">
      {/* Header */}
      <div className="pb-6 border-b border-[#E8E2DA]">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F4EFEA] border border-[#E8E2DA] text-[#7A5B43] text-xs font-mono mb-2">
          <Sparkles className="w-3 h-3 text-[#CC785C]" />
          <span>Practice Simulation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-[#191919] tracking-tight">
          AIBE Practice Mock Test Engine
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5852] mt-1 font-serif leading-relaxed max-w-2xl">
          Generate a randomized mock test across official syllabus topics to simulate exam conditions.
        </p>
      </div>

      {/* Configuration Card */}
      <div className="bg-white rounded-2xl border border-[#E8E2DA] p-6 sm:p-8 space-y-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
        {/* Step 1: Question Count */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#78716C] mb-3">
            1. Select Volume
          </label>
          <div className="grid grid-cols-3 gap-3">
            {([25, 50, 100] as const).map(count => (
              <button
                key={count}
                type="button"
                onClick={() => setQuestionCount(count)}
                className={`py-3 px-4 rounded-xl border text-center transition-all ${
                  questionCount === count
                    ? 'bg-[#FBF4F0] border-[#CC785C] text-[#191919] font-medium ring-1 ring-[#CC785C]'
                    : 'bg-[#FAF8F5] border-[#E8E2DA] text-[#5C5852] hover:bg-white'
                }`}
              >
                <span className="block text-base font-serif text-[#191919]">{count} Questions</span>
                <span className="block text-[11px] font-mono text-[#78716C] mt-0.5">
                  ~{count === 25 ? '30 mins' : count === 50 ? '1 hour' : '3.5 hours'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Subject Scope */}
        <div className="pt-4 border-t border-[#F0ECE6]">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#78716C] mb-3">
            2. Subject Distribution
          </label>
          
          <div className="flex items-center gap-2.5 mb-4">
            <button
              onClick={() => {
                setFilterMode("all");
                setSelectedSubjectIds([]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                filterMode === "all"
                  ? 'bg-[#2A2825] text-white border-[#2A2825]'
                  : 'bg-white border-[#E8E2DA] text-[#5C5852] hover:bg-[#FAF8F5]'
              }`}
            >
              All 19 Official Subjects
            </button>
            <button
              onClick={() => {
                setFilterMode("custom");
                if (selectedSubjectIds.length === 0) {
                  setSelectedSubjectIds([subjects[0].id, subjects[1].id]);
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                filterMode === "custom"
                  ? 'bg-[#2A2825] text-white border-[#2A2825]'
                  : 'bg-white border-[#E8E2DA] text-[#5C5852] hover:bg-[#FAF8F5]'
              }`}
            >
              Custom Selection
            </button>
          </div>

          {filterMode === "custom" && (
            <div className="space-y-3 p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E2DA] text-xs">
                <span className="font-medium text-[#2A2825]">Choose subjects:</span>
                <div className="flex gap-2 font-mono text-[11px]">
                  <button onClick={handleSelectAll} className="text-[#CC785C] hover:underline">Select All</button>
                  <span className="text-[#D5CDC2]">•</span>
                  <button onClick={handleClearAll} className="text-[#78716C] hover:underline">Clear</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                {subjects.map(sub => {
                  const isChecked = selectedSubjectIds.includes(sub.id);
                  return (
                    <div
                      key={sub.id}
                      onClick={() => toggleSubject(sub.id)}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#E8E2DA] text-xs cursor-pointer hover:bg-[#FAF8F5] select-none"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-[#CC785C] shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-[#A8A29E] shrink-0" />
                      )}
                      <span className="text-[#191919] font-sans truncate">{sub.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-[#FBF4F0] border border-[#F0D5C9] flex items-start gap-3 text-xs text-[#8A5B4C]">
          <ShieldAlert className="w-4 h-4 text-[#CC785C] shrink-0 mt-0.5" />
          <p>
            <strong>Practice Simulation:</strong> Randomly generated from verified previous AIBE questions. 
            Designed for personal evaluation and self-practice.
          </p>
        </div>

        {/* Start Button */}
        <div className="pt-2">
          <button
            onClick={() => onStartMock(questionCount, filterMode === "custom" ? selectedSubjectIds : undefined)}
            disabled={totalEligibleQuestions === 0}
            className="w-full py-3 bg-[#2A2825] hover:bg-black text-[#FAF8F5] font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:bg-[#E8E2DA] disabled:text-[#A8A29E] disabled:cursor-not-allowed"
          >
            <Play className="w-3.5 h-3.5 fill-[#CC785C] text-[#CC785C]" />
            <span>Generate & Start Mock ({Math.min(questionCount, totalEligibleQuestions)} Questions)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
