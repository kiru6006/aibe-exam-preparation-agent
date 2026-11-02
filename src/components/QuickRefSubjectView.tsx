import React, { useState } from 'react';
import {
  BookOpen,
  Scale,
  Zap,
  Flame,
  GitMerge,
  Play,
  Layers,
  FileText,
  ArrowLeft,
} from 'lucide-react';
import type { QuickRefSubject } from '../types';
import { QuickRefMindmap } from './QuickRefMindmap';
import { QuickRefCaseList } from './QuickRefCaseList';
import { QuickRefSectionTable } from './QuickRefSectionTable';
import { QuickRefTop15 } from './QuickRefTop15';
import { QuickRefBridges } from './QuickRefBridges';

interface QuickRefSubjectViewProps {
  subject: QuickRefSubject;
  onBackToIndex?: () => void;
  onStartPractice?: (subjectId: string, limit?: number) => void;
  onSelectSubject?: (subjectId: string) => void;
}

type TabKey = 'mindmap' | 'top15' | 'sections' | 'cases' | 'hotpoints' | 'bridges';

export const QuickRefSubjectView: React.FC<QuickRefSubjectViewProps> = ({
  subject,
  onBackToIndex,
  onStartPractice,
  onSelectSubject,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('mindmap');

  const scrollToNode = (nodeId: string) => {
    setActiveTab('mindmap');
    setTimeout(() => {
      const el = document.getElementById(nodeId);
      if (el) {
        // Expand any parent details tags
        let parent = el.parentElement;
        while (parent) {
          if (parent.tagName.toLowerCase() === 'details') {
            (parent as HTMLDetailsElement).open = true;
          }
          parent = parent.parentElement;
        }

        // If the element itself is or contains a details tag, open it
        if (el.tagName.toLowerCase() === 'details') {
          (el as HTMLDetailsElement).open = true;
        }
        const innerDetails = el.querySelector('details');
        if (innerDetails) {
          innerDetails.open = true;
        }

        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-[#C05621]', 'bg-[#FFFBEB]');
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-[#C05621]', 'bg-[#FFFBEB]');
        }, 2200);
      }
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Back button and breadcrumb */}
      {onBackToIndex && (
        <button
          onClick={onBackToIndex}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#1A365D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Quick References</span>
        </button>
      )}

      {/* Subject Header */}
      <div className="bg-gradient-to-br from-[#1A365D] to-[#0E2038] text-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E8E2DA]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold tracking-wider uppercase bg-[#C05621] text-white px-2.5 py-0.5 rounded">
                Priority: {subject.priority}
              </span>
              <span className="text-[11px] font-bold tracking-wider uppercase bg-blue-900/80 text-blue-200 border border-blue-700 px-2.5 py-0.5 rounded">
                {subject.weightage} AIBE Questions
              </span>
              <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-800 px-2 py-0.5 rounded">
                Validated Reference System
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
              {subject.title}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
              {subject.tagline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            {onStartPractice && (
              <button
                onClick={() => onStartPractice(subject.subjectId, 10)}
                className="inline-flex items-center justify-center gap-2 bg-[#C05621] hover:bg-[#A94A1C] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                Practice 10 Questions
              </button>
            )}
          </div>
        </div>

        {/* Small Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-xs text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Chapters</span>
            </div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              {subject.metaStats.chaptersCount}
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-xs text-slate-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Key Articles</span>
            </div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              {subject.metaStats.articlesCount}
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-xs text-slate-300 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-purple-400" />
              <span>Leading Precedents</span>
            </div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              {subject.metaStats.leadingCasesCount}
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-xs text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>AIBE PYQs Available</span>
            </div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              {subject.metaStats.aibeQuestionCount}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#E8E2DA] pb-1 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('mindmap')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap ${
            activeTab === 'mindmap'
              ? 'border-b-2 border-[#C05621] text-[#1A365D] bg-[#FAF8F5]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#C05621]" />
          Mind Map Tree
        </button>

        <button
          onClick={() => setActiveTab('top15')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap ${
            activeTab === 'top15'
              ? 'border-b-2 border-[#C05621] text-[#1A365D] bg-[#FAF8F5]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          15-Minute Revision ({subject.top15.length})
        </button>

        <button
          onClick={() => setActiveTab('sections')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap ${
            activeTab === 'sections'
              ? 'border-b-2 border-[#C05621] text-[#1A365D] bg-[#FAF8F5]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          Articles & Rules ({subject.sections.length})
        </button>

        <button
          onClick={() => setActiveTab('cases')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap ${
            activeTab === 'cases'
              ? 'border-b-2 border-[#C05621] text-[#1A365D] bg-[#FAF8F5]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-purple-600" />
          Leading Cases ({subject.leadingCases.length})
        </button>

        <button
          onClick={() => setActiveTab('hotpoints')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap ${
            activeTab === 'hotpoints'
              ? 'border-b-2 border-[#C05621] text-[#1A365D] bg-[#FAF8F5]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-rose-500" />
          AIBE Hot Points ({subject.hotPoints.length})
        </button>

        <button
          onClick={() => setActiveTab('bridges')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap ${
            activeTab === 'bridges'
              ? 'border-b-2 border-[#C05621] text-[#1A365D] bg-[#FAF8F5]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GitMerge className="w-3.5 h-3.5 text-emerald-600" />
          Cross-Subject Bridges ({subject.bridges.length})
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'mindmap' && (
          <QuickRefMindmap root={subject.mindmapRoot} />
        )}

        {activeTab === 'top15' && (
          <QuickRefTop15
            items={subject.top15}
            onShowOnMap={scrollToNode}
          />
        )}

        {activeTab === 'sections' && (
          <QuickRefSectionTable
            sections={subject.sections}
            onSelectCase={() => setActiveTab('cases')}
          />
        )}

        {activeTab === 'cases' && (
          <QuickRefCaseList
            cases={subject.leadingCases}
            onShowOnMap={scrollToNode}
            onPracticeTopic={
              onStartPractice
                ? () => onStartPractice(subject.subjectId, 10)
                : undefined
            }
          />
        )}

        {activeTab === 'hotpoints' && (
          <div className="space-y-4">
            <div className="pb-2 border-b border-[#E8E2DA]">
              <h3 className="font-serif text-lg font-bold text-[#1A365D] flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#C05621]" />
                AIBE Hot Points, Traps & Distinctions
              </h3>
              <p className="text-xs text-slate-600">
                Key constitutional distinctions and nuances that examiners frequently exploit in multiple-choice questions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subject.hotPoints.map((hp) => (
                <div
                  key={hp.id}
                  className="bg-white rounded-xl border border-[#E8E2DA] p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                      {hp.category}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {hp.tag}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-slate-900 text-sm mt-2">
                    {hp.title}
                  </h4>

                  <p className="text-xs text-slate-700 mt-2 leading-relaxed bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2DA]">
                    {hp.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bridges' && (
          <QuickRefBridges
            bridges={subject.bridges}
            onSelectSubject={onSelectSubject}
          />
        )}
      </div>

      {/* Practice CTA Footer */}
      {onStartPractice && (
        <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-[#FAF8F5] border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#1A365D] text-white rounded-xl shadow-sm">
              <Play className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-slate-900 text-base">
                Ready to Test Your Constitutional Law Mastery?
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Practice 10 high-probability Constitutional Law questions selected from official past AIBE examinations.
              </p>
            </div>
          </div>

          <button
            onClick={() => onStartPractice(subject.subjectId, 10)}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#C05621] hover:bg-[#A94A1C] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all text-center whitespace-nowrap"
          >
            Start Practice Session →
          </button>
        </div>
      )}
    </div>
  );
};
