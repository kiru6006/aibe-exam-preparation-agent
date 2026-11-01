# BUILD AIBE PREP
## Free AIBE Previous-Year Question & Practice Platform

You are acting as a senior product architect, frontend architect, UX designer, assessment-engine engineer, data architect, QA engineer, and GitHub Pages deployment engineer.

Build a production-quality, free, student-focused AIBE preparation web application.

The application will be published publicly through GitHub Pages.

The project owner will provide:

- AIBE syllabus
- Previous-year AIBE question papers
- Question collections
- Answer keys / correct answers
- Subject-wise or chapter-wise reference material where available

The supplied question and answer content is intended by the project owner to be published for free student use.

Do not invent questions, answers, syllabus information, legal provisions, case law, statistics, or exam rules.

When source information is unavailable, preserve the missing field instead of guessing.

---

# 1. PRODUCT VISION

Do NOT build a:

> "PDF viewer converted into a website."

Do NOT build a:

> "dashboard full of statistics."

Build:

> A lightweight AIBE preparation engine that converts previous-year questions into an interactive learning experience.

The core learning loop is:

```text
ATTEMPT
   ↓
EVALUATE
   ↓
REVIEW
   ↓
IDENTIFY WEAKNESS
   ↓
PRACTICE
   ↓
REATTEMPT
```

Every major feature should support this loop.

---

# 2. CHALLENGE THE PRODUCT BEFORE CODING

Before implementation, inspect the supplied source material and produce a short architecture assessment.

Identify:

1. What data actually exists.
2. How many exams exist.
3. How many questions exist.
4. Whether every question has four options.
5. Whether every question has a verified answer.
6. Whether subject information exists.
7. Whether topic information exists.
8. Whether answer keys use consistent formats.
9. Whether duplicate questions exist.
10. Whether question numbering changes between papers/sets.
11. Whether multiple sets of the same examination exist.
12. Whether the syllabus has changed over time.
13. Whether historical questions can be confidently mapped to the current syllabus.
14. Which fields require human verification.

Do not silently resolve inconsistencies.

Create a data-quality report.

Example:

```text
AIBE DATA AUDIT

Examinations found: XX
Questions found: XXXX
Questions with answers: XXXX
Questions without verified answers: XX
Questions without subject: XX
Questions requiring classification: XX
Potential duplicates: XX
Multiple paper/set variations: XX
```

The exact numbers must come from the supplied data.

---

# 3. DO NOT OVER-ENGINEER

The student-facing application must NOT have:

- Backend
- Database
- Authentication
- User accounts
- Payment
- Admin login
- Runtime AI API
- External question API
- Server-side session management

Use static data and browser storage.

The application must be deployable to GitHub Pages.

---

# 4. TECHNOLOGY

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- Minimal accessible component library where useful
- React Router only if genuinely required
- localStorage for student history

Prefer fewer dependencies.

Do not introduce Redux, Zustand, TanStack Query, Axios, backend SDKs, or other large libraries unless there is a demonstrated need.

This application does not fetch runtime data from a server.

---

# 5. GITHUB PAGES FIRST

Design the application for GitHub Pages from the beginning.

Do not build it as a traditional server application and try to deploy it to GitHub Pages later.

Prefer the simplest reliable routing strategy.

If standard browser routing creates GitHub Pages refresh/404 problems, use HashRouter rather than adding unnecessary deployment complexity.

The deployed URL must work correctly when:

- Opening the homepage
- Refreshing a page
- Opening the exam page
- Opening a result page
- Opening a subject page
- Using the browser back button

---

# 6. CORE STUDENT FEATURES

V1 must contain only the features that materially help students.

## Primary navigation

```text
Home
Previous Papers
Subjects
Mock Test
My Performance
```

Do not add unnecessary sections.

---

# 7. HOME PAGE

Build a clean landing page.

Primary message:

```text
AIBE PREP

Practice Previous-Year AIBE Questions.
Prepare Subject by Subject.
Test Yourself With Mock Exams.

Free. No Login Required.
```

Primary actions:

```text
[Previous Year Papers]

[Subject Practice]

[Mock Test]
```

Below that, show useful information derived from actual data:

```text
Previous-Year Exams
Questions Available
Subjects Covered
```

Do not use fake or manually entered numbers.

---

# 8. PREVIOUS-YEAR EXAM MODE

This is one of the primary features.

Display available examinations based entirely on the supplied data.

Example:

```text
AIBE XXI
100 Questions

[Start Exam]
```

Do not assume every examination contains 100 questions.

Read the actual exam configuration from data.

For each examination store:

```typescript
interface Exam {
  id: string;
  name: string;
  year: number;
  set?: string;
  questionIds: string[];
  durationMinutes?: number;
  totalQuestions: number;
  marksPerQuestion?: number;
  negativeMarking?: boolean;
}
```

If the source contains multiple sets:

```text
AIBE XXI - Set A
AIBE XXI - Set B
AIBE XXI - Set C
AIBE XXI - Set D
```

preserve the distinction.

Do not incorrectly merge different sets.

---

# 9. EXAM EXPERIENCE

Build a focused exam interface.

Required:

- Question
- Four answer choices
- Previous
- Next
- Question number
- Progress
- Answer status
- Mark for review
- Clear answer
- Question navigation
- Submit

The student must be able to move freely between questions.

---

# 10. QUESTION PALETTE

Provide a question navigation palette.

Example:

```text
01 ✓
02 ✓
03
04 ⚑
05 ✓
06
07
08 ⚑
```

Statuses:

- Current
- Answered
- Unanswered
- Marked for review

Do not communicate status using color alone.

Use icons/text/ARIA states as well.

---

# 11. TIMER

Only show a timer when the source exam has a verified duration.

Do not assume all historical examinations use the same duration.

The exam configuration must control:

```typescript
durationMinutes?: number
```

Timer behaviour:

- Start when exam starts.
- Continue while navigating.
- Warn before expiry.
- Auto-submit at expiry if configured.
- Save current state locally.

