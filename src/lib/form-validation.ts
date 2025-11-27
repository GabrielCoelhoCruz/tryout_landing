import type { FormData, FormErrors, FormField } from '@/types/form'

export function isMinor(formData: Partial<FormData>): boolean {
  const birthDate = formData['data-nascimento']
  if (!birthDate) {
    return false
  }

  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age < 18
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\(?[0-9]{2}\)?\s?[0-9]{4,5}-?[0-9]{4}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function validateForm(
  formData: Partial<FormData>,
  allFields: FormField[]
): FormErrors {
  const errors: FormErrors = {}

  allFields.forEach((field) => {
    const value = formData[field.name]

    if (field.required && !value) {
      errors[field.name] = 'Este campo é obrigatório'
      return
    }

    if (value) {
      if (field.type === 'email' && typeof value === 'string') {
        if (!validateEmail(value)) {
          errors[field.name] = 'E-mail inválido'
        }
      }

      if (field.type === 'tel' && typeof value === 'string') {
        if (!validatePhone(value)) {
          errors[field.name] = 'Telefone inválido'
        }
      }

      if (field.type === 'checkbox-group' && Array.isArray(value)) {
        if (field.required && value.length === 0) {
          errors[field.name] = 'Selecione pelo menos uma opção'
        }
      }
    }
  })

  return errors
}
