'use client'
import { useState, useEffect } from 'react'
import {useTranslations} from 'next-intl'

export default function Contact() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const t = useTranslations('contact')

  useEffect(() => {
    const parts = ['maria', 'comercio', 'com']
    setEmail(parts[0] + '@' + parts[1] + '.' + parts[2])

    const phoneParts = ['+51', '987', '654', '321']
    setPhone(phoneParts.join(' '))
  }, [])

  return (
    <section id="contact" className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">{t('title')}</h2>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 text-blue-600">📧</div>
            <div>
              <p className="text-sm text-gray-600">{t('email')}</p>
              {email && (
                <a href={`mailto:${email}`} className="text-lg text-blue-600 hover:underline">
                  {email}
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-6 h-6 text-blue-600">📱</div>
            <div>
              <p className="text-sm text-gray-600">{t('phone')}</p>
              {phone && (
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-lg text-blue-600 hover:underline">
                  {phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
