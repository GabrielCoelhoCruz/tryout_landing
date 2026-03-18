'use server'

import { createServerClient } from '@/lib/supabase'

export async function uploadToStorage(formData: FormData) {
  const file = formData.get('file') as File
  const bucket = formData.get('bucket') as string

  if (!file || !bucket) {
    throw new Error('Arquivo ou bucket não informado')
  }

  const supabase = createServerClient()

  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (error) {
    throw new Error(error.message)
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)

  return { url: data.publicUrl, fileName }
}
