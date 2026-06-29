// ============================================================
// IsoPulse — Root Layout
// ============================================================

import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IsoPulse — ISO 9001:2015 Quality Management System',
  description:
    'Enterprise QMS platform for ISO 9001:2015 compliance management, internal audits, CAPA tracking, and risk assessment.',
  keywords: ['ISO 9001', 'QMS', 'quality management', 'audit', 'CAPA', 'compliance'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4f46e5',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
