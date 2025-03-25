import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const uploadFile = async (
  file: File,
  bucket: string,
  folder: string = ''
): Promise<string> => {
  const supabase = createClientComponentClient()
  
  try {
    // Create a unique file name
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = folder ? `${folder}/${fileName}` : fileName

    // Upload the file
    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file)

    if (uploadError) throw uploadError

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export const uploadMultipleFiles = async (
  files: File[],
  bucket: string,
  folder: string = ''
): Promise<string[]> => {
  try {
    const uploadPromises = files.map(file => uploadFile(file, bucket, folder))
    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error('Error uploading multiple files:', error)
    throw error
  }
}

export const deleteFile = async (
  path: string,
  bucket: string
): Promise<void> => {
  const supabase = createClientComponentClient()
  
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) throw error
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

export const deleteMultipleFiles = async (
  paths: string[],
  bucket: string
): Promise<void> => {
  const supabase = createClientComponentClient()
  
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove(paths)

    if (error) throw error
  } catch (error) {
    console.error('Error deleting multiple files:', error)
    throw error
  }
}
