'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Settings } from 'lucide-react';

export default function AdminConfiguracionPage() {
  return (
    <div className="px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-serif text-celebrity-gray-900">Configuración</h2>
        <Button variant="outline">Guardar cambios</Button>
      </div>
      <div className="celebrity-card p-6">
        <div className="flex items-center mb-4">
          <Settings className="w-5 h-5 text-celebrity-purple mr-2" />
          <span className="font-medium">Parámetros del sistema</span>
        </div>
        <p className="text-celebrity-gray-600">Configuraciones globales del panel de administración.</p>
      </div>
    </div>
  );
}