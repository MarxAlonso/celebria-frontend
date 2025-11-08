'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { FolderOpen, Plus } from 'lucide-react';

export default function AdminInvitacionesPage() {
  return (
    <div className="px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-serif text-celebrity-gray-900">Invitaciones</h2>
        <Button className="celebrity-gradient text-white"><Plus className="w-4 h-4 mr-2" /> Nueva invitación</Button>
      </div>
      <div className="celebrity-card p-6">
        <div className="flex items-center mb-4">
          <FolderOpen className="w-5 h-5 text-celebrity-purple mr-2" />
          <span className="font-medium">Listado de invitaciones</span>
        </div>
        <p className="text-celebrity-gray-600">Aquí se mostrará la tabla de invitaciones del backend.</p>
      </div>
    </div>
  );
}