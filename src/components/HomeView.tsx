import React, { useState } from 'react';
import type { Subject, Exam, Question, AibeStatistic } from '../types';
import statisticsData from '../data/aibeStatistics.json';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Scale, 
  RotateCcw,
  CheckCircle2,
  FileText,
  TrendingUp,
  ExternalLink,
  ShieldCheck,
  Award,
  Layers,
  LayoutGrid,
  List
} from 'lucide-react';

interface HomeViewProps {
  subjects: Subject[];
  exams: Exam[];
  questions: Question[];
  onNavigate: (tab: string, initialTabSub?: string) => void;
  onStartExam: (exam: Exam) => void;
  onPracticeMistakes: () => void;
  mistakesCount: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  subjects,
  exams,
  questions,
  onNavigate,
  onStartExam,
  onPracticeMistakes,
  mistakesCount
}) => {
  const [syllabusView, setSyllabusView] = useState<'card' | 'list'>('card');
  const stats: AibeStatistic[] = statisticsData as AibeStatistic[];

  // Filter out general-law from syllabus breakdown
  const syllabusSubjects = subjects.filter(s => s.id !== 'general-law');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 font-sans">
      {/* 1. Master Hero Section */}
      <div className="bg-white rounded-2xl border border-[#E8E2DA] p-8 sm:p-12 shadow-[0_2px_12px_rgba(26,54,93,0.04)] relative overflow-hidden">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A365D]/5 border border-[#1A365D]/10 text-[#1A365D] text-xs font-mono font-medium">
            <Scale className="w-3.5 h-3.5 text-[#C05621]" />
            <span>Open Indian Legal Study Engine • Free & Offline Capable</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-[#1A365D] leading-[1.15]">
            AIBE Preparation
            <span className="block text-xl sm:text-2xl font-serif font-normal text-[#C05621] mt-2">
              Prepare Smarter. Practice Better.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#4A5568] font-serif leading-relaxed max-w-2xl">
            A focused environment to practice previous-year Bar Council of India examinations (AIBE IV to XXI), master syllabus subjects systematically, and track real readiness.
          </p>

          {/* Quick Exam Pills (AIBE XXI through IV with View All option) */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#718096] uppercase tracking-wider">
                Select An Examination Paper ({exams.length} Available):
              </span>
              <button
                onClick={() => onNavigate('papers')}
                className="text-xs font-semibold text-[#C05621] hover:underline flex items-center gap-1 font-mono"
              >
                <span>View Full Papers Directory</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {exams.map((ex, idx) => (
                <button
                  key={ex.id}
                  onClick={() => onStartExam(ex)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all border ${
                    idx === 0
                      ? 'bg-[#1A365D] text-white font-bold border-[#1A365D] shadow-xs hover:bg-[#2B6CB0]'
                      : idx < 4
                      ? 'bg-[#FAF8F5] hover:bg-[#1A365D] hover:text-white text-[#1A365D] font-bold border-[#CBD5E1]'
                      : 'bg-white hover:bg-[#1A365D] hover:text-white text-[#4A5568] font-medium border-[#E2E8F0]'
                  }`}
                  title={`${ex.name} - 100 Questions`}
                >
                  {ex.name.replace(/ \(\d{4}\)/, '')}
                  <span className="text-[10px] ml-1 opacity-70">({ex.year})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('papers')}
              className="px-5 py-2.5 rounded-xl bg-[#1A365D] hover:bg-[#2B6CB0] text-white font-medium text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Full Previous Papers</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D69E2E]" />
            </button>

            <button
              onClick={() => onNavigate('subjects')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#1A365D] font-medium text-xs border border-[#E8E2DA] transition-colors"
            >
              Subject Practice
            </button>

            <button
              onClick={() => onNavigate('strategy-overview')}
              className="px-5 py-2.5 rounded-xl bg-[#C05621] hover:bg-[#9C4221] text-white font-medium text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Strategy & Tips</span>
            </button>
          </div>
        </div>

        {/* Live Data Derived Counter Bar adhering strictly to Section 9 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-10 border-t border-[#E8E2DA] text-left">
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]">
            <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#1A365D]">
              {questions.length}+
            </span>
            <span className="text-xs text-[#718096] mt-0.5 block font-sans">Previous Questions</span>
          </div>

          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]">
            <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#1A365D]">
              {exams.length}
            </span>
            <span className="text-xs text-[#718096] mt-0.5 block font-sans">AIBE Exams (IV–XXI)</span>
          </div>

          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]">
            <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#1A365D]">
              100
            </span>
            <span className="text-xs text-[#718096] mt-0.5 block font-sans">Questions / Exam</span>
          </div>

          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]">
            <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#1A365D]">
              {syllabusSubjects.length}
            </span>
            <span className="text-xs text-[#718096] mt-0.5 block font-sans">Current Subjects</span>
          </div>
        </div>
      </div>

      {/* Practice Mistakes Callout */}
      {mistakesCount > 0 && (
        <div className="bg-[#FFF5F5] rounded-xl border border-[#FEB2B2] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-serif font-bold text-[#9B2C2C]">
              Review your {mistakesCount} flagged question{mistakesCount > 1 ? 's' : ''}
            </h3>
            <p className="text-xs text-[#742A2A] mt-0.5 font-serif">
              AIBE questions reward targeted error correction. Review incorrect attempts to reinforce statutory sections before your mock.
            </p>
          </div>

          <button
            onClick={onPracticeMistakes}
            className="px-4 py-2 bg-[#C53030] hover:bg-[#9B2C2C] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-2 transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Practice Mistakes ({mistakesCount})</span>
          </button>
        </div>
      )}

      {/* 2. AIBE Exam Pattern Section (Section 10 Prominent Display) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#718096]">Official BCI Structure</div>
            <h2 className="text-2xl font-serif font-bold text-[#1A365D]">AIBE Exam Pattern</h2>
          </div>
          <span className="text-xs font-mono text-[#22543D] bg-[#F0FDF4] px-2.5 py-1 rounded-full border border-[#BBF7D0]">
            Current Standard Pattern
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#E8E2DA] shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-1">
            <span className="text-[11px] font-mono text-[#718096] uppercase block">Questions</span>
            <span className="text-2xl font-serif font-bold text-[#1A365D] block">100</span>
            <span className="text-[11px] text-[#4A5568]">1 Mark Each</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E8E2DA] shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-1">
            <span className="text-[11px] font-mono text-[#718096] uppercase block">Duration</span>
            <span className="text-2xl font-serif font-bold text-[#1A365D] block">3 Hours</span>
            <span className="text-[11px] text-[#4A5568]">180 Minutes</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E8E2DA] shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-1">
            <span className="text-[11px] font-mono text-[#718096] uppercase block">Format</span>
            <span className="text-2xl font-serif font-bold text-[#1A365D] block">MCQ</span>
            <span className="text-[11px] text-[#4A5568]">Offline / OMR</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E8E2DA] shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-1">
            <span className="text-[11px] font-mono text-[#22543D] uppercase block">Negative Mark</span>
            <span className="text-2xl font-serif font-bold text-[#22543D] block">None</span>
            <span className="text-[11px] text-[#4A5568]">Attempt All 100 Qs</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E8E2DA] shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-1">
            <span className="text-[11px] font-mono text-[#C05621] uppercase block">Qualifying</span>
            <span className="text-2xl font-serif font-bold text-[#C05621] block">45%</span>
            <span className="text-[11px] text-[#4A5568]">40% for SC/ST</span>
          </div>
        </div>
      </div>

      {/* 3. Current AIBE Syllabus Section (19 Subject Groups) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#718096]">Official 19-Subject Blueprint</div>
            <h2 className="text-2xl font-serif font-bold text-[#1A365D]">Current AIBE Syllabus & Weightage</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#E8E2DA]">
              <button
                onClick={() => setSyllabusView('card')}
                className={`p-1.5 rounded ${syllabusView === 'card' ? 'bg-[#1A365D] text-white' : 'text-[#718096]'}`}
                title="Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSyllabusView('list')}
                className={`p-1.5 rounded ${syllabusView === 'list' ? 'bg-[#1A365D] text-white' : 'text-[#718096]'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => onNavigate('strategy-priority')}
              className="text-xs font-semibold text-[#C05621] hover:underline flex items-center gap-1"
            >
              <span>View Priority Matrix</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {syllabusView === 'card' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {syllabusSubjects.map(sub => (
              <div
                key={sub.id}
                className="bg-white rounded-xl border border-[#E8E2DA] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-[#1A365D]/40 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                        sub.priority === 'Critical'
                          ? 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]'
                          : sub.priority === 'High'
                          ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                          : 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
                      }`}
                    >
                      {sub.priority}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#1A365D] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E2DA]">
                      {sub.officialWeightage} Questions
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-[#1A365D] leading-snug">
                    {sub.name}
                  </h3>
                </div>

                <div className="pt-3 border-t border-[#F0ECE6] mt-3 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-[#718096]">
                    {sub.questionCount} in Bank
                  </span>
                  <button
                    onClick={() => onNavigate('subjects')}
                    className="text-xs font-medium text-[#2B6CB0] hover:text-[#1A365D] flex items-center gap-1"
                  >
                    <span>Practice</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#E8E2DA] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#4A5568]">
                <thead className="bg-[#FAF8F5] text-[#1A365D] font-mono uppercase text-[11px] border-b border-[#E8E2DA]">
                  <tr>
                    <th className="px-4 py-3">Subject Name</th>
                    <th className="px-4 py-3 text-center">Exam Questions</th>
                    <th className="px-4 py-3 text-center">Priority</th>
                    <th className="px-4 py-3 text-center">Bank Available</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE6] font-serif">
                  {syllabusSubjects.map(sub => (
                    <tr key={sub.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="px-4 py-3 font-bold text-[#1A365D]">{sub.name}</td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-[#1A365D]">{sub.officialWeightage}</td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                            sub.priority === 'Critical'
                              ? 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]'
                              : sub.priority === 'High'
                              ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                              : 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
                          }`}
                        >
                          {sub.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-mono">{sub.questionCount}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => onNavigate('subjects')}
                          className="px-2.5 py-1 rounded bg-[#FAF8F5] text-[#1A365D] hover:bg-[#1A365D] hover:text-white border border-[#E8E2DA] font-mono text-[11px] transition-colors"
                        >
                          Practice
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[#FAF8F5] font-bold text-[#1A365D] font-mono">
                    <td className="px-4 py-3">Total Syllabus Distribution</td>
                    <td className="px-4 py-3 text-center">100</td>
                    <td className="px-4 py-3 text-center">-</td>
                    <td className="px-4 py-3 text-center">{questions.length}</td>
                    <td className="px-4 py-3 text-right">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 4. Previous AIBE Examination Candidate Statistics Table (Section 8 & 11) */}
      <div className="space-y-6">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#718096]">Official BCI Disclosures & Press Records</div>
          <h2 className="text-2xl font-serif font-bold text-[#1A365D]">Previous AIBE Examination Statistics</h2>
          <p className="text-xs text-[#4A5568] mt-1 font-serif">
            Authoritative records of candidate turnout, clearances, and pass percentages across recent AIBE examinations.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E8E2DA] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#4A5568]">
              <thead className="bg-[#FAF8F5] text-[#1A365D] font-mono uppercase text-[11px] border-b border-[#E8E2DA]">
                <tr>
                  <th className="px-4 py-3.5">Examination</th>
                  <th className="px-4 py-3.5">Exam Date</th>
                  <th className="px-4 py-3.5 text-right">Registered</th>
                  <th className="px-4 py-3.5 text-right">Appeared</th>
                  <th className="px-4 py-3.5 text-right">Cleared / Passed</th>
                  <th className="px-4 py-3.5 text-right">Pass %</th>
                  <th className="px-4 py-3.5">Verified Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0ECE6] font-mono text-xs">
                {stats.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-4 py-3.5 font-bold font-serif text-sm text-[#1A365D]">
                      {row.examName}
                    </td>
                    <td className="px-4 py-3.5 text-[#718096]">{row.examDate}</td>
                    <td className="px-4 py-3.5 text-right">
                      {typeof row.registered === 'number' ? row.registered.toLocaleString('en-IN') : row.registered}
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-[#1A365D]">
                      {typeof row.appeared === 'number' ? row.appeared.toLocaleString('en-IN') : row.appeared}
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-[#22543D]">
                      {typeof row.passed === 'number' ? row.passed.toLocaleString('en-IN') : row.passed}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      {row.passPercentage ? (
                        <span className="inline-block px-2 py-0.5 rounded font-bold bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]">
                          {row.passPercentage}%
                        </span>
                      ) : (
                        <span className="text-[#A0AEC0] italic text-[11px] font-serif">Not reported</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 font-serif text-[11px] text-[#718096]">
                      <span className="block truncate max-w-xs" title={row.sourceNote || row.source}>
                        {row.source}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-[#FAF8F5] px-4 py-3 border-t border-[#E8E2DA] text-[11px] text-[#718096] font-serif">
            * Note: AIBE is a qualifying assessment without negative marking. Pass percentages are computed against appeared candidates who scored above the 45% (Gen/OBC) or 40% (SC/ST) qualifying threshold.
          </div>
        </div>
      </div>

      {/* 5. Preparation Strategy Quick Links */}
      <div className="space-y-6">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#718096]">Strategic Study Modules</div>
          <h2 className="text-2xl font-serif font-bold text-[#1A365D]">Preparation Strategy</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => onNavigate('strategy-priority')}
            className="p-5 rounded-xl bg-white border border-[#E8E2DA] hover:border-[#C05621] shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-mono text-[#C05621] uppercase font-bold">Focus Areas</span>
              <h3 className="text-base font-serif font-bold text-[#1A365D] mt-1 group-hover:text-[#C05621] transition-colors">
                Subject Priority Matrix
              </h3>
              <p className="text-xs text-[#4A5568] mt-2 font-serif">
                Critical (66 Qs), High (26 Qs), and Medium weightage breakdown.
              </p>
            </div>
            <div className="pt-4 border-t border-[#F0ECE6] mt-4 flex items-center justify-between text-xs font-semibold text-[#C05621]">
              <span>View Priority</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('strategy-repeats')}
            className="p-5 rounded-xl bg-white border border-[#E8E2DA] hover:border-[#C05621] shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-mono text-[#2B6CB0] uppercase font-bold">Past Paper Trends</span>
              <h3 className="text-base font-serif font-bold text-[#1A365D] mt-1 group-hover:text-[#2B6CB0] transition-colors">
                What Repeats Most
              </h3>
              <p className="text-xs text-[#4A5568] mt-2 font-serif">
                Articles 14/19/21, Res Judicata, Default Bail, and landmark case laws.
              </p>
            </div>
            <div className="pt-4 border-t border-[#F0ECE6] mt-4 flex items-center justify-between text-xs font-semibold text-[#2B6CB0]">
              <span>Explore Repeats</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('strategy-plans')}
            className="p-5 rounded-xl bg-white border border-[#E8E2DA] hover:border-[#C05621] shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-mono text-[#22543D] uppercase font-bold">Study Timelines</span>
              <h3 className="text-base font-serif font-bold text-[#1A365D] mt-1 group-hover:text-[#22543D] transition-colors">
                7, 15 & 30-Day Plans
              </h3>
              <p className="text-xs text-[#4A5568] mt-2 font-serif">
                Tailored day-by-day study calendars for crash revision or mastery.
              </p>
            </div>
            <div className="pt-4 border-t border-[#F0ECE6] mt-4 flex items-center justify-between text-xs font-semibold text-[#22543D]">
              <span>Select Plan</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('mistakes')}
            className="p-5 rounded-xl bg-white border border-[#E8E2DA] hover:border-[#C05621] shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-mono text-[#9B2C2C] uppercase font-bold">Personal Weak Spots</span>
              <h3 className="text-base font-serif font-bold text-[#1A365D] mt-1 group-hover:text-[#9B2C2C] transition-colors">
                Practice My Mistakes
              </h3>
              <p className="text-xs text-[#4A5568] mt-2 font-serif">
                Automatically review questions you previously marked incorrectly.
              </p>
            </div>
            <div className="pt-4 border-t border-[#F0ECE6] mt-4 flex items-center justify-between text-xs font-semibold text-[#9B2C2C]">
              <span>{mistakesCount} Question{mistakesCount !== 1 ? 's' : ''}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
