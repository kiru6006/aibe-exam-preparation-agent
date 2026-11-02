import React from 'react';
import { BookOpen, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';
import { OFFICIAL_SUBJECTS } from '../data/subjects';
import { QUICK_REF } from '../data/quick-reference';

interface QuickReferenceViewProps {
  onSelectSubject: (subjectId: string) => void;
  onStartPractice?: (subjectId: string, limit?: number) => void;
}

export const QuickReferenceView: React.FC<QuickReferenceViewProps> = ({
  onSelectSubject,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#1A365D] via-[#1E3A8A] to-[#0F172A] text-white rounded-2xl p-6 sm:p-10 shadow-lg border border-[#E8E2DA] relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Visual Legal Knowledge Map & Revision System
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Legal Quick Reference
          </h1>
          <p className="text-slate-200 text-sm sm:text-base mt-3 leading-relaxed">
            A fast, concept-connected visual revision system designed for Indian law graduates preparing for the All India Bar Examination. Connect chapters, statutory sections, landmark precedents, and exam traps in one cohesive map.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>15-Minute Rapid Exam Scan Mode</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Articles, Rules & Trap Alerts</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Landmark Precedents & Holdings</span>
          </div>
        </div>
      </div>

      {/* Featured Pilot Card */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A365D] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#C05621]" />
            Active Quick Reference (Full Pilot)
          </h2>
          <span className="text-xs font-medium text-slate-500">1 Subject Fully Available</span>
        </div>

        {QUICK_REF['constitutional-law'] && (
          <div className="bg-white rounded-2xl border-2 border-[#C05621] p-6 shadow-md hover:shadow-lg transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-rose-100 text-rose-900 border border-rose-200">
                    Critical Priority
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200">
                    10 AIBE Questions
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                    Complete 7-Chapter Map
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-[#1A365D] transition-colors">
                  Constitutional Law of India
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                  Fundamental Rights (Articles 12-35), Golden Triangle (14, 19, 21), Writs (32 vs 226), Basic Structure Doctrine (Kesavananda, Minerva Mills), Emergency Powers, and Judicial Review.
                </p>

                <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-500">
                  <span>• 7 Structural Chapters</span>
                  <span>• 22 Verified Key Articles</span>
                  <span>• 12 Landmark Rulings with Holdings</span>
                  <span>• 15-Minute Revision List</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center">
                <button
                  onClick={() => onSelectSubject('constitutional-law')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1A365D] hover:bg-[#C05621] text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
                >
                  <span>Open Knowledge Map</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Official Syllabus Subjects (Queue & Roadmap) */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E2DA]">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1A365D] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#C05621]" />
              AIBE Official Subject Syllabus
            </h3>
            <p className="text-xs text-slate-600">
              The full 19 official subjects prescribed by the Bar Council of India.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {OFFICIAL_SUBJECTS.map((subj) => {
            const hasPilot = Boolean(QUICK_REF[subj.id]);

            return (
              <div
                key={subj.id}
                className={`rounded-xl border p-4 transition-all flex flex-col justify-between ${
                  hasPilot
                    ? 'bg-amber-50/40 border-amber-300 shadow-sm'
                    : 'bg-white border-[#E8E2DA] opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        subj.priority === 'Critical'
                          ? 'bg-rose-100 text-rose-900'
                          : subj.priority === 'High'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {subj.priority}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#1A365D]">
                      {subj.weightageQuestions} Qs
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-slate-900 text-sm mt-2">
                    {subj.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {subj.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  {hasPilot ? (
                    <button
                      onClick={() => onSelectSubject(subj.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#C05621] hover:text-[#9C4215]"
                    >
                      <span>Explore Pilot Reference</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">
                      Standard syllabus reference
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
