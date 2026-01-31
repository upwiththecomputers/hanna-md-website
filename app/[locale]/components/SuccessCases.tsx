import {useTranslations} from 'next-intl'

export default function SuccessCases() {
  const t = useTranslations('cases')

  const cases = [
    {
      title: 'Exportación Agrícola a Asia',
      client: 'AgroExport SAC',
      country: 'China',
      year: '2023'
    },
    {
      title: 'Optimización Logística en Europa',
      client: 'LogiTrade International',
      country: 'Alemania',
      year: '2022'
    }
  ]

  return (
    <section id="cases" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">{t('title')}</h2>

        {/* Desktop: Grid 3 columnas */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {cases.map((caso, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                Imagen del caso
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{caso.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{t('client')}: {caso.client}</p>
              <p className="text-sm text-gray-600 mb-1">{t('country')}: {caso.country}</p>
              <p className="text-sm text-blue-600 font-semibold">{caso.year}</p>
            </div>
          ))}
        </div>

        {/* Mobile: Lista vertical */}
        <div className="md:hidden space-y-6">
          {cases.map((caso, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
              <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                Imagen del caso
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{caso.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{t('client')}: {caso.client}</p>
              <p className="text-sm text-gray-600 mb-1">{t('country')}: {caso.country}</p>
              <p className="text-sm text-blue-600 font-semibold">{caso.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
