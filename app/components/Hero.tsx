import Image from 'next/image'

export default function Hero() {
  return (
    <section id="hero" className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Conectando Empresas
              <span className="text-blue-600"> Globalmente</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Especialista en comercio internacional con más de 15 años
              facilitando operaciones comerciales exitosas alrededor del mundo.
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Trabajemos Juntos
            </button>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
            {/* Placeholder - reemplaza con tu imagen real */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Foto profesional aquí
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
