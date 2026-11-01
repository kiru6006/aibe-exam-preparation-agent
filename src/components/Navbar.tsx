import React from 'react';
import { Scale, Search } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  activeExamTitle?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  activeExamTitle
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#2A2825] flex items-center justify-center text-[#FAF8F5] shadow-xs group-hover:bg-[#CC785C] transition-colors">
              <Scale className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-medium tracking-tight text-[#191919]">
                  AIBE Prep
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider bg-[#F4EFEA] text-[#7A5B43] px-2 py-0.5 rounded border border-[#E8E2DA]">
                  Free Public Study
                </span>
              </div>
              <p className="text-[11px] text-[#78716C] hidden sm:block font-sans">
                Bar Council of India Previous Papers
              </p>
            </div>
          </div>

          {activeExamTitle ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-[#FBF4F0] text-[#B66347] border border-[#F0D5C9] rounded-full text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#CC785C] animate-pulse" />
              <span>Exam in progress: {activeExamTitle}</span>
            </div>
          ) : (
            <nav className="flex items-center gap-1 sm:gap-1.5">
              <button
                onClick={() => onSelectTab('home')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  currentTab === 'home'
                    ? 'bg-[#2A2825] text-[#FAF8F5] font-semibold'
                    : 'text-[#5C5852] hover:text-[#191919] hover:bg-[#F4EFEA]'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => onSelectTab('papers')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  currentTab === 'papers'
                    ? 'bg-[#2A2825] text-[#FAF8F5] font-semibold'
                    : 'text-[#5C5852] hover:text-[#191919] hover:bg-[#F4EFEA]'
                }`}
              >
                Previous Papers
              </button>

              <button
                onClick={() => onSelectTab('subjects')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  currentTab === 'subjects'
                    ? 'bg-[#2A2825] text-[#FAF8F5] font-semibold'
                    : 'text-[#5C5852] hover:text-[#191919] hover:bg-[#F4EFEA]'
                }`}
              >
                Subjects
              </button>

              <button
                onClick={() => onSelectTab('mock')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  currentTab === 'mock'
                    ? 'bg-[#2A2825] text-[#FAF8F5] font-semibold'
                    : 'text-[#5C5852] hover:text-[#191919] hover:bg-[#F4EFEA]'
                }`}
              >
                Mock Test
              </button>

              <button
                onClick={() => onSelectTab('performance')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  currentTab === 'performance'
                    ? 'bg-[#2A2825] text-[#FAF8F5] font-semibold'
                    : 'text-[#5C5852] hover:text-[#191919] hover:bg-[#F4EFEA]'
                }`}
              >
                My Performance
              </button>

              <button
                onClick={() => onSelectTab('search')}
                className={`p-2 rounded-lg text-xs transition-colors ${
                  currentTab === 'search'
                    ? 'bg-[#2A2825] text-[#FAF8F5]'
                    : 'text-[#5C5852] hover:text-[#191919] hover:bg-[#F4EFEA]'
                }`}
                title="Search Question Bank"
                aria-label="Search Question Bank"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
