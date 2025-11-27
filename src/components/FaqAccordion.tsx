'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="bg-bg-alt rounded-lg border-2 border-muted overflow-hidden hover:border-secondary-2 transition-colors duration-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.05, ease: [0.19, 1, 0.22, 1] }}
        >
          <button
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors duration-base"
            onClick={() => toggleItem(index)}
            aria-expanded={openIndex === index}
          >
            <span className="font-display text-lg text-ink pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={`flex-shrink-0 w-5 h-5 text-secondary-2 transition-transform duration-base ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4 pt-2 text-ink-muted leading-relaxed border-t border-muted">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
