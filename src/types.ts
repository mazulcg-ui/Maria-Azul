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
}

export interface VerificationResult extends InvoiceData {
  companyMatch: boolean;
  recipientMatch: boolean;
}
