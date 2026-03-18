import { useState, useCallback } from 'react'
import { uploadToStorage } from '@/actions/upload-actions'
import { logError } from '@/lib/error-logger'

type UploadResult = {
  url: string
  fileName: string
}

type UseFileUploadOptions = {
  bucket: string
  onError?: (error: unknown) => void
}

type UseFileUploadReturn = {
  file: File | null
  isUploading: boolean
  setFile: (file: File | null) => void
  upload: () => Promise<UploadResult | null>
  clear: () => void
}

/**
 * Hook for handling file uploads to Supabase Storage via server action.
 * Uses service_role key server-side to bypass RLS.
 */
export function useFileUpload({
  bucket,
  onError,
}: UseFileUploadOptions): UseFileUploadReturn {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const upload = useCallback(async (): Promise<UploadResult | null> => {
    if (!file) return null

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', bucket)

      const result = await uploadToStorage(formData)

      return {
        url: result.url,
        fileName: result.fileName,
      }
    } catch (error) {
      logError(error, { component: 'useFileUpload', action: 'upload' })
      onError?.(error)
      return null
    } finally {
      setIsUploading(false)
    }
  }, [file, bucket, onError])

  const clear = useCallback(() => {
    setFile(null)
  }, [])

  return {
    file,
    isUploading,
    setFile,
    upload,
    clear,
  }
}
