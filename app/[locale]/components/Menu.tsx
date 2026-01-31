'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('nav')
  const pathname = usePathname()
  const router = useRouter()

  const currentLocale = pathname.split('/')[1] || 'en'

  const menuItems = [
    { label: t('home'), href: '#hero' },
    { label: t('about'), href: '#about' },
    { label: t('cases'), href: '#cases' },
    { label: t('contact'), href: '#contact' }
  ]

  const switchLocale = (newLocale: string) => {
    const path = pathname.replace(/^\/[^/]+/, `/${newLocale}`)
    router.push(path)
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-blue-900">
            María González
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}

            {/* Language Switcher */}
            <div className="flex gap-2 ml-4 border-l pl-4">
              <button
                onClick={() => switchLocale('en')}
                className={`px-3 py-1 rounded transition-colors ${
                  currentLocale === 'en'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale('pl')}
                className={`px-3 py-1 rounded transition-colors ${
                  currentLocale === 'pl'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                PL
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="space-y-1.5">
              <div className="w-6 h-0.5 bg-gray-800"></div>
              <div className="w-6 h-0.5 bg-gray-800"></div>
              <div className="w-6 h-0.5 bg-gray-800"></div>
            </div>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-3 mt-3 pt-3 border-t">
              <button
                onClick={() => switchLocale('en')}
                className={`px-4 py-2 rounded ${
                  currentLocale === 'en'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                English
              </button>
              <button
                onClick={() => switchLocale('pl')}
                className={`px-4 py-2 rounded ${
                  currentLocale === 'pl'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Polski
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
