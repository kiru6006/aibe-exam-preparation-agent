import React from 'react';
import { GitMerge, ArrowRight, BookOpen } from 'lucide-react';
import type { QuickRefBridge } from '../types';

interface QuickRefBridgesProps {
  bridges: QuickRefBridge[];
  onSelectSubject?: (subjectId: string) => void;
}

export const QuickRefBridges: React.FC<QuickRefBridgesProps> = ({
  bridges,
  onSelectSubject,
}) => {
  return (
    <div className="space-y-4">
      <div className="pb-2 border-b border-[#E8E2DA]">
        <h3 className="font-serif text-lg font-bold text-[#1A365D] flex items-center gap-2">
          <GitMerge className="w-5 h-5 text-[#C05621]" />
          Cross-Subject Bridges & Synergies
        </h3>
        <p className="text-xs text-slate-600">
          Constitutional principles are not isolated — they provide the procedural and substantive limits for other key AIBE subjects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bridges.map((b) => (
          <div
            key={b.targetSubjectId}
            className="bg-white rounded-xl border border-[#E8E2DA] p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                  Target: {b.targetSubjectTitle}
                </span>
              </div>

              <h4 className="font-serif font-bold text-slate-900 text-sm mt-2">
                {b.connectionTitle}
              </h4>

              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {b.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {b.sharedArticlesOrCases.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium bg-[#FAF8F5] text-slate-700 border border-[#E8E2DA] px-2 py-0.5 rounded flex items-center gap-1"
                  >
                    <BookOpen className="w-3 h-3 text-[#C05621]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {onSelectSubject && (
              <div className="mt-4 pt-2.5 border-t border-[#E8E2DA]/60">
                <button
                  onClick={() => onSelectSubject(b.targetSubjectId)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A365D] hover:text-[#C05621] transition-colors"
                >
                  <span>Explore {b.targetSubjectTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
