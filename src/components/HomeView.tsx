import React from 'react';
import type { Subject, Exam, Question } from '../types';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Scale, 
  RotateCcw
} from 'lucide-react';

interface HomeViewProps {
  subjects: Subject[];
  exams: Exam[];
  questions: Question[];
  onNavigate: (tab: string) => void;
  onStartExam: (exam: Exam) => void;
  onPracticeMistakes: () => void;
  mistakesCount: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  subjects,
  exams,
  questions,
  onNavigate,
  onPracticeMistakes,
  mistakesCount
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Editorial Anthropic Hero Card */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E2DA] p-8 sm:p-12 shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative overflow-hidden">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4EFEA] border border-[#E8E2DA] text-[#7A5B43] text-xs font-mono">
            <Scale className="w-3.5 h-3.5 text-[#CC785C]" />
            <span>Open Law Study Engine • No Login</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-[#191919] leading-[1.15]">
            AIBE Preparation, refined.
          </h1>

          <p className="text-base sm:text-lg text-[#5C5852] font-serif leading-relaxed max-w-2xl">
            A quiet, focused environment to practice previous-year Bar Council of India examinations, master subjects systematically, and test yourself with mock papers.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('papers')}
              className="px-5 py-2.5 rounded-lg bg-[#2A2825] hover:bg-[#191919] text-[#FAF8F5] font-medium text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Previous Year Papers</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#CC785C]" />
            </button>

            <button
              onClick={() => onNavigate('subjects')}
              className="px-5 py-2.5 rounded-lg bg-[#F4EFEA] hover:bg-[#EDE6DE] text-[#2A2825] font-medium text-xs border border-[#E8E2DA] transition-colors"
            >
              Subject Practice
            </button>

            <button
              onClick={() => onNavigate('mock')}
              className="px-5 py-2.5 rounded-lg bg-[#F4EFEA] hover:bg-[#EDE6DE] text-[#2A2825] font-medium text-xs border border-[#E8E2DA] transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#CC785C]" />
              <span>Practice Mock</span>
            </button>
          </div>
        </div>

        {/* Live Data Derived Counter Bar adhering strictly to Section 7 */}
        <div className="grid grid-cols-3 gap-6 pt-8 mt-10 border-t border-[#E8E2DA] max-w-xl text-left">
          <div>
            <span className="block text-2xl sm:text-3xl font-serif text-[#191919]">
              {exams.length}
            </span>
            <span className="text-xs text-[#78716C] mt-0.5 block font-sans">Official Papers</span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-serif text-[#191919]">
              {questions.length}
            </span>
            <span className="text-xs text-[#78716C] mt-0.5 block font-sans">Questions Available</span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-serif text-[#191919]">
              {subjects.length}
            </span>
            <span className="text-xs text-[#78716C] mt-0.5 block font-sans">Syllabus Subjects</span>
          </div>
        </div>
      </div>

      {/* Practice Mistakes Callout */}
      {mistakesCount > 0 && (
        <div className="bg-[#FBF4F0] rounded-xl border border-[#F0D5C9] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-[#8B3E2F]">
              Review your {mistakesCount} flagged question{mistakesCount > 1 ? 's' : ''}
            </h3>
            <p className="text-xs text-[#8A5B4C] mt-0.5">
              Reviewing incorrect answers reinforces legal provisions and boosts exam recall.
            </p>
          </div>

          <button
            onClick={onPracticeMistakes}
            className="px-4 py-2 bg-[#CC785C] hover:bg-[#B66347] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-2 transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Practice Mistakes ({mistakesCount})</span>
          </button>
        </div>
      )}

      {/* Feature Cards Grid in Anthropic style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Previous Papers */}
        <div 
          onClick={() => onNavigate('papers')}
          className="bg-white rounded-xl border border-[#E8E2DA] p-6 hover:border-[#CC785C] shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#F4EFEA] border border-[#E8E2DA] flex items-center justify-center text-[#2A2825] mb-4 group-hover:text-[#CC785C] transition-colors">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-medium text-[#191919]">
              Previous-Year Papers
            </h3>
            <p className="text-xs text-[#5C5852] mt-2 leading-relaxed">
              Real question papers from AIBE XVIII, XVII, and more. Timed exam environment with full Question Palette.
            </p>
          </div>
          <div className="pt-4 border-t border-[#F0ECE6] mt-6 flex items-center justify-between text-xs font-medium text-[#CC785C]">
            <span>Explore Papers ({exams.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Subject Practice */}
        <div 
          onClick={() => onNavigate('subjects')}
          className="bg-white rounded-xl border border-[#E8E2DA] p-6 hover:border-[#CC785C] shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#F4EFEA] border border-[#E8E2DA] flex items-center justify-center text-[#2A2825] mb-4 group-hover:text-[#CC785C] transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-medium text-[#191919]">
              Subject-Wise Practice
            </h3>
            <p className="text-xs text-[#5C5852] mt-2 leading-relaxed">
              Drill down by BCI syllabus: Constitutional Law, Cr.P.C., C.P.C., Evidence, Family Law, and 14 other subjects.
            </p>
          </div>
          <div className="pt-4 border-t border-[#F0ECE6] mt-6 flex items-center justify-between text-xs font-medium text-[#CC785C]">
            <span>Choose Subject (19 Areas)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Mock Tests */}
        <div 
          onClick={() => onNavigate('mock')}
          className="bg-white rounded-xl border border-[#E8E2DA] p-6 hover:border-[#CC785C] shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#F4EFEA] border border-[#E8E2DA] flex items-center justify-center text-[#2A2825] mb-4 group-hover:text-[#CC785C] transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-medium text-[#191919]">
              Practice Mock Test
            </h3>
            <p className="text-xs text-[#5C5852] mt-2 leading-relaxed">
              Generate 25, 50, or 100 question mock exams with randomized distribution across official domains.
            </p>
          </div>
          <div className="pt-4 border-t border-[#F0ECE6] mt-6 flex items-center justify-between text-xs font-medium text-[#CC785C]">
            <span>Generate Mock</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Core Learning Loop in Warm Editorial Style */}
      <div className="bg-[#F4EFEA] border border-[#E8E2DA] text-[#2A2825] rounded-xl p-6 text-center space-y-3">
        <h4 className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
          The Core Learning Cycle
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-serif text-[#191919]">
          <span className="px-2.5 py-1 bg-white rounded border border-[#E8E2DA]">1. Attempt</span>
          <span className="text-[#CC785C]">→</span>
          <span className="px-2.5 py-1 bg-white rounded border border-[#E8E2DA]">2. Evaluate</span>
          <span className="text-[#CC785C]">→</span>
          <span className="px-2.5 py-1 bg-white rounded border border-[#E8E2DA]">3. Review</span>
          <span className="text-[#CC785C]">→</span>
          <span className="px-2.5 py-1 bg-white rounded border border-[#E8E2DA]">4. Spot Weakness</span>
          <span className="text-[#CC785C]">→</span>
          <span className="px-2.5 py-1 bg-white rounded border border-[#E8E2DA]">5. Practice Mistakes</span>
        </div>
      </div>
    </div>
  );
};
