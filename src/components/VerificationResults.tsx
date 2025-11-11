import React from 'react';
import type { VerificationResult } from '../types';
import { AlertCircleIcon } from './icons/AlertCircleIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { FileTextIcon } from './icons/FileTextIcon';
import { InfoIcon } from './icons/InfoIcon';

interface VerificationResultsProps {
  results: VerificationResult;
}

const renderMatchStatus = (match: boolean, label: string) => {
    return match ? (
      <div className="flex items-center gap-2">
        <CheckCircleIcon className="w-5 h-5 text-green-600" />
        <span className="text-green-700 dark:text-green-400 font-semibold">{label} Match</span>
      </div>
    ) : (
      <div className="flex items-center gap-2">
        <AlertCircleIcon className="w-5 h-5 text-red-600" />
        <span className="text-red-700 dark:text-red-400 font-bold">NO MATCH</span>
      </div>
    );
};

const ResultCard = ({ children }: { children: React.ReactNode }) => (
    <div className="p-6 bg-white dark:bg-slate-900/70 border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
        {children}
    </div>
);

const DataField = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{label}</p>
        <div className="text-slate-900 dark:text-white font-semibold">{value}</div>
    </div>
);


export default function VerificationResults({ results }: VerificationResultsProps) {
    const isOverallValid = results.companyMatch && results.recipientMatch;

    return (
        <div className="space-y-6">
            <div className={`p-6 border-2 flex items-start gap-4 rounded-2xl ${
                isOverallValid
                ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900"
                : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
            }`}>
                <InfoIcon className={`w-6 h-6 mt-0.5 flex-shrink-0 ${isOverallValid ? "text-green-600" : "text-red-600"}`} />
                <div>
                    <h2 className={`font-bold text-lg ${isOverallValid ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"}`}>
                        {isOverallValid ? "✓ Invoice Valid" : "✗ Invoice Invalid"}
                    </h2>
                    <p className={`text-sm mt-1 ${isOverallValid ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                        {isOverallValid
                        ? "All key data points match the verification criteria."
                        : "Discrepancies found in the invoice data. Please review the details below."}
                    </p>
                </div>
            </div>

            <ResultCard>
                <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                    <DataField label="Company Name" value={results.companyName} />
                    <DataField label="Bank Account Name" value={results.bankAccountName} />
                </div>
                 <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                    {renderMatchStatus(results.companyMatch, 'Company')}
                </div>
            </ResultCard>

            <ResultCard>
                <div className="space-y-4">
                    <DataField label="Recipient Name" value={results.recipientName} />
                    <DataField label="Recipient Address" value={<span className="text-sm leading-relaxed">{results.recipientAddress}</span>} />
                    <DataField label="Recipient Tax ID" value={<span className="font-mono text-lg">{results.recipientTaxID}</span>} />
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                    {renderMatchStatus(results.recipientMatch, 'Recipient')}
                </div>
            </ResultCard>
            
            <div className="grid md:grid-cols-2 gap-6">
                 <ResultCard>
                    <div className="space-y-4">
                        <DataField label="Development Time" value={results.developmentTime} />
                        <DataField label="Payment Terms" value={results.paymentTerms} />
                    </div>
                </ResultCard>

                <ResultCard>
                    <div className="space-y-4">
                        <DataField label="INCOTERM" value={<span className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">{results.incoterm}</span>} />
                        <DataField label="INCOTERM Details" value={results.incotermDetails} />
                        <DataField label="HS Code" value={<span className="font-mono text-lg">{results.hsCode}</span>} />
                    </div>
                </ResultCard>
            </div>
        </div>
    );
}
