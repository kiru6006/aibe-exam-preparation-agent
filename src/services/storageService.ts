import type { Attempt, QuestionPerformance, Answer } from '../types';

const STORAGE_VERSION = 1;
const STORAGE_PREFIX = `aibe_prep_v${STORAGE_VERSION}_`;

const KEYS = {
  ATTEMPTS: `${STORAGE_PREFIX}attempts`,
  PERFORMANCE: `${STORAGE_PREFIX}performance`,
  ACTIVE_ATTEMPT: `${STORAGE_PREFIX}active_attempt`
};

export const StorageService = {
  getAttempts(): Attempt[] {
    try {
      const data = localStorage.getItem(KEYS.ATTEMPTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Could not read attempts from localStorage", e);
      return [];
    }
  },

  getAttemptById(id: string): Attempt | null {
    const attempts = this.getAttempts();
    return attempts.find(a => a.id === id) || null;
  },

  saveAttempt(attempt: Attempt): void {
    try {
      const attempts = this.getAttempts();
      const existingIndex = attempts.findIndex(a => a.id === attempt.id);
      if (existingIndex >= 0) {
        attempts[existingIndex] = attempt;
      } else {
        attempts.unshift(attempt);
      }
      localStorage.setItem(KEYS.ATTEMPTS, JSON.stringify(attempts));
    } catch (e) {
      console.warn("Could not save attempt to localStorage", e);
    }
  },

  saveActiveSession(attempt: Attempt | null): void {
    try {
      if (attempt) {
        localStorage.setItem(KEYS.ACTIVE_ATTEMPT, JSON.stringify(attempt));
      } else {
        localStorage.removeItem(KEYS.ACTIVE_ATTEMPT);
      }
    } catch (e) {
      console.warn("Could not save active session to localStorage", e);
    }
  },

  getActiveSession(): Attempt | null {
    try {
      const data = localStorage.getItem(KEYS.ACTIVE_ATTEMPT);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn("Could not read active session from localStorage", e);
      return null;
    }
  },

  getPerformanceMap(): Record<string, QuestionPerformance> {
    try {
      const data = localStorage.getItem(KEYS.PERFORMANCE);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.warn("Could not read performance map from localStorage", e);
      return {};
    }
  },

  recordAnswerOutcomes(
    questions: { id: string; correct: boolean }[]
  ): void {
    try {
      const perfMap = this.getPerformanceMap();
      const now = new Date().toISOString();

      questions.forEach(q => {
        const current = perfMap[q.id] || {
          questionId: q.id,
          attempts: 0,
          correct: 0,
          wrong: 0,
          lastAttemptAt: now
        };

        current.attempts += 1;
        if (q.correct) {
          current.correct += 1;
        } else {
          current.wrong += 1;
        }
        current.lastAttemptAt = now;

        perfMap[q.id] = current;
      });

      localStorage.setItem(KEYS.PERFORMANCE, JSON.stringify(perfMap));
    } catch (e) {
      console.warn("Could not record question outcomes to localStorage", e);
    }
  },

  getMistakeQuestionIds(): string[] {
    const perfMap = this.getPerformanceMap();
    // Questions where student has failed more times than passed, or recent failure
    return Object.values(perfMap)
      .filter(p => p.wrong > 0 && p.correct < p.wrong)
      .sort((a, b) => b.wrong - a.wrong)
      .map(p => p.questionId);
  },

  clearAllData(): void {
    try {
      localStorage.removeItem(KEYS.ATTEMPTS);
      localStorage.removeItem(KEYS.PERFORMANCE);
      localStorage.removeItem(KEYS.ACTIVE_ATTEMPT);
    } catch (e) {
      console.warn("Could not clear localStorage", e);
    }
  }
};
