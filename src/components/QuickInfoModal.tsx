import React from 'react';
import {
  Scale,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  X,
  Play,
  Calendar,
  Users,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import type { QuickRefCase, QuickRefSection } from '../types';

export type QuickInfoType = 'case' | 'section' | 'article' | 'concept' | 'general';

export interface QuickInfoPayload {
  type: QuickInfoType;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: 'blue' | 'purple' | 'amber' | 'emerald' | 'rose';
  summary?: string;
  ruleOrHolding?: string;
  examTrap?: string;
  significance?: string;
  citationOrRef?: string;
  bench?: string;
  year?: number;
  tags?: string[];
  connectedArticlesOrCases?: string[];
  practiceSubjectId?: string;
  practiceKeyword?: string;
  // Structured Brief fields
  facts?: string;
  issues?: string;
  legalProvisions?: string;
  reasonsAndApplications?: string;
}

interface QuickInfoModalProps {
  info: QuickInfoPayload | null;
  onClose: () => void;
  onStartPractice?: (subjectId: string, limit?: number) => void;
  onSelectCase?: (caseName: string) => void;
  onSelectArticle?: (article: string) => void;
}

export const QuickInfoModal: React.FC<QuickInfoModalProps> = ({
  info,
  onClose,
  onStartPractice,
  onSelectCase,
  onSelectArticle,
}) => {
  if (!info) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-[#E8E2DA] max-h-[90vh] overflow-y-auto space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#E8E2DA]">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              {info.badge && (
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    info.badgeColor === 'purple'
                      ? 'bg-purple-100 text-purple-900 border border-purple-200'
                      : info.badgeColor === 'amber'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : info.badgeColor === 'emerald'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      : 'bg-blue-100 text-blue-900 border border-blue-200'
                  }`}
                >
                  {info.badge}
                </span>
              )}
              {info.citationOrRef && (
                <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                  {info.citationOrRef}
                </span>
              )}
              {info.year && (
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {info.year}
                </span>
              )}
            </div>

            <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {info.title}
            </h2>

            {info.subtitle && (
              <p className="text-xs text-slate-500 font-medium">{info.subtitle}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bench Info if case */}
        {info.bench && (
          <div className="flex items-center gap-2 text-xs text-purple-900 bg-purple-50/70 p-2.5 rounded-lg border border-purple-200">
            <Users className="w-4 h-4 text-purple-600 shrink-0" />
            <div>
              <span className="font-semibold">Bench: </span>
              {info.bench}
            </div>
          </div>
        )}

        {/* Core Holding / Rule */}
        {info.ruleOrHolding && (
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-[#C05621]" />
              <span>Core Rule / Judicial Ratio:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2DA]">
              {info.ruleOrHolding}
            </p>
          </div>
        )}

        {/* Structured Case Brief: Facts, Issues, Legal Provisions, Reasons & Applications, Summary */}
        {info.facts && (
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="font-bold text-[#1A365D] uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1">
                <span>📋 Facts of the Case</span>
              </div>
              <p className="text-slate-700 leading-relaxed">{info.facts}</p>
            </div>

            {info.issues && (
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200 text-xs">
                <div className="font-bold text-amber-900 uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1">
                  <span>⚖️ Legal Issues Before Court</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{info.issues}</p>
              </div>
            )}

            {info.legalProvisions && (
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200 text-xs">
                <div className="font-bold text-blue-900 uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1">
                  <span>📜 Legal Provisions & Articles Involved</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-mono text-[11px]">{info.legalProvisions}</p>
              </div>
            )}

            {info.reasonsAndApplications && (
              <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-200 text-xs">
                <div className="font-bold text-purple-900 uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1">
                  <span>💡 Reasons & Judicial Applications (Ratio Decidendi)</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{info.reasonsAndApplications}</p>
              </div>
            )}

            {info.summary && (
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs">
                <div className="font-bold text-emerald-900 uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1">
                  <span>🎯 Summary & Key Exam Takeaway</span>
                </div>
                <p className="text-slate-800 leading-relaxed">{info.summary}</p>
              </div>
            )}
          </div>
        )}

        {/* Regular Summary if no structured facts */}
        {!info.facts && info.summary && (
          <div className="text-xs text-slate-700 leading-relaxed">
            {info.summary}
          </div>
        )}

        {/* Exam Significance */}
        {info.significance && (
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-950 space-y-0.5">
            <div className="font-bold text-[#1A365D] flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Why AIBE Questions Target This:</span>
            </div>
            <p className="leading-relaxed">{info.significance}</p>
          </div>
        )}

        {/* Exam Trap Alert */}
        {info.examTrap && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-0.5">
            <div className="font-bold text-[#C05621] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#C05621] shrink-0" />
              <span>AIBE Examiner Trap:</span>
            </div>
            <p className="leading-relaxed">{info.examTrap}</p>
          </div>
        )}

        {/* Connected Articles or Cases */}
        {info.connectedArticlesOrCases && info.connectedArticlesOrCases.length > 0 && (
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Connected Provisions & Precedents:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {info.connectedArticlesOrCases.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (item.toLowerCase().startsWith('art') && onSelectArticle) {
                      onSelectArticle(item);
                    } else if (onSelectCase) {
                      onSelectCase(item);
                    }
                  }}
                  className="text-xs font-medium text-slate-800 bg-slate-100 hover:bg-amber-100 hover:text-[#C05621] border border-slate-200 px-2 py-0.5 rounded transition-colors inline-flex items-center gap-1"
                >
                  <BookOpen className="w-3 h-3 text-[#1A365D]" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Actions Footer */}
        <div className="pt-3 border-t border-[#E8E2DA] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>

          {onStartPractice && info.practiceSubjectId && (
            <button
              onClick={() => {
                onClose();
                onStartPractice(info.practiceSubjectId!, 10);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C05621] hover:bg-[#A94A1C] text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Practice Subject Questions</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export function buildCaseInfoPayload(c: QuickRefCase, subjectId: string): QuickInfoPayload {
  return {
    type: 'case',
    title: c.name,
    subtitle: c.citation,
    badge: 'Landmark Precedent',
    badgeColor: 'purple',
    year: c.year,
    citationOrRef: c.citation,
    bench: c.bench,
    ruleOrHolding: c.holding,
    significance: c.significance,
    examTrap: c.examFrequency ? `Exam Appearance: ${c.examFrequency}` : undefined,
    connectedArticlesOrCases: c.connectedArticles,
    practiceSubjectId: subjectId,
    practiceKeyword: c.name,
    facts: c.facts,
    issues: c.issues,
    legalProvisions: c.legalProvisions,
    reasonsAndApplications: c.reasonsAndApplications,
    summary: c.summary,
  };
}

export function buildSectionInfoPayload(s: QuickRefSection, subjectId: string): QuickInfoPayload {
  return {
    type: 'section',
    title: `${s.articleNumber || s.article || s.sectionNumber || 'Statutory Provision'}: ${s.title || s.topic || ''}`,
    subtitle: s.partOrChapter,
    badge: s.aibeFrequency === 'High' ? 'High Yield Article' : 'Statutory Reference',
    badgeColor: s.aibeFrequency === 'High' ? 'amber' : 'blue',
    citationOrRef: s.articleNumber || s.article || s.sectionNumber,
    ruleOrHolding: s.rule,
    examTrap: s.trap,
    connectedArticlesOrCases: s.leadingCase ? [s.leadingCase] : undefined,
    practiceSubjectId: subjectId,
    practiceKeyword: s.articleNumber || s.article,
  };
}

