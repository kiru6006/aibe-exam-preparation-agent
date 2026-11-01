import { describe, it, expect } from 'vitest';
import { ExamEngine } from '../src/services/examEngine';
import { OFFICIAL_SUBJECTS } from '../src/data/subjects';
import { QUESTIONS_BANK } from '../src/data/questions';

describe('ExamEngine Unit Tests', () => {
  it('correctly calculates score and accuracy with standard 45% passing mark on scorable questions', () => {
    // Pick 4 scorable questions
    const scorableQs = QUESTIONS_BANK.filter(q => q.scorable).slice(0, 4);
    const qIds = scorableQs.map(q => q.id);
    
    // Answering first 3 correctly, 4th incorrectly
    const answers: Record<string, any> = {};
    answers[scorableQs[0].id] = Array.isArray(scorableQs[0].correctAnswer) ? scorableQs[0].correctAnswer[0] : scorableQs[0].correctAnswer;
    answers[scorableQs[1].id] = Array.isArray(scorableQs[1].correctAnswer) ? scorableQs[1].correctAnswer[0] : scorableQs[1].correctAnswer;
    answers[scorableQs[2].id] = Array.isArray(scorableQs[2].correctAnswer) ? scorableQs[2].correctAnswer[0] : scorableQs[2].correctAnswer;
    answers[scorableQs[3].id] = (scorableQs[3].correctAnswer === 'A' || (Array.isArray(scorableQs[3].correctAnswer) && scorableQs[3].correctAnswer.includes('A'))) ? 'B' : 'A';

    const result = ExamEngine.calculateResult(qIds, answers, 45);

    expect(result.total).toBe(4);
    expect(result.scorableTotal).toBe(4);
    expect(result.withdrawn).toBe(0);
    expect(result.attempted).toBe(4);
    expect(result.correct).toBe(3);
    expect(result.wrong).toBe(1);
    expect(result.unanswered).toBe(0);
    expect(result.score).toBe(3);
    expect(result.accuracy).toBe(75);
    expect(result.passed).toBe(true);
  });

  it('correctly ignores withdrawn questions in score calculations and unattempted count (Section 5)', () => {
    const scorableQ = QUESTIONS_BANK.find(q => q.scorable)!;
    const withdrawnQ = QUESTIONS_BANK.find(q => q.status === 'withdrawn')!;

    const qIds = [scorableQ.id, withdrawnQ.id];
    const answers: Record<string, any> = {};
    answers[scorableQ.id] = Array.isArray(scorableQ.correctAnswer) ? scorableQ.correctAnswer[0] : scorableQ.correctAnswer;
    // withdrawnQ has no answer or any answer

    const result = ExamEngine.calculateResult(qIds, answers, 45);

    expect(result.total).toBe(2);
    expect(result.withdrawn).toBe(1);
    expect(result.scorableTotal).toBe(1);
    expect(result.attempted).toBe(1);
    expect(result.correct).toBe(1);
    expect(result.unanswered).toBe(0); // Withdrawn question must not count as unanswered
    expect(result.score).toBe(1);
    expect(result.accuracy).toBe(100);
    expect(result.passed).toBe(true);
  });

  it('generates mock test without duplicates and respects requested count', () => {
    const mock25 = ExamEngine.generateMock(OFFICIAL_SUBJECTS, 25);
    
    expect(mock25.length).toBeLessThanOrEqual(25);
    expect(mock25.length).toBeGreaterThan(0);

    // Verify all IDs are unique and none are withdrawn
    const idSet = new Set(mock25.map(q => q.id));
    expect(idSet.size).toBe(mock25.length);
    mock25.forEach(q => {
      expect(q.status).not.toBe('withdrawn');
    });
  });

  it('filters questions accurately by subject', () => {
    const constQuestions = ExamEngine.getQuestionsBySubject("constitutional-law");
    expect(constQuestions.length).toBeGreaterThan(0);
    constQuestions.forEach(q => {
      expect(q.subjectId).toBe("constitutional-law");
    });
  });
});
