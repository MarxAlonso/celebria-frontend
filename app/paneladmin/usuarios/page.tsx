'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Users } from 'lucide-react';

export default function AdminUsuariosPage() {
  return (
    <div className="px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-serif text-celebrity-gray-900">Usuarios</h2>
        <Button variant="outline">Crear usuario</Button>
      </div>
      <div className="celebrity-card p-6">
        <div className="flex items-center mb-4">
          <Users className="w-5 h-5 text-celebrity-purple mr-2" />
          <span className="font-medium">Listado de usuarios</span>
        </div>
        <p className="text-celebrity-gray-600">Aquí se mostrará la tabla de usuarios consumida del backend.</p>
      </div>
    </div>
  );
}