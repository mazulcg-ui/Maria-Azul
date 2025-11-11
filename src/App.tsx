import React, { useState, useEffect } from 'react';
import PDFUploader from './components/PDFUploader';
import VerificationResults from './components/VerificationResults';
import ApiKeyPrompt from './components/ApiKeyPrompt';
import { Spinner } from './components/Spinner';
import ThemeToggle from './components/ThemeToggle';
import { verifyInvoice } from './services/geminiService';
// Fix: Import AIStudio type to resolve declaration conflicts.
import type { VerificationResult, AIStudio } from './types';
import { RefreshCwIcon } from './components/icons/RefreshCwIcon';

// Fix: The AIStudio interface has been moved to src/types.ts to serve as a single
// source of truth and resolve conflicting global type declarations.
// The global declaration has been moved to src/types.ts to prevent conflicts.

// Base64 representation of the 360 COMEX logo.
const logoSrc =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAEgASADASIAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAQFAwYHAQL/xAA6EAABAwMCAgYJAwQCAwEAAAAAAQIDBAURBhIhExQxQVEiMmFxkaGxssEHFUKB0eEVIzNSYnLwNEOS/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAfEQEBAQEAAwACAwEAAAAAAAAAAQIRITERIQMyQVH/2gAMAwEAAhEDEQA/AP0BERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQ-i';

export default function App() {
  const [results, setResults] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKeyReady, setApiKeyReady] = useState(false);
  const [checkingApiKey, setCheckingApiKey] = useState(true);

  useEffect(() => {
    const checkKey = async () => {
      try {
        if (await window.aistudio.hasSelectedApiKey()) {
          setApiKeyReady(true);
        }
      } catch (e) {
        console.error("Error checking for API key:", e);
      } finally {
        setCheckingApiKey(false);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    try {
      await window.aistudio.openSelectKey();
      // Assume success to avoid race condition and provide immediate feedback
      setApiKeyReady(true);
    } catch(e) {
      console.error("Could not open API key dialog", e);
    }
  };

  const handleUpload = async (file: File) => {
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const data = await verifyInvoice(file);
      setResults(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      if (typeof errorMessage === 'string' && errorMessage.includes("Requested entity was not found.")) {
        setError("Your API Key appears to be invalid. Please select a valid key and try again.");
        setApiKeyReady(false); // Reset to show the prompt
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    setResults(null);
    setError('');
  };

  if (checkingApiKey) {
    return (
       <div className="min-h-screen flex items-center justify-center">
        <Spinner size="large" />
      </div>
    )
  }

  if (!apiKeyReady) {
    return <ApiKeyPrompt onSetKey={handleSelectKey} />;
  }

  const showResultsArea = loading || error || results;
  const showResetButton = !loading && (error || results);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <header className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={logoSrc} alt="360 COMEX Logo" className="h-10 w-10 rounded-lg" />
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Proforma Invoice Verifier
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {showResetButton && (
             <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <RefreshCwIcon className="w-4 h-4" />
              Start Over
            </button>
          )}
          <ThemeToggle />
        </div>
      </header>
      
       <main className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <section className="md:col-span-2">
            <div className="p-6 sm:p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Upload Invoice PDF</h2>
              <PDFUploader onUpload={handleUpload} loading={loading} />
            </div>
          </section>

          <aside className="md:col-span-1">
            <div className="p-6 h-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-3"></span>
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

        {showResultsArea && (
          <div className="mt-8">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900 rounded-xl shadow-lg animate-fade-in">
                <p className="text-red-700 dark:text-red-200 font-medium text-center">{error}</p>
              </div>
            )}

            {loading && (
              <div className="p-8 text-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg animate-fade-in">
                <div className="flex justify-center mb-4">
                  <Spinner size="large" />
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-semibold animate-pulse text-lg">Analyzing document with Gemini...</p>
                <p className="text-sm text-slate-500 mt-2">This may take a few moments.</p>
              </div>
            )}

            {results && <VerificationResults results={results} />}
          </div>
        )}
      </main>

      <footer className="max-w-6xl mx-auto mt-12 text-center text-sm text-slate-500">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
}
