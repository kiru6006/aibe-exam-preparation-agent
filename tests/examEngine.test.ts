import { describe, it, expect } from 'vitest';
import { ExamEngine } from '../src/services/examEngine';
import { OFFICIAL_SUBJECTS } from '../src/data/subjects';
import { QUESTIONS_BANK } from '../src/data/questions';

describe('ExamEngine Unit Tests', () => {
  it('correctly calculates score and accuracy with standard 45% passing mark', () => {
    const qIds = ["q-const-001", "q-const-002", "q-crpc-001", "q-cpc-001"];
    
    // Answering 3 out of 4 correctly (75% >= 45% -> Pass)
    const answers = {
      "q-const-001": "C" as const, // correct
      "q-const-002": "B" as const, // correct
      "q-crpc-001": "B" as const,  // correct
      "q-cpc-001": "A" as const    // wrong (correct is C)
    };

    const result = ExamEngine.calculateResult(qIds, answers, 45);

    expect(result.total).toBe(4);
    expect(result.attempted).toBe(4);
    expect(result.correct).toBe(3);
    expect(result.wrong).toBe(1);
    expect(result.unanswered).toBe(0);
    expect(result.score).toBe(3);
    expect(result.accuracy).toBe(75);
    expect(result.passed).toBe(true);
  });

  it('correctly handles unanswered questions without penalty', () => {
    const qIds = ["q-const-001", "q-const-002"];
    const answers = {
      "q-const-001": "C" as const
      // q-const-002 is left unanswered
    };

    const result = ExamEngine.calculateResult(qIds, answers, 45);

    expect(result.total).toBe(2);
    expect(result.attempted).toBe(1);
    expect(result.correct).toBe(1);
    expect(result.unanswered).toBe(1);
    expect(result.score).toBe(1);
    expect(result.accuracy).toBe(100);
    expect(result.passed).toBe(true); // 50% >= 45%
  });

  it('generates mock test without duplicates and respects requested count', () => {
    const mock25 = ExamEngine.generateMock(OFFICIAL_SUBJECTS, 25);
    
    expect(mock25.length).toBeLessThanOrEqual(25);
    expect(mock25.length).toBeGreaterThan(0);

    // Verify all IDs are unique
    const idSet = new Set(mock25.map(q => q.id));
    expect(idSet.size).toBe(mock25.length);
  });

  it('filters questions accurately by subject', () => {
    const constQuestions = ExamEngine.getQuestionsBySubject("constitutional-law");
    expect(constQuestions.length).toBeGreaterThan(0);
    constQuestions.forEach(q => {
      expect(q.subjectId).toBe("constitutional-law");
    });
  });
});
