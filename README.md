# AIBE Prep

A production-quality, free, student-focused All India Bar Examination (AIBE) preparation web application built for public hosting on **GitHub Pages**.

> **Free. No Login Required. Zero Backend Dependencies.**  
> Built strictly adhering to the product and data specifications in [`IDEAS.md`](./IDEAS.md).

---

## 🌟 Key Features

1. **Previous-Year Exam Mode**
   - Exact past Bar Council of India question papers (AIBE XVIII, XVII, etc.)
   - Timed examination environment with warning thresholds
   - Full **Question Palette** with accessible states (Current, Answered, Unanswered, Marked for Review)
   - Preserve historical question ordering and verified official keys

2. **Subject-Wise Practice**
   - Complete 19-Subject Bar Council of India syllabus weightage breakdown
   - Dynamic question counts calculated directly from source data
   - Modular practice sessions: 10 questions or All questions per subject

3. **Practice Mock Test Engine**
   - 25, 50, and 100 question mock exam simulations
   - Option to practice across all 19 subjects or choose customized subject focus
   - Non-duplicating randomized question sampling

4. **Result & Answer Review Engine**
   - Automatic grading (1 mark per question, zero negative marking)
   - Real-time accuracy and pass threshold verification (≥45% standard mark)
   - Granular review filter: All, Wrong, Correct, Unanswered, Marked
   - Verified statutory provisions and landmark judgments displayed without fabricated AI answers

5. **Local Mastery & "Practice My Mistakes"**
   - All performance data stays securely in the student's browser (`localStorage`)
   - Automated identification of weak areas (<60% accuracy with minimum sample threshold)
   - One-click **Practice My Mistakes** session targeting questions answered incorrectly

6. **Searchable Question Bank**
   - Fast instant keyword search across questions, options, legal sections, and landmark case precedents

---

## 🏗️ Architecture & Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** `lucide-react` (semantic, accessible status indicators)
- **Local Storage:** Versioned storage engine (`storageService.ts`) with graceful fallbacks
- **Testing:** Vitest (`npm run test`)
- **Data Validation:** Automated question auditor (`npm run validate-data`)
- **Deployment:** GitHub Pages ready (`base: './'`, static bundle generation)

---

## 🚀 Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Validate Question Bank integrity
npm run validate-data

# 3. Run unit tests
npm run test

# 4. Start local development server
npm run dev
```

---

## 📦 Adding a New Examination or Questions

Adding future examinations does **not** require modifying React components:

1. **Add new question objects** to [`src/data/questions.ts`](./src/data/questions.ts) adhering to the `Question` interface:
   ```typescript
   {
     id: "q-const-005",
     question: "...",
     options: { A: "...", B: "...", C: "...", D: "..." },
     correctAnswer: "A",
     subjectId: "constitutional-law",
     year: 2024,
     examId: "aibe-xix",
     examName: "AIBE XIX",
     questionNumber: 1,
     verified: true
   }
   ```
2. **Register the exam** in [`src/data/exams.ts`](./src/data/exams.ts).
3. **Run validation**:
   ```bash
   npm run validate-data
   ```
4. **Deploy**: Push to `main` branch to trigger GitHub Actions automatic deployment to GitHub Pages.

---

## 🔒 Privacy & Safety

- No personal student identification or telemetry tracked.
- No remote database or credentials required.
- Safe rendering of legal texts with zero arbitrary HTML injection.
