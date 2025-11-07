'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}