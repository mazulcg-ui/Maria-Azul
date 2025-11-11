
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../src/index.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Proforma Invoice Verifier',
  description:
    'An intelligent web application that allows users to upload PDF proforma invoices. The app uses the Gemini API to analyze the document, extract key information, and automatically verify it against predefined criteria, providing instant feedback on the invoice\'s validity.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-slate-50 dark:bg-slate-950 font-sans">{children}</body>
    </html>
  );
}
