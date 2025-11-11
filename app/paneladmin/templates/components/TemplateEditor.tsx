'use client';

import React, { useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Palette, Plus, Save } from 'lucide-react';
import { CreateTemplateDto, TemplateType } from '@/lib/templates';

interface TemplateEditorProps {
  form: CreateTemplateDto;
  setForm: (updater: (prev: CreateTemplateDto) => CreateTemplateDto) => void;
  editingId: string | null;
  saving?: boolean;
  onCancel: () => void;
  onSave: () => void;
  addPage: () => void;
  updatePageBackground: (idx: number, type: 'color' | 'image', value: string) => void;
  updatePageSectionText: (idx: number, key: string, text: string) => void;
  removePage: (idx: number) => void;
}

export function TemplateEditor({ form, setForm, editingId, saving, onCancel, onSave, addPage, updatePageBackground, updatePageSectionText, removePage }: TemplateEditorProps) {
  const previewStyle = useMemo(() => ({
    background: `linear-gradient(135deg, ${form.design.colors.primary}, ${form.design.colors.secondary})`,
    color: '#1f2937',
    fontFamily: form.design.fonts.body,
  }), [form]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Formulario de creación/edición */}
      <div className="celebrity-card p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-celebrity-gray-900 mb-4">{editingId ? 'Editar Template' : 'Crear Template'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Nombre</label>
            <input className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Tipo</label>
            <select className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as TemplateType }))}>
              {Object.values(TemplateType).map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Descripción</label>
            <textarea className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={form.description || ''} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Precio</label>
            <input type="number" className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={form.price || 0} onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Event ID (opcional)</label>
            <input className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={form.eventId || ''} onChange={(e) => setForm((p) => ({ ...p, eventId: e.target.value || undefined }))} />
          </div>

          {/* Diseño - Colores */}
          <div>
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Color primario</label>
            <input type="color" className="w-full h-10 rounded border border-celebrity-gray-300" value={form.design.colors.primary} onChange={(e) => setForm((p) => ({ ...p, design: { ...p.design, colors: { ...p.design.colors, primary: e.target.value } } }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Color secundario</label>
            <input type="color" className="w-full h-10 rounded border border-celebrity-gray-300" value={form.design.colors.secondary} onChange={(e) => setForm((p) => ({ ...p, design: { ...p.design, colors: { ...p.design.colors, secondary: e.target.value } } }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Color acento</label>
            <input type="color" className="w-full h-10 rounded border border-celebrity-gray-300" value={form.design.colors.accent} onChange={(e) => setForm((p) => ({ ...p, design: { ...p.design, colors: { ...p.design.colors, accent: e.target.value } } }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Color fondo</label>
            <input type="color" className="w-full h-10 rounded border border-celebrity-gray-300" value={form.design.colors.background} onChange={(e) => setForm((p) => ({ ...p, design: { ...p.design, colors: { ...p.design.colors, background: e.target.value } } }))} />
          </div>

          {/* Diseño - Tipografías */}
          <div>
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Fuente Heading</label>
            <select className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={form.design.fonts.heading} onChange={(e) => setForm((p) => ({ ...p, design: { ...p.design, fonts: { ...p.design.fonts, heading: e.target.value } } }))}>
              <option value="serif">Serif</option>
              <option value="sans-serif">Sans Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Fuente Body</label>
            <select className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={form.design.fonts.body} onChange={(e) => setForm((p) => ({ ...p, design: { ...p.design, fonts: { ...p.design.fonts, body: e.target.value } } }))}>
              <option value="serif">Serif</option>
              <option value="sans-serif">Sans Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>

          {/* Diseño - Layout y CSS */}
          <div>
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Layout</label>
            <input className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={form.design.layout} onChange={(e) => setForm((p) => ({ ...p, design: { ...p.design, layout: e.target.value } }))} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Custom CSS</label>
            <textarea className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={form.design.customCss || ''} onChange={(e) => setForm((p) => ({ ...p, design: { ...p.design, customCss: e.target.value } }))} />
          </div>

          {/* Contenido por defecto */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Encabezado</label>
            <input className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={form.content?.header || ''} onChange={(e) => setForm((p) => ({ ...p, content: { ...(p.content || {}), header: e.target.value } }))} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Cuerpo</label>
            <textarea className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={form.content?.body || ''} onChange={(e) => setForm((p) => ({ ...p, content: { ...(p.content || {}), body: e.target.value } }))} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-celebrity-gray-700 mb-2">Pie</label>
            <input className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={form.content?.footer || ''} onChange={(e) => setForm((p) => ({ ...p, content: { ...(p.content || {}), footer: e.target.value } }))} />
          </div>

          {/* Diseño - Páginas (multi-página) */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-celebrity-gray-700">Páginas del diseño</label>
              <Button variant="outline" onClick={addPage}>
                <Plus className="w-4 h-4 mr-2" /> Agregar página
              </Button>
            </div>
            {form.design.pages && form.design.pages.length > 0 ? (
              <div className="space-y-6">
                {form.design.pages.map((page, idx) => {
                  const style = page.background?.type === 'image'
                    ? { backgroundImage: `url(${page.background.value})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : { background: page.background?.value || '#ffffff' };
                  const header = page.sections?.find((s) => s.key === 'header')?.text || '';
                  const body = page.sections?.find((s) => s.key === 'body')?.text || '';
                  const footer = page.sections?.find((s) => s.key === 'footer')?.text || '';
                  return (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Previsualización de la página */}
                      <div className="rounded border border-celebrity-gray-200 p-3">
                        <div className="mx-auto" style={{ width: 360, height: 640, borderRadius: 12, overflow: 'hidden', position: 'relative', ...style }}>
                          <div className="absolute inset-0 p-4 flex flex-col justify-between">
                            <div className="text-xl font-serif font-bold">{header}</div>
                            <div className="text-sm">{body}</div>
                            <div className="text-xs opacity-80">{footer}</div>
                          </div>
                        </div>
                      </div>
                      {/* Controles de la página */}
                      <div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-celebrity-gray-700 mb-2">Tipo de fondo</label>
                            <select className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={page.background?.type || 'image'} onChange={(e) => updatePageBackground(idx, e.target.value as 'color' | 'image', page.background?.value || '')}>
                              <option value="image">Imagen (URL)</option>
                              <option value="color">Color</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-celebrity-gray-700 mb-2">Valor</label>
                            <input className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" placeholder="/pag%201.png o https://... o #f0e6dc" value={page.background?.value || ''} onChange={(e) => updatePageBackground(idx, page.background?.type || 'image', e.target.value)} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-celebrity-gray-700 mb-2">Header</label>
                            <input className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={header} onChange={(e) => updatePageSectionText(idx, 'header', e.target.value)} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-celebrity-gray-700 mb-2">Body</label>
                            <textarea rows={3} className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={body} onChange={(e) => updatePageSectionText(idx, 'body', e.target.value)} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-celebrity-gray-700 mb-2">Footer</label>
                            <input className="w-full px-3 py-2 border border-celebrity-gray-300 rounded" value={footer} onChange={(e) => updatePageSectionText(idx, 'footer', e.target.value)} />
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Button variant="outline" onClick={() => removePage(idx)}>Eliminar página</Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-sm text-celebrity-gray-600">Aún no hay páginas. Usa "Agregar página" para iniciar.</div>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" className="mr-2" onClick={onCancel}>Cancelar</Button>
          <Button onClick={onSave} loading={saving}>
            <Save className="w-4 h-4 mr-2" /> Guardar template
          </Button>
        </div>
      </div>

      {/* Previsualización */}
      <div className="celebrity-card p-6 lg:col-span-1">
        <h3 className="text-lg font-semibold text-celebrity-gray-900 mb-4">Previsualización</h3>
        <div className="h-[260px] rounded-lg flex items-center justify-center" style={previewStyle}>
          <div className="text-center" style={{ fontFamily: form.design.fonts.heading }}>
            <Palette className="w-10 h-10 mx-auto mb-2" />
            <h4 className="text-xl font-bold mb-1">{form.name || 'Nuevo template'}</h4>
            {form.content?.header && <p className="text-sm opacity-80">{form.content.header}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}