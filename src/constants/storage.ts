// Storage bucket names
export const STORAGE_BUCKETS = {
  paymentProofs: 'payment-proofs',
  athletePhotos: 'athlete-photos',
} as const

// Storage configuration
export const STORAGE_CONFIG = {
  cacheControlOneHour: '3600',
} as const

// Upload placeholder value for form validation
export const PENDING_UPLOAD_PLACEHOLDER = 'pending-upload'