Do not create fake timing rules.

---

# 12. ANSWER STATE

Represent answers explicitly.

```typescript
type Answer = "A" | "B" | "C" | "D" | null;
```

Store:

```typescript
interface Attempt {
  id: string;
  type: "previous-paper" | "subject" | "topic" | "mock" | "mistakes";

  questionIds: string[];

  answers: Record<string, Answer>;

  markedForReview: string[];

  startedAt: string;
  completedAt?: string;

  score?: number;
}
```

---

# 13. RESULT ENGINE

After submission calculate:

- Score
- Correct
- Wrong
- Unanswered
- Accuracy
- Attempted
- Completion rate

Do not hard-code pass/fail thresholds.

Only show pass/fail when the applicable official exam configuration explicitly provides a threshold.

Example:

```text
72 / 100

Correct       72
Wrong         21
Unanswered     7

Accuracy      77.4%
```

---

# 14. ANSWER REVIEW

This is more important than the statistics page.

After submission provide:

```text
Review Answers

All
Correct
Wrong
Unanswered
Marked
```

Each question should show:

```text
Question 12

[Question]

Your answer:
B. ...

Correct answer:
C. ...

✗ Incorrect

Subject:
Constitutional Law

Topic:
Fundamental Rights
```

If explanation data exists:

```text
Explanation
...
```

If explanation data does not exist:

DO NOT INVENT ONE.

Simply omit the explanation section.

---

# 15. QUESTION DATA MODEL

Use a central question bank.

Do NOT make each year JSON file the only source of truth.

Use:

```typescript
interface Question {
  id: string;

  question: string;

  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };

  correctAnswer: "A" | "B" | "C" | "D";

  subjectId?: string;
  topicId?: string;

  year: number;
  examId: string;
  examName: string;

  set?: string;
  questionNumber: number;

  questionType?:
    | "mcq"
    | "assertion-reason"
    | "statement"
    | "statement-conclusion"
    | "case-based"
    | "other";

  explanation?: string;

  verified: boolean;

  source?: {
    exam: string;
    year: number;
    set?: string;
    questionNumber: number;
  };
}
```

---

# 16. PRESERVE ORIGINAL QUESTION CONTEXT

Never destroy the original exam information when creating subject-wise questions.

A question must retain:

```text
Original Exam
Year
Set
Question Number
Original Wording
Original Options
Original Answer
```

Subject/topic classification is additional metadata.

It must never replace the original context.

---

# 17. SUBJECT-WISE PRACTICE

This is the second major feature.

Create:

```text
Subjects

Constitutional Law
Criminal Law
Criminal Procedure
Evidence
Civil Procedure
Family Law
Contract Law
Property Law
Professional Ethics
...
```

The exact subjects must come from the supplied syllabus/reference data.

Do not invent the subject list.

Display question counts dynamically.

Example:

```text
Constitutional Law
124 Questions

[Practice 10]
[Practice 25]
[Practice All]
```

---

# 18. TOPIC-WISE PRACTICE

Support:

```text
Subject
   ↓
Topic
   ↓
Questions
```

For example:

```text
Constitutional Law

Fundamental Rights
Directive Principles
Judiciary
Parliament
Federalism
...
```

However:

IMPORTANT:

Do not force every historical question into an invented topic.

If the classification is uncertain:

```text
Needs Classification
```

Keep the question available under the subject if the subject is reliable.

---

# 19. SUBJECT CLASSIFICATION

The application must distinguish between:

### Source fact

"This question appeared in AIBE XXI."

### Classification

"This question is classified as Constitutional Law."

The second is a derived classification.

Store classification confidence during data preparation if useful:

```typescript
classificationConfidence?: "high" | "medium" | "low";
```

Low-confidence classifications must be reviewable.

---

# 20. HISTORICAL VS CURRENT SYLLABUS

This is a critical requirement.

Do not assume:

```text
Historical syllabus = Current syllabus
```

Historical questions should retain their original year/exam.

The current syllabus should control:

- Current subject practice
- Mock-test distribution
- Future question classification
- Current preparation structure

Where a historical question maps cleanly to a current subject, map it.

Where it does not:

```text
Historical / Other
```

or flag it for review.

Do not silently distort historical data to fit the current syllabus.

---

# 21. MOCK TEST ENGINE

Build three simple modes:

```text
25 Questions
50 Questions
100 Questions
```

Allow:

```text
All Subjects
Selected Subjects
```

For current-syllabus mocks, use the configured syllabus distribution.

Do not claim:

> "This is an official AIBE mock."

It is a practice simulation.

Label it clearly:

> Practice Mock Test

---

# 22. MOCK TEST GENERATION

The generator must:

1. Select eligible questions.
2. Avoid duplicates.
3. Respect requested question count.
4. Respect selected subjects.
5. Respect syllabus distribution when configured.
6. Randomize question order.
7. Randomize options only if doing so will not break source integrity.

Prefer NOT to randomize answer options in V1.

Preserve the original A/B/C/D structure.

---

# 23. RANDOMIZATION

Randomize:

- Question order in generated mock tests.

Do not automatically randomize:

- Answer options
- Historical paper question order

For Previous-Year Exam mode, preserve original order exactly.

---

# 24. PRACTICE MY MISTAKES

Use localStorage.

Whenever a student answers incorrectly, record the question ID.

Create:

```text
Practice My Mistakes

34 Questions
[Start Practice]
```

Do not permanently delete a question simply because it was answered correctly once.

Use a simple mastery model.

Example:

```typescript
interface QuestionPerformance {
  questionId: string;
  attempts: number;
  correct: number;
  wrong: number;
  lastAttemptAt: string;
}
```

Then recommend questions with:

- High wrong count
- Low accuracy
- Recent incorrect attempt

Do not create an unnecessarily complex spaced-repetition algorithm in V1.

---

# 25. PERFORMANCE

Create a useful performance page.

Show:

```text
My Performance

Attempts
Best Score
Average Score
Questions Attempted
```

