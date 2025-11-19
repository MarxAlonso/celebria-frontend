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
                  <div className="rounded-lg border border-celebrity-gray-200 overflow-hidden" style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, width: 360, height: 640, ...style }}>
                      <div className="absolute inset-0 p-4">
                        <div className="text-xl font-serif font-bold text-celebrity-gray-900">{header}</div>
                        <div className="mt-2 text-sm text-celebrity-gray-800 whitespace-pre-line">{body}</div>
                        <div className="absolute left-4 right-4 bottom-4 text-xs opacity-80 text-celebrity-gray-700">{footer}</div>
                        {(page.elements || []).map((el: any) => {
                          const baseStyle: React.CSSProperties = {
                            position: 'absolute',
                            left: el.x,
                            top: el.y,
                            width: el.width,
                            height: el.height,
                            zIndex: el.zIndex || 1,
                            transform: `rotate(${el.rotation || 0}deg)`,
                            ...((el.style || {}) as any),
                          };
                          if (el.type === 'text') return <div key={el.id} style={baseStyle}>{el.content}</div>;
                          if (el.type === 'image') return <img key={el.id} src={el.src || ''} alt="" style={{ ...baseStyle, objectFit: (el.style?.objectFit as any) || 'cover' }} />;
                          if (el.type === 'map') return <div key={el.id} style={baseStyle}></div>;
                          if (el.type === 'countdown') return <div key={el.id} style={baseStyle}></div>;
                          if ((el as any).type === 'whatsapp') {
                            const phone = (el as any).whatsapp?.phone || '';
                            const message = (el as any).whatsapp?.message || '';
                            const label = (el as any).whatsapp?.label || 'Agendar asistencia';
                            const num = (phone || '').replace(/[^0-9]/g, '');
                            return (
                              <a
                                key={el.id}
                                href={`https://wa.me/${num}?text=${encodeURIComponent(message)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ ...baseStyle, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 600 }}
                              >
                                {label}
                              </a>
                            );
                          }
                          return null;
                        })}
                      </div>
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