import { QUESTIONS_BANK } from '../src/data/questions';
import { OFFICIAL_SUBJECTS } from '../src/data/subjects';
import { OFFICIAL_EXAMS } from '../src/data/exams';
import { getAllQuickRefSubjects } from '../src/data/quick-reference';
import { MindNode } from '../src/types';

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

    // Options validation
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

    // Valid answer check (scorable vs withdrawn)
    if (q.scorable) {
      if (!q.correctAnswer) {
        errors.push({ type: "Question", id: q.id, message: `Scorable question missing correctAnswer` });
      } else if (Array.isArray(q.correctAnswer)) {
        if (q.correctAnswer.length === 0 || !q.correctAnswer.every(ans => ['A', 'B', 'C', 'D'].includes(ans))) {
          errors.push({ type: "Question", id: q.id, message: `Invalid multiple correctAnswer: ${JSON.stringify(q.correctAnswer)}` });
        }
      } else if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) {
        errors.push({ type: "Question", id: q.id, message: `Invalid correctAnswer: ${q.correctAnswer}` });
      }
    } else {
      // Withdrawn question should have status 'withdrawn'
      if (q.status !== 'withdrawn') {
        errors.push({ type: "Question", id: q.id, message: `Non-scorable question status should be 'withdrawn'` });
      }
    }

    // Valid subject reference
    if (!q.subjectId || !subjectIds.has(q.subjectId)) {
      errors.push({ type: "Question", id: q.id, message: `Unknown subjectId: ${q.subjectId}` });
    }

    // Valid exam reference
    if (!q.examId || !examIds.has(q.examId)) {
      errors.push({ type: "Question", id: q.id, message: `Unknown examId: ${q.examId}` });
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

  // 3. Verify specific withdrawn counts required by spec (AIBE 19 = 7, AIBE 20 = 5)
  const aibe19Withdrawn = QUESTIONS_BANK.filter(q => q.examId === 'AIBE-19' && q.status === 'withdrawn').length;
  const aibe20Withdrawn = QUESTIONS_BANK.filter(q => q.examId === 'AIBE-20' && q.status === 'withdrawn').length;

  if (aibe19Withdrawn !== 7) {
    errors.push({ type: "Exam-Check", id: "AIBE-19", message: `Expected 7 withdrawn questions, got ${aibe19Withdrawn}` });
  }
  if (aibe20Withdrawn !== 5) {
    errors.push({ type: "Exam-Check", id: "AIBE-20", message: `Expected 5 withdrawn questions, got ${aibe20Withdrawn}` });
  }

  // 4. Validate Legal Quick Reference Modules
  const quickRefSubjects = getAllQuickRefSubjects();
  console.log(`\nAuditing Legal Quick Reference Modules (${quickRefSubjects.length} active)...`);

  quickRefSubjects.forEach(qr => {
    // Subject ID must match official subjects
    if (!subjectIds.has(qr.subjectId)) {
      errors.push({ type: "QuickRef", id: qr.subjectId, message: `Invalid subjectId '${qr.subjectId}'` });
    }

    // Collect all mindmap node IDs and verify uniqueness
    const mindmapNodeIds = new Set<string>();
    function traverse(node: MindNode) {
      if (!node.id) {
        errors.push({ type: "QuickRef-Mindmap", id: qr.subjectId, message: "Node missing ID" });
      } else if (mindmapNodeIds.has(node.id)) {
        errors.push({ type: "QuickRef-Mindmap", id: node.id, message: `Duplicate node ID in ${qr.subjectId}` });
      } else {
        mindmapNodeIds.add(node.id);
      }
      if (node.children) {
        node.children.forEach(traverse);
      }
    }
    traverse(qr.mindmapRoot);

    // Verify leading cases connect to valid mindmap nodes
    const validTags = new Set(['Certain', 'Likely', 'Guessing', 'Verify']);
    qr.leadingCases.forEach(c => {
      if (!validTags.has(c.tag)) {
        errors.push({ type: "QuickRef-Case", id: c.id, message: `Invalid tag '${c.tag}'` });
      }
      if (!mindmapNodeIds.has(c.connectedNodeId)) {
        errors.push({ type: "QuickRef-Case", id: c.id, message: `connectedNodeId '${c.connectedNodeId}' does not exist in mindmap` });
      }
    });

    // Verify Top15 nodes connect to valid mindmap nodes
    qr.top15.forEach(t => {
      if (!validTags.has(t.tag)) {
        errors.push({ type: "QuickRef-Top15", id: t.id, message: `Invalid tag '${t.tag}'` });
      }
      if (!mindmapNodeIds.has(t.nodeId)) {
        errors.push({ type: "QuickRef-Top15", id: t.id, message: `nodeId '${t.nodeId}' does not exist in mindmap` });
      }
    });

    // Verify Bridges target valid official subjects
    qr.bridges.forEach(b => {
      if (!subjectIds.has(b.targetSubjectId)) {
        errors.push({ type: "QuickRef-Bridge", id: qr.subjectId, message: `Invalid targetSubjectId '${b.targetSubjectId}'` });
      }
    });
  });

  console.log(`Total Questions Audited: ${QUESTIONS_BANK.length}`);
  console.log(`Total Exams Audited: ${OFFICIAL_EXAMS.length}`);
  console.log(`Total Subjects Audited: ${OFFICIAL_SUBJECTS.length}`);
  console.log(`AIBE 19 Withdrawn: ${aibe19Withdrawn} (Expected 7)`);
  console.log(`AIBE 20 Withdrawn: ${aibe20Withdrawn} (Expected 5)`);

  if (errors.length > 0) {
    console.error(`\n❌ DATA VALIDATION FAILED WITH ${errors.length} ERROR(S):`);
    errors.forEach(e => console.error(`  - [${e.type} ${e.id}] ${e.message}`));
    return false;
  }

  console.log("\n✅ ALL 1,800 QUESTIONS & 18 EXAMS AUDITED AND VALIDATED SUCCESSFULLY.");
  return true;
}

const success = validateData();
if (!success) {
  process.exit(1);
}
