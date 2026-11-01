import type { Question } from '../types';

export const QUESTIONS_BANK: Question[] = [
  // --- CONSTITUTIONAL LAW ---
  {
    id: "q-const-001",
    question: "Which Article of the Constitution of India guarantees the Right to Constitutional Remedies?",
    options: {
      A: "Article 19",
      B: "Article 21",
      C: "Article 32",
      D: "Article 226"
    },
    correctAnswer: "C",
    subjectId: "constitutional-law",
    topicId: "fundamental-rights",
    year: 2023,
    examId: "aibe-xviii",
    examName: "AIBE XVIII",
    set: "Set A",
    questionNumber: 1,
    questionType: "mcq",
    explanation: "Dr. B.R. Ambedkar called Article 32 the 'heart and soul of the Constitution'. Article 226 also confers writ jurisdiction on High Courts, but Article 32 is itself a Fundamental Right in Part III.",
    legalProvision: "Article 32, Constitution of India",
    verified: true,
    source: {
      exam: "AIBE XVIII",
      year: 2023,
      set: "Set A",
      questionNumber: 1
    }
  },
  {
    id: "q-const-002",
    question: "The doctrine of 'Basic Structure' was enunciated by the Supreme Court of India in which landmark case?",
    options: {
      A: "Golaknath v. State of Punjab",
      B: "Kesavananda Bharati v. State of Kerala",
      C: "Minerva Mills v. Union of India",
      D: "Maneka Gandhi v. Union of India"
    },
    correctAnswer: "B",
    subjectId: "constitutional-law",
    topicId: "amendment-basic-structure",
    year: 2023,
    examId: "aibe-xviii",
    examName: "AIBE XVIII",
    set: "Set A",
    questionNumber: 2,
    questionType: "mcq",
    explanation: "In Kesavananda Bharati (1973), a 13-judge bench of the Supreme Court held that Parliament's constituent power under Article 368 cannot alter the basic structure or framework of the Constitution.",
    caseLaw: "Kesavananda Bharati v. State of Kerala (1973) 4 SCC 225",
    verified: true,
    source: {
      exam: "AIBE XVIII",
      year: 2023,
      set: "Set A",
      questionNumber: 2
    }
  },
  {
    id: "q-const-003",
    question: "Under Article 21 of the Indian Constitution, the procedure established by law must be:",
    options: {
      A: "Strictly literal and unambiguous",
      B: "Just, fair and reasonable",
      C: "Enacted only by Parliament and not State legislatures",
      D: "Subject to executive discretion"
    },
    correctAnswer: "B",
    subjectId: "constitutional-law",
    topicId: "fundamental-rights",
    year: 2022,
    examId: "aibe-xvii",
    examName: "AIBE XVII",
    set: "Set A",
    questionNumber: 3,
    questionType: "mcq",
    explanation: "In Maneka Gandhi v. Union of India (1978), the Supreme Court held that the procedure prescribed by law under Article 21 must not be arbitrary, fanciful or oppressive; it must be just, fair, and reasonable.",
    caseLaw: "Maneka Gandhi v. Union of India (1978) 1 SCC 248",
    verified: true,
    source: {
      exam: "AIBE XVII",
      year: 2022,
      set: "Set A",
      questionNumber: 3
    }
  },
  {
    id: "q-const-004",
    question: "Which writ literally translates to 'We Command'?",
    options: {
      A: "Habeas Corpus",
      B: "Mandamus",
      C: "Quo-Warranto",
      D: "Certiorari"
    },
    correctAnswer: "B",
    subjectId: "constitutional-law",
    topicId: "writs",
    year: 2022,
    examId: "aibe-xvii",
    examName: "AIBE XVII",
    set: "Set A",
    questionNumber: 4,
    questionType: "mcq",
    explanation: "Mandamus means 'we command'. It is issued to compel a public authority to perform a mandatory statutory or public duty that it has failed or refused to perform.",
    legalProvision: "Article 32 & 226, Constitution of India",
    verified: true,
    source: {
      exam: "AIBE XVII",
      year: 2022,
      set: "Set A",
      questionNumber: 4
    }
  },

  // --- CR.P.C. / BNSS ---
  {
    id: "q-crpc-001",
    question: "Under Section 154 of the Code of Criminal Procedure, 1973, information relating to the commission of a cognizable offence can be given to the police:",
    options: {
      A: "Only in writing signed by the informant",
      B: "Orally or in writing",
      C: "Only on a judicial stamp paper",
      D: "Only through an advocate"
    },
    correctAnswer: "B",
    subjectId: "crpc",
    topicId: "fir-investigation",
    year: 2023,
    examId: "aibe-xviii",
    examName: "AIBE XVIII",
    set: "Set A",
    questionNumber: 5,
    questionType: "mcq",
    explanation: "Section 154(1) Cr.P.C. explicitly states that every information relating to the commission of a cognizable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him or under his direction.",
    legalProvision: "Section 154, Cr.P.C. / Section 173, BNSS",
    verified: true,
    source: {
      exam: "AIBE XVIII",
      year: 2023,
      set: "Set A",
      questionNumber: 5
    }
  },
  {
    id: "q-crpc-002",
    question: "Under which provision of Cr.P.C. can a Magistrate order monthly maintenance for wife, children, and parents?",
    options: {
      A: "Section 125",
      B: "Section 144",
      C: "Section 164",
      D: "Section 482"
    },
    correctAnswer: "A",
    subjectId: "crpc",
    topicId: "maintenance",
    year: 2022,
    examId: "aibe-xvii",
    examName: "AIBE XVII",
    set: "Set A",
    questionNumber: 6,
    questionType: "mcq",
    explanation: "Section 125 of Cr.P.C. (Section 144 BNSS) provides a summary remedy for maintenance of wives, children, and parents who are unable to maintain themselves.",
    legalProvision: "Section 125, Cr.P.C. / Section 144, BNSS",
    verified: true,
    source: {
      exam: "AIBE XVII",
      year: 2022,
      set: "Set A",
      questionNumber: 6
    }
  },
  {
    id: "q-crpc-003",
    question: "The power of the High Court to grant anticipatory bail is provided under which Section of Cr.P.C.?",
    options: {
      A: "Section 436",
      B: "Section 437",
      C: "Section 438",
      D: "Section 439"
    },
    correctAnswer: "C",
    subjectId: "crpc",
    topicId: "bail",
    year: 2023,
    examId: "aibe-xviii",
    examName: "AIBE XVIII",
    set: "Set A",
    questionNumber: 7,
    questionType: "mcq",
    explanation: "Section 438 of Cr.P.C. enables the High Court or Court of Session to issue directions granting bail to a person apprehending arrest on an accusation of having committed a non-bailable offence.",
    legalProvision: "Section 438, Cr.P.C. / Section 482, BNSS",
    verified: true,
    source: {
      exam: "AIBE XVIII",
      year: 2023,
      set: "Set A",
      questionNumber: 7
    }
  },

  // --- C.P.C. ---
  {
    id: "q-cpc-001",
    question: "The doctrine of 'Res Judicata' is embodied under which Section of the Code of Civil Procedure, 1908?",
    options: {
      A: "Section 9",
      B: "Section 10",
      C: "Section 11",
      D: "Section 12"
    },
    correctAnswer: "C",
    subjectId: "cpc",
    topicId: "res-judicata",
    year: 2023,
    examId: "aibe-xviii",
    examName: "AIBE XVIII",
    set: "Set A",
    questionNumber: 8,
    questionType: "mcq",
    explanation: "Section 11 CPC enacts the rule of Res Judicata: No court shall try any suit or issue in which the matter directly and substantially in issue has been heard and finally decided in a former suit between the same parties.",
    legalProvision: "Section 11, CPC",
    verified: true,
    source: {
      exam: "AIBE XVIII",
      year: 2023,
      set: "Set A",
      questionNumber: 8
    }
  },
  {
    id: "q-cpc-002",
    question: "Under the Code of Civil Procedure, an application for temporary injunction is filed under which provision?",
    options: {
      A: "Order 38 Rule 5",
      B: "Order 39 Rules 1 and 2",
      C: "Order 40 Rule 1",
      D: "Order 41 Rule 5"
    },
    correctAnswer: "B",
    subjectId: "cpc",
    topicId: "injunctions",
    year: 2022,
    examId: "aibe-xvii",
    examName: "AIBE XVII",
    set: "Set A",
    questionNumber: 9,
    questionType: "mcq",
    explanation: "Order XXXIX, Rules 1 and 2 CPC deal with cases in which temporary injunctions and interlocutory orders may be granted to prevent wastage, damage, or alienation of suit property.",
    legalProvision: "Order 39 Rules 1 & 2, CPC",
    verified: true,
    source: {
      exam: "AIBE XVII",
      year: 2022,
      set: "Set A",
      questionNumber: 9
    }
  },
  {
    id: "q-cpc-003",
    question: "Inherent powers of the civil court are preserved under which Section of CPC?",
    options: {
      A: "Section 148",
      B: "Section 151",
      C: "Section 152",
      D: "Section 153"
    },
    correctAnswer: "B",
    subjectId: "cpc",
    topicId: "inherent-powers",
    year: 2023,
    examId: "aibe-xviii",
    examName: "AIBE XVIII",
    set: "Set A",
    questionNumber: 10,
    questionType: "mcq",
    explanation: "Section 151 CPC recognizes inherent powers of the court to make such orders as may be necessary for the ends of justice or to prevent abuse of the process of the court.",
    legalProvision: "Section 151, CPC",
    verified: true,
    source: {
      exam: "AIBE XVIII",
      year: 2023,
      set: "Set A",
      questionNumber: 10
    }
  },

  // --- EVIDENCE ACT / BSA ---
  {
    id: "q-evi-001",
    question: "Under the Indian Evidence Act, 1872, a confession made to a police officer:",
    options: {
      A: "Is admissible without limitation",
      B: "Shall not be proved as against a person accused of any offence",
      C: "Is admissible if corroborated by two independent witnesses",
      D: "Is admissible only in bailable cases"
    },
    correctAnswer: "B",
    subjectId: "evidence",
    topicId: "confessions",
    year: 2023,
    examId: "aibe-xviii",
    examName: "AIBE XVIII",
    set: "Set A",
    questionNumber: 11,
    questionType: "mcq",
    explanation: "Section 25 of the Indian Evidence Act bars confession made to a police officer from being proved against an accused person.",
    legalProvision: "Section 25, Indian Evidence Act / Section 23, BSA",
    verified: true,
    source: {
      exam: "AIBE XVIII",
      year: 2023,
      set: "Set A",
      questionNumber: 11
    }
  },
  {
    id: "q-evi-002",
    question: "The rule regarding 'dying declaration' is contained in which Section of the Indian Evidence Act?",
    options: {
      A: "Section 27",
      B: "Section 32(1)",
      C: "Section 33",
      D: "Section 114A"
    },
    correctAnswer: "B",
    subjectId: "evidence",
    topicId: "statements-by-deceased",
    year: 2022,
    examId: "aibe-xvii",
    examName: "AIBE XVII",
    set: "Set A",
    questionNumber: 12,
    questionType: "mcq",
    explanation: "Section 32(1) makes statements written or verbal of relevant facts made by a person who is dead, as to the cause of death, relevant and admissible.",
    legalProvision: "Section 32(1), Indian Evidence Act / Section 26, BSA",
    verified: true,
    source: {
      exam: "AIBE XVII",
      year: 2022,
      set: "Set A",
      questionNumber: 12
    }
  },

  // --- INDIAN PENAL CODE / BNS ---
  {
    id: "q-ipc-001",
    question: "Nothing is an offence which is done by a child under what age according to the Indian Penal Code?",
    options: {
      A: "Under seven years of age",
      B: "Under ten years of age",
      C: "Under twelve years of age",
      D: "Under fourteen years of age"
    },
    correctAnswer: "A",
    subjectId: "ipc",
    topicId: "general-exceptions",
    year: 2023,
    examId: "aibe-xviii",
    examName: "AIBE XVIII",
    set: "Set A",
    questionNumber: 13,
    questionType: "mcq",
    explanation: "Section 82 of IPC (Doli Incapax) provides absolute immunity: nothing is an offence which is done by a child under seven years of age.",
    legalProvision: "Section 82, IPC / Section 20, BNS",
    verified: true,
    source: {
      exam: "AIBE XVIII",
      year: 2023,
      set: "Set A",
      questionNumber: 13
    }
  },
  {
    id: "q-ipc-002",
    question: "The principle of Joint Liability under Section 34 of IPC requires:",
    options: {
      A: "Common intention and participation in furtherance of it",
      B: "Same intention only",
      C: "Mere presence at the spot without active act",
      D: "Knowledge of consequences alone"
    },
    correctAnswer: "A",
    subjectId: "ipc",
    topicId: "joint-liability",
    year: 2022,
    examId: "aibe-xvii",
    examName: "AIBE XVII",
    set: "Set A",
    questionNumber: 14,
    questionType: "mcq",
    explanation: "Section 34 requires pre-arranged plan / prior meeting of minds (common intention) along with physical or constructive participation in the act.",
    legalProvision: "Section 34, IPC / Section 3(5), BNS",
    verified: true,
    source: {
      exam: "AIBE XVII",
      year: 2022,
      set: "Set A",
      questionNumber: 14
    }
  },

  // --- CONTRACT LAW ---
  {
    id: "q-con-001",
    question: "An agreement without consideration under Section 25 of the Indian Contract Act, 1872 is:",
    options: {
      A: "Voidable at the option of the promisor",
      B: "Void ab initio, subject to recognized exceptions",
      C: "Always valid",
      D: "Illegal and punishable"
    },
    correctAnswer: "B",
    subjectId: "contracts-property",
    topicId: "consideration",
    year: 2023,
    examId: "aibe-xviii",
    examName: "AIBE XVIII",
    set: "Set A",
    questionNumber: 15,
    questionType: "mcq",
    explanation: "Section 25 stipulates that an agreement made without consideration is void unless expressed in writing, registered under law, made out of natural love and affection between parties standing in near relation, or promises to pay a time-barred debt.",
    legalProvision: "Section 25, Indian Contract Act 1872",
    verified: true,
    source: {
      exam: "AIBE XVIII",
      year: 2023,
      set: "Set A",
      questionNumber: 15
    }
  },
  {
    id: "q-con-002",
    question: "In the case of Hadley v. Baxendale (1854), the rule established relates to:",
    options: {
      A: "Remoteness of damages for breach of contract",
      B: "Anticipatory breach",
      C: "Undue influence",
      D: "Specific performance"
    },
    correctAnswer: "A",
    subjectId: "contracts-property",
    topicId: "damages",
    year: 2022,
    examId: "aibe-xvii",
    examName: "AIBE XVII",
    set: "Set A",
    questionNumber: 16,
    questionType: "mcq",
    explanation: "Hadley v. Baxendale laid down the two branches of damages: damages arising naturally in the usual course of things, or special damages reasonably contemplated by both parties at the time of contract.",
    caseLaw: "Hadley v. Baxendale (1854) 9 Exch 341",
    verified: true,
    source: {
      exam: "AIBE XVII",
      year: 2022,
      set: "Set A",
      questionNumber: 16
    }
  },

  // --- PROFESSIONAL ETHICS & BCI RULES ---
  {
    id: "q-eth-001",
    question: "Under the Advocates Act, 1961, disciplinary action against an advocate for professional misconduct is initiated before:",
    options: {
      A: "The High Court directly",
      B: "The Disciplinary Committee of the State Bar Council",
      C: "The District Court Bar Association",
      D: "The Ministry of Law and Justice"
    },
    correctAnswer: "B",
    subjectId: "professional-ethics",
    topicId: "disciplinary-proceedings",
    year: 2023,
    examId: "aibe-xviii",
    examName: "AIBE XVIII",
    set: "Set A",
    questionNumber: 17,
    questionType: "mcq",
    explanation: "Under Section 35 of the Advocates Act, 1961, complaints against an advocate for professional or other misconduct are referred to the Disciplinary Committee of the State Bar Council.",
    legalProvision: "Section 35, Advocates Act 1961",
    verified: true,
    source: {
      exam: "AIBE XVIII",
      year: 2023,
      set: "Set A",
      questionNumber: 17
    }
  },
  {
    id: "q-eth-002",
    question: "An advocate in India is prohibited from appearing in a matter in which:",
    options: {
      A: "The client cannot pay the full fee immediately",
      B: "He himself is a witness or has pecuniary interest in the subject matter",
      C: "The opponent is represented by a senior advocate",
      D: "The case is being heard before a vacation bench"
    },
    correctAnswer: "B",
    subjectId: "professional-ethics",
    topicId: "bci-rules",
    year: 2022,
    examId: "aibe-xvii",
    examName: "AIBE XVII",
    set: "Set A",
    questionNumber: 18,
    questionType: "mcq",
    explanation: "Under Bar Council of India Rules (Standards of Professional Conduct and Etiquette), an advocate should not accept a brief or appear in or before any court or authority in a matter wherein he has reason to believe that he will be a witness.",
    legalProvision: "BCI Rules Part VI, Chapter II, Section II",
    verified: true,
    source: {
      exam: "AIBE XVII",
      year: 2022,
      set: "Set A",
      questionNumber: 18
    }
  },

  // --- PIL ---
  {
    id: "q-pil-001",
    question: "The concept of 'Epistolary Jurisdiction' in Public Interest Litigation refers to:",
    options: {
      A: "Hearing cases exclusively through affidavits without oral argument",
      B: "Treating a letter or telegram addressed to the court as a writ petition",
      C: "Jurisdiction exercised by the President of India",
      D: "Appellate jurisdiction over quasi-judicial tribunals"
    },
    correctAnswer: "B",
    subjectId: "pil",
    topicId: "epistolary-jurisdiction",
    year: 2023,
    examId: "aibe-xviii",
    examName: "AIBE XVIII",
    set: "Set A",
    questionNumber: 19,
    questionType: "mcq",
    explanation: "Pioneered by Justice P.N. Bhagwati and Justice V.R. Krishna Iyer, epistolary jurisdiction allows constitutional courts to relax traditional procedural rules and treat letters/postcards from disadvantaged citizens or public-spirited individuals as writ petitions.",
    caseLaw: "Sunil Batra v. Delhi Administration (1980) 3 SCC 488",
    verified: true,
    source: {
      exam: "AIBE XVIII",
      year: 2023,
      set: "Set A",
      questionNumber: 19
    }
  },

  // --- ADR ---
  {
    id: "q-adr-001",
    question: "Under the Arbitration and Conciliation Act, 1996, an application for setting aside an arbitral award must be filed within:",
    options: {
      A: "30 days",
      B: "3 months, extendable by not more than 30 days on sufficient cause",
      C: "6 months",
      D: "1 year"
    },
    correctAnswer: "B",
    subjectId: "adr",
    topicId: "arbitral-award",
    year: 2023,
    examId: "aibe-xviii",
    examName: "AIBE XVIII",
    set: "Set A",
    questionNumber: 20,
    questionType: "mcq",
    explanation: "Section 34(3) of the Arbitration and Conciliation Act specifies three months from the date of receiving the arbitral award, with a 30-day grace period if the court is satisfied that the applicant was prevented by sufficient cause.",
    legalProvision: "Section 34(3), Arbitration and Conciliation Act 1996",
    verified: true,
    source: {
      exam: "AIBE XVIII",
      year: 2023,
      set: "Set A",
      questionNumber: 20
    }
  },

  // --- FAMILY LAW ---
  {
    id: "q-fam-001",
    question: "Under Section 13B of the Hindu Marriage Act, 1955, divorce by mutual consent requires parties to have been living separately for a period of at least:",
    options: {
      A: "Six months",
      B: "One year",
      C: "Two years",
      D: "Three years"
    },
    correctAnswer: "B",
    subjectId: "family-law",
    topicId: "divorce",
    year: 2023,
    examId: "aibe-xviii",
    examName: "AIBE XVIII",
    set: "Set A",
    questionNumber: 21,
    questionType: "mcq",
    explanation: "Section 13B(1) requires a joint petition on the ground that the spouses have been living separately for a period of one year or more, have not been able to live together, and have mutually agreed that marriage should be dissolved.",
    legalProvision: "Section 13B, Hindu Marriage Act 1955",
    verified: true,
    source: {
      exam: "AIBE XVIII",
      year: 2023,
      set: "Set A",
      questionNumber: 21
    }
  },

  // --- TORTS & CONSUMER ---
  {
    id: "q-tort-001",
    question: "The principle of 'Absolute Liability' without the exceptions recognized in Rylands v. Fletcher was evolved in India in which case?",
    options: {
      A: "Donoghue v. Stevenson",
      B: "M.C. Mehta v. Union of India (Oleum Gas Leak case)",
      C: "Bhim Singh v. State of J&K",
      D: "Kasturi Lal v. State of U.P."
    },
    correctAnswer: "B",
    subjectId: "torts-consumer",
    topicId: "strict-liability",
    year: 2023,
    examId: "aibe-xviii",
    examName: "AIBE XVIII",
    set: "Set A",
    questionNumber: 22,
    questionType: "mcq",
    explanation: "In M.C. Mehta (1987), Chief Justice P.N. Bhagwati propounded that enterprise engaged in hazardous or inherently dangerous industry owes an absolute and non-delegable duty to the community, not subject to any exceptions of Rylands v. Fletcher.",
    caseLaw: "M.C. Mehta v. Union of India (1987) 1 SCC 395",
    verified: true,
    source: {
      exam: "AIBE XVIII",
      year: 2023,
      set: "Set A",
      questionNumber: 22
    }
  },

  // --- ENVIRONMENTAL LAW ---
  {
    id: "q-env-001",
    question: "The 'Polluter Pays Principle' and 'Precautionary Principle' were declared integral parts of Indian environmental jurisprudence in:",
    options: {
      A: "Vellore Citizens' Welfare Forum v. Union of India",
      B: "Maneka Gandhi v. Union of India",
      C: "Vishaka v. State of Rajasthan",
      D: "Indra Sawhney v. Union of India"
    },
    correctAnswer: "A",
    subjectId: "environmental-law",
    topicId: "principles",
    year: 2022,
    examId: "aibe-xvii",
    examName: "AIBE XVII",
    set: "Set A",
    questionNumber: 23,
    questionType: "mcq",
    explanation: "In Vellore Citizens (1996), the Supreme Court held that the Precautionary Principle and the Polluter Pays Principle are essential features of 'Sustainable Development' and part of environmental law under Article 21.",
    caseLaw: "Vellore Citizens' Welfare Forum v. Union of India (1996) 5 SCC 647",
    verified: true,
    source: {
      exam: "AIBE XVII",
      year: 2022,
      set: "Set A",
      questionNumber: 23
    }
  },

  // --- CYBER LAW ---
  {
    id: "q-cyb-001",
    question: "In which landmark judgment was Section 66A of the Information Technology Act, 2000 struck down by the Supreme Court of India as unconstitutional?",
    options: {
      A: "K.S. Puttaswamy v. Union of India",
      B: "Shreya Singhal v. Union of India",
      C: "Navtej Singh Johar v. Union of India",
      D: "Joseph Shine v. Union of India"
    },
    correctAnswer: "B",
    subjectId: "cyber-law",
    topicId: "it-act",
    year: 2023,
    examId: "aibe-xviii",
    examName: "AIBE XVIII",
    set: "Set A",
    questionNumber: 24,
    questionType: "mcq",
    explanation: "In Shreya Singhal (2015), the Supreme Court struck down Section 66A of the IT Act for violating freedom of speech and expression under Article 19(1)(a) due to overbreadth and vagueness.",
    caseLaw: "Shreya Singhal v. Union of India (2015) 5 SCC 1",
    verified: true,
    source: {
      exam: "AIBE XVIII",
      year: 2023,
      set: "Set A",
      questionNumber: 24
    }
  },

  // --- LABOUR LAW ---
  {
    id: "q-lab-001",
    question: "Under the Industrial Disputes Act, 1947, 'Retrenchment' does not include termination of service as a result of:",
    options: {
      A: "Surplus labour reduction",
      B: "Voluntary retirement of the workman",
      C: "Closure of a department",
      D: "Reorganization of business"
    },
    correctAnswer: "B",
    subjectId: "labour-law",
    topicId: "retrenchment",
    year: 2022,
    examId: "aibe-xvii",
    examName: "AIBE XVII",
    set: "Set A",
    questionNumber: 25,
    questionType: "mcq",
    explanation: "Section 2(oo) of the Industrial Disputes Act defines retrenchment and explicitly excludes voluntary retirement, superannuation, termination on continued ill-health, and non-renewal of contract.",
    legalProvision: "Section 2(oo), Industrial Disputes Act 1947",
    verified: true,
    source: {
      exam: "AIBE XVII",
      year: 2022,
      set: "Set A",
      questionNumber: 25
    }
  }
];
