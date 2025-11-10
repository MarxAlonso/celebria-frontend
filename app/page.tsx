'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/uiHomePage/CTASection';
import { Footer } from '@/components/uiHomePage/Footer';
import { FeaturesSection } from '@/components/uiHomePage/FeaturesSection';
import { Sparkles, Star, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-invitaciones from-celebrity-purple/5 via-white to-celebrity-pink/5">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-serif text-celebrity-gray-900 mb-6">
              Crea Invitaciones
              <span className="block bg-gradient-to-r from-celebrity-purple to-celebrity-pink bg-clip-text text-transparent">
                Inolvidables
              </span>
            </h1>
            <p className="text-xl text-celebrity-gray-600 mb-8 max-w-3xl mx-auto">
              Diseña invitaciones elegantes y personalizadas para tus eventos especiales. 
              Con plantillas profesionales y herramientas intuitivas, tus invitaciones 
              reflejarán la magia de tu celebración.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/registro">
                <Button size="lg" className="celebrity-gradient text-white hover:opacity-90">
                  Comenzar Ahora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline">
                  Ver Plantillas
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-celebrity-purple/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-celebrity-pink/10 rounded-full blur-xl"></div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <section className="py-20 bg-[#F6E7E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-celebrity-gray-900 mb-4">
              Cómo Funciona
            </h2>
            <p className="text-lg text-celebrity-gray-600 max-w-2xl mx-auto">
              En solo 3 pasos simples, tendrás la invitación perfecta para tu evento.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 celebrity-gradient rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-semibold text-celebrity-gray-900 mb-4">
                Elige Tu Plantilla
              </h3>
              <p className="text-celebrity-gray-600">
                Selecciona entre nuestra colección de plantillas elegantes y modernas.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 celebrity-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-celebrity-gray-900 mb-4">
                Personaliza
              </h3>
              <p className="text-celebrity-gray-600">
                Añade tus detalles, cambia colores y ajusta el diseño a tu gusto.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-celebrity-pink to-celebrity-purple rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-celebrity-gray-900 mb-4">
                Descarga y Comparte
              </h3>
              <p className="text-celebrity-gray-600">
                Descarga tu invitación en alta calidad y compártela con tus invitados.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/pasosparacrearlainvitacion">
              <Button size="lg" variant="primary">
                Ver Tutorial Completo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer -[#FFD8C2]*/}
      <Footer />
    </div>
  );
}
