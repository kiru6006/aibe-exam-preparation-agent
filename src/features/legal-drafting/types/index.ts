export type LegalReviewStatus = 'approved' | 'pending_review' | 'rejected' | 'draft';

export type SourceFormat = 'RTF' | 'DOCX' | 'PDF' | 'Google Doc' | 'Scanned PDF';

export type CourtForum = 
  | 'Supreme Court of India'
  | 'High Court'
  | 'District & Sessions Court'
  | 'Civil Court (Senior Division / Junior Division)'
  | 'Chief Judicial Magistrate / Metropolitan Magistrate Court'
  | 'Family Court'
  | 'National Company Law Tribunal (NCLT)'
  | 'Debt Recovery Tribunal (DRT)'
  | 'Consumer Disputes Redressal Commission'
  | 'Labour Court / Industrial Tribunal'
  | 'Arbitral Tribunal'
  | 'Income Tax Appellate Tribunal (ITAT)'
  | 'Motor Accident Claims Tribunal (MACT)'
  | 'Sub-Registrar Office'
  | 'Non-Judicial / Out-of-Court';

export type DocumentType = 
  | 'Plaint'
  | 'Written Statement'
  | 'Bail Application'
  | 'Writ Petition'
  | 'Special Leave Petition'
  | 'Petition'
  | 'Application'
  | 'Appeal'
  | 'Revision'
  | 'Affidavit'
  | 'Legal Notice'
  | 'Agreement'
  | 'Deed'
  | 'Complaint'
  | 'Execution Petition'
  | 'Power of Attorney'
  | 'Will / Testament'
  | 'Statement of Claim';

export interface FieldDefinition {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'number' | 'select' | 'parties' | 'annexures';
  placeholder?: string;
  defaultValue?: string;
  required: boolean;
  section: 'court' | 'parties' | 'case' | 'advocate' | 'facts' | 'prayer' | 'verification' | 'custom';
  options?: string[];
  helperText?: string;
}

export interface OptionalClause {
  id: string;
  title: string;
  description?: string;
  clauseText: string;
  defaultIncluded: boolean;
  mandatory?: boolean;
}

export interface ReviewMetadata {
  governingLaw: string;
  relevantProvisions: string[];
  effectivePeriod: string;
  jurisdiction: string;
  courtForum: CourtForum;
  sourceDocument: string;
  reviewer?: string;
  reviewedAt?: string;
  version: string;
  approvalStatus: LegalReviewStatus;
  reviewNotes?: string;
  historicalLegislationNotice?: string;
}

export interface LegalTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryId: string;
  caseNature: 'Civil' | 'Criminal' | 'Constitutional' | 'Commercial' | 'Matrimonial' | 'Arbitration' | 'Regulatory' | 'Miscellaneous';
  documentType: DocumentType;
  proceduralStage: string;
  jurisdiction: string;
  courtForum: CourtForum;
  governingLaw: string;
  statutoryReferences: string[];
  sourceDriveFileId?: string;
  sourceFormat: SourceFormat;
  templateAssetPath?: string;
  fields: FieldDefinition[];
  clauses?: OptionalClause[];
  bodyParagraphs: string[];
  prayerParagraphs: string[];
  verificationText?: string;
  reviewStatus: LegalReviewStatus;
  reviewedAt?: string;
  version: string;
  tags: string[];
  lastVerifiedDate?: string;
  filingChecklistId?: string;
}

export interface TemplateCategory {
  id: string;
  numericId: number;
  name: string;
  description: string;
  caseNature: string;
  primaryCourt: string;
  iconName: string;
  badge?: string;
}

export interface PartyInfo {
  name: string;
  relation?: string;
  parentage?: string;
  age?: string;
  occupation?: string;
  address: string;
  policeStation?: string;
  district?: string;
  state?: string;
  pinCode?: string;
}

export interface AnnexureItem {
  id: string;
  annexureMark: string; // e.g. "Annexure P-1" or "Document A"
  description: string;
  dated?: string;
  pageRange?: string;
}

export interface DraftingFormData {
  courtName: string;
  state: string;
  district: string;
  caseType: string;
  caseNumber: string;
  filingYear: string;
  petitioners: PartyInfo[];
  respondents: PartyInfo[];
  advocateName: string;
  advocateEnrolmentNumber: string;
  advocateAddress: string;
  advocateContact: string;
  causeOfActionDate: string;
  causeOfActionPlace: string;
  valuationAmount?: string;
  courtFeePaid?: string;
  factsText: string;
  groundsText: string;
  prayerText: string;
  verificationPlace: string;
  verificationDate: string;
  deponentName: string;
  annexures: AnnexureItem[];
  selectedClauseIds: string[];
  customClauses: Record<string, string>;
  customFieldValues: Record<string, string>;
}

export interface FilingChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  statutoryRule?: string;
  mandatory: boolean;
}