Then:

```text
Strong Areas

Evidence       82%
Family Law     80%
```

and:

```text
Needs Practice

Criminal Procedure     51%
Constitutional Law     62%
```

Most important:

Every weak area must have an action.

```text
Criminal Procedure
51%

[Practice 20 Questions]
```

Do not build a dashboard that only displays numbers.

---

# 26. PERFORMANCE CALCULATION

Subject performance must be based on actual attempted questions.

Do not calculate:

> "Student is weak in Evidence"

unless the student has attempted enough Evidence questions.

Define a minimum sample threshold.

For example:

```text
Minimum 5 attempted questions
```

Make this configurable.

If there is insufficient data:

```text
Not enough attempts yet
```

Do not make misleading recommendations.

---

# 27. QUESTION BANK SEARCH

Add search/filter capability.

Search by:

- Question text
- Subject
- Topic
- Year
- Exam
- Question number

This is useful for students who want to quickly revisit a known question.

---

# 28. DATA PREPARATION PIPELINE

Create a separate development/data-processing area.

This does NOT need to be exposed to students.

Pipeline:

```text
SOURCE FILES
     ↓
EXTRACT
     ↓
NORMALIZE
     ↓
PARSE QUESTIONS
     ↓
PARSE OPTIONS
     ↓
MATCH ANSWERS
     ↓
CLASSIFY SUBJECT
     ↓
CLASSIFY TOPIC
     ↓
DETECT DUPLICATES
     ↓
VALIDATE
     ↓
HUMAN REVIEW
     ↓
PUBLISH STATIC JSON
```

---

# 29. DO NOT LET AI INVENT DATA

AI may assist with:

- Parsing
- Normalization
- Subject classification
- Topic classification
- Duplicate detection

AI must NOT silently invent:

- Correct answers
- Question text
- Options
- Legal provisions
- Case citations
- Explanations

If answer extraction is uncertain:

```text
verified: false
```

and place it in a review report.

---

# 30. HUMAN VERIFICATION

Create a review report such as:

```text
QUESTIONS REQUIRING REVIEW

Q-00123
Reason:
Answer key not found

Q-00456
Reason:
Subject classification uncertain

Q-00789
Reason:
Potential duplicate

Q-00891
Reason:
OCR extraction issue
```

The publication pipeline should support a rule:

```text
Only verified questions enter production.
```

Unless explicitly configured otherwise.

---

# 31. QUESTION VALIDATION

Create an automated validator.

Check:

- Unique ID
- Non-empty question
- Exactly four options
- Valid answer
- Valid exam
- Valid year
- Valid question number
- Valid subject where present
- Valid topic where present
- No broken references
- No duplicate IDs
- No duplicate exam question numbers

Example output:

```text
QUESTION BANK VALIDATION

Total: 1,250

Valid: 1,230

Errors:
Missing answer: 5
Invalid options: 3
Missing subject: 7
Duplicate IDs: 2
Broken exam reference: 3
```

Critical errors must fail the build.

---

# 32. DUPLICATE DETECTION

Detect:

### Exact duplicate

Same question text.

### Near duplicate

Similar question text.

### Same question across examinations

The same question may legitimately appear in multiple exams.

Do NOT automatically remove it.

Store its historical appearances.

Example:

```text
Question Q-00123

Appeared:
AIBE 2019 - Q37
AIBE 2022 - Q51
AIBE 2025 - Q18
```

This is valuable learning information.

---

# 33. MULTIPLE SETS

If an examination has Set A, B, C, D:

Do not assume that the questions are different.

Create:

```text
Exam
 ├── Set A
 ├── Set B
 ├── Set C
 └── Set D
```

If the sets contain the same questions in different orders, preserve the original set ordering.

If the question content differs, preserve them as separate exam questions.

---

# 34. QUESTION TYPE HANDLING

The source data may contain:

- Direct MCQ
- Assertion/Reason
- Statements
- Statement/Conclusion
- Case-based questions
- Other structured questions

The UI should preserve the question wording.

Do not rewrite the legal question.

All questions ultimately resolve to one selected option:

```text
A
B
C
D
```

The supplied AIBE material demonstrates that questions can include Assertion/Reason and statement/conclusion structures, so the parser and UI must not assume every question is a one-line MCQ.

---

# 35. NO RUNTIME PDF

Do not ship source PDFs as the application content.

Extract structured data during preparation.

The production application should load:

```text
JSON
```

not:

```text
PDF
```

This keeps the site faster and easier to maintain.

---

# 36. DATA FILE STRUCTURE

Use a structure similar to:

```text
src/
  data/
    syllabus/
      current.json

    exams/
      aibe-xx.json
      aibe-xxi.json

    questions/
      questions.json

    subjects/
      subjects.json

  components/
  pages/
  services/
  hooks/
  utils/
  types/
```

Do not create hundreds of unnecessary tiny JSON files.

Start with a single normalized question collection and split it only if bundle size actually becomes a problem.

---

# 37. IMPORTANT: DO NOT PREMATURELY OPTIMIZE

A few thousand MCQs stored as static JSON is normally manageable for a modern browser.

Do not introduce:

- IndexedDB
- Backend pagination
- Database
- API layer
- Server-side search

unless actual data size or performance testing demonstrates a need.

Keep V1 simple.

---

# 38. LOCAL STORAGE ARCHITECTURE

Create one storage service:

```text
services/storageService.ts
```

It must handle:

- Attempts
- Question performance
- Mistakes
- Preferences

Do not scatter raw localStorage calls across components.

Use a storage version:

```typescript
const STORAGE_VERSION = 1;
```

Support future migrations.

If localStorage is unavailable or corrupted, the app must still function for the current session.

---

# 39. PRIVACY

Do not collect:

- Name
- Email
- Phone
- Location
- Student identity

The application should work without personal information.

All performance data stays in the student's browser.

---

# 40. ACCESSIBILITY

Implement:

