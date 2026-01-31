import { useLocale } from 'next-intl'

export default async function About() {
  const locale = useLocale()

  const AboutContent = (await import(`@/content/${locale}/about.mdx`)).default

  return (
    <section id="about" className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-700">
        <AboutContent />
      </div>
    </section>
  )
}
