
import React, { useState } from 'react';
import PDFUploader from './components/PDFUploader';
import VerificationResults from './components/VerificationResults';
import { Spinner } from './components/Spinner';
import { verifyInvoice } from './services/geminiService';
import type { VerificationResult } from './types';

export default function App() {
  const [results, setResults] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (file: File) => {
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const data = await verifyInvoice(file);
      setResults(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An unknown error occurred.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 sm:p-6 md:p-8">
      <header className="max-w-5xl mx-auto mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
          Proforma Invoice Verifier
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Automatically validate the data from your proforma invoices using AI.
        </p>
      </header>

      <main className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <section className="md:col-span-2">
            <div className="p-6 sm:p-8 bg-white dark:bg-slate-900/70 border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Upload Invoice PDF</h2>
              <PDFUploader onUpload={handleUpload} loading={loading} />
            </div>
          </section>

          <aside className="md:col-span-1">
            <div className="p-6 h-full bg-blue-50 dark:bg-blue-950/20 border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-3"></span>
                Valid Recipient Details
              </h3>
              <div className="text-sm space-y-3">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Guangzhou Baiyun Export & Import Co. LTD.</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Address:</p>
                  <p className="text-slate-800 dark:text-slate-300">
                    Thomson Commercial Building, 8 Thomson Road, Hong Kong, CHINA
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Tax ID:</p>
                  <p className="font-mono text-slate-800 dark:text-slate-300">76303593</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {error && (
          <div className="mt-6">
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900 rounded-xl">
              <p className="text-red-700 dark:text-red-200 font-medium text-center">{error}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="mt-8">
            <div className="p-8 text-center bg-white dark:bg-slate-900/70 border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="flex justify-center mb-4">
                <Spinner />
              </div>
              <p className="text-slate-600 dark:text-slate-400 animate-pulse">Analyzing document with Gemini...</p>
            </div>
          </div>
        )}

        {results && (
          <div className="mt-8">
            <VerificationResults results={results} />
          </div>
        )}
      </main>

      <footer className="max-w-5xl mx-auto mt-12 text-center text-sm text-slate-500">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
}
