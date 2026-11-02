import React, { useState } from 'react';
import {
  Layers,
  Scale,
  Table as TableIcon,
  GitMerge,
  Flame,
  Zap,
  HelpCircle,
  Play,
  ArrowRight,
  Filter,
  Search,
  AlertTriangle
} from 'lucide-react';
import type { QuickRefSubject, QuickRefChapter, QuickRefConceptChain, QuickRefQuestionLink, QuickRefCase, QuickRefSection } from '../types';
import { QuickRefMindmap } from './QuickRefMindmap';
import { QuickRefCaseList } from './QuickRefCaseList';
import { QuickRefSectionTable } from './QuickRefSectionTable';
import { QuickRefTop15 } from './QuickRefTop15';
import { QuickRefBridges } from './QuickRefBridges';
import { QuickInfoModal, buildCaseInfoPayload, buildSectionInfoPayload } from './QuickInfoModal';
import type { QuickInfoPayload } from './QuickInfoModal';

interface QuickReferenceMindMapProps {
  subject: QuickRefSubject;
  onBackToIndex?: () => void;
  onStartPractice?: (subjectId: string, limit?: number) => void;
  onSelectSubject?: (subjectId: string) => void;
  onStartExamQuestion?: (questionId: string) => void;
}

export type SubScreen =
  | 'chapter-map'
  | 'case-law'
  | 'section-connector'
  | 'concept-connector'
  | 'hot-points'
  | '15min-revision'
  | 'aibe-questions';

