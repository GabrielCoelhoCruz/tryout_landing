'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import { AnimatedBackground } from '@/components/ui'
import type { CheckApprovalInput } from '@/lib/schemas/approved-member-schema'
import { checkApprovalStatus } from '@/actions/approved-member-actions'
import type { ApprovedPageState } from '@/types/approved-member'
import { logError } from '@/lib/error-logger'
import {
  FloatingHeader,
  EmailVerificationForm,
  ApprovedState,
  PendingState,
  RejectedState,
  AbsentState,
  ScheduledState,
  NotFoundState,
  TryoutPendingState,
  ErrorState,
  Footer,
} from './components'

/**
 * Approved member page - allows users to check their tryout approval status
 */
export default function AprovadoPage() {
  const [pageState, setPageState] = useState<ApprovedPageState>({ status: 'idle' })

  const { execute, status: actionStatus } = useAction(checkApprovalStatus, {
    onSuccess: ({ data }) => {
      if (!data) {
        setPageState({ status: 'error', message: 'Erro ao verificar status.' })
        return
      }

      if (!data.found) {
        setPageState({ status: 'not-found' })
        return
      }

      // Check for scheduled tryout first (has priority)
      if (data.scheduledTryoutDate && data.registration) {
        setPageState({
          status: 'scheduled',
          registration: data.registration,
          scheduledDate: data.scheduledTryoutDate,
        })
        toast.success('Tryout agendado encontrado!')
        return
      }

      // Check for absent attendance (missed tryout, needs to schedule)
      if (data.attendanceStatus === 'absent' && data.registration) {
        setPageState({
          status: 'absent',
          registration: data.registration,
          message: 'Você não compareceu ao tryout agendado.',
        })
        return
      }

      // Handle different registration statuses
      switch (data.status) {
        case 'accepted':
          if (data.registration) {
            // Check if user has team assignments - if not, show tryout pending
            const hasTeamAssignments = data.registration.teamAssignments && data.registration.teamAssignments.length > 0
            if (hasTeamAssignments) {
              setPageState({ status: 'approved', registration: data.registration })
              toast.success('Status verificado com sucesso!')
            } else {
              setPageState({ status: 'tryout_pending', registration: data.registration })
            }
          }
          break
        case 'pending':
          setPageState({
            status: 'pending',
            message: 'Sua inscrição ainda está pendente de análise.',
          })
          break
        case 'under_review':
          setPageState({
            status: 'under_review',
            message: 'Sua inscrição está em análise pela nossa equipe.',
          })
          break
        case 'rejected':
          setPageState({
            status: 'rejected',
            message: 'Infelizmente você não foi aprovado(a) neste tryout.',
          })
          break
        case 'waitlisted':
          setPageState({
            status: 'waitlisted',
            message: 'Você está na lista de espera. Entraremos em contato se houver vagas.',
          })
          break
        default:
          setPageState({ status: 'error', message: 'Status desconhecido.' })
      }
    },
    onError: ({ error }) => {
      logError(error, {
        component: 'AprovadoPage',
        action: 'checkApprovalStatus',
      })
      setPageState({
        status: 'error',
        message: 'Erro ao verificar status. Por favor, tente novamente.',
      })
      toast.error('Erro ao verificar status')
    },
  })

  const isLoading = actionStatus === 'executing'

  const handleEmailSubmit = useCallback(
    (data: CheckApprovalInput) => {
      setPageState({ status: 'loading' })
      execute(data)
    },
    [execute]
  )

  const handleRetry = useCallback(() => {
    setPageState({ status: 'idle' })
  }, [])

  return (
    <>
      <AnimatedBackground fixed />
      <FloatingHeader />

      <main className="relative z-10 min-h-screen pt-24 pb-16">
        {/* Hero section */}
        <section className="py-8 md:py-12">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-[#FF7F00]" aria-hidden="true" />
                Tryout 2026
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white leading-tight mb-4">
                Status de <span className="text-[#FF7F00]">Aprovação</span>
              </h1>

              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12">
                Verifique se você foi aprovado(a) no tryout do Sky High All Star
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content section */}
        <section className="px-4 md:px-8">
          <AnimatePresence mode="wait">
            {(pageState.status === 'idle' || pageState.status === 'loading') && (
              <motion.div
                key="email-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmailVerificationForm
                  onSubmit={handleEmailSubmit}
                  isLoading={isLoading || pageState.status === 'loading'}
                />
              </motion.div>
            )}

            {pageState.status === 'approved' && (
              <motion.div
                key="approved"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ApprovedState registration={pageState.registration} />
              </motion.div>
            )}

            {pageState.status === 'tryout_pending' && (
              <motion.div
                key="tryout-pending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TryoutPendingState
                  name={pageState.registration.name}
                  onRetry={handleRetry}
                />
              </motion.div>
            )}

            {(pageState.status === 'pending' || pageState.status === 'under_review') && (
              <motion.div
                key="pending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <PendingState message={pageState.message} />
              </motion.div>
            )}

            {pageState.status === 'waitlisted' && (
              <motion.div
                key="waitlisted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <PendingState message={pageState.message} />
              </motion.div>
            )}

            {pageState.status === 'rejected' && (
              <motion.div
                key="rejected"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <RejectedState message={pageState.message} />
              </motion.div>
            )}

            {pageState.status === 'absent' && (
              <motion.div
                key="absent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AbsentState
                  registration={pageState.registration}
                  message={pageState.message}
                />
              </motion.div>
            )}

            {pageState.status === 'scheduled' && (
              <motion.div
                key="scheduled"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ScheduledState
                  registration={pageState.registration}
                  scheduledDate={pageState.scheduledDate}
                />
              </motion.div>
            )}

            {pageState.status === 'not-found' && (
              <motion.div
                key="not-found"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <NotFoundState onRetry={handleRetry} />
              </motion.div>
            )}

            {pageState.status === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ErrorState message={pageState.message} onRetry={handleRetry} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <Footer />
    </>
  )
}
