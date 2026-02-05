'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import {
  User,
  FileText,
  Users,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Instagram,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Calendar,
  ChevronRight,
  Sparkles,
  Heart,
  Shirt,
  ShieldAlert,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GlowingButton, MaskedInput } from '@/components/ui'
import { FormCard } from './FormCard'
import type { ApprovedRegistration } from '@/types/approved-member'
import {
  athleteFormSchema,
  SHIRT_SIZE_OPTIONS,
  type AthleteFormData,
} from '@/lib/schemas/athlete-schema'
import { submitAthleteRegistration } from '@/actions/approved-member-actions'
import { logError } from '@/lib/error-logger'

type AthleteRegistrationFormProps = {
  registration: ApprovedRegistration
  onSuccess?: () => void
}

type FormStep = 'personal' | 'health' | 'guardian' | 'review'

/**
 * "The Contract" - Athlete registration form with stadium energy
 * Progressive disclosure: Personal → Health/Shirt → Guardian (if minor) → Review
 */
export function AthleteRegistrationForm({
  registration,
  onSuccess,
}: AthleteRegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>('personal')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const stepContainerRef = useRef<HTMLDivElement>(null)
  const isInitialMount = useRef(true)

  // Focus first input when step changes for accessibility (skip initial mount)
  useEffect(() => {
    // Skip focus on initial mount to avoid scrolling away from celebration
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    // Small delay to ensure DOM is updated after animation
    const timer = setTimeout(() => {
      if (stepContainerRef.current) {
        const firstInput = stepContainerRef.current.querySelector<HTMLElement>(
          'input:not([type="hidden"]), select, textarea, button[type="button"]'
        )
        // Use preventScroll to avoid jumping the page
        firstInput?.focus({ preventScroll: true })
      }
    }, 350) // Match animation duration
    return () => clearTimeout(timer)
  }, [currentStep])

  // Build default values from registration data
  const buildDefaultValues = (reg: ApprovedRegistration): Partial<AthleteFormData> => ({
    registrationId: reg.id,
    nomeCompleto: reg.name,
    dataNascimento: reg.birthDate,
    email: reg.email,
    telefone: reg.phone,
    isMinor: reg.isMinor,
    rg: '',
    cpf: '',
    instagram: '',
    endereco: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    hasHealthInsurance: false,
    healthInsuranceName: '',
    // Pre-fill health data from tryout registration
    // medicalConditions = "alergias, lesões, etc." → maps to restriction/allergy
    // medications = "medicações contínuas" → doesn't map directly to chronic disease
    hasChronicDisease: false,
    chronicDiseaseDetails: '',
    hasRestriction: !!reg.medicalConditions,
    restrictionDetails: reg.medicalConditions || '',
    // Pre-fill guardian data for minors
    guardianName: reg.guardian?.name || '',
    guardianPhone: reg.guardian?.phone || '',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    control,
    setValue,
    reset,
  } = useForm<AthleteFormData>({
    resolver: zodResolver(athleteFormSchema),
    defaultValues: buildDefaultValues(registration),
  })

  // Reset form when registration data changes (ensures pre-fill works)
  useEffect(() => {
    reset(buildDefaultValues(registration))
  }, [registration, reset])

  const { execute, status } = useAction(submitAthleteRegistration, {
    onSuccess: () => {
      setIsSubmitted(true)
      toast.success('Cadastro realizado com sucesso!')
      onSuccess?.()
    },
    onError: ({ error }) => {
      logError(error, {
        component: 'AthleteRegistrationForm',
        action: 'submitAthleteRegistration',
        metadata: { registrationId: registration.id },
      })
      toast.error(error.serverError || 'Erro ao salvar dados')
    },
  })

  const isLoading = status === 'executing'
  const watchedValues = watch()

  // Watch health booleans for conditional fields
  const hasHealthInsurance = watch('hasHealthInsurance')
  const hasChronicDisease = watch('hasChronicDisease')
  const hasRestriction = watch('hasRestriction')

  const handleNextStep = async () => {
    if (currentStep === 'personal') {
      const isValid = await trigger([
        'nomeCompleto',
        'dataNascimento',
        'rg',
        'cpf',
        'email',
        'instagram',
        'telefone',
        'endereco',
      ])
      if (isValid) {
        setCurrentStep('health')
      }
    } else if (currentStep === 'health') {
      const fieldsToValidate: (keyof AthleteFormData)[] = [
        'emergencyContactName',
        'emergencyContactPhone',
        'hasHealthInsurance',
        'hasChronicDisease',
        'hasRestriction',
        'shirtSize',
      ]
      // Add conditional fields if needed
      if (hasHealthInsurance) fieldsToValidate.push('healthInsuranceName')
      if (hasChronicDisease) fieldsToValidate.push('chronicDiseaseDetails')
      if (hasRestriction) fieldsToValidate.push('restrictionDetails')

      const isValid = await trigger(fieldsToValidate)
      if (isValid) {
        if (registration.isMinor) {
          setCurrentStep('guardian')
        } else {
          setCurrentStep('review')
        }
      }
    } else if (currentStep === 'guardian') {
      const isValid = await trigger(['guardianName', 'guardianCpf', 'guardianRg', 'guardianEmail', 'guardianPhone'])
      if (isValid) {
        setCurrentStep('review')
      }
    }
  }

  const handlePrevStep = () => {
    if (currentStep === 'health') {
      setCurrentStep('personal')
    } else if (currentStep === 'guardian') {
      setCurrentStep('health')
    } else if (currentStep === 'review') {
      setCurrentStep(registration.isMinor ? 'guardian' : 'health')
    }
  }

  const onSubmit = (data: AthleteFormData) => {
    execute(data)
  }

  // Success state
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          <CheckCircle2 className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className="text-2xl font-display text-white mb-2">Cadastro Completo!</h3>
        <p className="text-white/60">
          Seus dados foram salvos com sucesso. Nossa equipe entrará em contato em breve.
        </p>
      </motion.div>
    )
  }

  // Step indicators
  const steps = registration.isMinor
    ? ['Dados Pessoais', 'Saúde', 'Responsável', 'Revisão']
    : ['Dados Pessoais', 'Saúde', 'Revisão']

  const stepToIndex: Record<FormStep, number> = {
    personal: 0,
    health: 1,
    guardian: registration.isMinor ? 2 : -1,
    review: steps.length - 1,
  }
  const currentStepIndex = stepToIndex[currentStep]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Hidden fields */}
      <input type="hidden" {...register('registrationId')} />
      <input type="hidden" {...register('isMinor')} />

      {/* Step Progress */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <motion.div
              className={`
                flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                transition-all duration-300
                ${
                  index <= currentStepIndex
                    ? 'bg-[#FF7F00] text-white'
                    : 'bg-white/10 text-white/40'
                }
              `}
              animate={{
                scale: index === currentStepIndex ? 1.1 : 1,
              }}
            >
              {index < currentStepIndex ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
            </motion.div>
            <span
              className={`
                ml-2 text-sm hidden sm:inline
                ${index <= currentStepIndex ? 'text-white' : 'text-white/40'}
              `}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <ChevronRight
                className={`w-4 h-4 mx-2 ${
                  index < currentStepIndex ? 'text-[#FF7F00]' : 'text-white/20'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div ref={stepContainerRef}>
        <AnimatePresence mode="wait">
          {/* Personal Data Step */}
          {currentStep === 'personal' && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FormCard
                icon={User}
                title="Dados Pessoais"
                subtitle="Informações do atleta"
                variant="celebration"
              >
                <div className="space-y-5">
                {/* Nome Completo */}
                <FormField
                  label="Nome Completo"
                  icon={User}
                  error={errors.nomeCompleto?.message}
                  required
                >
                  <Input
                    {...register('nomeCompleto')}
                    placeholder="Seu nome completo"
                    variant="dark"
                  />
                </FormField>

                {/* Data de Nascimento */}
                <FormField
                  label="Data de Nascimento"
                  icon={Calendar}
                  error={errors.dataNascimento?.message}
                  required
                >
                  <Input type="date" {...register('dataNascimento')} variant="dark" className="dark-date-input" />
                </FormField>

                {/* Row: RG + CPF */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="RG" icon={FileText} error={errors.rg?.message} required>
                    <Controller
                      name="rg"
                      control={control}
                      render={({ field }) => (
                        <MaskedInput
                          mask="rg"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          placeholder="12.345.678-9"
                          variant="dark"
                        />
                      )}
                    />
                  </FormField>

                  <FormField label="CPF" icon={CreditCard} error={errors.cpf?.message} required>
                    <Controller
                      name="cpf"
                      control={control}
                      render={({ field }) => (
                        <MaskedInput
                          mask="cpf"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          placeholder="123.456.789-00"
                          variant="dark"
                        />
                      )}
                    />
                  </FormField>
                </div>

                {/* Email */}
                <FormField label="E-mail" icon={Mail} error={errors.email?.message} required>
                  <Input
                    type="email"
                    {...register('email')}
                    placeholder="seu@email.com"
                    variant="dark"
                  />
                </FormField>

                {/* Row: Instagram + Telefone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Instagram"
                    icon={Instagram}
                    error={errors.instagram?.message}
                    required
                  >
                    <Input
                      {...register('instagram')}
                      placeholder="@seuusuario"
                      variant="dark"
                    />
                  </FormField>

                  <FormField label="Celular" icon={Phone} error={errors.telefone?.message} required>
                    <Controller
                      name="telefone"
                      control={control}
                      render={({ field }) => (
                        <MaskedInput
                          mask="phone"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          placeholder="(11) 99999-9999"
                          variant="dark"
                        />
                      )}
                    />
                  </FormField>
                </div>

                {/* Endereço */}
                <FormField
                  label="Endereço Completo"
                  icon={MapPin}
                  error={errors.endereco?.message}
                  required
                >
                  <Input
                    {...register('endereco')}
                    placeholder="Rua, número, bairro, cidade - UF"
                    variant="dark"
                  />
                </FormField>
              </div>
            </FormCard>
          </motion.div>
        )}

        {/* Health & Additional Info Step */}
        {currentStep === 'health' && (
          <motion.div
            key="health"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Emergency Contact Card */}
            <FormCard
              icon={ShieldAlert}
              title="Contato de Emergência"
              subtitle="Pessoa para contato em caso de emergência"
              variant="action"
            >
              <div className="space-y-5">
                <FormField
                  label="Nome do Contato"
                  icon={User}
                  error={errors.emergencyContactName?.message}
                  required
                >
                  <Input
                    {...register('emergencyContactName')}
                    placeholder="Nome completo (ex: Maria Silva - Mãe)"
                    variant="dark"
                  />
                </FormField>

                <FormField
                  label="Telefone do Contato"
                  icon={Phone}
                  error={errors.emergencyContactPhone?.message}
                  required
                >
                  <Controller
                    name="emergencyContactPhone"
                    control={control}
                    render={({ field }) => (
                      <MaskedInput
                        mask="phone"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="(11) 99999-9999"
                        variant="dark"
                      />
                    )}
                  />
                </FormField>
              </div>
            </FormCard>

            {/* Health Card */}
            <FormCard
              icon={Heart}
              title="Informações de Saúde"
              subtitle="Dados importantes para sua segurança"
              variant="default"
            >
              <div className="space-y-6">
                {/* Health Insurance */}
                <div className="space-y-3">
                  <Controller
                    name="hasHealthInsurance"
                    control={control}
                    render={({ field }) => (
                      <YesNoToggle
                        label="Possui convênio médico?"
                        value={field.value ?? false}
                        onChange={(val) => {
                          field.onChange(val)
                          if (!val) setValue('healthInsuranceName', '')
                        }}
                      />
                    )}
                  />
                  <AnimatePresence>
                    {hasHealthInsurance && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FormField
                          label="Qual convênio?"
                          icon={Heart}
                          error={errors.healthInsuranceName?.message}
                          required
                        >
                          <Input
                            {...register('healthInsuranceName')}
                            placeholder="Nome do convênio"
                            variant="dark"
                          />
                        </FormField>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Chronic Disease */}
                <div className="space-y-3">
                  <Controller
                    name="hasChronicDisease"
                    control={control}
                    render={({ field }) => (
                      <YesNoToggle
                        label="Possui alguma doença crônica?"
                        value={field.value ?? false}
                        onChange={(val) => {
                          field.onChange(val)
                          if (!val) setValue('chronicDiseaseDetails', '')
                        }}
                      />
                    )}
                  />
                  <AnimatePresence>
                    {hasChronicDisease && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FormField
                          label="Qual doença?"
                          icon={Heart}
                          error={errors.chronicDiseaseDetails?.message}
                          required
                        >
                          <Input
                            {...register('chronicDiseaseDetails')}
                            placeholder="Descreva a doença crônica"
                            variant="dark"
                          />
                        </FormField>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Restriction */}
                <div className="space-y-3">
                  <Controller
                    name="hasRestriction"
                    control={control}
                    render={({ field }) => (
                      <YesNoToggle
                        label="Possui alguma restrição física ou alergia?"
                        value={field.value ?? false}
                        onChange={(val) => {
                          field.onChange(val)
                          if (!val) setValue('restrictionDetails', '')
                        }}
                      />
                    )}
                  />
                  <AnimatePresence>
                    {hasRestriction && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FormField
                          label="Qual restrição?"
                          icon={Heart}
                          error={errors.restrictionDetails?.message}
                          required
                        >
                          <Input
                            {...register('restrictionDetails')}
                            placeholder="Descreva a restrição ou alergia"
                            variant="dark"
                          />
                        </FormField>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </FormCard>

            {/* Shirt Size Card */}
            <FormCard
              icon={Shirt}
              title="Camiseta"
              subtitle="Escolha o tamanho da sua camiseta"
              variant="celebration"
            >
              <FormField
                label="Tamanho da Camiseta"
                icon={Shirt}
                error={errors.shirtSize?.message}
                required
              >
                <Controller
                  name="shirtSize"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {SHIRT_SIZE_OPTIONS.map((option) => (
                        <motion.button
                          key={option.value}
                          type="button"
                          onClick={() => field.onChange(option.value)}
                          className={`
                            py-3 px-4 rounded-xl border text-sm font-medium transition-all
                            ${
                              field.value === option.value
                                ? 'bg-[#FF7F00] text-white border-transparent'
                                : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:bg-white/10'
                            }
                          `}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {option.label}
                        </motion.button>
                      ))}
                    </div>
                  )}
                />
              </FormField>
            </FormCard>
          </motion.div>
        )}

        {/* Guardian Step (if minor) */}
        {currentStep === 'guardian' && (
          <motion.div
            key="guardian"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <FormCard
              icon={Users}
              title="Responsável Legal"
              subtitle="Obrigatório para menores de 18 anos"
              variant="action"
            >
              <div className="space-y-5">
                {/* Nome do Responsável */}
                <FormField
                  label="Nome do Responsável"
                  icon={User}
                  error={errors.guardianName?.message}
                  required
                >
                  <Input
                    {...register('guardianName')}
                    placeholder="Nome completo do responsável"
                    variant="dark"
                  />
                </FormField>

                {/* Row: CPF + RG */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="CPF do Responsável"
                    icon={CreditCard}
                    error={errors.guardianCpf?.message}
                    required
                  >
                    <Controller
                      name="guardianCpf"
                      control={control}
                      render={({ field }) => (
                        <MaskedInput
                          mask="cpf"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          placeholder="123.456.789-00"
                          variant="dark"
                        />
                      )}
                    />
                  </FormField>

                  <FormField
                    label="RG do Responsável"
                    icon={FileText}
                    error={errors.guardianRg?.message}
                    required
                  >
                    <Controller
                      name="guardianRg"
                      control={control}
                      render={({ field }) => (
                        <MaskedInput
                          mask="rg"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          placeholder="12.345.678-9"
                          variant="dark"
                        />
                      )}
                    />
                  </FormField>
                </div>

                {/* E-mail do Responsável */}
                <FormField
                  label="E-mail do Responsável"
                  icon={Mail}
                  error={errors.guardianEmail?.message}
                  required
                >
                  <Input
                    type="email"
                    {...register('guardianEmail')}
                    placeholder="responsavel@email.com"
                    variant="dark"
                  />
                </FormField>

                {/* Telefone do Responsável */}
                <FormField
                  label="Telefone do Responsável"
                  icon={Phone}
                  error={errors.guardianPhone?.message}
                  required
                >
                  <Controller
                    name="guardianPhone"
                    control={control}
                    render={({ field }) => (
                      <MaskedInput
                        mask="phone"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="(11) 99999-9999"
                        variant="dark"
                      />
                    )}
                  />
                </FormField>
              </div>
            </FormCard>
          </motion.div>
        )}

        {/* Review Step */}
        {currentStep === 'review' && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <FormCard
              icon={Sparkles}
              title="Confirme seus Dados"
              subtitle="Revise antes de enviar"
              variant="default"
            >
              <div className="space-y-6">
                {/* Personal Data Review */}
                <ReviewSection title="Dados Pessoais" color="orange">
                  <ReviewItem label="Nome" value={watchedValues.nomeCompleto} />
                  <ReviewItem
                    label="Data de Nascimento"
                    value={formatDate(watchedValues.dataNascimento)}
                  />
                  <ReviewItem label="RG" value={watchedValues.rg} />
                  <ReviewItem label="CPF" value={watchedValues.cpf} />
                  <ReviewItem label="E-mail" value={watchedValues.email} />
                  <ReviewItem label="Instagram" value={watchedValues.instagram} />
                  <ReviewItem label="Celular" value={watchedValues.telefone} />
                  <ReviewItem label="Endereço" value={watchedValues.endereco} />
                </ReviewSection>

                {/* Emergency Contact Review */}
                <ReviewSection title="Contato de Emergência" color="blue">
                  <ReviewItem label="Nome" value={watchedValues.emergencyContactName} />
                  <ReviewItem label="Telefone" value={watchedValues.emergencyContactPhone} />
                </ReviewSection>

                {/* Health Data Review */}
                <ReviewSection title="Informações de Saúde" color="orange">
                  <ReviewItem
                    label="Convênio Médico"
                    value={
                      watchedValues.hasHealthInsurance
                        ? watchedValues.healthInsuranceName || 'Sim'
                        : 'Não'
                    }
                  />
                  <ReviewItem
                    label="Doença Crônica"
                    value={
                      watchedValues.hasChronicDisease
                        ? watchedValues.chronicDiseaseDetails || 'Sim'
                        : 'Não'
                    }
                  />
                  <ReviewItem
                    label="Restrição/Alergia"
                    value={
                      watchedValues.hasRestriction
                        ? watchedValues.restrictionDetails || 'Sim'
                        : 'Não'
                    }
                  />
                </ReviewSection>

                {/* Shirt Size Review */}
                <ReviewSection title="Camiseta" color="blue">
                  <ReviewItem
                    label="Tamanho"
                    value={
                      SHIRT_SIZE_OPTIONS.find((o) => o.value === watchedValues.shirtSize)?.label ||
                      '-'
                    }
                  />
                </ReviewSection>

                {/* Guardian Data Review (if minor) */}
                {registration.isMinor && (
                  <ReviewSection title="Responsável Legal" color="orange">
                    <ReviewItem label="Nome" value={watchedValues.guardianName} />
                    <ReviewItem label="CPF" value={watchedValues.guardianCpf} />
                    <ReviewItem label="RG" value={watchedValues.guardianRg} />
                    <ReviewItem label="E-mail" value={watchedValues.guardianEmail} />
                    <ReviewItem label="Telefone" value={watchedValues.guardianPhone} />
                  </ReviewSection>
                )}

                {/* Terms notice */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-white/60 text-sm text-center">
                    Ao enviar, você confirma que os dados informados estão corretos e autoriza a
                    SkyHigh AllStar a utilizá-los para fins de cadastro.
                  </p>
                </div>
              </div>
            </FormCard>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-4">
        {currentStep !== 'personal' && (
          <motion.button
            type="button"
            onClick={handlePrevStep}
            className="flex-1 py-3 px-6 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Voltar
          </motion.button>
        )}

        {currentStep !== 'review' ? (
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <GlowingButton type="button" onClick={handleNextStep} className="w-full">
              Continuar
              <ChevronRight className="w-5 h-5" />
            </GlowingButton>
          </motion.div>
        ) : (
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <GlowingButton type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Confirmar Cadastro
                </>
              )}
            </GlowingButton>
          </motion.div>
        )}
      </div>
    </form>
  )
}

// ============ Helper Components ============

type FormFieldProps = {
  label: string
  icon: React.ElementType
  error?: string
  required?: boolean
  children: React.ReactNode
}

function FormField({ label, icon: Icon, error, required, children }: FormFieldProps) {
  return (
    <div>
      <Label className="text-white/70 text-sm font-medium mb-2 block flex items-center gap-2">
        <Icon className="w-4 h-4 text-[#FF7F00]/70" />
        {label}
        {required && <span className="text-[#FF7F00]">*</span>}
      </Label>
      <div className="relative">{children}</div>
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-red-400 text-sm mt-1.5 flex items-center gap-1.5"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

type YesNoToggleProps = {
  label: string
  value: boolean
  onChange: (value: boolean) => void
}

function YesNoToggle({ label, value, onChange }: YesNoToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
      <span className="text-white/80 text-sm">{label}</span>
      <div className="flex gap-2">
        <motion.button
          type="button"
          onClick={() => onChange(true)}
          className={`
            px-4 py-1.5 rounded-lg text-sm font-medium transition-all
            ${
              value
                ? 'bg-[#FF7F00] text-white'
                : 'bg-white/10 text-white/50 hover:bg-white/15'
            }
          `}
          whileTap={{ scale: 0.95 }}
        >
          Sim
        </motion.button>
        <motion.button
          type="button"
          onClick={() => onChange(false)}
          className={`
            px-4 py-1.5 rounded-lg text-sm font-medium transition-all
            ${
              !value
                ? 'bg-white/20 text-white'
                : 'bg-white/10 text-white/50 hover:bg-white/15'
            }
          `}
          whileTap={{ scale: 0.95 }}
        >
          Não
        </motion.button>
      </div>
    </div>
  )
}

type ReviewSectionProps = {
  title: string
  color: 'orange' | 'blue'
  children: React.ReactNode
}

function ReviewSection({ title, color, children }: ReviewSectionProps) {
  const borderColor = color === 'orange' ? 'border-[#FF7F00]/30' : 'border-[#00BFFF]/30'
  const titleColor = color === 'orange' ? 'text-[#FF7F00]' : 'text-[#00BFFF]'

  return (
    <div className={`rounded-xl border ${borderColor} overflow-hidden`}>
      <div className={`px-4 py-2 bg-white/5 border-b ${borderColor}`}>
        <h4 className={`text-sm font-medium ${titleColor}`}>{title}</h4>
      </div>
      <div className="p-4 space-y-2">{children}</div>
    </div>
  )
}

type ReviewItemProps = {
  label: string
  value: string | undefined
}

function ReviewItem({ label, value }: ReviewItemProps) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-white/50 text-sm">{label}</span>
      <span className="text-white text-sm text-right font-medium">{value || '-'}</span>
    </div>
  )
}

function formatDate(dateString: string): string {
  if (!dateString) return '-'
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('pt-BR')
}
