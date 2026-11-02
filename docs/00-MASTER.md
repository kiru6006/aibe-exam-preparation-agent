Create the Quick Reference as a CSS/React interactive legal mindmap.

DO NOT generate an image.
DO NOT use SVG as a static replacement for the image.
DO NOT use canvas.
DO NOT create a screenshot-like static graphic.

Build the visual entirely using React components + HTML + CSS/Tailwind.

The visual style should be inspired by the attached BNS overview mindmap:

- Large circular central subject node
- Numbered rectangular/rounded chapter cards surrounding the center
- Thin curved/angled connector lines using CSS where practical
- Small legal/topic icons
- Color-coded chapter categories
- Short, high-density bullet points
- Section numbers prominently displayed
- Case names displayed separately from statutory sections
- Clear visual hierarchy
- Professional Indian legal education appearance
- White/warm ivory background
- Deep navy primary color
- Legal blue secondary color
- Muted saffron/gold accent
- Subtle green accent
- Red only for warnings/high-risk exam traps
- Avoid excessive gradients
- Avoid cartoon styling
- Avoid political styling
- Avoid excessive shadows

The result must look like a professional legal revision tool, not a generic dashboard.

DESKTOP:
- Central subject node
- Surrounding chapter cards
- 3-column or radial visual arrangement
- Connectors between central node and chapter cards

TABLET:
- Reduce card width
- Preserve hierarchy
- Allow controlled wrapping

MOBILE:
- Convert the radial layout into a vertical connected mindmap
- Central node at top
- Chapter cards below
- Connector line between levels
- Never make the content horizontally scroll unnecessarily

Every chapter card must contain:

1. Chapter number
2. Chapter title
3. Relevant sections/articles
4. 3-6 critical concepts
5. AIBE exam relevance
6. Important cases where applicable
7. "Practice" action
8. "View Cases" action
9. "View Sections" action

Use semantic HTML and accessible buttons.

Each card should be keyboard accessible.

Clicking a chapter should expand a detailed panel without leaving the page.

Use <details>/<summary> where appropriate for expandable legal content.

Do not hard-code layout positioning for every individual card.
Create reusable components:

QuickRefMindMap
QuickRefChapterCard
QuickRefCaseCard
QuickRefSectionCard
QuickRefConnector
QuickRefLegend
QuickRefDetailPanel

Create reusable CSS classes/design tokens so the same component can be reused for all 19 AIBE subjects.

The data must remain separate from presentation.

Create subject-specific data files.

Do not put large legal content directly inside JSX.

Use TypeScript interfaces.

Do not use `any`.

Do not add a new runtime dependency.

Use the existing project's subjects.ts, questions.ts, ExamEngine and routing architecture.

Connect practice buttons to the existing practice engine.

Connect case/topic references to the existing Quick Reference data.

Do not invent legal provisions, case holdings, section numbers, or AIBE questions.

Where legal content is not verified, mark it internally as `Verify` rather than presenting it as fact.