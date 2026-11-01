export type OptionKey = "A" | "B" | "C" | "D";
export type Answer = OptionKey | null;

export type QuestionType =
  | "mcq"
  | "assertion-reason"
  | "statement"
  | "statement-conclusion"
  | "case-based"
  | "other";

export interface Question {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: OptionKey;
  subjectId: string;
  topicId?: string;
  year: number;
  examId: string;
  examName: string;
  set?: string;
  questionNumber: number;
  questionType?: QuestionType;
  explanation?: string;
  legalProvision?: string;
  caseLaw?: string;
  verified: boolean;
  source?: {
    exam: string;
    year: number;
    set?: string;
    questionNumber: number;
  };
}

export interface Subject {
  id: string;
  name: string;
  shortName?: string;
  weightageQuestions: number; // Standard AIBE official weightage
  description?: string;
  topics?: {
    id: string;
    name: string;
  }[];
}

export interface Exam {
  id: string;
  name: string;
  year: number;
  set?: string;
  questionIds: string[];
  durationMinutes?: number;
  totalQuestions: number;
  marksPerQuestion?: number;
  negativeMarking?: boolean;
  passPercentage?: number;
}

export type AttemptType = "previous-paper" | "subject" | "topic" | "mock" | "mistakes";

export interface Attempt {
  id: string;
  type: AttemptType;
  title: string;
  questionIds: string[];
  answers: Record<string, Answer>;
  markedForReview: string[];
  startedAt: string;
  completedAt?: string;
  durationSeconds?: number;
  score?: number;
  totalQuestions: number;
  examId?: string;
  subjectId?: string;
}

export interface QuestionPerformance {
  questionId: string;
  attempts: number;
  correct: number;
  wrong: number;
  lastAttemptAt: string;
}

export interface ExamResult {
  total: number;
  attempted: number;
  correct: number;
  wrong: number;
  unanswered: number;
  score: number;
  accuracy: number;
  completionRate: number;
  passed?: boolean;
}
