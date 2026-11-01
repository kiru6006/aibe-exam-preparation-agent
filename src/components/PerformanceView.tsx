import React from 'react';
import type { Subject, Question } from '../types';
import { StorageService } from '../services/storageService';
import { ExamEngine } from '../services/examEngine';
import { 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  RotateCcw
} from 'lucide-react';

interface PerformanceViewProps {
  subjects: Subject[];
  questions: Question[];
  onPracticeMistakes: (questionIds: string[]) => void;
  onPracticeSubject: (subjectId: string) => void;
}

export const PerformanceView: React.FC<PerformanceViewProps> = ({
  subjects,
  onPracticeMistakes,
  onPracticeSubject
}) => {
  const attempts = StorageService.getAttempts();
  const mistakeIds = StorageService.getMistakeQuestionIds();

  const totalAttempts = attempts.length;
  let totalScore = 0;
  let maxScorePct = 0;
  let totalQuestionsAnswered = 0;

  attempts.forEach(att => {
    const qCount = att.questionIds.length;
    const answeredCount = Object.values(att.answers).filter(Boolean).length;
    totalQuestionsAnswered += answeredCount;

    if (att.score !== undefined && qCount > 0) {
      totalScore += att.score;
      const pct = (att.score / qCount) * 100;
      if (pct > maxScorePct) maxScorePct = pct;
    }
  });

  const averageScorePct = totalAttempts > 0 ? (totalScore / (attempts.reduce((acc, a) => acc + a.questionIds.length, 0) || 1)) * 100 : 0;

  const MIN_THRESHOLD = 3;
  const subjectStats = subjects.map(sub => {
    const { totalAttempted, correct, percentage } = ExamEngine.getSubjectAccuracy(sub.id, attempts);
    return {
      subject: sub,
      totalAttempted,
      correct,
      percentage,
      hasEnoughData: totalAttempted >= MIN_THRESHOLD
    };
  });

  const strongAreas = subjectStats.filter(s => s.hasEnoughData && s.percentage >= 70);
  const weakAreas = subjectStats.filter(s => s.hasEnoughData && s.percentage < 60);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      {/* Header */}
      <div className="pb-6 border-b border-[#E8E2DA]">
        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-[#191919]">
          My Performance
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5852] mt-1 font-serif">
          Historical attempts and targeted revision stored privately in your browser.
        </p>
      </div>

      {/* Top Stat Cards adhering to Section 25 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E8E2DA] shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <span className="text-[11px] font-mono text-[#78716C] uppercase block">Total Sessions</span>
          <span className="text-2xl sm:text-3xl font-serif text-[#191919] mt-1 block">{totalAttempts}</span>
          <span className="text-[11px] text-[#A8A29E] mt-0.5 block font-mono">Exams & practice</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E8E2DA] shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <span className="text-[11px] font-mono text-[#78716C] uppercase block">Questions Solved</span>
          <span className="text-2xl sm:text-3xl font-serif text-[#191919] mt-1 block">{totalQuestionsAnswered}</span>
          <span className="text-[11px] text-[#A8A29E] mt-0.5 block font-mono">All sessions</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E8E2DA] shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <span className="text-[11px] font-mono text-[#78716C] uppercase block">Average Score</span>
          <span className="text-2xl sm:text-3xl font-serif text-[#191919] mt-1 block">
            {totalAttempts > 0 ? `${averageScorePct.toFixed(1)}%` : '0%'}
          </span>
          <span className="text-[11px] text-[#A8A29E] mt-0.5 block font-mono">Target: ≥45%</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E8E2DA] shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <span className="text-[11px] font-mono text-[#78716C] uppercase block">Best Result</span>
          <span className="text-2xl sm:text-3xl font-serif text-[#CC785C] mt-1 block">
            {totalAttempts > 0 ? `${maxScorePct.toFixed(1)}%` : '0%'}
          </span>
          <span className="text-[11px] text-[#A8A29E] mt-0.5 block font-mono">Highest recorded</span>
        </div>
      </div>

      {/* Practice My Mistakes Section */}
      <div className="bg-[#FBF4F0] rounded-xl border border-[#F0D5C9] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#8B3E2F] font-medium text-sm">
            <AlertTriangle className="w-4 h-4 text-[#CC785C]" />
            <span>Practice Missed Questions ({mistakeIds.length})</span>
          </div>
          <p className="text-xs text-[#8A5B4C] mt-1 max-w-xl font-serif">
            Target questions you previously missed to reinforce accurate statutory provisions.
          </p>
        </div>

        <button
          onClick={() => onPracticeMistakes(mistakeIds)}
          disabled={mistakeIds.length === 0}
          className="px-4 py-2 bg-[#CC785C] hover:bg-[#B66347] disabled:bg-[#E8E2DA] disabled:text-[#A8A29E] disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Practice ({mistakeIds.length})</span>
        </button>
      </div>

      {/* Strong vs Weak Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Needs Practice */}
        <div className="bg-white rounded-xl border border-[#E8E2DA] p-6 space-y-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE6]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CC785C]" />
              <h3 className="text-sm font-serif font-medium text-[#191919]">Needs Practice</h3>
            </div>
            <span className="text-[11px] font-mono text-[#78716C]">&lt;60% accuracy</span>
          </div>

          {weakAreas.length === 0 ? (
            <p className="text-xs text-[#78716C] font-serif italic py-4">
              No weak areas identified yet. Complete tests to surface targeted areas for review.
            </p>
          ) : (
            <div className="space-y-2">
              {weakAreas.map(item => (
                <div 
                  key={item.subject.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-[#E8E2DA]"
                >
                  <div>
                    <span className="text-xs font-medium text-[#191919] block">{item.subject.name}</span>
                    <span className="text-[11px] text-[#B66347] font-mono">
                      {item.percentage.toFixed(1)}% ({item.correct}/{item.totalAttempted})
                    </span>
                  </div>

                  <button
                    onClick={() => onPracticeSubject(item.subject.id)}
                    className="px-2.5 py-1 bg-white border border-[#E8E2DA] text-[#2A2825] hover:bg-[#F4EFEA] text-[11px] font-medium rounded transition-colors flex items-center gap-1"
                  >
                    <span>Practice</span>
                    <ArrowRight className="w-3 h-3 text-[#CC785C]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Strong Areas */}
        <div className="bg-white rounded-xl border border-[#E8E2DA] p-6 space-y-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE6]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#65A30D]" />
              <h3 className="text-sm font-serif font-medium text-[#191919]">Strong Areas</h3>
            </div>
            <span className="text-[11px] font-mono text-[#78716C]">≥70% accuracy</span>
          </div>

          {strongAreas.length === 0 ? (
            <p className="text-xs text-[#78716C] font-serif italic py-4">
              Complete more questions in specific subjects to establish your strong domains.
            </p>
          ) : (
            <div className="space-y-2">
              {strongAreas.map(item => (
                <div 
                  key={item.subject.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F5] border border-[#E8E2DA]"
                >
                  <div>
                    <span className="text-xs font-medium text-[#191919] block">{item.subject.name}</span>
                    <span className="text-[11px] text-[#3F6212] font-mono">
                      {item.percentage.toFixed(1)}% ({item.correct}/{item.totalAttempted})
                    </span>
                  </div>

                  <CheckCircle className="w-4 h-4 text-[#65A30D] shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent History Table */}
      <div className="bg-white rounded-xl border border-[#E8E2DA] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
        <div className="p-4 border-b border-[#F0ECE6] flex items-center justify-between">
          <h3 className="text-sm font-serif font-medium text-[#191919]">Recent Sessions</h3>
          <span className="text-[11px] font-mono text-[#78716C]">{attempts.length} Total</span>
        </div>

        {attempts.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#78716C] font-serif">
            No exam attempts recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#5C5852]">
              <thead className="bg-[#FAF8F5] text-[#2A2825] font-medium border-b border-[#E8E2DA]">
                <tr>
                  <th className="px-4 py-2.5">Session</th>
                  <th className="px-4 py-2.5">Date</th>
                  <th className="px-4 py-2.5">Score</th>
                  <th className="px-4 py-2.5">Questions</th>
                  <th className="px-4 py-2.5">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0ECE6]">
                {attempts.slice(0, 10).map(att => {
                  const scorePct = att.score !== undefined && att.questionIds.length > 0
                    ? (att.score / att.questionIds.length) * 100
                    : 0;

                  return (
                    <tr key={att.id} className="hover:bg-[#FAF8F5]">
                      <td className="px-4 py-2.5 font-medium text-[#191919]">{att.title}</td>
                      <td className="px-4 py-2.5 text-[#78716C] font-mono text-[11px]">
                        {new Date(att.startedAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[#191919]">
                        {att.score !== undefined ? `${att.score}/${att.questionIds.length}` : '-'}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[11px]">{att.questionIds.length} Qs</td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-medium border ${
                          scorePct >= 45
                            ? 'bg-[#F7FEE7] text-[#3F6212] border-[#D9F99D]'
                            : 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]'
                        }`}>
                          {scorePct >= 45 ? 'QUALIFIED' : 'BELOW 45%'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
