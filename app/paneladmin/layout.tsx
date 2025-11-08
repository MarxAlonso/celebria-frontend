'use client';

import { AdminProtectedRoute } from '@/components/AdminProtectedRoute';

export default function PanelAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProtectedRoute>
      {children}
    </AdminProtectedRoute>
  );
}