- Keyboard navigation
- Proper radio-button semantics
- Visible focus
- Screen-reader labels
- Accessible question navigation
- Accessible timer warnings
- No color-only status indicators

---

# 41. MOBILE-FIRST

A significant number of students may use mobile devices.

The exam screen must work well on:

- Mobile
- Tablet
- Desktop

Mobile layout:

```text
Question
↓
Options
↓
Progress
↓
Previous / Next
```

Question palette should become a drawer or compact panel.

Do not sacrifice exam usability for decorative UI.

---

# 42. VISUAL DESIGN

Use a professional education/legal-study visual style.

Priorities:

1. Readability
2. Question visibility
3. Fast navigation
4. Clear answer states
5. Mobile usability

Avoid:

- Excessive gradients
- Huge hero sections
- Excessive animations
- Decorative charts
- Fake AI branding
- Generic SaaS dashboard appearance

The student came to answer legal questions.

The question must remain the main visual element.

---

# 43. EXPLANATIONS

Do not make explanations mandatory in V1.

If verified explanations are available:

```text
Why?
Legal basis
```

show them.

If not available:

do not invent them.

The data model should support future:

```text
explanation
legalProvision
caseLaw
```

without requiring them now.

---

# 44. AI IS A FUTURE FEATURE

Do not add runtime AI in V1.

Future possibility:

```text
Question
↓
Student Answer
↓
Correct Answer
↓
AI Explanation
↓
Relevant Legal Provision
↓
Case Law
↓
Related Questions
```

If this is added later, it must use a secure backend or serverless function.

Never put an LLM API key directly into the GitHub Pages frontend.

---

# 45. PWA

Do not make PWA functionality mandatory for V1.

First make the web application reliable.

If the application works well, optionally add:

- Installable PWA
- Cached static content
- Offline use

Only after the basic product is stable.

---

# 46. TESTING

Write unit tests for:

- Score calculation
- Correct/wrong evaluation
- Unanswered handling
- Subject filtering
- Topic filtering
- Mock generation
- Duplicate prevention
- Performance calculation
- Weak-area calculation
- LocalStorage

Test exam flow:

```text
Open
→ Select Exam
→ Start
→ Answer
→ Navigate
→ Mark
→ Submit
→ Result
→ Review
```

Test subject flow:

```text
Subjects
→ Subject
→ Practice
→ Result
```

Test mock flow:

```text
Mock
→ 25/50/100
→ Generate
→ Attempt
→ Result
```

---

# 47. DATA TESTING

Before publishing:

```text
npm run validate-data
```

must validate the entire question bank.

Then:

```text
npm run test
```

Then:

```text
npm run build
```

Only then deploy.

---

# 48. GITHUB ACTIONS

Create:

```text
.github/workflows/deploy.yml
```

Pipeline:

```text
Checkout
↓
Install
↓
Type Check
↓
Validate Question Data
↓
Run Tests
↓
Build
↓
Deploy GitHub Pages
```

Deployment must fail if:

- TypeScript fails
- Tests fail
- Data validation fails
- Build fails

---

# 49. PROJECT DOCUMENTATION

Create:

```text
README.md
```

Include:

- Project purpose
- Features
- Technology
- Data structure
- How to add a new examination
- How to add questions
- How to classify questions
- How to validate data
- How to run locally
- How to build
- How to deploy GitHub Pages

Also create:

```text
docs/
  DATA_MODEL.md
  DATA_PREPARATION.md
  DEPLOYMENT.md
```

Keep documentation practical.

---

# 50. ADDING A NEW AIBE EXAM

Adding a future exam should NOT require changing React components.

The workflow should be:

```text
Add exam data
↓
Add questions
↓
Validate
↓
Build
↓
Deploy
```

The UI should automatically discover the new exam from the data.

---

# 51. ADDING A NEW SUBJECT

Adding a subject should also be data-driven.

Do not write:

```typescript
if (subject === "Evidence") ...
```

throughout the application.

Use IDs and configuration.

---

# 52. ERROR STATES

Never show a blank screen.

Handle:

- Missing data
- Invalid question
- Invalid exam
- Empty subject
- Corrupt localStorage
- Broken references

Show useful messages.

---

# 53. SEO

Because this is a public educational website, add basic SEO:

- Page title
- Meta description
- Open Graph metadata
- Favicon
- Semantic HTML

Example title:

```text
AIBE Prep - Free AIBE Previous Year Questions & Practice
```

Do not make exaggerated claims.

---

# 54. PERFORMANCE

Target:

- Fast first load
- Minimal JavaScript
- No runtime API calls
- No unnecessary dependencies
- No large images
- No PDFs loaded into the browser

Measure bundle size.

Only optimize further if measurements show a real problem.

---

# 55. SECURITY

Even though this is a static application:

- No secrets
- No API keys
- No credentials
- No personal data collection
- No external tracking by default
- No unsafe HTML injection

Question content should be rendered safely.

---

# 56. PRODUCT DECISION RULE

When deciding between two implementations:

Choose the implementation that is:

1. Simpler
2. More reliable
3. Easier to maintain
4. Faster for students
5. Easier to deploy on GitHub Pages

Do not choose a technology because it is fashionable.

---

# 57. DO NOT BUILD THESE IN V1

Explicitly do NOT build:

- Login
- Registration
- Social login
- Leaderboard
- Chat
- Forum
- Payment
- Subscription
- Admin dashboard
- AI tutor
- Backend
- Database
- Complex spaced repetition
- Notifications
- Email system
- Real-time features

These can be considered later.

---

# 58. V1 SUCCESS CRITERIA

V1 is successful if a student can:

```text
Open website
    ↓
Choose previous AIBE paper
    ↓
Attempt questions
    ↓
Submit
    ↓
Immediately see result
    ↓
See exactly which questions were wrong
    ↓
See correct answers
    ↓
Practice by subject
    ↓
Take a mock test
    ↓
See weak areas
    ↓
Practice mistakes
```

No login should be required for any of this.

---

# 59. DEVELOPMENT ORDER

