import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'

// Create the safe action client with error handling and metadata
export const actionClient = createSafeActionClient({
  // Define metadata schema for tracking action names
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    })
  },

  // Handle server errors
  handleServerError(error) {
    // Log the error for debugging (in production, use a proper logger)
    console.error('Server action error:', error)

    // Return a user-friendly error message
    if (error instanceof Error) {
      // Check for specific error types
      if (error.message.includes('duplicate')) {
        return 'Este e-mail já está cadastrado. Por favor, use outro e-mail.'
      }
      if (error.message.includes('network') || error.message.includes('fetch')) {
        return 'Erro de conexão. Por favor, verifique sua internet e tente novamente.'
      }
    }

    return 'Ocorreu um erro inesperado. Por favor, tente novamente.'
  },

  // Use flattened validation errors shape for easier handling with react-hook-form
  defaultValidationErrorsShape: 'flattened',
})

