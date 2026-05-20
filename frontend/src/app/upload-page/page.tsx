import React from 'react';

import AppLayout from '@/components/AppLayout';
import AuthGuard from '@/components/AuthGuard';
import UploadDropzone from './components/UploadDropzone';
import ProcessingQueue from './components/ProcessingQueue';
import DocumentLibrary from './components/DocumentLibrary';

export default function UploadPage() {
  return (
    <AuthGuard>
    <AppLayout currentPath="/upload-page">

      <div
        className="min-h-full px-6 py-8 xl:px-10"
        style={{
          background:
            'radial-gradient(circle at top,#0b1020,#050816 60%)',
        }}
      >

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-white mb-3">
            Upload Knowledge Base
          </h1>

          <p className="text-gray-400 text-lg">
            Upload PDFs and build your personal AI-powered second brain.
          </p>

        </div>

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

          <div className="xl:col-span-2">
            <UploadDropzone />
          </div>

          <div>
            <ProcessingQueue />
          </div>

        </div>

        {/* LIBRARY */}
        <DocumentLibrary />

      </div>

    </AppLayout>
    </AuthGuard>
  );
}