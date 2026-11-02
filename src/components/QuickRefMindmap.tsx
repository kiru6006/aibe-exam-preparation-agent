import React, { useState } from 'react';
import { ChevronRight, ChevronDown, BookOpen, Scale, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { MindNode } from '../types';

interface QuickRefMindmapProps {
  root: MindNode;
}

const CategoryBadge: React.FC<{ category: MindNode['category'] }> = ({ category }) => {
  switch (category) {
    case 'chapter':
      return <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">Chapter</span>;
    case 'article':
      return <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">Article</span>;
    case 'rule':
      return <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">Core Rule</span>;
    case 'trap':
      return <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-200">Trap / Warning</span>;
    case 'case':
      return <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-200">Landmark Case</span>;
    case 'concept':
    default:
      return <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">Concept</span>;
  }
};

const MindmapNodeItem: React.FC<{ node: MindNode; depth: number }> = ({ node, depth }) => {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div
      id={node.id}
      className={`transition-all duration-300 rounded-lg ${depth === 0 ? 'bg-white p-4 shadow-sm border border-[#E8E2DA]' : 'mt-2 border-l-2 pl-3 border-[#E8E2DA]/80'}`}
    >
      <details
        open={isOpen}
        onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
        className="group"
      >
        <summary className="list-none flex items-start gap-2 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C05621] rounded p-1 -m-1">
          <div className="mt-0.5 text-slate-500 hover:text-slate-800 shrink-0">
            {hasChildren ? (
              isOpen ? <ChevronDown className="w-4 h-4 text-[#C05621]" /> : <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
            ) : (
              <span className="w-4 inline-block text-center text-xs text-slate-300">•</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`font-serif ${depth === 0 ? 'text-lg font-bold text-[#1A365D]' : depth === 1 ? 'text-base font-bold text-slate-900' : 'text-sm font-semibold text-slate-800'}`}>
                {node.title || node.label}
              </span>
              <CategoryBadge category={node.category} />
              {node.tag && (
                <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {node.tag}
                </span>
              )}
            </div>

            {node.description && (
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{node.description}</p>
            )}

            {node.article && (
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#1A365D] font-medium">
                <BookOpen className="w-3.5 h-3.5 text-[#C05621]" />
                <span>Ref: {node.article}</span>
              </div>
            )}

            {node.caseName && (
              <div className="flex items-center gap-1.5 mt-1 text-xs text-purple-900 font-medium">
                <Scale className="w-3.5 h-3.5 text-purple-700" />
                <span className="italic">{node.caseName}</span>
              </div>
            )}

            {node.trap && (
              <div className="flex items-start gap-1.5 mt-1.5 p-2 bg-amber-50/90 border border-amber-200/80 rounded text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-[#C05621] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#C05621]">AIBE Trap / Alert: </span>
                  {node.trap}
                </div>
              </div>
            )}
          </div>
        </summary>

        {hasChildren && (
          <div className="mt-2 space-y-2">
            {node.children!.map((child) => (
              <MindmapNodeItem key={child.id} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </details>
    </div>
  );
};

export const QuickRefMindmap: React.FC<QuickRefMindmapProps> = ({ root }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#E8E2DA]">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1A365D] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C05621]" />
            Constitutional Mind Map & Knowledge Tree
          </h3>
          <p className="text-xs text-slate-600">
            Expand nodes to navigate from major Constitutional Parts down to Articles, Doctrines, Traps, and Cases.
          </p>
        </div>
      </div>

      <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]">
        <MindmapNodeItem node={root} depth={0} />
      </div>
    </div>
  );
};
