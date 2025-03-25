import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

// Posts
export const createPost = async (
  userId: string,
  content: string,
  images: string[] = []
) => {
  const supabase = createClientComponentClient<Database>()
  
  const { data, error } = await supabase
    .from('posts')
    .insert({
      user_id: userId,
      content,
      images,
      likes: 0,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export const getPosts = async (limit = 10, offset = 0) => {
  const supabase = createClientComponentClient<Database>()
  
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles (
        id,
        full_name,
        avatar_url
      ),
      comments (
        id,
        content,
        created_at,
        profiles (
          id,
          full_name,
          avatar_url
        )
      )
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

// Books
export const createBookListing = async (
  userId: string,
  title: string,
  author: string,
  description: string,
  price: number,
  condition: string,
  images: string[] = []
) => {
  const supabase = createClientComponentClient<Database>()
  
  const { data, error } = await supabase
    .from('books')
    .insert({
      user_id: userId,
      title,
      author,
      description,
      price,
      condition,
      images,
      status: 'available',
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export const getBooks = async (limit = 10, offset = 0, status = 'available') => {
  const supabase = createClientComponentClient<Database>()
  
  const { data, error } = await supabase
    .from('books')
    .select(`
      *,
      profiles (
        id,
        full_name,
        avatar_url,
        phone
      )
    `)
    .eq('status', status)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

// Study Groups
export const createStudyGroup = async (
  creatorId: string,
  name: string,
  description: string,
  courseCode: string,
  maxMembers: number
) => {
  const supabase = createClientComponentClient<Database>()
  
  const { data, error } = await supabase
    .from('study_groups')
    .insert({
      creator_id: creatorId,
      name,
      description,
      course_code: courseCode,
      max_members: maxMembers,
      current_members: 1,
      status: 'active',
    })
    .select()
    .single()

  if (error) throw error

  // Add creator as admin member
  await supabase
    .from('study_group_members')
    .insert({
      group_id: data.id,
      user_id: creatorId,
      role: 'admin',
    })

  return data
}

export const getStudyGroups = async (limit = 10, offset = 0) => {
  const supabase = createClientComponentClient<Database>()
  
  const { data, error } = await supabase
    .from('study_groups')
    .select(`
      *,
      profiles!creator_id (
        id,
        full_name,
        avatar_url
      ),
      study_group_members (
        user_id,
        role
      )
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

// Resources
export const createResource = async (
  userId: string,
  title: string,
  description: string,
  type: 'note' | 'book' | 'video' | 'link',
  courseCode: string,
  files: string[] = []
) => {
  const supabase = createClientComponentClient<Database>()
  
  const { data, error } = await supabase
    .from('resources')
    .insert({
      user_id: userId,
      title,
      description,
      type,
      course_code: courseCode,
      files,
      downloads: 0,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export const getResources = async (limit = 10, offset = 0) => {
  const supabase = createClientComponentClient<Database>()
  
  const { data, error } = await supabase
    .from('resources')
    .select(`
      *,
      profiles (
        id,
        full_name,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

// Messages
export const sendMessage = async (
  groupId: string,
  userId: string,
  content: string,
  attachments: string[] = []
) => {
  const supabase = createClientComponentClient<Database>()
  
  const { data, error } = await supabase
    .from('messages')
    .insert({
      group_id: groupId,
      user_id: userId,
      content,
      attachments,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export const getMessages = async (groupId: string, limit = 50, offset = 0) => {
  const supabase = createClientComponentClient<Database>()
  
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      profiles (
        id,
        full_name,
        avatar_url
      )
    `)
    .eq('group_id', groupId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

// Real-time subscriptions
export const subscribeToMessages = (
  groupId: string,
  callback: (message: any) => void
) => {
  const supabase = createClientComponentClient<Database>()
  
  return supabase
    .channel('messages')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `group_id=eq.${groupId}`,
      },
      callback
    )
    .subscribe()
}

export const subscribeToGroupUpdates = (
  groupId: string,
  callback: (update: any) => void
) => {
  const supabase = createClientComponentClient<Database>()
  
  return supabase
    .channel('group_updates')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'study_groups',
        filter: `id=eq.${groupId}`,
      },
      callback
    )
    .subscribe()
}