export const QuickReferenceMindMap: React.FC<QuickReferenceMindMapProps> = ({
  subject,
  onBackToIndex,
  onStartPractice,
  onSelectSubject,
}) => {
  const [activeScreen, setActiveScreen] = useState<SubScreen>('chapter-map');
  const [selectedChapter, setSelectedChapter] = useState<QuickRefChapter | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [questionSearch, setQuestionSearch] = useState<string>('');
  const [modalInfo, setModalInfo] = useState<QuickInfoPayload | null>(null);

  const chapters = subject.chapters || [];
  const conceptChains = subject.conceptChains || [];
  const questionLinks = subject.questionLinks || [];

  // Helper to open case popup by name or object
  const handleInspectCase = (c: QuickRefCase) => {
    setModalInfo(buildCaseInfoPayload(c, subject.subjectId));
  };

  const handleInspectCaseByName = (caseName: string) => {
    const clean = caseName.toLowerCase().trim();
    const found = subject.leadingCases.find(c =>
      c.name.toLowerCase().includes(clean) ||
      clean.includes(c.name.toLowerCase().split(' v.')[0]?.trim() || 'xyz')
    );
    if (found) {
      setModalInfo(buildCaseInfoPayload(found, subject.subjectId));
    } else {
      setModalInfo({
        type: 'case',
        title: caseName,
        badge: 'Legal Precedent',
        badgeColor: 'purple',
        summary: `Precedent referenced in Constitutional Law. Important landmark judgment cited in AIBE syllabus.`,
        significance: 'Key legal precedent applied in multiple choice questions concerning constitutional provisions.',
        practiceSubjectId: subject.subjectId,
        practiceKeyword: caseName
      });
    }
  };

  // Helper to open article/section popup
  const handleInspectSection = (s: QuickRefSection) => {
    setModalInfo(buildSectionInfoPayload(s, subject.subjectId));
  };

  const handleInspectArticleByRef = (refText: string) => {
    const clean = refText.toLowerCase().replace(/[^a-z0-9]/g, '');
    const found = subject.sections.find(s => {
      const art = (s.articleNumber || s.article || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return art === clean || clean.includes(art);
    });

    if (found) {
      setModalInfo(buildSectionInfoPayload(found, subject.subjectId));
    } else {
      setModalInfo({
        type: 'article',
        title: refText,
        badge: 'Constitutional Provision',
        badgeColor: 'blue',
        citationOrRef: refText,
        summary: `Constitutional provision referenced in the syllabus and knowledge tree.`,
        practiceSubjectId: subject.subjectId,
        practiceKeyword: refText
      });
    }
  };

  const filteredChapters = selectedCategory === 'all'
    ? chapters
    : chapters.filter(c => c.category === selectedCategory);

  const filteredQuestionLinks = questionLinks.filter(q =>
    q.conceptOrArticle.toLowerCase().includes(questionSearch.toLowerCase()) ||
    q.questionSnippet.toLowerCase().includes(questionSearch.toLowerCase()) ||
    q.examId.toLowerCase().includes(questionSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Header / Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          {onBackToIndex && (
            <button
              onClick={onBackToIndex}
              className="text-[#1A365D] hover:underline font-semibold flex items-center gap-1"
            >
              <span>← All Subjects</span>
            </button>
          )}
          <span className="text-slate-300">/</span>
          <span className="font-serif font-bold text-[#1A365D]">{subject.title}</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 font-medium capitalize">
            {activeScreen.replace('-', ' ')}
          </span>
        </div>

        {onStartPractice && (
          <button
            onClick={() => onStartPractice(subject.subjectId, 10)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C05621] hover:bg-[#A94A1C] text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Practice 10 Questions</span>
          </button>
        )}
      </div>

      {/* Central Visual Subject Node Banner */}
      <div className="bg-gradient-to-r from-[#1A365D] via-[#1E3A8A] to-[#0F172A] rounded-2xl p-6 text-white shadow-md border border-[#E8E2DA] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#C05621] text-white shadow-xs">
                AIBE Priority: {subject.priority}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-900/80 text-blue-200 border border-blue-700">
                Official Syllabus: {subject.weightage} Questions
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                Validated Master Reference
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight">
              {subject.title}
            </h1>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              {subject.tagline}
            </p>
          </div>

          {/* Quick Stat Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 lg:w-96 shrink-0">
            <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-center">
              <div className="text-[11px] text-slate-300">Chapters</div>
              <div className="font-serif text-xl font-bold text-amber-300 mt-0.5">
                {subject.metaStats.chaptersCount}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-center">
              <div className="text-[11px] text-slate-300">Key Articles</div>
              <div className="font-serif text-xl font-bold text-blue-300 mt-0.5">
                {subject.metaStats.articlesCount}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-center">
              <div className="text-[11px] text-slate-300">Leading Cases</div>
              <div className="font-serif text-xl font-bold text-purple-300 mt-0.5">
                {subject.metaStats.leadingCasesCount}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-center">
              <div className="text-[11px] text-slate-300">AIBE PYQs</div>
              <div className="font-serif text-xl font-bold text-emerald-300 mt-0.5">
                {subject.metaStats.aibeQuestionCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Branch Architecture Navigation Bar */}
      <div className="bg-white rounded-xl border border-[#E8E2DA] p-1.5 shadow-xs overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 min-w-max">
          <button
            onClick={() => setActiveScreen('chapter-map')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeScreen === 'chapter-map'
                ? 'bg-[#1A365D] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#D69E2E]" />
            <span>Chapter MindMap</span>
            <span className="text-[10px] opacity-75 font-mono">({chapters.length || 7})</span>
          </button>

          <button
            onClick={() => setActiveScreen('case-law')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeScreen === 'case-law'
                ? 'bg-[#1A365D] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-purple-400" />
            <span>CaseLaw MindMap</span>
            <span className="text-[10px] opacity-75 font-mono">({subject.leadingCases.length})</span>
          </button>

          <button
            onClick={() => setActiveScreen('section-connector')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeScreen === 'section-connector'
                ? 'bg-[#1A365D] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>Section Connector Table</span>
            <span className="text-[10px] opacity-75 font-mono">({subject.sections.length})</span>
          </button>

          <button
            onClick={() => setActiveScreen('concept-connector')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeScreen === 'concept-connector'
                ? 'bg-[#1A365D] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5 text-emerald-400" />
            <span>Concept Connector</span>
            <span className="text-[10px] opacity-75 font-mono">({conceptChains.length || 5})</span>
          </button>

          <button
            onClick={() => setActiveScreen('hot-points')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeScreen === 'hot-points'
                ? 'bg-[#1A365D] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Hot Points</span>
            <span className="text-[10px] opacity-75 font-mono">({subject.hotPoints.length})</span>
          </button>

          <button
            onClick={() => setActiveScreen('15min-revision')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeScreen === '15min-revision'
                ? 'bg-[#C05621] text-white shadow-xs'
                : 'text-amber-800 hover:bg-amber-50 font-bold'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>15-Minute Revision</span>
            <span className="text-[10px] bg-amber-100 text-amber-900 px-1 rounded font-mono">Top 15</span>
          </button>

          <button
            onClick={() => setActiveScreen('aibe-questions')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeScreen === 'aibe-questions'
                ? 'bg-[#1A365D] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
            <span>AIBE Question Links</span>
            <span className="text-[10px] opacity-75 font-mono">({questionLinks.length || 10})</span>
          </button>
        </div>
      </div>

      {/* Screen 1: Chapter MindMap */}
      {activeScreen === 'chapter-map' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#E8E2DA]">
            <div className="flex items-center gap-1 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#1A365D] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Chapters ({chapters.length})
              </button>
              <button
                onClick={() => setSelectedCategory('rights')}
                className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
                  selectedCategory === 'rights'
                    ? 'bg-[#1A365D] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Fundamental Rights
              </button>
              <button
                onClick={() => setSelectedCategory('judiciary')}
                className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
                  selectedCategory === 'judiciary'
                    ? 'bg-[#1A365D] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Judiciary & Writs
              </button>
              <button
                onClick={() => setSelectedCategory('emergency-amendment')}
                className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
                  selectedCategory === 'emergency-amendment'
                    ? 'bg-[#1A365D] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Emergency & Amendment
              </button>
            </div>

            <div className="text-xs text-slate-500">
              Click any chapter card to inspect concepts, traps & cases
            </div>
          </div>

          {/* Central Mindmap Visual Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChapters.map((ch) => (
              <div
                key={ch.id}
                onClick={() => setSelectedChapter(ch)}
                className={`bg-white rounded-xl border p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between ${
                  selectedChapter?.id === ch.id
                    ? 'border-[#C05621] ring-2 ring-[#C05621]/20 bg-amber-50/20'
                    : 'border-[#E8E2DA] hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#C05621] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      CH {ch.chapterNumber.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {ch.articlesOrSections}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-slate-900 text-base mt-2.5 leading-snug">
                    {ch.title}
                  </h3>

                  <ul className="mt-2.5 space-y-1">
                    {ch.keyConcepts.slice(0, 3).map((concept, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5 leading-snug">
                        <span className="text-[#C05621] mt-0.5 shrink-0">•</span>
                        <span>{concept}</span>
                      </li>
                    ))}
                    {ch.keyConcepts.length > 3 && (
                      <li className="text-[11px] text-slate-400 italic">
                        +{ch.keyConcepts.length - 3} more concepts...
                      </li>
                    )}
                  </ul>

                  {ch.examTrap && (
                    <div className="mt-3 p-2 rounded bg-amber-50/90 border border-amber-200 text-xs text-amber-900 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#C05621] shrink-0 mt-0.5" />
                      <span className="line-clamp-2 leading-tight">{ch.examTrap}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E2DA]/60 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1A365D] hover:text-[#C05621] inline-flex items-center gap-1">
                    Inspect Chapter Details
                    <ArrowRight className="w-3 h-3" />
                  </span>

                  {onStartPractice && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartPractice(subject.subjectId, 10);
                      }}
                      className="text-[#C05621] hover:underline font-semibold"
                    >
                      Practice
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Chapter Modal / Inspector Panel */}
          {selectedChapter && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
              <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#E8E2DA] max-h-[90vh] overflow-y-auto space-y-4">
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#E8E2DA]">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#C05621] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Chapter {selectedChapter.chapterNumber} • {selectedChapter.articlesOrSections}
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      {selectedChapter.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedChapter(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Critical Concepts & Rules
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {selectedChapter.keyConcepts.map((kc, idx) => (
                      <li key={idx} className="text-xs text-slate-800 bg-[#FAF8F5] p-2 rounded border border-[#E8E2DA] flex items-start gap-2">
                        <span className="text-[#C05621] font-bold">#{idx + 1}</span>
                        <span>{kc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedChapter.examTrap && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                    <div className="font-bold text-[#C05621] flex items-center gap-1.5 mb-1">
                      <AlertTriangle className="w-4 h-4" />
                      AIBE Exam Trap / Watch Out
                    </div>
                    <p className="leading-relaxed">{selectedChapter.examTrap}</p>
                  </div>
                )}

                {selectedChapter.leadingCases && selectedChapter.leadingCases.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Key Precedents (Click for Quick Info)
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedChapter.leadingCases.map((c, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleInspectCaseByName(c)}
                          className="text-xs font-serif italic text-purple-900 bg-purple-50 hover:bg-purple-100 hover:text-purple-950 border border-purple-200 px-2.5 py-1 rounded transition-colors inline-flex items-center gap-1 text-left"
                          title="Click to view case summary popup"
                        >
                          <Scale className="w-3 h-3 text-purple-600 shrink-0" />
                          <span>{c}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-blue-950">
                  <span className="font-bold text-[#1A365D]">AIBE Exam Significance: </span>
                  {selectedChapter.aibeRelevance}
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setSelectedChapter(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Close
                  </button>
                  {onStartPractice && (
                    <button
                      onClick={() => {
                        setSelectedChapter(null);
                        onStartPractice(subject.subjectId, 10);
                      }}
                      className="px-4 py-2 text-xs font-semibold bg-[#C05621] hover:bg-[#A94A1C] text-white rounded-lg shadow-xs"
                    >
                      Practice 10 Questions
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Hierarchical Tree View as Secondary Visual */}
          <div className="pt-4">
            <QuickRefMindmap
              root={subject.mindmapRoot}
              onInspectCaseName={handleInspectCaseByName}
              onInspectArticle={handleInspectArticleByRef}
            />
          </div>
        </div>
      )}

      {/* Screen 2: CaseLaw MindMap */}
      {activeScreen === 'case-law' && (
        <div className="space-y-4">
          <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4 flex items-start gap-3">
            <Scale className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
            <div className="text-xs text-purple-950">
              <span className="font-bold">Constitutional Case Law MindMap: </span>
              Authoritative Supreme Court decisions. AIBE tests bench size, landmark rulings on Article 21, and the evolution of the Basic Structure Doctrine.
            </div>
          </div>

          <QuickRefCaseList
            cases={subject.leadingCases}
            onShowOnMap={() => {
              setActiveScreen('chapter-map');
            }}
            onPracticeTopic={
              onStartPractice ? () => onStartPractice(subject.subjectId, 10) : undefined
            }
            onInspectCase={handleInspectCase}
          />
        </div>
      )}

      {/* Screen 3: Section Connector Table */}
      {activeScreen === 'section-connector' && (
        <div className="space-y-4">
          <QuickRefSectionTable
            sections={subject.sections}
            onSelectCase={() => setActiveScreen('case-law')}
            onInspectSection={handleInspectSection}
            onInspectCaseName={handleInspectCaseByName}
          />
        </div>
      )}

      {/* Screen 4: Concept Connector */}
      {activeScreen === 'concept-connector' && (
        <div className="space-y-6">
          <div className="pb-2 border-b border-[#E8E2DA]">
            <h3 className="font-serif text-lg font-bold text-[#1A365D] flex items-center gap-2">
              <GitMerge className="w-5 h-5 text-[#C05621]" />
              Constitutional Concept Chains & Step-by-Step Evolution
            </h3>
            <p className="text-xs text-slate-600">
              Understand how constitutional doctrines evolve from statutory text to landmark judicial interpretations and modern tests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conceptChains.map((chain) => (
              <div
                key={chain.id}
                className="bg-white rounded-xl border border-[#E8E2DA] p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C05621]" />
                    {chain.title}
                  </h4>

                  {/* Flow Steps */}
                  <div className="mt-4 space-y-2 relative before:absolute before:top-2 before:bottom-2 before:left-3.5 before:w-0.5 before:bg-slate-200">
                    {chain.steps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-3 relative z-10">
                        <span className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 text-[#1A365D] font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                          {sIdx + 1}
                        </span>
                        <div className="bg-[#FAF8F5] border border-[#E8E2DA] p-2.5 rounded-lg text-xs text-slate-800 leading-snug flex-1">
                          {step}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Connected Cases */}
                  {chain.cases.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Landmark Precedents in this Chain (Click for Popup):
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {chain.cases.map((cs, cIdx) => (
                          <button
                            key={cIdx}
                            type="button"
                            onClick={() => handleInspectCaseByName(cs)}
                            className="text-xs font-serif italic text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-2 py-0.5 rounded transition-colors inline-flex items-center gap-1 text-left"
                            title="Click for quick case info"
                          >
                            <Scale className="w-3 h-3 text-purple-600 shrink-0" />
                            <span>{cs}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E2DA]/60">
                  <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950">
                    <span className="font-bold text-emerald-900">Key Takeaway: </span>
                    {chain.takeaway}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cross-Subject Bridges */}
          <div className="pt-6">
            <QuickRefBridges
              bridges={subject.bridges}
              onSelectSubject={onSelectSubject}
              onInspectReference={handleInspectCaseByName}
            />
          </div>
        </div>
      )}

      {/* Screen 5: Hot Points */}
      {activeScreen === 'hot-points' && (
        <div className="space-y-4">
          <div className="pb-2 border-b border-[#E8E2DA]">
            <h3 className="font-serif text-lg font-bold text-[#1A365D] flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#C05621]" />
              AIBE Hot Points, Traps & Distinctions
            </h3>
            <p className="text-xs text-slate-600">
              Exam traps, exceptions, and subtle legal distinctions frequently targeted by AIBE question setters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subject.hotPoints.map((hp) => (
              <div
                key={hp.id}
                className="bg-white rounded-xl border border-[#E8E2DA] p-4 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                    {hp.category || hp.type || 'Key Point'}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {hp.tag}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-slate-900 text-sm mt-2">
                  {hp.title}
                </h4>

                <p className="text-xs text-slate-700 mt-2 leading-relaxed bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2DA]">
                  {hp.content || hp.point}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Screen 6: 15-Minute Revision Mode */}
      {activeScreen === '15min-revision' && (
        <div className="space-y-4">
          <QuickRefTop15
            items={subject.top15}
            onShowOnMap={() => {
              setActiveScreen('chapter-map');
            }}
            onInspectItem={(item) => {
              if (item.leadingCase) {
                handleInspectCaseByName(item.leadingCase);
              } else if (item.articleRef) {
                handleInspectArticleByRef(item.articleRef);
              } else {
                setModalInfo({
                  type: 'concept',
                  title: item.title,
                  badge: `Rank #${item.rank}`,
                  badgeColor: 'amber',
                  ruleOrHolding: item.summary,
                  significance: item.examSignificance,
                  practiceSubjectId: subject.subjectId
                });
              }
            }}
            onInspectCaseName={handleInspectCaseByName}
          />
        </div>
      )}

      {/* Screen 7: AIBE Question Links */}
      {activeScreen === 'aibe-questions' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E8E2DA]">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1A365D] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#C05621]" />
                Previous AIBE Questions Mapped to Concepts
              </h3>
              <p className="text-xs text-slate-600">
                Direct connections from official past AIBE examination papers to their tested constitutional provisions.
              </p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search mapped questions..."
                value={questionSearch}
                onChange={(e) => setQuestionSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E8E2DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C05621] w-48 sm:w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredQuestionLinks.map((ql) => (
              <div
                key={ql.id}
                className="bg-white rounded-xl border border-[#E8E2DA] p-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#1A365D] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {ql.examId} • Question #{ql.questionNumber} ({ql.year})
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Verified PYQ
                    </span>
                  </div>

                  <div className="mt-2 text-xs font-bold text-[#C05621]">
                    <button
                      type="button"
                      onClick={() => {
                        if (ql.conceptOrArticle.toLowerCase().includes('art')) {
                          handleInspectArticleByRef(ql.conceptOrArticle);
                        } else {
                          handleInspectCaseByName(ql.conceptOrArticle);
                        }
                      }}
                      className="hover:underline flex items-center gap-1 text-left"
                      title="Click for quick concept/article popup"
                    >
                      <span>Tested: {ql.conceptOrArticle}</span>
                      <span className="text-[10px] font-normal text-blue-700 underline font-sans">
                        (View Rule)
                      </span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-700 mt-2 leading-relaxed bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2DA]">
                    "{ql.questionSnippet}"
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    ID: {ql.questionId}
                  </span>

                  {onStartPractice && (
                    <button
                      onClick={() => onStartPractice(subject.subjectId, 10)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A365D] hover:text-[#C05621]"
                    >
                      <span>Practice Similar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredQuestionLinks.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-[#E8E2DA] text-slate-500 text-xs">
              No mapped AIBE questions found matching "{questionSearch}".
            </div>
          )}
        </div>
      )}

      {/* Global In-Page Quick Info Modal Popup */}
      <QuickInfoModal
        info={modalInfo}
        onClose={() => setModalInfo(null)}
        onStartPractice={onStartPractice}
        onSelectCase={handleInspectCaseByName}
        onSelectArticle={handleInspectArticleByRef}
      />
    </div>
  );
};
