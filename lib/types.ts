export type ExtractResponse = {
  success: boolean;
  text: string;
  metadata: {
    filename: string;
    pageCount: number | null;
    size: number;
  };
  error?: string;
};

export type PaperSummary = {
  title: string;
  shortDescription: string;
  researchQuestion: string;
  keyContributions: string[];
  coreArguments: string[];
  counterarguments: string[];
  method: string;
  findings: string[];
  limitations: string[];
  plainEnglishExplanation: string;
  longCritique: string;
};

export type SummaryResponse = {
  success: boolean;
  summary?: PaperSummary;
  error?: string;
};

