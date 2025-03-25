import { uploadToStorage } from './supabase'

export const uploadFile = async (file: File, type: 'book' | 'resource' | 'lost-found' | 'post' | 'avatar') => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${type}-${Date.now()}.${fileExt}`
  const path = `${type}s/${fileName}`
  
  const url = await uploadToStorage(type + 's', path, file)
  return url
}
