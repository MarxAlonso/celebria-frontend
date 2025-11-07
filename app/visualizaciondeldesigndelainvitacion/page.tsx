'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  Download, 
  Share2, 
  Eye, 
  Heart, 
  Mail, 
  Copy,
  CheckCircle,
  Sparkles,
  Users,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';

export default function InvitationPreviewPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = '¡Mira esta hermosa invitación!';
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent('Invitación Especial')}&body=${encodeURIComponent(text + ' ' + url)}`);
        break;
    }
    setShowShareModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-celebrity-purple/5 via-white to-celebrity-pink/5">
      {/* Header */}
      <div className="bg-white border-b border-celebrity-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 celebrity-gradient rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-celebrity-gray-900">Vista Previa de Invitación</h1>
              <p className="text-sm text-celebrity-gray-600">Boda de María & Juan</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? 'text-red-500 border-red-200' : ''}
            >
              <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
              Me gusta
            </Button>
            
            <Button
              variant="outline"
              onClick={handleCopyLink}
              className={copiedLink ? 'text-green-600 border-green-200' : ''}
            >
              {copiedLink ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar enlace
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setShowShareModal(true)}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
            
            <Button className="celebrity-gradient text-white hover:opacity-90">
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Invitation Preview */}
          <div className="celebrity-card p-8">
            <div className="bg-gradient-to-br from-celebrity-purple/10 to-celebrity-pink/10 rounded-lg p-12 text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-celebrity-gold rounded-full opacity-30"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 bg-celebrity-purple rounded-full opacity-20"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-celebrity-pink/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="mb-6">
                  <Sparkles className="w-12 h-12 text-celebrity-purple mx-auto mb-4" />
                </div>
                
                <h2 className="text-4xl font-serif text-celebrity-gray-900 mb-4">
                  María & Juan
                </h2>
                
                <p className="text-lg text-celebrity-gray-700 mb-6">
                  ¡Nos casamos!
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-center space-x-2 text-celebrity-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Sábado, 15 de Junio de 2024</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-celebrity-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>4:00 PM</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-celebrity-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Hacienda San José, Guadalajara</span>
                  </div>
                </div>
                
                <div className="celebrity-gold-gradient text-white px-8 py-3 rounded-lg inline-block">
                  <p className="font-medium">¡Te esperamos!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details and Actions */}
          <div className="space-y-6">
            {/* Event Details */}
            <div className="celebrity-card p-6">
              <h3 className="text-lg font-semibold text-celebrity-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-celebrity-purple" />
                Detalles del Evento
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-celebrity-gray-600">Tipo de evento:</span>
                  <span className="font-medium">Boda</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-celebrity-gray-600">Fecha:</span>
                  <span className="font-medium">15 de Junio, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-celebrity-gray-600">Hora:</span>
                  <span className="font-medium">4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-celebrity-gray-600">Ubicación:</span>
                  <span className="font-medium">Hacienda San José</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-celebrity-gray-600">Plantilla:</span>
                  <span className="font-medium">Elegante Floral</span>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="celebrity-card p-6">
              <h3 className="text-lg font-semibold text-celebrity-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-celebrity-purple" />
                Estadísticas
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-celebrity-purple/5 rounded-lg">
                  <Eye className="w-6 h-6 text-celebrity-purple mx-auto mb-2" />
                  <p className="text-2xl font-bold text-celebrity-gray-900">245</p>
                  <p className="text-sm text-celebrity-gray-600">Vistas</p>
                </div>
                <div className="text-center p-4 bg-celebrity-gold/10 rounded-lg">
                  <Users className="w-6 h-6 text-celebrity-gold mx-auto mb-2" />
                  <p className="text-2xl font-bold text-celebrity-gray-900">89</p>
                  <p className="text-sm text-celebrity-gray-600">Confirmados</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="celebrity-card p-6">
              <h3 className="text-lg font-semibold text-celebrity-gray-900 mb-4">
                Acciones Rápidas
              </h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="w-4 h-4 mr-2" />
                  Vista previa completa
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar por email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Gestionar invitados
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-celebrity-gray-900 mb-4">
              Compartir invitación
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex items-center justify-center p-3 border border-celebrity-gray-200 rounded-lg hover:bg-celebrity-gray-50"
              >
                <span className="text-green-600 font-bold mr-2">W</span>
                WhatsApp
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center justify-center p-3 border border-celebrity-gray-200 rounded-lg hover:bg-celebrity-gray-50"
              >
                <span className="text-blue-600 font-bold mr-2">f</span>
                Facebook
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center justify-center p-3 border border-celebrity-gray-200 rounded-lg hover:bg-celebrity-gray-50"
              >
                <span className="text-blue-400 font-bold mr-2">T</span>
                Twitter
              </button>
              <button
                onClick={() => handleShare('email')}
                className="flex items-center justify-center p-3 border border-celebrity-gray-200 rounded-lg hover:bg-celebrity-gray-50"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setShowShareModal(false)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}