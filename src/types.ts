export interface InvoiceData {
  companyName: string;
  bankAccountName: string;
  developmentTime: string;
  paymentTerms: string;
  incoterm: string;
  incotermDetails: string;
  recipientName: string;
  recipientAddress: string;
  recipientTaxID: string;
  hsCode: string;
}

export interface VerificationResult extends InvoiceData {
  companyMatch: boolean;
  recipientMatch: boolean;
}

// Fix: Define AIStudio interface in a central types file to avoid conflicts.
export interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

// Fix: Add global declaration here to avoid conflicts and keep it with the interface.
declare global {
  interface Window {
    aistudio: AIStudio;
  }
}
