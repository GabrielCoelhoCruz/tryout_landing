'use client'

import { Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <h3 className="text-2xl font-display mb-2 text-primary">
              SKYHIGH ALLSTAR
            </h3>
            <h4 className="text-xl font-display mb-4 text-royal-light">
              TRYOUT 2026
            </h4>
            <p className="text-white/70 text-sm leading-relaxed">
              Faça parte da equipe que está elevando o nível do cheerleading brasileiro.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-display mb-4">Contato</h4>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:tryout@equipe.com"
                className="flex items-center gap-2 text-white/70 hover:text-royal-light transition-colors"
              >
                <Mail className="w-4 h-4" />
                tryout@equipe.com
              </a>
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-2 text-white/70 hover:text-royal-light transition-colors"
              >
                <Phone className="w-4 h-4" />
                (11) 99999-9999
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-royal-light transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @equipecheer
              </a>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-lg font-display mb-4">Localização</h4>
            <div className="flex items-start gap-2 text-sm text-white/70">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <address className="not-italic">
                Rua Exemplo, 123<br />
                Bairro - Cidade, Estado<br />
                CEP 00000-000
              </address>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/50">
          <p>© {new Date().getFullYear()} SkyHigh AllStar. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
