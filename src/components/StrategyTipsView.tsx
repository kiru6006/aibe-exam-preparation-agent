import React, { useState } from 'react';
import type { StrategyItem, SyllabusItem } from '../types';
import { OFFICIAL_SUBJECTS } from '../data/subjects';
import { 
  Compass, 
  Target, 
  Repeat, 
  HelpCircle, 
  Calendar, 
  RotateCcw, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  Check,
  Filter
} from 'lucide-react';

interface StrategyTipsViewProps {
  initialTab?: string;
  onPracticeSubject?: (subjectId: string) => void;
  onPracticeMistakes?: () => void;
  onStartMock?: (count: 25 | 50 | 100) => void;
  mistakesCount?: number;
}

const STRATEGIES_DATA: StrategyItem[] = [
  {
    id: "S01",
    title: "Study by subject, not only by year",
    priority: "Critical",
    why: "Year-wise papers show what was asked. Subject-wise analysis shows where repeated testing and weightage concentrate.",
    action: [
      "Build subject-wise practice sets from the common question bank.",
      "After every mock, move wrong answers into the relevant subject/topic queue.",
      "Use full previous papers only after targeted subject practice."
    ]
  },
  {
    id: "S02",
    title: "Link provisions while solving",
    priority: "High",
    why: "Connecting the tested provision with related statutory sections and concepts builds rapid recall for Bare Act lookups.",
    action: [
      "When a question tests one section, note two or three closely related provisions.",
      "Group similar doctrines, exceptions and procedural rules.",
      "Turn each wrong answer into a small linked-law note."
    ]
  },
  {
    id: "S03",
    title: "Use weightage to allocate time",
    priority: "Critical",
    why: "Top 7 critical subjects account for 66 out of 100 questions. Mastering these guarantees comfortably clearing the 45% qualifying threshold.",
    action: [
      "Prioritize high-frequency subjects first (Constitutional Law, CrPC, CPC, Evidence, IPC, Family Law, Contracts).",
      "Give smaller subjects shorter but repeated revision cycles.",
      "Do not completely ignore low-weight subjects because they provide easy direct section marks."
    ]
  },
  {
    id: "S04",
    title: "Separate learning from testing",
    priority: "High",
    why: "Solving papers alone without reading bare acts can hide deep conceptual gaps.",
    action: [
      "Learn or scan a topic's bare act chapters first.",
      "Do 20-30 topic MCQs without looking at answer keys.",
      "Review every wrong and guessed answer thoroughly.",
      "Attempt timed mixed sets only after individual topics are stable."
    ]
  },
  {
    id: "S05",
    title: "Recent-law revision (BNS, BNSS, BSA)",
    priority: "Critical",
    why: "Recent AIBE examinations test newly applicable criminal major laws alongside historic IPC, CrPC, and IEA provisions.",
    action: [
      "Give dedicated revision time to newly applicable legislation (BNS, BNSS, BSA).",
      "Compare old and new key provisions (e.g. definitions, bail, arrest, confessions).",
      "Practice questions that test transition, section re-numbering, and procedural adjustments."
    ]
  },
  {
    id: "S06",
    title: "Use the 3-hour mock deliberately",
    priority: "High",
    why: "The exam format is 100 questions, 1 mark each, no negative marking, and 3 hours (180 minutes). Time management is rarely an issue if pacing is deliberate.",
    action: [
      "Run full 100-question mocks under strict 180-minute conditions.",
      "Use a two-pass strategy: pass 1 for direct questions you know instantly (target 40-50 mins).",
      "Pass 2 for Bare Act lookups and problem scenarios.",
      "Reserve a final 15-minute review window so no bubble is left blank."
    ]
  },
  {
    id: "S07",
    title: "Exploit no-negative-marking",
    priority: "High",
    why: "AIBE does not penalize incorrect attempts. Every blank answer is a forfeited mark.",
    action: [
      "Never leave a question unanswered in the final submission.",
      "First eliminate clearly wrong options to increase probability from 25% to 50%.",
      "If completely uncertain, choose your best intuition before time expires."
    ]
  },
  {
    id: "S08",
    title: "Build a mistake-driven revision loop",
    priority: "Critical",
    why: "Your personal weak spots are the highest-ROI area to review before exam day.",
    action: [
      "Store wrong and skipped questions automatically.",
      "Use 'Practice My Mistakes' after every practice session.",
      "Repeat until the tested concept and section are answered correctly 2 times consecutively."
    ]
  },
  {
    id: "S09",
    title: "Use question-type patterns",
    priority: "Medium",
    why: "AIBE papers feature direct statutory questions, assertion-reason, match-the-following, and scenario-based questions.",
    action: [
      "Practice each question type deliberately.",
      "For assertion-reason questions, judge Assertion and Reason independently as True/False first.",
      "For match-the-following, identify the most unique pair to eliminate 2-3 options instantly."
    ]
  },
  {
    id: "S10",
    title: "Final-week execution",
    priority: "Critical",
    why: "During the final 7 days, broad textbook reading yields diminishing returns compared to targeted revision.",
    action: [
      "Stop learning new obscure topics.",
      "Revise Bare Act indexes (table of contents) for rapid lookup speed.",
      "Rerun mistake queues and high-frequency constitutional amendments and landmark cases.",
      "Complete at least one full mock under official morning timing."
    ]
  }
];

