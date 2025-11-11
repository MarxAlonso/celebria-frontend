'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { OrganizerProtectedRoute } from '@/components/OrganizerProtectedRoute';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/Button';
import { invitationService, Invitation, InvitationStatus } from '@/lib/invitations';
import { Sparkles, Calendar, Edit3, Eye, Trash2 } from 'lucide-react';

export default function PanelInvitacionesPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const loadInvitations = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await invitationService.getUserInvitations();
        setInvitations(data);
      } catch (err: unknown) {
        console.error('Error cargando invitaciones:', err);
        const message = axios.isAxiosError(err)
          ? err.response?.data?.message ?? err.message
          : err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : 'Error desconocido';
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    loadInvitations();
  }, []);

  const formatDate = (d: Date | string | number | null | undefined): string => {
    if (d === null || d === undefined) return '-';
    const date = d instanceof Date ? d : new Date(d);
    return isNaN(date.getTime()) ? '-' : date.toLocaleDateString();
  };

  const handleDelete = async (id: string) => {
    try {
      const confirmed = window.confirm('¿Seguro que deseas eliminar esta invitación?');
      if (!confirmed) return;
      setDeletingId(id);
      await invitationService.deleteInvitation(id);
      setInvitations((prev) => prev.filter((inv) => inv.id !== id));
    } catch (err) {
      console.error('Error eliminando invitación:', err);
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message ?? err.message
        : err instanceof Error
        ? err.message
        : 'No se pudo eliminar la invitación';
      alert(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <OrganizerProtectedRoute>
      <div className="flex h-screen bg-celebrity-gray-50">
        <Sidebar />

        <div className="flex-1 overflow-auto">
          <div className="bg-white border-b border-celebrity-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold font-serif text-celebrity-gray-900">Mis Invitaciones</h1>
                <p className="text-celebrity-gray-600 mt-1">Lista de invitaciones que has creado</p>
              </div>
              <Link href="/panel/crear">
                <Button className="celebrity-gradient text-white hover:opacity-90">Nueva Invitación</Button>
              </Link>
            </div>
          </div>

          <div className="px-8 py-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-celebrity-purple"></div>
              </div>
            ) : error ? (
              <div className="celebrity-card p-6 text-red-700 bg-red-50">{error}</div>
            ) : invitations.length === 0 ? (
              <div className="celebrity-card p-6 text-center">
                <div className="w-12 h-12 celebrity-gradient rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <p className="text-celebrity-gray-700">Aún no tienes invitaciones. Crea la primera.</p>
                <div className="mt-4">
                  <Link href="/panel/crear">
                    <Button>Crear invitación</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {invitations.map((inv) => {
                  const statusBadge = (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        inv.status === InvitationStatus.SENT
                          ? 'bg-blue-100 text-blue-800'
                          : inv.status === InvitationStatus.DELIVERED
                          ? 'bg-green-100 text-green-800'
                          : inv.status === InvitationStatus.VIEWED
                          ? 'bg-purple-100 text-purple-800'
                          : inv.status === InvitationStatus.EXPIRED
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {inv.status}
                    </span>
                  );

                  return (
                    <div key={inv.id} className="celebrity-card p-6 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 celebrity-gradient rounded-lg flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-celebrity-gray-900">{inv.title}</h3>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-celebrity-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(inv.createdAt)}
                            </span>
                            {statusBadge}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link href={`/panel/invitaciones/${inv.id}/editor`}>
                          <Button variant="outline">
                            <Edit3 className="w-4 h-4 mr-2" /> Editar
                          </Button>
                        </Link>
                        <Link href={`/panel/invitaciones/${inv.id}/vista`}>
                          <Button variant="ghost">
                            <Eye className="w-4 h-4 mr-2" /> Ver previa
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          onClick={() => handleDelete(inv.id)}
                          disabled={deletingId === inv.id}
                          className={deletingId === inv.id ? 'opacity-60 cursor-not-allowed' : ''}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> {deletingId === inv.id ? 'Eliminando…' : 'Eliminar'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </OrganizerProtectedRoute>
  );
}