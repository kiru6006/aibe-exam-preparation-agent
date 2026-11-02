# AIBE Preparation Web Application

A free, fast, student-focused All India Bar Examination (AIBE) preparation web application built for Indian law graduates and advocates. Hosted statically on **GitHub Pages**.

> **Live Application URL:** **[https://kiru6006.github.io/aibe-exam-preparation-agent/](https://kiru6006.github.io/aibe-exam-preparation-agent/)**  
> **100% Free • No Login or Accounts Required • Zero Backend/Database Dependencies • Works Offline Once Loaded**

---

## 🎯 What Has Been Done & Completed

### 1. Authoritative Question Bank Integration (18 Exams, 1,800 Questions)
- Complete coverage across **18 official Bar Council of India examinations** (**AIBE IV through AIBE XXI**).
- Exactly **1,800 validated questions** (100 questions per exam) mapped with verified keys and legal statutory references.
- Dynamic data access utilities in `examEngine.ts`:
  - `getAllExams()`, `getExamById()`, `getQuestionsByExam()`
  - `getQuestionsBySubject()`, `getQuestionsByTopic()`, `getQuestionsByQuestionType()`
  - `getWithdrawnQuestions()`, `getAvailableSubjects()`, `getQuestionsByIds()`

### 2. Official BCI Withdrawn & Multi-Answer Question Handling (Section 5 Spec)
- **Withdrawn Questions**: Explicitly tagged with status `"withdrawn"` and `scorable: false` (e.g. 7 in AIBE XIX, 5 in AIBE XX).
  - Withdrawn questions display a prominent badge: **"Withdrawn by BCI (Not Scorable)"**.
  - Excluded from score calculations and never penalized as wrong or counted as unanswered.
  - Qualifying criteria (45% for Gen/OBC, 40% for SC/ST) is computed strictly on scorable questions (e.g., out of 93 scorable questions for AIBE XIX).
- **Multiple Correct Answers**: Supported with checkboxes and clear guidance when BCI accepted multiple options (e.g., `["A", "C"]`).

### 3. Strategy & Tips Screen (`StrategyTipsView.tsx`)
Comprehensive preparation guides directly mapped from `aibe_strategy_tips_webapp.json`:
- **How to Prepare**: 10 tactical study rules with actionable steps.
- **Subject Priority Matrix**: Filter subjects by **Critical (66 Qs)**, **High (26 Qs)**, and **Medium (8 Qs)** with direct **"Practice Subject"** launch buttons.
- **What Repeats**: Historical analysis of recurring constitutional doctrines, criminal law sections, CPC orders, and evidentiary provisions.
- **Question-Type Tactics**: Tailored solving strategies for Direct MCQs, Assertion & Reason, Case Law rulings, and Problem Scenarios.
- **Exam-Day Strategy**: 180-minute phase-by-phase execution plan and BCI Bare Act compliance rules.
- **Preparation Plans**: Structured **7-Day Crash**, **15-Day Targeted**, and **30-Day Mastery** study calendars with instant mock shortcuts.

### 4. Home Page Dashboard & Exam Pattern (`HomeView.tsx`)
- **Prominent AIBE Exam Pattern**: 100 Questions, 3-Hour Duration, MCQ (Offline OMR), No Negative Marking, 45% (Gen/OBC) / 40% (SC/ST) qualifying threshold.
- **One-Click Paper Launcher**: Direct links to all 18 AIBE papers (AIBE XXI down to AIBE IV) with examination years.
- **Current AIBE 19-Subject Syllabus**: Complete question distribution and weightage with toggleable **Card View** and **List View**.
- **Verified Candidate Statistics Table**: Historical turnout, pass counts, and pass percentages across AIBE XVI through XXI from official BCI disclosures and press records.
- **Live Counter Bar**: 1,800+ Questions, 18 Exams, 100 Qs/Exam, 19 Current Subjects.

### 5. Card View & List View Across All Browsing Screens
- Available across **Previous Papers**, **Subject Practice**, **Search Question Bank**, and **Detailed Exam Results**.
- Multi-attribute filtering by Year, Exam Name, and Subject with instant search.

### 6. Practice Modes & Mistake Loop
- **Full Previous Papers**: Complete timed 3-hour exam simulation with Question Palette and instant scoring.
- **Subject Practice**: Targeted sets (10 Qs or All Qs) for any of the 19 BCI syllabus areas.
- **Customizable Mock Tests**: 25, 50, or 100 question mock exams with randomized cross-subject distribution.
- **Practice My Mistakes**: Browser-persisted (`localStorage`) mistake revision queue to revisit questions previously missed.

### 7. Google Material-Inspired Indian Legal Education Identity
- Palette: Legal Navy (`#1A365D`), Muted Saffron/Gold (`#C05621` & `#D69E2E`), Subtle Indian Green (`#22543D`), and Warm Ivory Surfaces (`#FAF8F5`).
- Typography: Classic editorial serif headings (`Newsreader`) paired with clean sans-serif text (`Plus Jakarta Sans`) and code/data fonts (`JetBrains Mono`).

### 8. GitHub Pages CI/CD & Deployment Automation
- Fully automated workflow via `.github/workflows/deploy.yml`.
- Dual-deployment pipeline: builds production bundle, configures `.nojekyll` and `404.html` SPA fallbacks, and pushes to the `gh-pages` branch while also supporting GitHub Pages Actions artifacts.

---

## 📂 File & Folder Structure

```text
aibe-exam-preparation-agent/
├── .github/
│   └── workflows/
│       └── deploy.yml                   # CI/CD: data validation, tests, build & deploy to gh-pages
├── docs/
│   ├── aibe_question_bank_webapp.json   # 18 exams, 1,800 questions master dataset
│   ├── aibe_question_bank_webapp_validation.json # Question bank validation specifications
│   └── aibe_strategy_tips_webapp.json   # Preparation strategy, syllabus & exam plans
├── public/
│   ├── favicon.svg                      # Scales of justice vector favicon
│   └── icons.svg                        # SVG symbol sheet
├── scripts/
│   └── validate-data.ts                 # CLI validator verifying 1,800 Qs, 18 exams, withdrawn counts
├── src/
│   ├── assets/                          # Static logos and graphic assets
│   ├── components/
│   │   ├── AboutView.tsx                # COP regulations, BCI eligibility, and Bare Act guidelines
│   │   ├── ExamView.tsx                 # Timed exam interface, multi-answer & withdrawn question badges
│   │   ├── HomeView.tsx                 # Main dashboard: pattern card, syllabus, stats table & quick links
│   │   ├── MockTestView.tsx             # Configurable 25/50/100 Q mock test generator
│   │   ├── Navbar.tsx                   # Header with dropdown navigation for Practice, Strategy & Performance
│   │   ├── PerformanceView.tsx          # Accuracy tracking, subject strengths & weak areas analysis
│   │   ├── PreviousPapersView.tsx       # Year-wise previous papers with Card/List view and filters
│   │   ├── QuestionBankSearchView.tsx   # Instant keyword search across questions, sections, and case law
│   │   ├── QuestionPalette.tsx          # Accessible 1-100 question grid with visual state indicators
│   │   ├── ResultView.tsx               # Official score report, withdrawn calculations & question review
│   │   ├── StrategyTipsView.tsx         # Dedicated screen: 10 strategies, priority matrix, 7/15/30-day plans
│   │   ├── SubjectsView.tsx             # 19 BCI syllabus areas with question counts & priority badges
│   │   └── Timer.tsx                    # Accessible countdown timer with visual time warnings
│   ├── data/
│   │   ├── aibeStatistics.json          # Researched turnout and clearance figures for AIBE XVI–XXI
│   │   ├── exams.ts                     # Metadata for 18 exams (AIBE IV to XXI)
│   │   ├── questions.ts                 # Normalized bank of 1,800 questions
│   │   └── subjects.ts                  # 19 BCI official subjects with weightage and priority ratings
│   ├── services/
│   │   ├── examEngine.ts                # Evaluation engine, multi-answer checking & withdrawn question logic
│   │   └── storageService.ts            # Versioned localStorage engine for test attempts and mistake queue
│   ├── types/
│   │   └── index.ts                     # TypeScript definitions (Question, Exam, Subject, Result, Stats)
│   ├── App.css                          # Layout & transition styles
│   ├── App.tsx                          # Root application router and session state coordinator
│   ├── index.css                        # Design system tokens and Tailwind CSS v4 imports
│   └── main.tsx                         # React 19 application entry point
├── tests/
│   └── examEngine.test.ts               # Unit test suite for scoring, withdrawn questions, and mock generation
├── index.html                           # Root HTML document with typography & meta tags
├── package.json                         # Project scripts and dependencies
├── tsconfig.json                        # TypeScript configuration
└── vite.config.ts                       # Vite bundler configuration (relative base './' & 0.0.0.0 host)
```

---

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Type-safe, declarative UI rendering |
| **Bundler** | [Vite 8](https://vitejs.dev/) | Fast HMR development and optimized production asset bundling |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Material-inspired utility styling and responsive layouts |
| **Icons** | [Lucide React](https://lucide.dev/) | Accessible legal, status, and navigation icons |
| **Testing** | [Vitest](https://vitest.dev/) | Fast in-memory unit testing for exam calculation logic |
| **Persistence** | `localStorage` | Client-side attempt tracking and mistake logging with zero cloud sync |
| **Deployment** | [GitHub Pages](https://pages.github.com/) | Static edge hosting with zero backend or server cost |

---

## ⚡ Local Development & Testing

### Prerequisites
- Node.js 20+
- npm 10+

### Setup & Run

```bash
# 1. Clone the repository
git clone https://github.com/kiru6006/aibe-exam-preparation-agent.git
cd aibe-exam-preparation-agent

# 2. Install dependencies
npm install

# 3. Audit question bank and exam structure
npm run validate-data

# 4. Run unit tests
npm run test

# 5. Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 📊 AIBE Examination Pattern Quick Reference

| Feature | Official Specification |
|---|---|
| **Total Questions** | 100 Multiple Choice Questions (1 mark each) |
| **Duration** | 3 Hours (180 Minutes) |
| **Exam Mode** | Offline (OMR Answer Sheet) |
| **Negative Marking** | **None** (Candidates should attempt all 100 questions) |
| **Qualifying Mark** | **45%** for General & OBC • **40%** for SC, ST & PwD |
| **Bare Acts Policy** | Bare Acts without notes or comments are permitted |
| **Purpose** | Mandatory qualifying exam for Certificate of Practice (COP) |

---

## 📄 License & Attribution

- **License:** Open Educational Resource. Free for all law students and advocates.
- **Disclaimer:** This application is an independent educational tool developed to assist law graduates preparing for the All India Bar Examination. It is not affiliated with, endorsed by, or operated by the Bar Council of India (BCI). Official updates and registration must be accessed via [allindiabarexamination.com](https://allindiabarexamination.com).
