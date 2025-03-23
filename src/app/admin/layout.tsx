import React from "react";
import { AdminHeader } from "@/components/Header";
import EditorMetadataProvider from "@/features/blog/Providers/EditorMetadataProvider";
import Sidebar from "@/components/Sidebar";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <EditorMetadataProvider>
        <div className="flex min-h-svh">
          <Sidebar />
          <div className="flex-1">
            <AdminHeader />
            {children}
          </div>
        </div>
      </EditorMetadataProvider>
    </div>
  );
}
