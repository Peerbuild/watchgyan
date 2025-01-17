import React from 'react';
import { AdminHeader } from '@/components/Header';
import EditorMetadataProvider from '@/features/blog/Providers/EditorMetadataProvider';

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <EditorMetadataProvider>
        <AdminHeader />
        {children}
      </EditorMetadataProvider>
    </div>
  );
}
