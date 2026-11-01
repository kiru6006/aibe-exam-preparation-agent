import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  ChevronDown, 
  BookOpen, 
  CheckCircle2, 
  Lightbulb, 
  Award, 
  FileText, 
  Layers, 
  BarChart2, 
  Info,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

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
  const [practiceDropdownOpen, setPracticeDropdownOpen] = useState(false);
  const [strategyDropdownOpen, setStrategyDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    onSelectTab(tab);
    setPracticeDropdownOpen(false);
    setStrategyDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const isPracticeActive = ['papers', 'subjects', 'mock', 'mistakes'].includes(currentTab);
  const isStrategyActive = currentTab.startsWith('strategy');

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E8F0] mat-elevation-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div 
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1A365D] to-[#0F233D] flex items-center justify-center text-white shadow-md group-hover:from-[#2B6CB0] group-hover:to-[#1A365D] transition-all">
              <Scale className="w-5 h-5 text-[#D69E2E]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold tracking-tight text-[#1A365D]">
                  AIBE PREP
                </span>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#E6EDF8] text-[#1A365D] px-2 py-0.5 rounded-full border border-[#CBD5E0]">
                  Official Portal
                </span>
              </div>
              <p className="text-[11px] text-[#718096] hidden sm:block font-sans">
                All India Bar Examination Prep Platform
              </p>
            </div>
          </div>

          {activeExamTitle ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-[#FEEBC8] text-[#C05621] border border-[#FBD38D] rounded-full text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#C05621] animate-pulse" />
              <span>Exam in progress: {activeExamTitle}</span>
            </div>
          ) : (
            /* Desktop Navigation */
            <nav className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => handleTabClick('home')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  currentTab === 'home'
                    ? 'bg-[#1A365D] text-white shadow-xs'
                    : 'text-[#4A5568] hover:text-[#1A365D] hover:bg-[#F1F3F7]'
                }`}
              >
                Home
              </button>

              {/* Practice Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setPracticeDropdownOpen(!practiceDropdownOpen);
                    setStrategyDropdownOpen(false);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isPracticeActive
                      ? 'bg-[#1A365D] text-white shadow-xs'
                      : 'text-[#4A5568] hover:text-[#1A365D] hover:bg-[#F1F3F7]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Practice</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${practiceDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {practiceDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white border border-[#E2E8F0] shadow-xl py-2 z-50">
                    <button
                      onClick={() => handleTabClick('papers')}
                      className="w-full text-left px-4 py-2.5 text-xs text-[#2D3748] hover:bg-[#F1F3F7] flex items-center gap-2 font-medium"
                    >
                      <FileText className="w-4 h-4 text-[#1A365D]" />
                      <div>
                        <span className="block font-semibold">Full Exams</span>
                        <span className="text-[10px] text-[#718096]">18 Previous Papers (AIBE IV - XXI)</span>
                      </div>
                    </button>
                    <button
                      onClick={() => handleTabClick('subjects')}
                      className="w-full text-left px-4 py-2.5 text-xs text-[#2D3748] hover:bg-[#F1F3F7] flex items-center gap-2 font-medium"
                    >
                      <Layers className="w-4 h-4 text-[#2B6CB0]" />
                      <div>
                        <span className="block font-semibold">Subject Practice</span>
                        <span className="text-[10px] text-[#718096]">19 Official Syllabus Subjects</span>
                      </div>
                    </button>
                    <button
                      onClick={() => handleTabClick('mock')}
                      className="w-full text-left px-4 py-2.5 text-xs text-[#2D3748] hover:bg-[#F1F3F7] flex items-center gap-2 font-medium"
                    >
                      <Sparkles className="w-4 h-4 text-[#C05621]" />
                      <div>
                        <span className="block font-semibold">Mock Test</span>
                        <span className="text-[10px] text-[#718096]">25, 50, 100 Qs Simulation</span>
                      </div>
                    </button>
                    <div className="border-t border-[#E2E8F0] my-1" />
                    <button
                      onClick={() => handleTabClick('mistakes')}
                      className="w-full text-left px-4 py-2.5 text-xs text-[#C05621] hover:bg-[#FEEBC8]/50 flex items-center gap-2 font-semibold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C05621]" />
                      <div>
                        <span className="block">Practice My Mistakes</span>
                        <span className="text-[10px] text-[#A0AEC0]">Targeted Revision Loop</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Strategy & Tips Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setStrategyDropdownOpen(!strategyDropdownOpen);
                    setPracticeDropdownOpen(false);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isStrategyActive
                      ? 'bg-[#1A365D] text-white shadow-xs'
                      : 'text-[#4A5568] hover:text-[#1A365D] hover:bg-[#F1F3F7]'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5 text-[#D69E2E]" />
                  <span>Strategy & Tips</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${strategyDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {strategyDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 rounded-xl bg-white border border-[#E2E8F0] shadow-xl py-2 z-50">
                    <button
                      onClick={() => handleTabClick('strategy-overview')}
                      className="w-full text-left px-4 py-2 text-xs text-[#2D3748] hover:bg-[#F1F3F7] font-semibold"
                    >
                      How to Prepare
                    </button>
                    <button
                      onClick={() => handleTabClick('strategy-priority')}
                      className="w-full text-left px-4 py-2 text-xs text-[#2D3748] hover:bg-[#F1F3F7] font-medium"
                    >
                      Subject Priority (Critical / High / Med)
                    </button>
                    <button
                      onClick={() => handleTabClick('strategy-repeats')}
                      className="w-full text-left px-4 py-2 text-xs text-[#2D3748] hover:bg-[#F1F3F7] font-medium"
                    >
                      What Repeats (Provisions & Patterns)
                    </button>
                    <button
                      onClick={() => handleTabClick('strategy-question-types')}
                      className="w-full text-left px-4 py-2 text-xs text-[#2D3748] hover:bg-[#F1F3F7] font-medium"
                    >
                      Question-Type Strategy
                    </button>
                    <button
                      onClick={() => handleTabClick('strategy-plans')}
                      className="w-full text-left px-4 py-2 text-xs text-[#2D3748] hover:bg-[#F1F3F7] font-medium"
                    >
                      Preparation Plans (7 / 15 / 30 Days)
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleTabClick('performance')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  currentTab === 'performance'
                    ? 'bg-[#1A365D] text-white shadow-xs'
                    : 'text-[#4A5568] hover:text-[#1A365D] hover:bg-[#F1F3F7]'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>My Performance</span>
              </button>

              <button
                onClick={() => handleTabClick('about')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  currentTab === 'about'
                    ? 'bg-[#1A365D] text-white shadow-xs'
                    : 'text-[#4A5568] hover:text-[#1A365D] hover:bg-[#F1F3F7]'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>About AIBE</span>
              </button>

              <button
                onClick={() => handleTabClick('search')}
                className={`p-2 rounded-lg text-xs transition-colors ml-1 ${
                  currentTab === 'search'
                    ? 'bg-[#1A365D] text-white'
                    : 'text-[#4A5568] hover:text-[#1A365D] hover:bg-[#F1F3F7]'
                }`}
                title="Search 1,800 Questions"
                aria-label="Search Question Bank"
              >
                <Search className="w-4 h-4" />
              </button>
            </nav>
          )}

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleTabClick('search')}
              className="p-2 text-[#4A5568] hover:bg-[#F1F3F7] rounded-lg"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1A365D] hover:bg-[#F1F3F7] rounded-lg"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2E8F0] bg-white px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => handleTabClick('home')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
              currentTab === 'home' ? 'bg-[#1A365D] text-white' : 'text-[#2D3748]'
            }`}
          >
            Home
          </button>
          
          <div className="pt-2 pb-1 text-[11px] font-mono uppercase tracking-wider text-[#718096] px-3">
            Practice
          </div>
          <button
            onClick={() => handleTabClick('papers')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'papers' ? 'bg-[#1A365D] text-white' : 'text-[#2D3748]'
            }`}
          >
            Full Exams (18 Papers)
          </button>
          <button
            onClick={() => handleTabClick('subjects')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'subjects' ? 'bg-[#1A365D] text-white' : 'text-[#2D3748]'
            }`}
          >
            Subject Practice (19 Subjects)
          </button>
          <button
            onClick={() => handleTabClick('mock')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'mock' ? 'bg-[#1A365D] text-white' : 'text-[#2D3748]'
            }`}
          >
            Mock Test Simulation
          </button>
          <button
            onClick={() => handleTabClick('mistakes')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#C05621] ${
              currentTab === 'mistakes' ? 'bg-[#FEEBC8]' : ''
            }`}
          >
            Practice My Mistakes
          </button>

          <div className="pt-3 pb-1 text-[11px] font-mono uppercase tracking-wider text-[#718096] px-3">
            Strategy & Tips
          </div>
          <button
            onClick={() => handleTabClick('strategy-overview')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab.startsWith('strategy') ? 'bg-[#1A365D] text-white' : 'text-[#2D3748]'
            }`}
          >
            Strategy & Preparation Plans
          </button>

          <button
            onClick={() => handleTabClick('performance')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'performance' ? 'bg-[#1A365D] text-white' : 'text-[#2D3748]'
            }`}
          >
            My Performance
          </button>
          <button
            onClick={() => handleTabClick('about')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'about' ? 'bg-[#1A365D] text-white' : 'text-[#2D3748]'
            }`}
          >
            About AIBE
          </button>
        </div>
      )}
    </header>
  );
};
