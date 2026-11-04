import React, { useState } from 'react';
import type { Question, Answer, ExamResult } from '../types';
import { ExamEngine } from '../services/examEngine';
import {
  HelpCircle,
  Flag,
  RotateCcw,
  Check,
  X,
  ArrowRight,
  LayoutGrid,
  List,
  ShieldAlert,
  Info
} from 'lucide-react';

interface ResultViewProps {
  title: string;
  result: ExamResult;
  questions: Question[];
  answers: Record<string, Answer>;
  marked: string[];
  onRetry: () => void;
  onExit: () => void;
  onPracticeMistakes?: () => void;
}

type ReviewFilter = "all" | "correct" | "wrong" | "unanswered" | "withdrawn" | "marked";

export const ResultView: React.FC<ResultViewProps> = ({
  title,
  result,
  questions,
  answers,
  marked,
  onRetry,
  onExit,
  onPracticeMistakes
}) => {
  const [filter, setFilter] = useState<ReviewFilter>("all");
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  const filteredQuestions = questions.filter(q => {
    const isWithdrawn = q.status === "withdrawn" || q.scorable === false;
    if (filter === "withdrawn") return isWithdrawn;

    const selected = answers[q.id];
    const isCorrect = ExamEngine.isAnswerCorrect(selected, q.correctAnswer);
    const isUnanswered = !selected || (Array.isArray(selected) && selected.length === 0);
    const isMarked = marked.includes(q.id);

    if (filter === "correct") return !isWithdrawn && isCorrect;
    if (filter === "wrong") return !isWithdrawn && !isCorrect && !isUnanswered;
    if (filter === "unanswered") return !isWithdrawn && isUnanswered;
    if (filter === "marked") return isMarked;
    return true;
  });

  const scorableQuestions = questions.filter(q => q.status !== 'withdrawn' && q.scorable !== false);
  const withdrawnQuestions = questions.filter(q => q.status === 'withdrawn' || q.scorable === false);

  const formatAnswerDisplay = (ans: Answer): string => {
    if (!ans) return '-';
    if (Array.isArray(ans)) return ans.join(', ');
    return ans;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 font-sans">
      {/* Top Banner / Assessment Card */}
      <div className="bg-white rounded-2xl border border-[#E8E2DA] p-6 sm:p-8 shadow-[0_2px_8px_rgba(26,54,93,0.04)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#F0ECE6]">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#718096] mb-1">
              Assessment Summary & Official Evaluation
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A365D]">{title}</h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onRetry}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-[#E8E2DA] text-[#1A365D] text-xs font-medium rounded-xl hover:bg-[#FAF8F5] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reattempt</span>
            </button>
            <button
              onClick={onExit}
              className="px-3.5 py-2 bg-[#1A365D] hover:bg-[#2B6CB0] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Score Grid adhering strictly to Section 5 with Withdrawn Questions */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-6">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA]">
            <span className="text-[11px] font-mono text-[#718096] block uppercase font-bold">Scorable Score</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#1A365D]">{result.score}</span>
              <span className="text-xs text-[#718096] font-mono">/ {result.scorableTotal || scorableQuestions.length}</span>
            </div>
            {result.passed !== undefined && (
              <span className={`text-[10px] font-mono font-bold mt-1 inline-block px-1.5 py-0.5 rounded border ${result.passed
                ? 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
                : 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]'
                }`}>
                {result.passed ? 'QUALIFIED (≥45%)' : 'BELOW 45%'}
              </span>
            )}
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA]">
            <span className="text-[11px] font-mono text-[#22543D] block uppercase font-bold">Correct</span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#22543D] mt-1 block">
              {result.correct}
            </span>
            <span className="text-[11px] text-[#718096] mt-1 block font-mono">
              {result.accuracy ? result.accuracy.toFixed(1) : 0}% Accuracy
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA]">
            <span className="text-[11px] font-mono text-[#991B1B] block uppercase font-bold">Wrong</span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#991B1B] mt-1 block">
              {result.wrong}
            </span>
            <span className="text-[11px] text-[#718096] mt-1 block font-mono">Needs revision</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA]">
            <span className="text-[11px] font-mono text-[#718096] block uppercase font-bold">Unanswered</span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#4A5568] mt-1 block">
              {result.unanswered}
            </span>
            <span className="text-[11px] text-[#718096] mt-1 block font-mono">0 penalty</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA]">
            <span className="text-[11px] font-mono text-[#C05621] block uppercase font-bold">Withdrawn</span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#C05621] mt-1 block">
              {result.withdrawnCount !== undefined ? result.withdrawnCount : withdrawnQuestions.length}
            </span>
            <span className="text-[11px] text-[#718096] mt-1 block font-mono">By BCI (Not scored)</span>
          </div>
        </div>

        {/* Section 5 Withdrawn Explanation Callout if applicable */}
        {(result.withdrawnCount || withdrawnQuestions.length > 0) && (
          <div className="mt-4 p-3.5 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl flex items-start gap-2.5 text-xs text-[#B45309]">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#B45309]" />
            <div>
              <strong>Official BCI Withdrawn Scoring Rule Applied:</strong>
              <p className="mt-0.5 font-serif text-[#78350F]">
                Per official Bar Council of India guidelines, withdrawn questions are cancelled from evaluation. The qualifying score threshold is computed strictly from the <strong>{scorableQuestions.length} scorable questions</strong>. Withdrawn questions are neither marked wrong nor counted as unanswered.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Review Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#1A365D]">Detailed Question Review</h2>
            <p className="text-xs text-[#718096] mt-0.5 font-mono">
              Showing {filteredQuestions.length} of {questions.length} questions
            </p>
          </div>

          {/* Filter Pills & View Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#E8E2DA] text-xs">
              {(['all', 'correct', 'wrong', 'unanswered', 'withdrawn', 'marked'] as ReviewFilter[]).map(tab => {
                const count = questions.filter(q => {
                  const isWithdrawn = q.status === "withdrawn" || q.scorable === false;
                  if (tab === "withdrawn") return isWithdrawn;
                  const selected = answers[q.id];
                  const isCorrect = ExamEngine.isAnswerCorrect(selected, q.correctAnswer);
                  const isUnanswered = !selected || (Array.isArray(selected) && selected.length === 0);
                  const isMarked = marked.includes(q.id);

                  if (tab === "correct") return !isWithdrawn && isCorrect;
                  if (tab === "wrong") return !isWithdrawn && !isCorrect && !isUnanswered;
                  if (tab === "unanswered") return !isWithdrawn && isUnanswered;
                  if (tab === "marked") return isMarked;
                  return true;
                }).length;

                return (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg capitalize font-mono text-[11px] transition-colors ${filter === tab
                      ? 'bg-[#1A365D] text-white font-bold shadow-xs'
                      : 'text-[#4A5568] hover:bg-white'
                      }`}
                  >
                    {tab} ({count})
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle: Card vs List */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#E8E2DA]">
              <button
                onClick={() => setViewMode('card')}
                className={`p-1.5 rounded ${viewMode === 'card' ? 'bg-[#1A365D] text-white' : 'text-[#718096]'}`}
                title="Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-[#1A365D] text-white' : 'text-[#718096]'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Practice Mistakes Callout */}
        {result.wrong > 0 && onPracticeMistakes && (
          <div className="p-4 bg-[#FFF5F5] border border-[#FEB2B2] rounded-xl flex items-center justify-between">
            <div className="text-xs text-[#9B2C2C] font-serif">
              You have <strong>{result.wrong} incorrect questions</strong> in this session. Reviewing them reinforces critical statutory sections.
            </div>
            <button
              onClick={onPracticeMistakes}
              className="px-3.5 py-1.5 bg-[#C53030] hover:bg-[#9B2C2C] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
            >
              <span>Practice Mistakes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* QUESTIONS DISPLAY */}
        {viewMode === 'card' ? (
          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => {
              const isWithdrawn = q.status === "withdrawn" || q.scorable === false;
              const userChoice = answers[q.id] || null;
              const isCorrect = ExamEngine.isAnswerCorrect(userChoice, q.correctAnswer);
              const isUnanswered = !userChoice || (Array.isArray(userChoice) && userChoice.length === 0);
              const isMarked = marked.includes(q.id);

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-xl border border-[#E8E2DA] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-4"
                >
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-[#F0ECE6]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#1A365D] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E2DA]">
                        Q{questions.findIndex(item => item.id === q.id) + 1}
                      </span>
                      <span className="font-serif text-[#4A5568]">{q.subjectName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isMarked && (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-[#B45309] bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#FDE68A]">
                          <Flag className="w-3 h-3" />
                          Marked
                        </span>
                      )}

                      {isWithdrawn ? (
                        <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#991B1B] bg-[#FEF2F2] px-2 py-0.5 rounded border border-[#FECACA]">
                          <ShieldAlert className="w-3 h-3" />
                          Withdrawn by BCI
                        </span>
                      ) : isUnanswered ? (
                        <span className="text-[11px] font-mono text-[#718096] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E2DA]">
                          Unanswered
                        </span>
                      ) : isCorrect ? (
                        <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#166534] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
                          <Check className="w-3 h-3" />
                          Correct
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#991B1B] bg-[#FEF2F2] px-2 py-0.5 rounded border border-[#FECACA]">
                          <X className="w-3 h-3" />
                          Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#1A365D] leading-relaxed">
                    {q.question}
                  </h3>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {(['A', 'B', 'C', 'D'] as const).map(key => {
                      const optText = q.options[key];
                      if (!optText) return null;

                      const isSelected = Array.isArray(userChoice) ? userChoice.includes(key) : userChoice === key;
                      const isOfficialCorrect = Array.isArray(q.correctAnswer) ? q.correctAnswer.includes(key) : q.correctAnswer === key;

                      let borderClass = "border-[#E8E2DA] bg-[#FAF8F5]";
                      let badgeClass = "bg-white text-[#718096] border border-[#E8E2DA]";

                      if (!isWithdrawn) {
                        if (isOfficialCorrect) {
                          borderClass = "border-[#BBF7D0] bg-[#F0FDF4]";
                          badgeClass = "bg-[#22543D] text-white";
                        } else if (isSelected && !isOfficialCorrect) {
                          borderClass = "border-[#FECACA] bg-[#FEF2F2]";
                          badgeClass = "bg-[#991B1B] text-white";
                        }
                      }

                      return (
                        <div
                          key={key}
                          className={`flex items-start gap-2.5 p-3 rounded-lg border text-xs ${borderClass}`}
                        >
                          <span className={`inline-flex w-5 h-5 rounded items-center justify-center font-mono font-bold text-[11px] shrink-0 ${badgeClass}`}>
                            {key}
                          </span>
                          <span className="font-serif text-[#2D3748] pt-0.5 leading-snug">{optText}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Legal Basis / Rationale */}
                  {(q.explanation || q.legalProvision || q.caseLaw) && (
                    <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E8E2DA] space-y-1.5 text-xs font-serif">
                      {q.legalProvision && (
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-[11px] text-[#718096] uppercase shrink-0 font-bold">Statute:</span>
                          <span className="text-[#1A365D] font-mono font-medium">{q.legalProvision}</span>
                        </div>
                      )}
                      {q.caseLaw && (
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-[11px] text-[#718096] uppercase shrink-0 font-bold">Precedent:</span>
                          <span className="text-[#1A365D] italic">{q.caseLaw}</span>
                        </div>
                      )}
                      {q.explanation && (
                        <div className="pt-1.5 border-t border-[#E8E2DA]">
                          <span className="font-mono text-[11px] text-[#718096] uppercase block mb-0.5 font-bold">Rationale:</span>
                          <p className="text-[#4A5568] leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="bg-white rounded-xl border border-[#E8E2DA] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#4A5568]">
                <thead className="bg-[#FAF8F5] text-[#1A365D] font-mono uppercase text-[11px] border-b border-[#E8E2DA]">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Question Prompt</th>
                    <th className="px-4 py-3 text-center">Your Pick</th>
                    <th className="px-4 py-3 text-center">Official Key</th>
                    <th className="px-4 py-3">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE6]">
                  {filteredQuestions.map(q => {
                    const isWithdrawn = q.status === "withdrawn" || q.scorable === false;
                    const userChoice = answers[q.id] || null;
                    const isCorrect = ExamEngine.isAnswerCorrect(userChoice, q.correctAnswer);
                    const isUnanswered = !userChoice || (Array.isArray(userChoice) && userChoice.length === 0);

                    return (
                      <tr key={q.id} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="px-4 py-3 font-mono text-[11px] text-[#718096]">
                          {questions.findIndex(item => item.id === q.id) + 1}
                        </td>
                        <td className="px-4 py-3 font-serif font-bold text-sm text-[#1A365D] max-w-lg">
                          <p className="line-clamp-2">{q.question}</p>
                        </td>
                        <td className="px-4 py-3 text-center font-mono">
                          <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${!userChoice
                            ? 'bg-[#FAF8F5] text-[#718096]'
                            : isCorrect
                              ? 'bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]'
                              : 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]'
                            }`}>
                            {formatAnswerDisplay(userChoice)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center font-mono font-bold text-xs text-[#166534]">
                          {isWithdrawn ? (
                            <span className="text-[#991B1B] text-[10px] uppercase font-mono">Withdrawn</span>
                          ) : (
                            <span className="inline-flex px-2 py-0.5 rounded bg-[#F0FDF4] border border-[#BBF7D0]">
                              {formatAnswerDisplay(q.correctAnswer)}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {isWithdrawn ? (
                            <span className="text-[#991B1B] font-mono text-[11px] font-bold">Withdrawn</span>
                          ) : isUnanswered ? (
                            <span className="text-[#718096] font-mono text-[11px]">Unanswered</span>
                          ) : isCorrect ? (
                            <span className="text-[#166534] font-mono text-[11px] font-semibold">Correct ✓</span>
                          ) : (
                            <span className="text-[#991B1B] font-mono text-[11px] font-semibold">Wrong ✗</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
