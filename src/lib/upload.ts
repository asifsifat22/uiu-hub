import { supabaseAdmin } from './supabase-admin'

export const uploadToStorage = async (
  bucket: string,
  path: string,
  file: File
): Promise<string | null> => {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (error) throw error

    const { data: publicUrl } = await supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return publicUrl.publicUrl
  } catch (error) {
    console.error('Error uploading file:', error)
    return null
  }
}

export const uploadFile = async (file: File, type: 'book' | 'resource' | 'lost-found' | 'post' | 'avatar') => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${type}-${Date.now()}.${fileExt}`
  const path = `${type}s/${fileName}`
  
  const url = await uploadToStorage(type + 's', path, file)
  return url
}
