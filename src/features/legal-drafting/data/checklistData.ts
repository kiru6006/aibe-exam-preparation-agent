import type { FilingChecklistItem } from '../types';

export const GENERAL_FILING_CHECKLIST: FilingChecklistItem[] = [
  {
    id: 'chk-1',
    category: 'Court Format & Margins',
    title: 'Paper, Margins & Typography Compliance',
    description: 'Ensure double line spacing, single-sided printing on legal / A4 green or white bond paper with minimum 1.5-inch left margin for tagging and folding.',
    statutoryRule: 'High Court Rules & Orders (Civil/Criminal Practice Rules)',
    mandatory: true,
  },
  {
    id: 'chk-2',
    category: 'Vakalatnama & Welfare Stamps',
    title: 'Vakalatnama Execution & Welfare Stamps',
    description: 'Properly signed Vakalatnama by all petitioners/appellants, accepted by the advocate with enrolment number, affixed with Advocate Welfare Fund stamp and Court Fee stamp.',
    statutoryRule: 'Advocates Welfare Fund Act, 2001 & State Bar Council Rules',
    mandatory: true,
  },
  {
    id: 'chk-3',
    category: 'Verification & Attestation',
    title: 'Solemn Verification & Notarisation',
    description: 'Pleadings must terminate with an affidavit or solemn verification clause identifying paras true to personal knowledge and paras believed true on legal advice, attested by an Oath Commissioner or Notary Public.',
    statutoryRule: 'Order VI Rule 15 CPC / Section 297 CrPC',
    mandatory: true,
  },
  {
    id: 'chk-4',
    category: 'Court Fees & Valuation',
    title: 'Valuation & Ad Valorem Court Fees',
    description: 'Valuation for court fees and jurisdiction must be distinctly stated in the plaint/petition, with appropriate court fee e-stamps attached.',
    statutoryRule: 'Court Fees Act, 1870 & Suits Valuation Act, 1887',
    mandatory: true,
  },
  {
    id: 'chk-5',
    category: 'Caveat Clearance',
    title: 'Caveat Verification & Search Report',
    description: 'Before filing interim injunction or urgent stay applications, verify Caveat register to ascertain whether any caveat under Section 148A CPC is pending.',
    statutoryRule: 'Section 148A CPC',
    mandatory: false,
  },
  {
    id: 'chk-6',
    category: 'Advance Service',
    title: 'Proof of Advance Service to Opposite Parties',
    description: 'Attach postal receipts, speed post tracking, email acknowledgment or registered clerk receiving showing advance copy delivery to opposite counsel or standing counsel.',
    statutoryRule: 'Order LVI Supreme Court Rules / High Court Original Side Rules',
    mandatory: true,
  },
  {
    id: 'chk-7',
    category: 'True Copy Certification',
    title: 'True Copy Certification on Annexures',
    description: 'Every annexure and document relied upon must be marked sequentially (e.g. Annexure P-1) and endorsed as "TRUE COPY" with advocate signature at bottom right.',
    statutoryRule: 'Practice Directions on Document Authenticity',
    mandatory: true,
  },
  {
    id: 'chk-8',
    category: 'E-Filing Index & Bookmarks',
    title: 'OCR Searchable PDF & E-Filing Indexing',
    description: 'For digital courts and e-filing portals, ensure PDF is OCR searchable, bookmarks are set for every petition chapter, and file size meets portal limits.',
    statutoryRule: 'e-Courts E-Filing Practice Directions (e-Filing 3.0)',
    mandatory: false,
  },
];

