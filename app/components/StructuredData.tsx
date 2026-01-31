export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'María González',
    jobTitle: 'Agente de Comercio Internacional',
    description: 'Especialista en comercio internacional con más de 15 años de experiencia',
    url: 'https://tudominio.com',
    knowsAbout: [
      'Comercio Internacional',
      'Importación y Exportación',
      'Logística Internacional'
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
