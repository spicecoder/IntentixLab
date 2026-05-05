export interface Phrase {
  id: string;
  phrase: string;
  category: 'Pulse' | 'DN' | 'I' | 'O';
  trivalence: 'Y' | 'N' | 'UN';
  description: string;
}

export interface IntentionContainer {
  id: string;
  name: string;
  oHolder: string[];
  dn: string | null;
  dnDescription: string;
  oReflector: string[];
  triggerSignal: string;
  releaseSignal: string;
}

export interface CpuxDesign {
  containers: IntentionContainer[];
  releaseSignals: string[];
  triggerSignal: string;
  fieldDescription?: string;
  explanation?: string;
}

export interface VerificationResult {
  rule: string;
  passed: boolean;
  message: string;
  severity?: 'error' | 'warning' | 'info';
  suggestions?: string[];
}

export interface VerificationData {
  results: VerificationResult[];
  overallScore?: number;
  summary?: string;
}

export interface ProjectData {
  id: string;
  name: string;
  scenario: string;
  phrases: string;
  cpuxDesign: string;
  verification: string;
  exportData: string;
  createdAt: string;
  updatedAt: string;
}
