'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { Loader2, CheckCircle2 } from 'lucide-react'

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'number' | 'textarea' | 'select' | 'checkbox' | 'checkbox-group'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
}

interface FormSection {
  id: string
  title: string
  fields: FormField[]
}

interface TryoutFormProps {
  sections: FormSection[]
  onSubmit: (data: Record<string, any>) => Promise<void>
}

export function TryoutForm({ sections, onSubmit }: TryoutFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.required && !formData[field.name]) {
          newErrors[field.name] = 'Este campo é obrigatório'
        }
        if (field.type === 'email' && formData[field.name]) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(formData[field.name])) {
            newErrors[field.name] = 'Email inválido'
          }
        }
      })
    })
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setIsSuccess(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircle2 className="w-20 h-20 text-success mx-auto mb-6" />
        <h2 className="text-4xl font-display text-primary mb-4">
          Inscrição realizada com sucesso!
        </h2>
        <p className="text-lg text-ink-muted max-w-2xl mx-auto mb-6">
          Recebemos sua inscrição. Em breve entraremos em contato com mais informações sobre o tryout.
        </p>
        <div className="bg-bg-alt p-6 rounded-lg border-2 border-muted max-w-md mx-auto">
          <h3 className="font-display text-xl text-ink mb-2">Entre em contato</h3>
          <p className="text-ink-muted text-sm">
            Email: tryout@equipe.com<br />
            Telefone: (11) 99999-9999
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {sections.map((section, sectionIndex) => (
        <motion.div
          key={section.id}
          className="bg-bg-alt p-6 md:p-8 rounded-lg border-2 border-muted"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: sectionIndex * 0.1, ease: [0.19, 1, 0.22, 1] }}
        >
          <h3 className="text-2xl md:text-3xl font-display text-primary mb-6">
            {section.title}
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {section.fields.map((field) => (
              <div
                key={field.name}
                className={field.type === 'textarea' || field.type === 'checkbox-group' ? 'md:col-span-2' : ''}
              >
                <Label htmlFor={field.name} className="mb-2 block">
                  {field.label}
                  {field.required && <span className="text-error ml-1">*</span>}
                </Label>

                {field.type === 'textarea' ? (
                  <Textarea
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className={errors[field.name] ? 'border-error' : ''}
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className={`flex h-10 w-full rounded-md border-2 ${
                      errors[field.name] ? 'border-error' : 'border-muted'
                    } bg-bg-alt px-3 py-2 text-sm focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all duration-base`}
                  >
                    <option value="">Selecione...</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <Checkbox
                    id={field.name}
                    name={field.name}
                    label={field.label}
                    checked={formData[field.name] || false}
                    onChange={(e) => handleChange(field.name, e.target.checked)}
                  />
                ) : field.type === 'checkbox-group' ? (
                  <div className="space-y-2">
                    {field.options?.map((option) => (
                      <Checkbox
                        key={option.value}
                        id={`${field.name}-${option.value}`}
                        name={field.name}
                        label={option.label}
                        checked={formData[field.name]?.[option.value] || false}
                        onChange={(e) => {
                          const currentValues = formData[field.name] || {}
                          handleChange(field.name, {
                            ...currentValues,
                            [option.value]: e.target.checked,
                          })
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className={errors[field.name] ? 'border-error' : ''}
                  />
                )}

                {errors[field.name] && (
                  <p className="text-error text-sm mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <div className="text-center">
        <Button
          type="submit"
          size="xl"
          disabled={isSubmitting}
          className="min-w-[200px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Enviando...
            </>
          ) : (
            'Enviar Inscrição'
          )}
        </Button>
      </div>
    </form>
  )
}
