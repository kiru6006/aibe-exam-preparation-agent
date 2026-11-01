import React, { useState } from 'react';
import type { Question, Answer, ExamResult } from '../types';
import { 
  HelpCircle, 
  Flag, 
  RotateCcw, 
  Check, 
  X, 
  ArrowRight
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

type ReviewFilter = "all" | "correct" | "wrong" | "unanswered" | "marked";

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

  const filteredQuestions = questions.filter(q => {
    const selected = answers[q.id];
    const isCorrect = selected === q.correctAnswer;
    const isUnanswered = !selected;
    const isMarked = marked.includes(q.id);

    if (filter === "correct") return isCorrect;
    if (filter === "wrong") return !isCorrect && !isUnanswered;
    if (filter === "unanswered") return isUnanswered;
    if (filter === "marked") return isMarked;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 font-sans">
      {/* Top Banner / Card */}
      <div className="bg-white rounded-2xl border border-[#E8E2DA] p-6 sm:p-8 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#F0ECE6]">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#78716C] mb-1">
              Assessment Summary
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-medium text-[#191919]">{title}</h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onRetry}
              className="flex items-center gap-1.5 px-3.5 py-1.5 border border-[#E8E2DA] text-[#2A2825] text-xs font-medium rounded-lg hover:bg-[#F4EFEA] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reattempt</span>
            </button>
            <button
              onClick={onExit}
              className="px-3.5 py-1.5 bg-[#2A2825] hover:bg-black text-white text-xs font-medium rounded-lg transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Score Grid in Anthropic style */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-6">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA]">
            <span className="text-[11px] font-mono text-[#78716C] block uppercase">Score</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl sm:text-3xl font-serif text-[#191919]">{result.score}</span>
              <span className="text-xs text-[#78716C] font-mono">/ {result.total}</span>
            </div>
            {result.passed !== undefined && (
              <span className={`text-[10px] font-mono font-medium mt-1 inline-block px-1.5 py-0.5 rounded border ${
                result.passed 
                  ? 'bg-[#F7FEE7] text-[#3F6212] border-[#D9F99D]' 
                  : 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]'
              }`}>
                {result.passed ? 'QUALIFIED (≥45%)' : 'BELOW 45%'}
              </span>
            )}
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA]">
            <span className="text-[11px] font-mono text-[#3F6212] block uppercase">Correct</span>
            <span className="text-2xl sm:text-3xl font-serif text-[#3F6212] mt-1 block">
              {result.correct}
            </span>
            <span className="text-[11px] text-[#78716C] mt-1 block font-mono">
              {result.total > 0 ? ((result.correct / result.total) * 100).toFixed(1) : 0}%
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA]">
            <span className="text-[11px] font-mono text-[#991B1B] block uppercase">Wrong</span>
            <span className="text-2xl sm:text-3xl font-serif text-[#991B1B] mt-1 block">
              {result.wrong}
            </span>
            <span className="text-[11px] text-[#78716C] mt-1 block font-mono">Needs revision</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA]">
            <span className="text-[11px] font-mono text-[#78716C] block uppercase">Unanswered</span>
            <span className="text-2xl sm:text-3xl font-serif text-[#78716C] mt-1 block">
              {result.unanswered}
            </span>
            <span className="text-[11px] text-[#78716C] mt-1 block font-mono">Skipped</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA] col-span-2 md:col-span-1">
            <span className="text-[11px] font-mono text-[#CC785C] block uppercase">Accuracy</span>
            <span className="text-2xl sm:text-3xl font-serif text-[#191919] mt-1 block">
              {result.accuracy.toFixed(1)}%
            </span>
            <span className="text-[11px] text-[#78716C] mt-1 block font-mono">On attempted</span>
          </div>
        </div>

        {/* Action to Practice Mistakes if any */}
        {result.wrong > 0 && onPracticeMistakes && (
          <div className="mt-6 p-4 rounded-xl bg-[#FBF4F0] border border-[#F0D5C9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-semibold text-[#8B3E2F]">
                {result.wrong} question{result.wrong > 1 ? 's' : ''} to review
              </h4>
              <p className="text-xs text-[#8A5B4C] mt-0.5">
                Targeted practice helps commit statutory provisions to long-term memory.
              </p>
            </div>
            <button
              onClick={onPracticeMistakes}
              className="px-3.5 py-1.5 bg-[#CC785C] hover:bg-[#B66347] text-white text-xs font-medium rounded-lg shadow-xs flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>Practice Missed Questions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Answer Review Section adhering strictly to Section 14 */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-serif font-medium text-[#191919]">Answer Review</h2>
            <p className="text-xs text-[#78716C] font-mono">
              Verified legal basis and judgments without generative speculation.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-lg border border-[#E8E2DA]">
            {(
              [
                { id: "all", label: `All (${questions.length})` },
                { id: "wrong", label: `Wrong (${result.wrong})` },
                { id: "correct", label: `Correct (${result.correct})` },
                { id: "unanswered", label: `Unanswered (${result.unanswered})` },
                { id: "marked", label: `Marked (${marked.length})` }
              ] as const
            ).map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  filter === tab.id
                    ? 'bg-[#2A2825] text-white font-medium'
                    : 'text-[#5C5852] hover:text-[#191919] hover:bg-[#F4EFEA]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question Review Cards */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const userChoice = answers[q.id] || null;
            const isCorrect = userChoice === q.correctAnswer;
            const isUnanswered = !userChoice;
            const isMarked = marked.includes(q.id);

            return (
              <div 
                key={q.id}
                className="bg-white rounded-xl border border-[#E8E2DA] p-6 space-y-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
              >
                {/* Header status */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F0ECE6] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-[#78716C] uppercase">
                      Question {questions.findIndex(item => item.id === q.id) + 1}
                    </span>
                    <span className="text-[#D5CDC2]">•</span>
                    <span className="text-[#78716C] text-xs">{q.examName} ({q.year})</span>
                    {isMarked && (
                      <span className="flex items-center gap-1 text-[#B66347] bg-[#FBF4F0] px-2 py-0.5 rounded border border-[#F0D5C9] text-[11px]">
                        <Flag className="w-2.5 h-2.5 fill-[#CC785C]" />
                        <span>Marked</span>
                      </span>
                    )}
                  </div>

                  <div>
                    {isUnanswered ? (
                      <span className="flex items-center gap-1 text-[#78716C] bg-[#F4EFEA] px-2.5 py-0.5 rounded-full text-xs font-mono">
                        <HelpCircle className="w-3 h-3" />
                        <span>Unanswered</span>
                      </span>
                    ) : isCorrect ? (
                      <span className="flex items-center gap-1 text-[#3F6212] bg-[#F7FEE7] px-2.5 py-0.5 rounded-full border border-[#D9F99D] text-xs font-mono">
                        <Check className="w-3 h-3 text-[#65A30D]" />
                        <span>Correct</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[#991B1B] bg-[#FEF2F2] px-2.5 py-0.5 rounded-full border border-[#FECACA] text-xs font-mono">
                        <X className="w-3 h-3 text-[#DC2626]" />
                        <span>Incorrect</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Question */}
                <p className="text-base text-[#191919] font-serif leading-relaxed">
                  {q.question}
                </p>

                {/* Option comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  {(['A', 'B', 'C', 'D'] as const).map(optKey => {
                    const isOfficialCorrect = q.correctAnswer === optKey;
                    const isSelectedByUser = userChoice === optKey;

                    let optCardClass = "p-3 rounded-lg border flex items-start gap-2.5 ";
                    if (isOfficialCorrect) {
                      optCardClass += "bg-[#F7FEE7] border-[#A3E635] text-[#14532D] font-medium";
                    } else if (isSelectedByUser && !isOfficialCorrect) {
                      optCardClass += "bg-[#FEF2F2] border-[#FCA5A5] text-[#7F1D1D] line-through";
                    } else {
                      optCardClass += "bg-[#FAF8F5] border-[#E8E2DA] text-[#5C5852]";
                    }

                    return (
                      <div key={optKey} className={optCardClass}>
                        <span className={`w-5 h-5 rounded flex items-center justify-center text-[11px] font-mono shrink-0 ${
                          isOfficialCorrect 
                            ? 'bg-[#4D7C0F] text-white font-bold' 
                            : isSelectedByUser 
                            ? 'bg-[#DC2626] text-white' 
                            : 'bg-[#E8E2DA] text-[#5C5852]'
                        }`}>
                          {optKey}
                        </span>
                        <span className="leading-relaxed">
                          {q.options[optKey]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Verified Metadata / Legal Basis */}
                {(q.explanation || q.legalProvision || q.caseLaw) && (
                  <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E8E2DA] space-y-1.5 text-xs">
                    {q.legalProvision && (
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[11px] text-[#78716C] uppercase shrink-0">Statute:</span>
                        <span className="text-[#191919] font-mono">{q.legalProvision}</span>
                      </div>
                    )}
                    {q.caseLaw && (
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[11px] text-[#78716C] uppercase shrink-0">Precedent:</span>
                        <span className="text-[#191919] italic font-serif">{q.caseLaw}</span>
                      </div>
                    )}
                    {q.explanation && (
                      <div className="pt-1.5 border-t border-[#E8E2DA]">
                        <span className="font-mono text-[11px] text-[#78716C] uppercase block mb-0.5">Rationale:</span>
                        <p className="text-[#5C5852] leading-relaxed font-serif">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
