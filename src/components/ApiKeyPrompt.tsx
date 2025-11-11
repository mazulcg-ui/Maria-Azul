import React from 'react';
import { KeyIcon } from './icons/KeyIcon';

interface ApiKeyPromptProps {
  onSetKey: () => void;
}

export default function ApiKeyPrompt({ onSetKey }: ApiKeyPromptProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="p-6 sm:p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg">
          <div className="flex justify-center mb-5">
            <div className="p-4 bg-amber-100 dark:bg-amber-950/40 rounded-full">
              <KeyIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            API Key Required
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            To start verifying invoices, please select your Google Gemini API key. For more information on billing, see the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">documentation</a>.
          </p>
          <button
            onClick={onSetKey}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            Select API Key
          </button>
        </div>
        <footer className="mt-8 text-center text-sm text-slate-500">
          <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
}