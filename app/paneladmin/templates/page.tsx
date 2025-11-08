'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Palette, Plus } from 'lucide-react';

export default function AdminTemplatesPage() {
  return (
    <div className="px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-serif text-celebrity-gray-900">Templates</h2>
        <Button className="celebrity-gradient text-white"><Plus className="w-4 h-4 mr-2" /> Nuevo template</Button>
      </div>
      <div className="celebrity-card p-6">
        <div className="flex items-center mb-4">
          <Palette className="w-5 h-5 text-celebrity-purple mr-2" />
          <span className="font-medium">Gestión de templates</span>
        </div>
        <p className="text-celebrity-gray-600">Aquí se listarán y editarán templates desde el backend.</p>
      </div>
    </div>
  );
}