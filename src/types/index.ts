export type OptionKey = "A" | "B" | "C" | "D";
export type Answer = OptionKey | OptionKey[] | null;

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
  correctAnswer: OptionKey | OptionKey[] | null;
  subjectId: string;
  subjectName?: string;
  topicId?: string;
  year: number;
  examId: string;
  examName: string;
  set?: string;
  questionNumber: number;
  questionType?: string;
  explanation?: string;
  legalProvision?: string;
  caseLaw?: string;
  verified: boolean;
  status?: "active" | "withdrawn";
  scorable?: boolean;
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
  officialWeightage?: number; // Alias for convenience
  questionCount?: number;     // Runtime or bank count
  priority?: "Critical" | "High" | "Medium";
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
  scorableQuestions?: number;
  withdrawnQuestions?: number;
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
  scorableQuestions?: number;
  withdrawnQuestions?: number;
  examId?: string;
  subjectId?: string;
  result?: ExamResult;
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
  scorableTotal: number;
  withdrawn: number;
  withdrawnCount?: number;
  attempted: number;
  correct: number;
  wrong: number;
  unanswered: number;
  score: number;
  accuracy: number;
  completionRate: number;
  passed?: boolean;
}

export interface AibeStatistic {
  exam: string;
  examName?: string;
  year: number;
  examDate?: string;
  resultDate?: string;
  registered: number | null | string;
  appeared: number | null | string;
  cleared: number | null | string;
  passed?: number | null | string;
  passPercentage: number | null;
  withdrawnQuestions?: number;
  scorableQuestions?: number;
  source: string;
  sourceUrl?: string;
  sourceNote?: string;
  verified: boolean;
  notes?: string;
}

export interface StrategyItem {
  id: string;
  title: string;
  priority: "Critical" | "High" | "Medium";
  why: string;
  action: string[];
}

export interface SyllabusItem {
  subject: string;
  questions: number;
  priority: "Critical" | "High" | "Medium";
}

// ==========================================
// LEGAL QUICK REFERENCE & KNOWLEDGE GRAPH
// ==========================================

export type ContentTag = "Certain" | "Likely" | "Guessing" | "Verify";

export interface MindNode {
  id: string;
  label: string;
  title?: string;
  type?:
    | "root"
    | "chapter"
    | "concept"
    | "article"
    | "doctrine"
    | "case"
    | "topic"
    | "rule"
    | "trap";
  category?: "chapter" | "article" | "rule" | "trap" | "case" | "concept";
  article?: string;
  summary?: string;
  description?: string;
  caseName?: string;
  trap?: string;
  tag?: ContentTag;
  children?: MindNode[];
}

export interface QuickRefCase {
  id: string;
  name: string;
  year: number;
  holding: string;
  tag: ContentTag;
  links?: string[]; // Mindmap node IDs
  citation?: string;
  bench?: string;
  significance?: string;
  connectedArticles?: string[];
  connectedNodeId?: string;
  examFrequency?: string;
  connectedConcepts?: string[];
  article?: string;
}

export interface QuickRefSection {
  id: string;
  act?: string;
  sectionNumber?: string;
  article?: string;
  articleNumber?: string;
  title?: string;
  partOrChapter?: string;
  oldSection?: string;
  newSection?: string;
  topic?: string;
  rule: string;
  trap?: string;
  tag?: ContentTag;
  leadingCase?: string;
  aibeFrequency?: "High" | "Medium" | "Low";
  connectedCaseIds?: string[];
  connectedConceptIds?: string[];
  relatedCaseIds?: string[];
  relatedNodeIds?: string[];
  relatedConceptIds?: string[];
}

export interface QuickRefConcept {
  id: string;
  name?: string;
  title: string;
  summary: string;
  category?: string;
  keyRule?: string;
  leadingCase?: string;
  articles?: string[];
  chapterId?: string;
  nodeIds?: string[];
  sectionIds?: string[];
  caseIds?: string[];
  connectedConceptIds?: string[];
  relatedConceptIds?: string[];
  questionTopicIds?: string[];
  aibeTraps?: string;
  tag: ContentTag;
}

export interface QuickRefHotPoint {
  id: string;
  title: string;
  content?: string;
  point?: string;
  category?: string;
  type?: "distinction" | "exception" | "test" | "leading-case" | "statute";
  articleOrSection?: string;
  tag: ContentTag;
}

export interface QuickRefBridge {
  targetSubjectId: string;
  targetSubjectTitle: string;
  connectionTitle: string;
  description: string;
  sharedArticlesOrCases: string[];
}

export interface QuickRefTop15Item {
  id: string;
  rank: number;
  conceptId: string;
  nodeId: string;
  title: string;
  summary: string;
  examSignificance?: string;
  tag: ContentTag;
  leadingCase?: string;
  articleRef?: string;
}

export interface QuickRefSubject {
  subjectId: string;
  slug?: string;
  title: string;
  shortTitle?: string;
  weightage: number;
  priority: "Critical" | "High" | "Medium";
  tagline: string;
  metaStats: {
    chaptersCount: number;
    articlesCount: number;
    leadingCasesCount: number;
    aibeQuestionCount: number;
  };
  top15: QuickRefTop15Item[];
  mindmapRoot: MindNode;
  sections: QuickRefSection[];
  leadingCases: QuickRefCase[];
  concepts: QuickRefConcept[];
  hotPoints: QuickRefHotPoint[];
  bridges: QuickRefBridge[];
  mindmap?: MindNode[];
  cases?: QuickRefCase[];
  visualType?:
    | "article-map"
    | "decision-tree"
    | "case-lifecycle"
    | "evidence-map"
    | "concept-network";
}


