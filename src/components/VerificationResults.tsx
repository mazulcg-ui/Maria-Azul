import React from 'react';
import type { VerificationResult } from '../types';
import { AlertCircleIcon } from './icons/AlertCircleIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { InfoIcon } from './icons/InfoIcon';

// Fix: Define the props type for the VerificationResults component.
interface VerificationResultsProps {
  results: VerificationResult;
}

type Status = 'Match' | 'No Match' | 'Info';

const getStatusStyles = (status: Status) => {
  switch (status) {
    case 'Match':
      return {
        icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
        textClass: 'text-green-600 dark:text-green-400',
        bgClass: 'bg-green-100 dark:bg-green-900/30',
        borderClass: 'border-green-500',
      };
    case 'No Match':
      return {
        icon: <AlertCircleIcon className="w-5 h-5 text-red-500" />,
        textClass: 'text-red-600 dark:text-red-400',
        bgClass: 'bg-red-100 dark:bg-red-900/30',
        borderClass: 'border-red-500',
      };
    case 'Info':
    default:
      return {
        icon: <InfoIcon className="w-5 h-5 text-blue-500" />,
        textClass: 'text-blue-600 dark:text-blue-400',
        bgClass: 'bg-blue-100 dark:bg-blue-900/30',
        borderClass: 'border-blue-500',
      };
  }
};

const StatusBadge = ({ status }: { status: Status }) => {
  const { icon, textClass, bgClass } = getStatusStyles(status);
  return (
    <div className={`flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-full ${bgClass} ${textClass}`}>
      {icon}
      <span>{status}</span>
    </div>
  );
};

const DetailCard = ({ title, status, children }: { title: string; status: Status; children: React.ReactNode }) => {
  const { borderClass } = getStatusStyles(status);

  return (
    <div className={`bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border ${borderClass} border-l-4 rounded-xl shadow-lg overflow-hidden`}>
      <header className="px-6 py-4 border-b border-slate-200/80 dark:border-slate-800/80 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
        <StatusBadge status={status} />
      </header>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

const DataField = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="py-3 border-b border-slate-200/50 dark:border-slate-800/50 last:border-b-0">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</p>
        <div className="text-slate-900 dark:text-white text-base font-semibold">{value}</div>
    </div>
);

const OverallStatusCard = ({ isValid }: { isValid: boolean }) => {
    const title = isValid ? "Verification Success" : "Verification Failed";
    const description = isValid
        ? "All key data points match the verification criteria. The invoice appears to be valid."
        : "Discrepancies found in the invoice data. Please review the details below carefully.";
    const Icon = isValid ? CheckCircleIcon : AlertCircleIcon;
    const colorClass = isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
    const bgClass = isValid ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20';
    const borderClass = isValid ? 'border-green-300 dark:border-green-800' : 'border-red-300 dark:border-red-800';

    return (
        <div className={`p-6 border flex items-start gap-4 rounded-2xl shadow-lg ${bgClass} ${borderClass}`}>
            <Icon className={`w-8 h-8 mt-1 flex-shrink-0 ${colorClass}`} />
            <div>
                <h2 className={`font-bold text-xl ${isValid ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"}`}>
                    {title}
                </h2>
                <p className={`text-sm mt-1 ${isValid ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                    {description}
                </p>
            </div>
        </div>
    );
};


export default function VerificationResults({ results }: VerificationResultsProps) {
    const isOverallValid = results.companyMatch && results.recipientMatch;

    return (
        <div className="space-y-6 animate-fade-in">
            <OverallStatusCard isValid={isOverallValid} />
            
            <div className="grid md:grid-cols-2 gap-6">
                <DetailCard title="Company & Bank Verification" status={results.companyMatch ? 'Match' : 'No Match'}>
                    <div className="space-y-2">
                        <DataField label="Company Name" value={results.companyName} />
                        <DataField label="Bank Account Name" value={results.bankAccountName} />
                    </div>
                </DetailCard>

                <DetailCard title="Recipient Verification" status={results.recipientMatch ? 'Match' : 'No Match'}>
                    <div className="space-y-2">
                        <DataField label="Recipient Name" value={results.recipientName} />
                        <DataField label="Recipient Address" value={<span className="text-sm leading-relaxed">{results.recipientAddress}</span>} />
                        <DataField label="Recipient Tax ID" value={<span className="font-mono">{results.recipientTaxID}</span>} />
                    </div>
                </DetailCard>
            </div>

            <DetailCard title="Shipment & Payment Details" status="Info">
                <div className="grid md:grid-cols-3 gap-x-6 gap-y-2">
                    <DataField label="Development Time" value={results.developmentTime} />
                    <DataField label="Payment Terms" value={results.paymentTerms} />
                     <DataField label="HS Code" value={<span className="font-mono">{results.hsCode}</span>} />
                    <DataField label="INCOTERM" value={<span className="font-bold text-cyan-600 dark:text-cyan-400">{results.incoterm}</span>} />
                    <DataField label="INCOTERM Details" value={results.incotermDetails} />
                </div>
            </DetailCard>
        </div>
    );
}