export const StrategyTipsView: React.FC<StrategyTipsViewProps> = ({
  initialTab = 'how-to-prepare',
  onPracticeSubject,
  onPracticeMistakes,
  onStartMock,
  mistakesCount = 0
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'Critical' | 'High' | 'Medium'>('All');

  // Filter subjects by priority
  const filteredSubjects = OFFICIAL_SUBJECTS.filter(s => {
    if (s.id === 'general-law') return false;
    if (priorityFilter === 'All') return true;
    return s.priority === priorityFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-[#E8E2DA] p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0ECE6]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1A365D]/5 text-[#1A365D] text-[11px] font-mono font-medium mb-2 border border-[#1A365D]/10">
              <Compass className="w-3.5 h-3.5 text-[#C05621]" />
              <span>AIBE Preparation Master Blueprint</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A365D]">
              Strategy, Tips & Preparation Plans
            </h1>
            <p className="text-sm text-[#4A5568] mt-1 font-serif max-w-2xl">
              Proven tactical advice derived from analysis of AIBE IV through XXI. Prioritize high-weightage subjects, master Bare Act navigation, and execute a mistake-driven revision loop.
            </p>
          </div>

          {mistakesCount > 0 && onPracticeMistakes && (
            <button
              onClick={onPracticeMistakes}
              className="px-4 py-2.5 bg-[#C05621] hover:bg-[#9C4221] text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-2 transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Practice My Mistakes ({mistakesCount})</span>
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-4 overflow-x-auto no-scrollbar text-xs font-medium">
          {[
            { id: 'how-to-prepare', label: 'How to Prepare', icon: Compass },
            { id: 'subject-priority', label: 'Subject Priority', icon: Target },
            { id: 'what-repeats', label: 'What Repeats', icon: Repeat },
            { id: 'question-types', label: 'Question-Type Strategy', icon: HelpCircle },
            { id: 'exam-day', label: 'Exam-Day Strategy', icon: ShieldCheck },
            { id: 'plans', label: 'Preparation Plans (7/15/30 Days)', icon: Calendar }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1A365D] text-white shadow-xs font-semibold'
                    : 'text-[#4A5568] hover:text-[#1A365D] hover:bg-[#F4EFEA] border border-transparent hover:border-[#E8E2DA]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D69E2E]' : 'text-[#718096]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: HOW TO PREPARE */}
      {activeTab === 'how-to-prepare' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {STRATEGIES_DATA.map(st => (
              <div
                key={st.id}
                className="bg-white rounded-xl border border-[#E8E2DA] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-[#1A365D]/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[11px] font-bold text-[#718096] bg-[#F4EFEA] px-2 py-0.5 rounded">
                      {st.id}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                        st.priority === 'Critical'
                          ? 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]'
                          : st.priority === 'High'
                          ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                          : 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
                      }`}
                    >
                      {st.priority} Priority
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-[#1A365D] leading-snug mb-2">
                    {st.title}
                  </h3>

                  <p className="text-xs text-[#4A5568] font-serif leading-relaxed mb-4">
                    {st.why}
                  </p>

                  <div className="space-y-2 border-t border-[#F0ECE6] pt-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#718096] block">
                      Recommended Actions:
                    </span>
                    <ul className="space-y-1.5">
                      {st.action.map((act, idx) => (
                        <li key={idx} className="text-xs text-[#2D3748] flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#22543D] shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SUBJECT PRIORITY */}
      {activeTab === 'subject-priority' && (
        <div className="space-y-6">
          <div className="bg-[#FAF8F5] border border-[#E8E2DA] p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-serif font-bold text-[#1A365D]">
                AIBE 19-Subject Weightage Matrix
              </h3>
              <p className="text-xs text-[#4A5568] mt-0.5">
                The Bar Council of India specifies 19 subject areas totaling 100 questions. Filter by priority to streamline your study schedule.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-[#E8E2DA] shrink-0 text-xs font-medium">
              {(['All', 'Critical', 'High', 'Medium'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    priorityFilter === p
                      ? 'bg-[#1A365D] text-white shadow-xs font-semibold'
                      : 'text-[#4A5568] hover:bg-[#F4EFEA]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubjects.map(sub => (
              <div
                key={sub.id}
                className="bg-white rounded-xl border border-[#E8E2DA] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-[#2B6CB0] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                        sub.priority === 'Critical'
                          ? 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]'
                          : sub.priority === 'High'
                          ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                          : 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
                      }`}
                    >
                      {sub.priority} Priority
                    </span>
                    <span className="font-mono text-xs font-bold text-[#1A365D] bg-[#1A365D]/5 px-2 py-0.5 rounded">
                      {sub.officialWeightage} Questions
                    </span>
                  </div>

                  <h4 className="text-base font-serif font-bold text-[#1A365D] group-hover:text-[#2B6CB0] transition-colors leading-snug">
                    {sub.name}
                  </h4>

                  <p className="text-xs text-[#718096] mt-2 line-clamp-2">
                    {sub.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0ECE6] mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#718096]">
                    {sub.questionCount} Questions in Bank
                  </span>
                  {onPracticeSubject && (
                    <button
                      onClick={() => onPracticeSubject(sub.id)}
                      className="px-3 py-1.5 bg-[#1A365D] hover:bg-[#2B6CB0] text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>Practice Subject</span>
                      <ArrowRight className="w-3 h-3 text-[#D69E2E]" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WHAT REPEATS */}
      {activeTab === 'what-repeats' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E8E2DA] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#1A365D]">
              Recurring Concepts & High-Yield Provisions
            </h3>
            <p className="text-xs text-[#4A5568] leading-relaxed">
              Historical analysis across 18 AIBE examinations reveals that while exact question wordings change, core legal doctrines and fundamental Bare Act sections repeat predictably across cycles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA] space-y-2">
                <span className="text-xs font-mono font-bold text-[#1A365D] uppercase tracking-wider block">
                  Constitutional Law (10 Qs)
                </span>
                <ul className="text-xs text-[#2D3748] space-y-1.5 font-serif">
                  <li>• Fundamental Rights: Articles 14, 19, 21, and 32 writ jurisdiction.</li>
                  <li>• Directive Principles: Article 39A (Free Legal Aid), 44 (UCC), 50.</li>
                  <li>• Constitutional Amendments: 42nd, 44th, 73rd, 86th, 99th (NJAC), 101st (GST).</li>
                  <li>• Landmark Precedents: Kesavananda Bharati, Maneka Gandhi, Navtej Johar, Puttaswamy.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA] space-y-2">
                <span className="text-xs font-mono font-bold text-[#1A365D] uppercase tracking-wider block">
                  Cr.P.C. / BNSS (10 Qs)
                </span>
                <ul className="text-xs text-[#2D3748] space-y-1.5 font-serif">
                  <li>• Arrest & Rights of Arrested: Sections 41, 41A-D, 50, 57.</li>
                  <li>• FIR & Investigation: Section 154, 156(3), 160, 161, 164, 167 (Default Bail).</li>
                  <li>• Bail Provisions: Sections 436, 437, 438 (Anticipatory Bail), 439.</li>
                  <li>• Maintenance: Section 125 scope and eligibility.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA] space-y-2">
                <span className="text-xs font-mono font-bold text-[#1A365D] uppercase tracking-wider block">
                  C.P.C. (10 Qs)
                </span>
                <ul className="text-xs text-[#2D3748] space-y-1.5 font-serif">
                  <li>• Fundamental Doctrines: Section 10 (Res Sub Judice), Section 11 (Res Judicata).</li>
                  <li>• Pleadings: Order 6, Order 7 (Rejection of Plaint - Rule 11), Order 8 (Written Statement).</li>
                  <li>• Temporary Injunctions: Order 39 Rules 1-2 and Section 94/151.</li>
                  <li>• Appeals & Revision: Section 96, 100 (Second Appeal), 115 (Revision).</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA] space-y-2">
                <span className="text-xs font-mono font-bold text-[#1A365D] uppercase tracking-wider block">
                  Evidence Act / BSA (8 Qs)
                </span>
                <ul className="text-xs text-[#2D3748] space-y-1.5 font-serif">
                  <li>• Relevancy of Facts: Res Gestae (Section 6), Motive & Preparation (Section 8).</li>
                  <li>• Confessions: Police Confessions (Sections 25-26), Discovery Section 27.</li>
                  <li>• Dying Declarations: Section 32(1) evidentiary value.</li>
                  <li>• Electronic Evidence: Section 65B certificate requirements.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: QUESTION-TYPE STRATEGY */}
      {activeTab === 'question-types' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-[#E8E2DA] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#1A365D]/5 text-[#1A365D] flex items-center justify-center font-bold text-xs">1</span>
                <h3 className="text-base font-serif font-bold text-[#1A365D]">Direct Statutory MCQs (~50-60%)</h3>
              </div>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Directly asks: "Which section of Cr.P.C. deals with Anticipatory Bail?" or "Under Indian Contract Act, Section 2(d) defines..."
              </p>
              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2DA] text-xs font-serif text-[#2D3748] space-y-1">
                <strong className="text-[#1A365D]">Strategy:</strong>
                <p>Do NOT flip pages randomly. Use the Bare Act's index (arrangement of sections). Match the keyword to the chapter title first, then verify the section heading.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E8E2DA] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#1A365D]/5 text-[#1A365D] flex items-center justify-center font-bold text-xs">2</span>
                <h3 className="text-base font-serif font-bold text-[#1A365D]">Assertion & Reason (~10-15%)</h3>
              </div>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Presents statement (A) and reason (R). Requires evaluating whether both are true and whether (R) correctly explains (A).
              </p>
              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2DA] text-xs font-serif text-[#2D3748] space-y-1">
                <strong className="text-[#1A365D]">Strategy:</strong>
                <p>Evaluate A independently (True or False). Evaluate R independently (True or False). If either is false, 2 options are eliminated immediately. Then connect with 'BECAUSE'.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E8E2DA] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#1A365D]/5 text-[#1A365D] flex items-center justify-center font-bold text-xs">3</span>
                <h3 className="text-base font-serif font-bold text-[#1A365D]">Case Law & Precedent MCQs (~15-20%)</h3>
              </div>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Tests landmark cases or recent constitutional bench rulings (e.g. DK Basu guidelines, Vishaka guidelines, Triple Talaq).
              </p>
              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2DA] text-xs font-serif text-[#2D3748] space-y-1">
                <strong className="text-[#1A365D]">Strategy:</strong>
                <p>Bare Acts without notes rarely list case laws. Memorize the top 50 landmark rulings across Constitutional Law, IPC, and CrPC prior to entering the exam hall.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E8E2DA] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#1A365D]/5 text-[#1A365D] flex items-center justify-center font-bold text-xs">4</span>
                <h3 className="text-base font-serif font-bold text-[#1A365D]">Factual / Problem Scenarios (~10-15%)</h3>
              </div>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Presents a mini factual situation: "A offers B to sell his horse... B accepts on condition... Is the contract valid?"
              </p>
              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2DA] text-xs font-serif text-[#2D3748] space-y-1">
                <strong className="text-[#1A365D]">Strategy:</strong>
                <p>Read the statutory illustrations in Bare Acts! Many AIBE questions are verbatim illustrations directly lifted from the Indian Penal Code and Contract Act.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: EXAM-DAY STRATEGY */}
      {activeTab === 'exam-day' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E8E2DA] p-6 sm:p-8 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#1A365D]">
              Exam-Day Execution Framework (180 Minutes)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#C05621] uppercase">Phase 1: Minute 0 - 50</span>
                  <span className="text-[11px] font-mono text-[#718096]">Rapid Pass</span>
                </div>
                <h4 className="text-base font-serif font-bold text-[#1A365D]">Answer Direct Confident Questions</h4>
                <p className="text-xs text-[#4A5568] leading-relaxed font-serif">
                  Skim all 100 questions. Answer 30-40 questions that you know by heart immediately without touching Bare Acts. Mark your answers on the OMR sheet cleanly.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#1A365D] uppercase">Phase 2: Minute 50 - 150</span>
                  <span className="text-[11px] font-mono text-[#718096]">Bare Act Pass</span>
                </div>
                <h4 className="text-base font-serif font-bold text-[#1A365D]">Targeted Bare Act Index Lookups</h4>
                <p className="text-xs text-[#4A5568] leading-relaxed font-serif">
                  Open your Bare Acts for procedural sections (CrPC, CPC, Evidence, Contracts). Use the section index at the beginning of each Act rather than leafing through full pages.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#22543D] uppercase">Phase 3: Minute 150 - 180</span>
                  <span className="text-[11px] font-mono text-[#718096]">Zero-Blank Sweep</span>
                </div>
                <h4 className="text-base font-serif font-bold text-[#1A365D]">Zero Negative Marking Clearance</h4>
                <p className="text-xs text-[#4A5568] leading-relaxed font-serif">
                  Double check your OMR sheet. There is NO negative marking in AIBE. If 10 questions remain unsolved, eliminate obviously wrong options and select the best guess. NEVER leave an empty circle.
                </p>
              </div>
            </div>

            <div className="bg-[#FFFBEB] border border-[#FDE68A] p-4 rounded-xl flex items-start gap-3 text-xs text-[#B45309]">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#B45309]" />
              <div>
                <strong>Important Bare Act Rule Reminder:</strong>
                <p className="mt-0.5">
                  The Bar Council of India permits Bare Acts WITHOUT notes or comments. Bare Acts with brief footnotes or section summaries are usually permitted, but study material, guides, or textbooks with explanatory chapters are strictly barred.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PREPARATION PLANS */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 7-Day Plan */}
            <div className="bg-white rounded-xl border border-[#E8E2DA] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#FEF2F2] text-[#991B1B] text-[11px] font-mono font-bold border border-[#FECACA]">
                    Crash Course
                  </span>
                  <span className="font-mono text-xs text-[#718096]">7 Days</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#1A365D]">7-Day Emergency Plan</h3>
                <p className="text-xs text-[#4A5568] leading-relaxed font-serif">
                  Strictly focuses on the 7 Critical Subjects that account for 66 questions to safely cross the 45% qualifying mark.
                </p>

                <div className="space-y-2 border-t border-[#F0ECE6] pt-3 text-xs text-[#2D3748]">
                  <p><strong>Days 1-2:</strong> Const Law (10 Qs) + Family Law (8 Qs)</p>
                  <p><strong>Days 3-4:</strong> CrPC (10 Qs) + IPC/BNS (8 Qs)</p>
                  <p><strong>Days 5-6:</strong> CPC (10 Qs) + Evidence Act (8 Qs) + Contracts (8 Qs)</p>
                  <p><strong>Day 7:</strong> Full Mock Test + Mistake Revision</p>
                </div>
              </div>

              {onStartMock && (
                <button
                  onClick={() => onStartMock(50)}
                  className="mt-6 w-full py-2 bg-[#1A365D] hover:bg-[#2B6CB0] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Start 50-Q Sprint Mock
                </button>
              )}
            </div>

            {/* 15-Day Plan */}
            <div className="bg-white rounded-xl border border-[#2B6CB0]/40 p-6 shadow-[0_2px_8px_rgba(43,108,176,0.08)] flex flex-col justify-between relative">
              <div className="absolute -top-3 right-4 bg-[#C05621] text-white text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold">
                Recommended
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#FFFBEB] text-[#B45309] text-[11px] font-mono font-bold border border-[#FDE68A]">
                    Balanced Sprint
                  </span>
                  <span className="font-mono text-xs text-[#718096]">15 Days</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#1A365D]">15-Day Targeted Plan</h3>
                <p className="text-xs text-[#4A5568] leading-relaxed font-serif">
                  Covers all Critical (66 Qs) and High Priority subjects (26 Qs), practicing past papers alongside Bare Act indexing.
                </p>

                <div className="space-y-2 border-t border-[#F0ECE6] pt-3 text-xs text-[#2D3748]">
                  <p><strong>Days 1-5:</strong> 7 Critical Subjects deep-dive + 30 Qs daily</p>
                  <p><strong>Days 6-10:</strong> High Priority subjects (Torts, PIL, ADR, Ethics, Labor)</p>
                  <p><strong>Days 11-13:</strong> 2 Complete Previous Papers (AIBE XXI, XX)</p>
                  <p><strong>Days 14-15:</strong> Practice Mistakes Queue & Bare Act Index drills</p>
                </div>
              </div>

              {onStartMock && (
                <button
                  onClick={() => onStartMock(100)}
                  className="mt-6 w-full py-2 bg-[#C05621] hover:bg-[#9C4221] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
                >
                  Start Full 100-Q Mock
                </button>
              )}
            </div>

            {/* 30-Day Plan */}
            <div className="bg-white rounded-xl border border-[#E8E2DA] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#F0FDF4] text-[#166534] text-[11px] font-mono font-bold border border-[#BBF7D0]">
                    Comprehensive
                  </span>
                  <span className="font-mono text-xs text-[#718096]">30 Days</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#1A365D]">30-Day Mastery Plan</h3>
                <p className="text-xs text-[#4A5568] leading-relaxed font-serif">
                  Systematic coverage of all 19 syllabus subjects, 5+ previous papers, and complete confidence with zero exam anxiety.
                </p>

                <div className="space-y-2 border-t border-[#F0ECE6] pt-3 text-xs text-[#2D3748]">
                  <p><strong>Week 1:</strong> Procedural Laws (CPC, CrPC, Evidence) + 200 MCQs</p>
                  <p><strong>Week 2:</strong> Substantive Laws (Const Law, IPC/BNS, Contracts, Family Law)</p>
                  <p><strong>Week 3:</strong> Minor Acts (Cyber, Company, IPR, Env, Taxation, Land Acq)</p>
                  <p><strong>Week 4:</strong> 4 Full-length Mocks + Error Correction cycles</p>
                </div>
              </div>

              {onPracticeSubject && (
                <button
                  onClick={() => onPracticeSubject('const-law')}
                  className="mt-6 w-full py-2 bg-[#1A365D] hover:bg-[#2B6CB0] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Begin Week 1 Practice
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

