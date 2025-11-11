// This file re-exports types from src/types.ts to act as a single source of truth
// and resolve type conflicts caused by the duplicated file structure.
// Using "export type" ensures that only type information is re-exported,
// preventing the `declare global` block from being duplicated.
// FIX: To resolve the duplicate global declaration error, we are breaking the
// re-export link and duplicating the necessary types here. This isolates the
// type contexts.
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

// The AIStudio type is only used within the `src` directory and its global
// declaration is correctly located in `src/types.ts`.
export type { AIStudio } from './src/types';
