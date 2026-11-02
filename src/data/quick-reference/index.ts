import type { QuickRefSubject } from '../../types';
import { CONSTITUTIONAL_LAW_QUICK_REF } from './constitutional-law';

export const QUICK_REF: Record<string, QuickRefSubject> = {
  'constitutional-law': CONSTITUTIONAL_LAW_QUICK_REF,
};

export function getQuickRef(subjectId: string): QuickRefSubject | undefined {
  return QUICK_REF[subjectId];
}

export function getAllQuickRefSubjects(): QuickRefSubject[] {
  return Object.values(QUICK_REF);
}
