import { describe, it, expect } from 'vitest';
import { QUICK_REF, getQuickRef, getAllQuickRefSubjects } from '../src/data/quick-reference';
import { OFFICIAL_SUBJECTS } from '../src/data/subjects';
import { MindNode } from '../src/types';

describe('Legal Quick Reference System', () => {
  it('registers constitutional-law as pilot subject', () => {
    const constLaw = getQuickRef('constitutional-law');
    expect(constLaw).toBeDefined();
    expect(constLaw?.subjectId).toBe('constitutional-law');
    expect(constLaw?.priority).toBe('Critical');
    expect(constLaw?.weightage).toBe(10);
  });

  it('contains expected structure and statistics', () => {
    const constLaw = getQuickRef('constitutional-law')!;
    expect(constLaw.top15.length).toBe(15);
    expect(constLaw.leadingCases.length).toBeGreaterThanOrEqual(10);
    expect(constLaw.sections.length).toBeGreaterThanOrEqual(15);
    expect(constLaw.bridges.length).toBeGreaterThanOrEqual(4);
    expect(constLaw.hotPoints.length).toBeGreaterThanOrEqual(6);
  });

  it('ensures all mindmap node IDs are unique and well-formed', () => {
    const constLaw = getQuickRef('constitutional-law')!;
    const nodeIds = new Set<string>();

    function traverse(node: MindNode) {
      expect(node.id).toBeDefined();
      expect(nodeIds.has(node.id)).toBe(false);
      nodeIds.add(node.id);
      if (node.children) {
        node.children.forEach(traverse);
      }
    }

    traverse(constLaw.mindmapRoot);
    expect(nodeIds.size).toBeGreaterThan(15);
  });

  it('ensures all leading cases and top15 point to valid mindmap nodes', () => {
    const constLaw = getQuickRef('constitutional-law')!;
    const nodeIds = new Set<string>();

    function traverse(node: MindNode) {
      nodeIds.add(node.id);
      if (node.children) {
        node.children.forEach(traverse);
      }
    }
    traverse(constLaw.mindmapRoot);

    constLaw.leadingCases.forEach((c) => {
      expect(nodeIds.has(c.connectedNodeId)).toBe(true);
      expect(['Certain', 'Likely', 'Guessing', 'Verify']).toContain(c.tag);
    });

    constLaw.top15.forEach((t) => {
      expect(nodeIds.has(t.nodeId)).toBe(true);
      expect(['Certain', 'Likely', 'Guessing', 'Verify']).toContain(t.tag);
    });
  });

  it('ensures all cross-subject bridges point to valid official AIBE subject IDs', () => {
    const constLaw = getQuickRef('constitutional-law')!;
    const officialSubjectIds = new Set(OFFICIAL_SUBJECTS.map((s) => s.id));

    constLaw.bridges.forEach((bridge) => {
      expect(officialSubjectIds.has(bridge.targetSubjectId)).toBe(true);
    });
  });

  it('supports modular addition of subjects via getAllQuickRefSubjects', () => {
    const all = getAllQuickRefSubjects();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThanOrEqual(1);
  });
});