Do NOT build everything simultaneously.

Execute in this order.

## PHASE 0
Inspect all supplied source material.

Produce:

```text
DATA AUDIT
ARCHITECTURE DECISIONS
DATA QUALITY RISKS
```

Do not code yet.

## PHASE 1
Create:

- React/Vite project
- TypeScript
- Tailwind
- Basic layout
- Data types
- Sample data

## PHASE 2
Build:

- Question engine
- Exam engine
- Question palette
- Navigation
- Submit

## PHASE 3
Build:

- Results
- Answer review

## PHASE 4
Build:

- Subject practice
- Topic practice

## PHASE 5
Build:

- Mock test generator

## PHASE 6
Build:

- Local performance
- Weak areas
- Mistake practice

## PHASE 7
Build:

- Data validation
- Tests
- Accessibility

## PHASE 8
Build:

- GitHub Pages deployment
- GitHub Actions

## PHASE 9
Polish UX and performance.

---

# 60. AFTER EACH PHASE

Do not blindly continue.

After every phase:

1. Run the application.
2. Test the feature.
3. Run tests.
4. Check console errors.
5. Check mobile layout.
6. Check data integrity.
7. Fix problems.
8. Then continue.

---

# 61. IMPORTANT CONTENT RULE

The supplied question content is authoritative.

Do not:

- Rewrite questions
- Improve wording
- Change options
- Change answers
- Merge questions
- Remove repeated questions

unless the data-preparation process explicitly marks the change.

Preserve historical content.

Classification can be added separately.

---

# 62. CONTENT QUALITY OVER UI

If there is a conflict between:

```text
Beautiful UI
```

and:

```text
Correct question and answer
```

always choose:

```text
Correct question and answer
```

If there is a conflict between:

```text
More features
```

and:

```text
Reliable exam experience
```

choose:

```text
Reliable exam experience
```

---

# 63. FINAL ARCHITECTURE

The final architecture should look approximately like:

```text
                    AIBE PREP
                       │
          ┌────────────┼────────────┐
          │            │            │
     Previous       Subjects      Mock
       Exams         Practice     Tests
          │            │            │
          └────────────┼────────────┘
                       │
                 QUESTION ENGINE
                       │
                 RESULT ENGINE
                       │
              PERFORMANCE ENGINE
                       │
                  localStorage
                       │
                Student Browser


DATA PREPARATION

Source Files
     ↓
Extraction
     ↓
Normalization
     ↓
Answer Matching
     ↓
Classification
     ↓
Validation
     ↓
Human Review
     ↓
Static JSON
     ↓
GitHub Repository
     ↓
GitHub Pages
```

---

# 64. FINAL INSTRUCTION TO CLAUDE

Before coding, inspect the supplied files and repository.

Do not assume the previous architecture is correct.

Challenge the requirements where necessary.

If a feature is unnecessary, recommend removing it.

If a data assumption is unsupported, flag it.

If a classification is uncertain, preserve the uncertainty.

If an answer is uncertain, do not fabricate it.

If the application can be implemented with less code, choose the simpler implementation.

Build the smallest architecture that can reliably support:

```text
Previous Papers
+
Subject Practice
+
Topic Practice
+
Mock Tests
+
Answer Review
+
Weak-Area Practice
```

The goal is not to demonstrate how much technology can be used.

The goal is to create a reliable, fast, free AIBE learning application that students will actually use.

Start with PHASE 0.

Do not start writing the complete application until the source data audit and architecture assessment are complete.

# AIBE Preparation Web App - Major UI, Question Bank, Syllabus and Statistics Update

## 1. Objective

Update the **existing AIBE preparation web application** without breaking or removing any existing functionality.

The application is a free, student-focused AIBE preparation platform designed for Indian law students.

The update must:

1. Replace/update the existing question bank with the latest validated question-bank JSON.
2. Add a new **Strategy & Tips** screen using the available preparation strategy and syllabus data.
3. Redesign the visual theme using a polished **Google Material-inspired design system**.
4. Use a professional **Indian legal education visual identity**.
5. Add the complete **AIBE Exam Pattern** prominently on the Home page.
6. Add the current **AIBE syllabus** with subject-wise question distribution.
7. Research previous AIBE examination statistics from authoritative web sources.
8. Show the number of candidates who appeared and cleared/passed previous AIBE examinations in a clean table.
9. Preserve the existing application architecture, navigation and functionality.
10. Keep the application suitable for **GitHub Pages static deployment**.

Do not create a backend, database, login system, payment system or runtime AI dependency.

## 2. Existing Architecture

Assume the existing application uses:

- React
- TypeScript
- Vite
- Tailwind CSS
- Static JSON
- GitHub Pages deployment

Maintain this architecture.

Do not introduce unnecessary dependencies.

Use the existing project structure wherever possible.

Do not rebuild the entire application from scratch unless a component genuinely needs restructuring.

## 3. Data Files

Use these validated files as the authoritative application data:

### Question Bank

`/mnt/data/aibe_question_bank_webapp.json`

This contains:

- AIBE 4 through AIBE 21
- 18 exams
- 1,800 questions
- 100 questions per exam
- A/B/C/D options
- Correct answers
- Multiple-answer support where applicable
- Withdrawn-question information
- Historical exam metadata

Expected validation:

```text
Exams: 18
Questions: 1800
All exams pass: True
AIBE 19 withdrawn: 7
AIBE 20 withdrawn: 5
```

Do not manually recreate these questions.

Do not modify correct answers unless there is a clear data-validation failure.

### Strategy Data

`/mnt/data/aibe_strategy_tips_webapp.json`

Use this for:

- Strategy & Tips
- Subject Priority
- Exam preparation recommendations
- Current syllabus
- Subject-wise question distribution
- Question-type strategy
- Exam-day strategy
- Mistake-based revision
- 7-day preparation
- 15-day preparation
- 30-day preparation

## 4. Question Bank Integration

Replace the existing question-bank data with:

`aibe_question_bank_webapp.json`

