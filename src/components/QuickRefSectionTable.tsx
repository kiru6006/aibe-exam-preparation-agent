import React, { useState } from 'react';
import { BookOpen, AlertTriangle, Scale, Search, Printer, Flame } from 'lucide-react';
import type { QuickRefSection } from '../types';

interface QuickRefSectionTableProps {
  sections: QuickRefSection[];
  onSelectCase?: (caseId: string) => void;
  onInspectSection?: (s: QuickRefSection) => void;
  onInspectCaseName?: (caseName: string) => void;
}

export const QuickRefSectionTable: React.FC<QuickRefSectionTableProps> = ({
  sections,
  onSelectCase,
  onInspectSection,
  onInspectCaseName,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [showHighOnly, setShowHighOnly] = useState(false);

  const filtered = sections.filter((s) => {
    const artNum = s.articleNumber || s.article || '';
    const secTitle = s.title || s.topic || '';
    const matchesQuery =
      artNum.toLowerCase().includes(filterQuery.toLowerCase()) ||
      secTitle.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.rule.toLowerCase().includes(filterQuery.toLowerCase()) ||
      (s.trap && s.trap.toLowerCase().includes(filterQuery.toLowerCase())) ||
      (s.leadingCase && s.leadingCase.toLowerCase().includes(filterQuery.toLowerCase()));

    if (showHighOnly) {
      return matchesQuery && s.aibeFrequency === 'High';
    }
    return matchesQuery;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E8E2DA]">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1A365D] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#C05621]" />
            Articles & Statutory Rules Connector
          </h3>
          <p className="text-xs text-slate-600">
            Key Articles with core rules, examination traps, and connected landmark precedents.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter article, rule, trap..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E8E2DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C05621] w-48 sm:w-60"
            />
          </div>

          <button
            onClick={() => setShowHighOnly(!showHighOnly)}
            className={`inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors ${
              showHighOnly
                ? 'bg-rose-50 text-rose-800 border-rose-300'
                : 'bg-white text-slate-600 border-[#E8E2DA] hover:bg-slate-50'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#C05621]" />
            High Frequency Only
          </button>

          <button
            onClick={() => window.print()}
            title="Print Section Table"
            className="hidden sm:inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-[#E8E2DA] bg-white text-slate-700 hover:bg-slate-50"
          >
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#E8E2DA] bg-white shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#FAF8F5] text-slate-700 border-b border-[#E8E2DA] font-serif">
              <th className="py-3 px-3 w-28 font-bold">Article</th>
              <th className="py-3 px-3 w-44 font-bold">Concept & Chapter</th>
              <th className="py-3 px-4 font-bold">Core Legal Rule</th>
              <th className="py-3 px-4 w-64 font-bold text-[#C05621]">AIBE Traps & Alerts</th>
              <th className="py-3 px-3 w-48 font-bold">Leading Precedent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E2DA]">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-3 align-top font-bold text-[#1A365D]">
                  <button
                    onClick={() => onInspectSection && onInspectSection(s)}
                    className="font-mono text-xs bg-blue-50 hover:bg-blue-100 text-blue-900 px-2 py-1 rounded inline-block border border-blue-200 transition-colors text-left"
                    title="Click for quick article info"
                  >
                    {s.articleNumber || s.article || s.sectionNumber || 'Ref'}
                  </button>
                  {s.aibeFrequency === 'High' && (
                    <span className="block mt-1 text-[10px] text-rose-700 font-semibold uppercase tracking-wider">
                      ★ High Yield
                    </span>
                  )}
                </td>
                <td className="py-3 px-3 align-top">
                  <button
                    onClick={() => onInspectSection && onInspectSection(s)}
                    className="font-semibold text-slate-900 hover:text-[#C05621] text-left transition-colors"
                  >
                    {s.title || s.topic}
                  </button>
                  {s.partOrChapter && (
                    <div className="text-[10px] text-slate-500 mt-0.5">{s.partOrChapter}</div>
                  )}
                </td>
                <td className="py-3 px-4 align-top text-slate-700 leading-relaxed">
                  {s.rule}
                </td>
                <td className="py-3 px-4 align-top bg-amber-50/40 text-amber-950 leading-relaxed border-l border-r border-amber-100">
                  {s.trap ? (
                    <div className="flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#C05621] shrink-0 mt-0.5" />
                      <span>{s.trap}</span>
                    </div>
                  ) : (
                    <span className="text-slate-400 italic">None noted</span>
                  )}
                </td>
                <td className="py-3 px-3 align-top">
                  {s.leadingCase ? (
                    <div>
                      <button
                        onClick={() => {
                          if (onInspectCaseName) {
                            onInspectCaseName(s.leadingCase!);
                          } else if (s.connectedCaseIds && s.connectedCaseIds.length > 0 && onSelectCase) {
                            onSelectCase(s.connectedCaseIds[0]);
                          }
                        }}
                        className="font-serif italic font-medium text-purple-900 hover:text-purple-700 flex items-center gap-1 text-left transition-colors"
                        title="Click to view case summary popup"
                      >
                        <Scale className="w-3 h-3 text-purple-600 shrink-0" />
                        <span>{s.leadingCase}</span>
                      </button>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => onInspectSection && onInspectSection(s)}
                          className="text-[10px] text-blue-700 hover:underline font-semibold"
                        >
                          Quick Article Info
                        </button>
                        {s.connectedCaseIds && s.connectedCaseIds.length > 0 && onSelectCase && (
                          <button
                            onClick={() => onSelectCase(s.connectedCaseIds![0])}
                            className="text-[10px] text-[#C05621] hover:underline font-semibold"
                          >
                            Case Card →
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <span className="text-slate-400 italic">Statutory</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
