import type { Exam } from '../types';

export const OFFICIAL_EXAMS: Exam[] = [
  {
    id: "aibe-xviii",
    name: "AIBE XVIII (2023)",
    year: 2023,
    set: "Set A",
    questionIds: [
      "q-const-001",
      "q-const-002",
      "q-crpc-001",
      "q-crpc-003",
      "q-cpc-001",
      "q-cpc-003",
      "q-evi-001",
      "q-ipc-001",
      "q-con-001",
      "q-eth-001",
      "q-pil-001",
      "q-adr-001",
      "q-fam-001",
      "q-tort-001",
      "q-cyb-001"
    ],
    durationMinutes: 210, // 3 hours 30 mins
    totalQuestions: 15, // Available in bank
    marksPerQuestion: 1,
    negativeMarking: false,
    passPercentage: 45 // 45% for General/OBC, 40% for SC/ST
  },
  {
    id: "aibe-xvii",
    name: "AIBE XVII (2022)",
    year: 2022,
    set: "Set A",
    questionIds: [
      "q-const-003",
      "q-const-004",
      "q-crpc-002",
      "q-cpc-002",
      "q-evi-002",
      "q-ipc-002",
      "q-con-002",
      "q-eth-002",
      "q-env-001",
      "q-lab-001"
    ],
    durationMinutes: 210,
    totalQuestions: 10,
    marksPerQuestion: 1,
    negativeMarking: false,
    passPercentage: 45
  }
];