The application must dynamically load questions from this JSON.

Do not hard-code 1,800 questions into React components.

Create reusable data utilities such as:

```text
getAllExams()
getExamById()
getQuestionsByExam()
getQuestionsBySubject()
getQuestionsByTopic()
getQuestionsByQuestionType()
getQuestionById()
getWithdrawnQuestions()
getAvailableSubjects()
```

Support:

- Year-wise practice
- Exam-wise practice
- Subject-wise practice
- Topic-wise practice
- Mock tests
- Question review
- Correct/wrong/unanswered
- Practice My Mistakes

## 5. Withdrawn Question Handling

This is important.

Some AIBE questions were withdrawn.

For withdrawn questions:

```text
status = withdrawn
scorable = false
correctAnswer = null
```

The UI must clearly display:

**Withdrawn by BCI**

Do not mark the student wrong.

Do not include withdrawn questions in score calculations.

Do not calculate them as unanswered.

Example:

```text
Total Questions: 100
Withdrawn: 7
Scorable Questions: 93
Correct: 70
Wrong: 15
Unanswered: 8

Score should be calculated only from the 93 scorable questions.
```

The UI should explain this clearly when applicable.

## 6. New Navigation Structure

Update the navigation to:

```text
Home
Practice
  ├── Full Exams
  ├── Subject Practice
  ├── Topic Practice
  ├── Mock Test
  └── Practice My Mistakes

Strategy & Tips
  ├── How to Prepare
  ├── Subject Priority
  ├── What Repeats
  ├── Question-Type Strategy
  ├── Exam-Day Strategy
  └── Preparation Plans

About AIBE
```

Keep the navigation simple and mobile-friendly.

## 7. New Strategy & Tips Screen

Create a dedicated:

# Strategy & Tips

screen.

This should not look like a long article.

Use cards, sections, tabs and visual priority indicators.

Recommended structure:

```text
Strategy & Tips

├── How to Prepare
│
├── Subject Priority
│   ├── Critical
│   ├── High
│   └── Medium
│
├── What Repeats
│   ├── Subjects
│   ├── Topics
│   ├── Provisions
│   └── Question Patterns
│
├── Question-Type Strategy
│   ├── Direct MCQ
│   ├── Assertion / Reason
│   ├── Statement / Conclusion
│   ├── Case / Scenario
│   └── Match the Following
│
├── Exam-Day Strategy
│
├── Mistake-Based Revision
│
└── Preparation Plans
    ├── 7 Days
    ├── 15 Days
    └── 30 Days
```

Every strategy card should have a useful action.

For example:

```text
Constitutional Law
10 Questions
Priority: Critical

[Practice This Subject]
```

Clicking the button should take the student directly to filtered questions.

## 8. Current AIBE Syllabus

Use the supplied syllabus data.

Display the syllabus prominently.

The current syllabus contains 19 subject groups.

Use the following distribution:

| Subject | Questions | Priority |
|---|---:|---|
| Constitutional Law | 10 | Critical |
| IPC & BNS | 8 | Critical |
| CrPC & BNSS | 10 | Critical |
| CPC | 10 | Critical |
| Evidence Act & BSA | 8 | Critical |
| Alternative Dispute Resolution including Arbitration | 4 | High |
| Family Law | 8 | Critical |
| Public Interest Litigation | 4 | High |
| Administration Law | 3 | Medium |
| Professional Ethics & Professional Misconduct | 4 | High |
| Company Law | 2 | Medium |
| Environmental Law | 2 | Medium |
| Cyber Law | 2 | Medium |
| Labour & Industrial Law | 4 | High |
| Law of Tort including Motor Vehicle Accident and Consumer Protection Law | 5 | High |
| Taxation | 4 | High |
| Contract, Specific Relief, Property Laws and Negotiable Instruments Act | 8 | Critical |
| Land Acquisition Act | 2 | Medium |
| Intellectual Property Laws | 2 | Medium |

Show the total:

**100 Questions**

Do not silently change the syllabus.

If the attached syllabus contains additional wording or metadata, preserve it.

## 9. Home Page Redesign

The Home page should become the main student dashboard.

Recommended layout:

```text
------------------------------------------------
AIBE PREPARATION
Prepare Smarter. Practice Better.
------------------------------------------------

[AIBE 21] [AIBE 20] [AIBE 19] [AIBE 18]

1,800+
Previous Questions

18
AIBE Exams

100
Questions / Exam

19
Current Subjects
------------------------------------------------

AIBE EXAM PATTERN

Duration              Questions
3 Hours                100

Mode                   Question Type
Offline/OMR*           MCQ

Negative Marking
No negative marking*
------------------------------------------------

CURRENT AIBE SYLLABUS

Subject | Questions | Priority

[View Complete Syllabus]

------------------------------------------------

AIBE EXAM STATISTICS

Year | Appeared | Cleared/Passed | Pass %

------------------------------------------------

PREPARATION STRATEGY

[Subject Priority]
[Practice My Mistakes]
[7-Day Plan]
[15-Day Plan]
[30-Day Plan]
------------------------------------------------
```

Do not blindly use the above wording for facts that need verification.

Verify official exam-pattern information against the current AIBE source before displaying it as current fact.

## 10. AIBE Exam Pattern

Create a visually strong exam-pattern card on the Home page.

Include, where officially verified:

- Examination duration
- Total questions
- Question format
- Mode of examination
- Negative marking policy
- Qualifying/pass criteria
- Applicable eligibility information if relevant

Example visual:

```text
AIBE EXAM PATTERN

100
Questions

3 Hours
Duration

MCQ
Question Format

No Negative Marking
Scoring

Qualifying Examination
Purpose
```

Use icons and clean cards.

Do not overcrowd this section.

## 11. Previous AIBE Candidate Statistics

Research previous AIBE examination statistics from the web.

This is an important requirement.

Do NOT invent statistics.

Search authoritative sources first:

