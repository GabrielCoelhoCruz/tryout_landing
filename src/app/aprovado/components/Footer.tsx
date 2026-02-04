'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Phone, Instagram, MapPin } from 'lucide-react'
import { CONTACT } from '@/constants/contact'

/**
 * Footer component for the approved page
 */
export function Footer() {
  return (
    <footer className="relative z-10 bg-[#000c1f] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden">
                <Image
                  src="/logo/SkyHigh_Logo novo.png"
                  alt="SkyHigh AllStar"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="56px"
                />
              </div>
              <div>
                <h3 className="text-2xl font-display text-[#FF7F00]">SKYHIGH</h3>
                <p className="text-sm font-display text-[#00BFFF]">ALLSTAR</p>
              </div>
            </div>
            <p className="text-white/60 max-w-sm leading-relaxed">
              Seu talento merece ir mais alto. Venha elevar o nível com a gente!
              Tradição, excelência e paixão pelo esporte.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-4">Contato</h4>
            <nav className="space-y-3" aria-label="Contact links">
              <a
                href={CONTACT.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-[#FF7F00] transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {CONTACT.whatsapp.formatted}
              </a>
              <a
                href={CONTACT.instagram.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-[#FF7F00] transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />@
                {CONTACT.instagram.handle}
              </a>
            </nav>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-display text-lg mb-4">Localização</h4>
            <div className="flex items-start gap-2 text-white/60">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" aria-hidden="true" />
              <address className="not-italic">
                {CONTACT.location.name}
                <br />
                {CONTACT.location.venue}
                <br />
                {CONTACT.location.address}
                <br />
                {CONTACT.location.city}
              </address>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} SkyHigh AllStar. Todos os direitos
            reservados.
          </p>
          <nav className="flex items-center gap-6 text-sm text-white/40" aria-label="Legal">
            <Link href="#" className="hover:text-white transition-colors">
              Política de Privacidade
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
