'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Palette } from 'lucide-react';
import { Template, TemplateStatus } from '@/lib/templates';

interface TemplatesTableProps {
  templates: Template[];
  loading?: boolean;
  onView: (t: Template) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TemplatesTable({ templates, loading, onView, onEdit, onDuplicate, onDelete }: TemplatesTableProps) {
  return (
    <div className="celebrity-card p-6">
      <div className="flex items-center mb-4">
        <Palette className="w-5 h-5 text-celebrity-purple mr-2" />
        <span className="font-medium">Gestión de templates</span>
      </div>

      {loading ? (
        <div className="py-8 text-center text-celebrity-gray-600">Cargando templates…</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-celebrity-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-celebrity-gray-500 uppercase">Nombre</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-celebrity-gray-500 uppercase">Tipo</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-celebrity-gray-500 uppercase">Estado</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-celebrity-gray-500 uppercase">Precio</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-celebrity-gray-500 uppercase">Creado</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-celebrity-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-celebrity-gray-200">
              {templates.map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-2">{t.name}</td>
                  <td className="px-4 py-2">{t.type}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 rounded bg-celebrity-purple/10 text-celebrity-purple text-xs">{t.status || TemplateStatus.ACTIVE}</span>
                  </td>
                  <td className="px-4 py-2">${Number(t.price ?? 0).toFixed(2)}</td>
                  <td className="px-4 py-2">{new Date(t.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" onClick={() => onView(t)}>Ver</Button>
                      <Button variant="outline" onClick={() => onEdit(t.id)}>Editar</Button>
                      <Button variant="outline" onClick={() => onDuplicate(t.id)}>Duplicar</Button>
                      <Button variant="outline" className="text-red-600 border-red-300" onClick={() => onDelete(t.id)}>Eliminar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {templates.length === 0 && (
            <div className="py-6 text-center text-celebrity-gray-600">No hay templates aún. Crea uno para comenzar.</div>
          )}
        </div>
      )}
    </div>
  );
}