1. Bar Council of India
2. All India Bar Examination official website
3. Government sources
4. Press Information Bureau where applicable
5. Reputable Indian newspapers
6. Established education/news publications only when official figures are unavailable

For each year, identify:

```text
AIBE Year
Candidates Registered
Candidates Appeared
Candidates Passed/Cleared
Pass Percentage
Source
```

Prefer data for AIBE examinations where reliable figures are available.

Possible table:

| AIBE | Appeared | Cleared | Pass % |
|---|---:|---:|---:|
| AIBE XVII | verified | verified | calculated |
| AIBE XVIII | verified | verified | calculated |
| AIBE XIX | verified | verified | calculated |
| AIBE XX | verified | verified | calculated |
| AIBE XXI | verified | verified | calculated |

Do not create rows where reliable data cannot be verified.

If only "appeared" is available but "cleared" is unavailable, display:

```text
Not officially reported
```

Do not estimate.

If different sources report conflicting numbers:

1. Prefer the official source.
2. Show the official number.
3. Add a small source note.
4. Do not silently merge figures.

Include a source link beside each row or in a source section.

## 12. Statistics UI

Do not make the statistics table look like an administrative dashboard.

Make it student-friendly.

Example:

```text
AIBE PARTICIPATION & RESULTS

See how AIBE participation and outcomes have changed.

┌────────┬──────────┬──────────┬──────────┐
│ AIBE   │ Appeared │ Cleared  │ Pass %   │
├────────┼──────────┼──────────┼──────────┤
│ XVIII  │  ...     │  ...     │  ...     │
│ XIX    │  ...     │  ...     │  ...     │
│ XX     │  ...     │  ...     │  ...     │
│ XXI    │  ...     │  ...     │  ...     │
└────────┴──────────┴──────────┴──────────┘

Source: Official/authoritative sources
```

Add a simple trend visualization only if the verified data is sufficient.

Do not create a misleading graph from incomplete data.

## 13. Google-Inspired Theme

Redesign the visual system using a **Google Material-inspired design language**.

Do not copy Google's exact website.

Use:

- Material-style cards
- Rounded surfaces
- Clean typography
- Generous spacing
- Soft elevation
- Clear hierarchy
- Simple icons
- Accessible contrast
- Responsive layouts
- Minimal borders
- Subtle hover states
- Smooth but restrained transitions

The result should feel:

```text
Google Material
+
Indian Legal Education
+
Professional Law School
+
Modern Exam Preparation Platform
```

## 14. Indian Legal Theme

Use a professional Indian visual identity.

Do not make it look like a political party website.

Avoid excessive saffron, green or national-flag styling.

Use a restrained palette inspired by:

- Deep navy
- Legal blue
- Warm ivory
- Muted saffron/gold accent
- Subtle Indian green accent
- White/card surfaces

The dominant background should remain professional and readable.

Suggested visual direction:

```text
Background:
Warm ivory / very light neutral

Primary:
Deep legal navy

Secondary:
Professional blue

Accent:
Muted saffron/gold

Supporting accent:
Subtle Indian green

Text:
Dark charcoal
```

Do not use bright orange or bright green as dominant colors.

## 15. Legal Background Design

Add subtle legal-professional visual elements.

Possible elements:

- Very subtle Indian Constitution texture
- Abstract legal document pattern
- Minimal scales-of-justice watermark
- Subtle law-book geometry
- Very light Ashoka Chakra-inspired circular pattern
- Constitutional/document typography texture

These should remain extremely subtle.

Do not use a large stock photo behind text.

The background must not reduce readability.

## 16. Home Page Hero

Create a stronger hero section.

Example:

```text
AIBE PREPARATION

Your structured path to AIBE preparation.

Practice previous AIBE questions.
Understand subject priority.
Track your mistakes.
Prepare using the current syllabus.

[Start Practice]
[Take Mock Test]
[View Strategy]
```

Below it:

```text
18 Exams
1,800+ Questions
19 Current Subjects
100 Questions / Exam
```

Use real values from the question-bank data.

## 17. Subject Priority UI

Create priority badges:

```text
CRITICAL
HIGH
MEDIUM
```

Example:

```text
Constitutional Law
10 Questions

CRITICAL

[Practice]
```

The priority must come from the strategy JSON.

Do not manually duplicate priority information throughout components.

## 18. Historical Question Analysis

Use the question-bank data to provide useful historical insights.

Where reliable classification exists, show:

```text
Previous AIBE Coverage

Subjects
Topics
Question Types
```

Important:

Historical frequency is evidence, not a guarantee of future questions.

Show a disclaimer:

> Historical question patterns can help prioritize preparation, but they do not predict the next AIBE paper.

## 19. Practice My Mistakes

Make this a prominent feature.

After completing a test:

```text
Your Result

Correct       72
Wrong         18
Unanswered    5
Withdrawn     5
```

Then:

```text
[Practice Wrong Questions]
[Review Answers]
[Retry Test]
```

Store mistakes locally using `localStorage`.

No backend is required.

Example:

```text
aibe_mistakes
aibe_test_history
aibe_preferences
```

Students should be able to revisit mistakes across sessions.

## 20. Mock Test Experience

Improve the test interface.

Display:

```text
Question 37 / 100

[Progress bar]

Question text

A. ...
B. ...
C. ...
D. ...

[Previous]
[Mark for Review]
[Next]
```

Provide:

- Question navigator
- Answered count
- Unanswered count
- Marked-for-review count
- Submit confirmation
- Results
- Detailed review

For multiple-answer questions, clearly indicate:

**Select all correct answers.**

## 21. Results Screen

Use a professional results dashboard.

Example:

```text
TEST RESULT

72 / 93
Scorable Questions

77.4%

Correct       72
Wrong         18
Unanswered     3
Withdrawn      7

[Review Answers]
[Practice Mistakes]
[Try Again]
```

Do not show a "PASS" label unless the applicable official qualifying rule is configured and the result can be meaningfully compared.

## 22. Mobile Design

The application must work well on:

- Desktop
- Laptop
- Tablet
- Mobile

