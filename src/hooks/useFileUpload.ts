import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { logError } from '@/lib/error-logger'
import { STORAGE_CONFIG } from '@/constants/storage'

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
 * Hook for handling file uploads to Supabase Storage
 * @param options - Configuration options including bucket name
 * @returns File state and upload functions
 */
export function useFileUpload({
  bucket,
  onError,
}: UseFileUploadOptions): UseFileUploadReturn {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const generateFileName = useCallback((originalName: string): string => {
    const fileExt = originalName.split('.').pop()
    const uniqueId = Math.random().toString(36).substring(2)
    return `${Date.now()}-${uniqueId}.${fileExt}`
  }, [])

  const upload = useCallback(async (): Promise<UploadResult | null> => {
    if (!file) return null

    setIsUploading(true)
    try {
      const fileName = generateFileName(file.name)

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: STORAGE_CONFIG.cacheControlOneHour,
          upsert: false,
        })

      if (uploadError) {
        throw uploadError
      }

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

      return {
        url: urlData.publicUrl,
        fileName,
      }
    } catch (error) {
      logError(error, { component: 'useFileUpload', action: 'upload' })
      onError?.(error)
      return null
    } finally {
      setIsUploading(false)
    }
  }, [file, bucket, generateFileName, onError])

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
