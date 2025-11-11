'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Template } from '@/lib/templates';

interface TemplatePreviewModalProps {
  viewing: Template | null;
  onClose: () => void;
}

export function TemplatePreviewModal({ viewing, onClose }: TemplatePreviewModalProps) {
  if (!viewing) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Diseño: {viewing.name}</h3>
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
        </div>
        <div className="p-6 space-y-6">
          {viewing.design.pages && viewing.design.pages.length > 0 ? (
            viewing.design.pages.map((page, idx) => {
              const style = page.background?.type === 'image'
                ? { backgroundImage: `url(${page.background.value})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                : { background: page.background?.value || '#ffffff' };
              const header = page.sections?.find((s) => s.key === 'header')?.text || '';
              const body = page.sections?.find((s) => s.key === 'body')?.text || '';
              const footer = page.sections?.find((s) => s.key === 'footer')?.text || '';
              return (
                <div key={idx} className="mx-auto" style={{ width: 360, height: 640 }}>
                  <div className="rounded-lg border border-celebrity-gray-200 overflow-hidden" style={{ width: '100%', height: '100%', position: 'relative', ...style }}>
                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      <div className="text-xl font-serif font-bold text-celebrity-gray-900">{header}</div>
                      <div className="text-sm text-celebrity-gray-800">{body}</div>
                      <div className="text-xs opacity-80 text-celebrity-gray-700">{footer}</div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-celebrity-gray-600">El template no tiene páginas configuradas aún.</div>
          )}
        </div>
      </div>
    </div>
  );
}