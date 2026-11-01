import { QUESTIONS_BANK } from '../src/data/questions';
import { OFFICIAL_SUBJECTS } from '../src/data/subjects';
import { OFFICIAL_EXAMS } from '../src/data/exams';

interface ValidationError {
  type: string;
  id: string;
  message: string;
}

function validateData(): boolean {
  console.log("=== AIBE QUESTION BANK & DATA VALIDATOR ===");
  const errors: ValidationError[] = [];
  const idSet = new Set<string>();
  const subjectIds = new Set(OFFICIAL_SUBJECTS.map(s => s.id));
  const examIds = new Set(OFFICIAL_EXAMS.map(e => e.id));

  // 1. Validate Questions
  QUESTIONS_BANK.forEach((q, idx) => {
    // Unique ID
    if (!q.id) {
      errors.push({ type: "Question", id: `Index ${idx}`, message: "Missing ID" });
    } else if (idSet.has(q.id)) {
      errors.push({ type: "Question", id: q.id, message: "Duplicate ID" });
    } else {
      idSet.add(q.id);
    }

    // Question content
    if (!q.question || q.question.trim().length === 0) {
      errors.push({ type: "Question", id: q.id, message: "Empty question text" });
    }

    // Exactly 4 options
    const options = q.options;
    if (!options || typeof options !== 'object') {
      errors.push({ type: "Question", id: q.id, message: "Missing options object" });
    } else {
      const keys = ['A', 'B', 'C', 'D'] as const;
      keys.forEach(k => {
        if (!options[k] || options[k].trim().length === 0) {
          errors.push({ type: "Question", id: q.id, message: `Missing option ${k}` });
        }
      });
    }

    // Valid answer
    if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) {
      errors.push({ type: "Question", id: q.id, message: `Invalid correctAnswer: ${q.correctAnswer}` });
    }

    // Valid subject reference
    if (!q.subjectId || !subjectIds.has(q.subjectId)) {
      errors.push({ type: "Question", id: q.id, message: `Unknown subjectId: ${q.subjectId}` });
    }

    // Valid exam reference
    if (!q.examId || !examIds.has(q.examId)) {
      errors.push({ type: "Question", id: q.id, message: `Unknown examId: ${q.examId}` });
    }

    // Valid year and number
    if (!q.year || q.year < 2010 || q.year > 2030) {
      errors.push({ type: "Question", id: q.id, message: `Invalid year: ${q.year}` });
    }

    if (!q.questionNumber || q.questionNumber <= 0) {
      errors.push({ type: "Question", id: q.id, message: `Invalid question number: ${q.questionNumber}` });
    }
  });

  // 2. Validate Exams reference valid questions
  OFFICIAL_EXAMS.forEach(exam => {
    exam.questionIds.forEach(qid => {
      if (!idSet.has(qid)) {
        errors.push({ type: "Exam", id: exam.id, message: `Broken question reference: ${qid}` });
      }
    });
  });

  console.log(`Total Questions Audited: ${QUESTIONS_BANK.length}`);
  console.log(`Total Exams Audited: ${OFFICIAL_EXAMS.length}`);
  console.log(`Total Subjects Audited: ${OFFICIAL_SUBJECTS.length}`);

  if (errors.length > 0) {
    console.error(`\n❌ DATA VALIDATION FAILED WITH ${errors.length} ERROR(S):`);
    errors.forEach(e => console.error(`  - [${e.type} ${e.id}] ${e.message}`));
    return false;
  }

  console.log("\n✅ ALL QUESTION BANK DATA AUDITED AND VALIDATED SUCCESSFULLY.");
  return true;
}

const success = validateData();
if (!success) {
  process.exit(1);
}
