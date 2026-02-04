'use client'

import { Phone, Instagram } from 'lucide-react'
import { CONTACT } from '@/constants/contact'

type ContactLinksVariant = 'grid' | 'inline'

type ContactLinksProps = {
  variant?: ContactLinksVariant
  showLabels?: boolean
  className?: string
}

/**
 * Reusable contact links component for WhatsApp and Instagram
 */
export function ContactLinks({
  variant = 'grid',
  showLabels = true,
  className = '',
}: ContactLinksProps) {
  const baseClasses =
    'flex items-center justify-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 transition-all group'

  const whatsappClasses = `${baseClasses} hover:border-[#25D366]/50 hover:bg-[#25D366]/10`
  const instagramClasses = `${baseClasses} hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10`

  const containerClasses =
    variant === 'grid'
      ? `grid sm:grid-cols-2 gap-4 ${className}`
      : `flex flex-wrap gap-4 ${className}`

  return (
    <div className={containerClasses}>
      <a
        href={CONTACT.whatsapp.link}
        target="_blank"
        rel="noopener noreferrer"
        className={whatsappClasses}
        aria-label={`WhatsApp: ${CONTACT.whatsapp.formatted}`}
      >
        <Phone className="w-5 h-5 text-[#25D366]" aria-hidden="true" />
        <span className="text-white/70 group-hover:text-white transition-colors">
          {showLabels ? CONTACT.whatsapp.formatted : 'WhatsApp'}
        </span>
      </a>
      <a
        href={CONTACT.instagram.link}
        target="_blank"
        rel="noopener noreferrer"
        className={instagramClasses}
        aria-label={`Instagram: @${CONTACT.instagram.handle}`}
      >
        <Instagram className="w-5 h-5 text-[#E1306C]" aria-hidden="true" />
        <span className="text-white/70 group-hover:text-white transition-colors">
          {showLabels ? `@${CONTACT.instagram.handle}` : 'Instagram'}
        </span>
      </a>
    </div>
  )
}
