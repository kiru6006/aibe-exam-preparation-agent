import React, { useState } from 'react';
import { Scale, Calendar, Users, MapPin, Play, Search } from 'lucide-react';
import type { QuickRefCase } from '../types';

interface QuickRefCaseListProps {
  cases: QuickRefCase[];
  onShowOnMap: (nodeId: string) => void;
  onPracticeTopic?: (caseName: string) => void;
  onInspectCase?: (c: QuickRefCase) => void;
}

export const QuickRefCaseList: React.FC<QuickRefCaseListProps> = ({
  cases,
  onShowOnMap,
  onPracticeTopic,
  onInspectCase,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = cases.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.citation && c.citation.toLowerCase().includes(searchTerm.toLowerCase())) ||
      c.holding.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.connectedArticles && c.connectedArticles.some((art) => art.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E8E2DA]">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1A365D] flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#C05621]" />
            Landmark Constitutional Cases
          </h3>
          <p className="text-xs text-slate-600">
            Authoritative judicial precedents frequently tested in AIBE examinations.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search cases or articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E8E2DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C05621]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCases.map((c) => (
          <div
            key={c.id}
            id={c.id}
            onClick={() => onInspectCase && onInspectCase(c)}
            className={`bg-white rounded-xl border border-[#E8E2DA] p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between ${
              onInspectCase ? 'cursor-pointer hover:border-purple-300' : ''
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="font-serif font-bold text-slate-900 text-base leading-snug hover:text-purple-900 transition-colors flex items-center gap-1.5">
                    <span>{c.name}</span>
                    <span className="text-[10px] font-mono font-normal text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                      Quick Info
                    </span>
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                    <span className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                      {c.citation}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {c.year}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                  {c.tag}
                </span>
              </div>

              {c.bench && (
                <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded border border-slate-100">
                  <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{c.bench}</span>
                </div>
              )}

              <div className="mt-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Holding / Ratio:
                </span>
                <p className="text-xs text-slate-800 mt-1 leading-relaxed bg-[#FAF8F5] p-2.5 rounded border border-[#E8E2DA]">
                  {c.holding}
                </p>
              </div>

              {c.significance && (
                <div className="mt-2 text-xs text-slate-600">
                  <span className="font-semibold text-[#1A365D]">Significance: </span>
                  {c.significance}
                </div>
              )}

              {c.connectedArticles && c.connectedArticles.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {c.connectedArticles.map((art, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium bg-blue-50 text-blue-800 border border-blue-200 px-1.5 py-0.5 rounded"
                    >
                      {art}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#E8E2DA]/60 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {c.connectedNodeId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowOnMap(c.connectedNodeId!);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#C05621] hover:text-[#9C4215] transition-colors py-1 px-2 rounded hover:bg-amber-50"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Show on Map
                  </button>
                )}
                {onInspectCase && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onInspectCase(c);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 py-1 px-2 rounded transition-colors"
                  >
                    Details
                  </button>
                )}
              </div>

              {onPracticeTopic && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPracticeTopic(c.name);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 hover:text-[#1A365D] bg-slate-100 hover:bg-slate-200 py-1 px-2.5 rounded transition-colors"
                >
                  <Play className="w-3 h-3 text-[#1A365D]" />
                  Practice Questions
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
