import React, { useRef, useState } from "react";
import { UploadIcon } from "./icons/UploadIcon";
import { Spinner } from "./Spinner";

interface PDFUploaderProps {
  onUpload: (file: File) => void;
  loading: boolean;
}

export default function PDFUploader({ onUpload, loading }: PDFUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e: React.DragEvent, enter: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (!loading) {
      setIsDragging(enter);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (loading) return;
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0 && files[0].type === "application/pdf") {
      onUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
        disabled={loading}
      />

      <div
        onDragEnter={(e) => handleDrag(e, true)}
        onDragLeave={(e) => handleDrag(e, false)}
        onDragOver={(e) => handleDrag(e, true)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-10 sm:p-12 text-center transition-all duration-300 cursor-pointer ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
            : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600"
        }`}
        onClick={() => !loading && inputRef.current?.click()}
      >
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-950/40 rounded-full">
            <UploadIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2">
          {loading ? "Processing..." : "Drag & drop your PDF here"}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">or click to select a file</p>
        <button
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
        >
          {loading ? <Spinner /> : "Select PDF"}
        </button>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4 text-center">
        Only PDF files are accepted • Max 1GB
      </p>
    </div>
  );
}