On mobile:

- Bottom navigation or compact menu
- Cards become single-column
- Tables become horizontally scrollable or responsive cards
- Question navigator should remain usable
- Buttons must be touch-friendly

## 23. Accessibility

Implement:

- Keyboard navigation
- Visible focus states
- Proper button semantics
- Accessible labels
- Good color contrast
- No color-only status indicators
- Screen-reader-friendly headings

Do not rely on color alone for:

```text
Correct
Wrong
Critical
High
Medium
Withdrawn
```

## 24. Performance

The app must remain lightweight.

Do not add:

- Runtime AI APIs
- Large UI frameworks unnecessarily
- Backend services
- Database
- Authentication
- Analytics SDK unless already present

Use:

- Lazy-loaded routes where useful
- Memoization only where needed
- Efficient filtering
- Static JSON
- LocalStorage for student state

## 25. GitHub Pages Compatibility

The final application must work correctly when deployed to GitHub Pages.

Verify:

```text
npm run build
```

and the GitHub Pages base path.

If using React Router, ensure GitHub Pages compatibility.

HashRouter is acceptable if it simplifies deployment.

Do not require server-side routing.

## 26. Data Validation

Before completing the update, validate:

```text
18 exams
1,800 questions
100 questions per exam
Question numbers 1-100
A/B/C/D options
Correct answers present for active questions
Withdrawn questions correctly handled
No duplicate canonical question IDs
No invalid exam IDs
No broken subject references
```

Also validate:

```text
AIBE 19 withdrawn = 7
AIBE 20 withdrawn = 5
```

Do not silently alter the validated source data.

## 27. UI Components

Create reusable components such as:

```text
AppHeader
HomeHero
ExamStats
ExamPatternCard
SyllabusOverview
SyllabusTable
AibeStatisticsTable
StrategyCard
PriorityBadge
PracticeCard
QuestionCard
QuestionNavigator
TestProgress
ResultSummary
MistakeCard
Footer
```

Avoid giant React components.

Separate:

```text
data
components
pages
services
utils
types
```

where appropriate.

## 28. Suggested Home Page Information Hierarchy

The Home page should follow this order:

```text
1. Hero
2. Quick Statistics
3. Start Practice
4. AIBE Exam Pattern
5. Current AIBE Syllabus
6. Previous AIBE Statistics
7. Preparation Strategy
8. Practice My Mistakes
9. Important Disclaimer / Sources
```

The student should understand the exam within the first screen or two without opening another page.

## 29. Do Not Remove Existing Features

Before making changes:

1. Inspect the current application.
2. Identify existing routes.
3. Identify existing components.
4. Identify current question-bank implementation.
5. Identify current scoring logic.
6. Identify current theme.
7. Identify current deployment configuration.

Then update incrementally.

Do not remove working features just to simplify implementation.

## 30. Research Rules

For web-researched AIBE statistics:

- Use authoritative sources.
- Record source URL.
- Record source title.
- Record publication date where available.
- Record which AIBE edition the number refers to.
- Distinguish registered vs appeared vs passed.
- Do not confuse "qualified advocates" with "candidates appeared."
- Do not confuse "results declared" with "candidates passed."
- Do not infer missing numbers.
- Do not copy statistics from random coaching websites when official numbers exist.

Create a local static data file such as:

```text
src/data/aibeStatistics.json
```

Example:

```json
{
  "source": "...",
  "verified": true,
  "exam": "AIBE XX",
  "appeared": 0,
  "cleared": 0,
  "passPercentage": 0
}
```

Replace placeholder values only after verification.

## 31. Source Transparency

At the bottom of the statistics section:

```text
Sources

Official AIBE / Bar Council of India sources are preferred.
Statistics are shown only where they can be reasonably verified.
```

Allow the student to open the source.

Do not hide the source information.

## 32. Final Quality Bar

The final product should NOT look like:

- A generic CRUD dashboard
- An admin panel
- A government portal
- A basic Tailwind template
- A simple question-answer website

It should look like a serious:

**Indian legal education and AIBE preparation platform.**

The visual quality should be comparable to a modern Google-style education product.

## 33. Final Acceptance Criteria

Do not consider the work complete until all of these pass:

### Data

- [ ] 1,800 questions loaded
- [ ] AIBE 4-21 available
- [ ] 100 questions per exam
- [ ] Withdrawn questions handled correctly
- [ ] Multiple-answer questions supported
- [ ] No question-bank corruption

### Features

- [ ] Home page updated
- [ ] Strategy & Tips screen added
- [ ] Current syllabus displayed
- [ ] Subject priorities displayed
- [ ] AIBE exam pattern displayed
- [ ] Historical AIBE statistics displayed
- [ ] Practice My Mistakes working
- [ ] Existing mock tests working
- [ ] Existing scoring working

### Design

- [ ] Google Material-inspired theme
- [ ] Indian legal professional color palette
- [ ] Professional typography
- [ ] Subtle legal visual background
- [ ] Responsive mobile design
- [ ] Accessible UI
- [ ] No excessive visual clutter

### Research

- [ ] AIBE statistics researched
- [ ] Official sources preferred
- [ ] Appeared vs passed clearly separated
- [ ] Pass percentage calculated only from verified numbers
- [ ] Sources displayed

### Engineering

- [ ] TypeScript passes
- [ ] Tests pass
- [ ] Production build passes
- [ ] GitHub Pages deployment works
- [ ] No backend introduced
- [ ] No runtime AI dependency
- [ ] No PDFs shipped unnecessarily

## 34. Important Implementation Principle

Do not simply add more content.

Improve the student's decision-making.

The application should answer these questions immediately:

```text
What is AIBE?
What is the exam pattern?
What is the current syllabus?
Which subjects deserve more preparation time?
How can I practice previous questions?
Where am I making mistakes?
How should I prepare in the final 7/15/30 days?
```

The final UI should make these answers obvious.

First inspect the existing application and its architecture. Then implement the update incrementally, preserving existing functionality.