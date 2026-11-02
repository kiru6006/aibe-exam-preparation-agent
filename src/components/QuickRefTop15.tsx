import React from 'react';
import { Zap, ArrowRight, BookOpen, Scale, AlertCircle } from 'lucide-react';
import type { QuickRefTop15Item } from '../types';

interface QuickRefTop15Props {
  items: QuickRefTop15Item[];
  onShowOnMap: (nodeId: string) => void;
  onSelectConcept?: (conceptId: string) => void;
}

export const QuickRefTop15: React.FC<QuickRefTop15Props> = ({
  items,
  onShowOnMap,
}) => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl flex items-start gap-3">
        <div className="p-2 bg-[#C05621] text-white rounded-lg shrink-0 mt-0.5 shadow-sm">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-amber-950 text-base">
            15-Minute High-Yield Constitutional Scan
          </h3>
          <p className="text-xs text-amber-900 mt-1 leading-relaxed">
            If you only have 15 minutes before the exam, master these 15 essential doctrines, articles, and landmark rulings. Each item links directly to its position on the concept knowledge tree.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-[#E8E2DA] p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-xs font-bold text-[#C05621] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  #{item.rank.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {item.tag}
                </span>
              </div>

              <h4 className="font-serif font-bold text-slate-900 text-sm mt-2 leading-snug">
                {item.title}
              </h4>

              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {item.summary}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1 text-xs">
                {item.articleRef && (
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <BookOpen className="w-3 h-3 text-[#1A365D] shrink-0" />
                    <span className="font-medium">{item.articleRef}</span>
                  </div>
                )}
                {item.leadingCase && (
                  <div className="flex items-center gap-1.5 text-purple-900">
                    <Scale className="w-3 h-3 text-purple-600 shrink-0" />
                    <span className="italic truncate">{item.leadingCase}</span>
                  </div>
                )}
                {item.examSignificance && (
                  <div className="flex items-start gap-1.5 text-amber-900 mt-1 bg-amber-50/60 p-1.5 rounded">
                    <AlertCircle className="w-3 h-3 text-[#C05621] shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-snug">{item.examSignificance}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-[#E8E2DA]/60">
              <button
                onClick={() => onShowOnMap(item.nodeId)}
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#1A365D] hover:text-[#C05621] py-1 rounded bg-[#FAF8F5] hover:bg-amber-50 border border-[#E8E2DA] transition-colors"
              >
                <span>Show on Mind Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
