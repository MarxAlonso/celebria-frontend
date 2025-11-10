'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { OrganizerProtectedRoute } from '@/components/OrganizerProtectedRoute';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/Button';
import { invitationService, Invitation } from '@/lib/invitations';
import { eventService, Event } from '@/lib/events';
import { Sparkles, Eye, TrendingUp } from 'lucide-react';

type ColorKey = 'primary' | 'secondary' | 'accent' | 'text';
type EditableDesign = {
  colors?: Partial<Record<ColorKey, string>>;
  fonts?: { heading?: string; body?: string };
  layout?: string;
  content?: { header?: string; body?: string; footer?: string; images?: string[] };
};

export default function InvitationPreviewPage() {
  const params = useParams();
  const id = params?.id as string;
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);

  const [designData, setDesignData] = useState<EditableDesign>({
    colors: { primary: '#8b5cf6', secondary: '#f59e0b', accent: '#ec4899', text: '#1f2937' },
    fonts: { heading: 'serif', body: 'sans-serif' },
    layout: 'classic',
    content: { header: '', body: '', footer: '', images: [] },
  });

  useEffect(() => {
    const loadInvitation = async () => {
      try {
        setLoading(true);
        const data = await invitationService.getInvitationById(id);
        setInvitation(data);
        // Cargar detalles del evento asociado, si existe
        if (data.eventId) {
          try {
            const ev = await eventService.getEventById(data.eventId);
            setEvent(ev);
          } catch (eventErr) {
            console.error('Error cargando evento asociado:', eventErr);
          }
        }
        if (data.customDesign) {
          setDesignData(data.customDesign as unknown as EditableDesign);
        }
      } catch (err) {
        console.error('Error cargando invitación para vista:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadInvitation();
  }, [id]);

  const previewStyle = useMemo(
    () => ({
      background: `linear-gradient(135deg, ${designData?.colors?.primary || '#8b5cf6'}, ${designData?.colors?.secondary || '#f59e0b'})`,
      color: designData?.colors?.text || '#ffffff',
      fontFamily: designData?.fonts?.body || 'sans-serif',
    }),
    [designData]
  );

  return (
    <OrganizerProtectedRoute>
      <div className="flex h-screen bg-[#F6E7E4]">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="bg-white border-b border-celebrity-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold font-serif text-celebrity-gray-900">Vista previa</h1>
                <p className="text-celebrity-gray-600 mt-1">Previsualiza tu invitación antes de compartirla</p>
              </div>
              <div className="space-x-2">
                <Button onClick={() => window.print()}>
                  <Eye className="w-4 h-4 mr-2" /> Imprimir/Guardar
                </Button>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Vista previa principal */}
            <div className="lg:col-span-2 celebrity-card p-6">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-celebrity-purple"></div>
                </div>
              ) : (
                <div className="h-[480px] rounded-lg flex items-center justify-center" style={previewStyle}>
                  <div className="text-center" style={{ fontFamily: designData?.fonts?.heading || 'serif' }}>
                    <Sparkles className="w-12 h-12 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-2">{invitation?.title || 'Tu invitación'}</h2>
                    {designData?.content?.header && <p className="text-lg mb-2">{designData.content.header}</p>}
                    {designData?.content?.body && <p className="max-w-xl mx-auto">{designData.content.body}</p>}
                    {designData?.content?.footer && <p className="text-sm mt-4 opacity-80">{designData.content.footer}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Panel lateral de datos */}
            <div className="celebrity-card p-6">
              <h3 className="text-lg font-semibold text-celebrity-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-celebrity-purple" />
                Detalles
              </h3>
              <div className="space-y-2 text-sm text-celebrity-gray-700">
                <p><span className="font-medium">Título:</span> {invitation?.title || '-'}</p>
                <p><span className="font-medium">Estado:</span> {invitation?.status || '-'}</p>
                <p><span className="font-medium">Evento:</span> {event?.title || invitation?.eventId || '-'}</p>
                <p><span className="font-medium">Creada:</span> {invitation?.createdAt ? new Date(invitation.createdAt).toLocaleString() : '-'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OrganizerProtectedRoute>
  );
}