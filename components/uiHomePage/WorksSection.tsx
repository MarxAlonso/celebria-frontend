export const WorksSection: React.FC = () => {

  return (
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
          
          {/*<div className="text-center mt-12">
            <Link href="/pasosparacrearlainvitacion">
              <Button size="lg" variant="primary">
                Ver Tutorial Completo
              </Button>
            </Link>
          </div>*/}
        </div>
      </section>
  );
};