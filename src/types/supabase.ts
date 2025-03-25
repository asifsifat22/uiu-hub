export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          avatar_url: string | null
          department: string
          student_id: string
          phone: string
          bio: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          avatar_url?: string | null
          department: string
          student_id: string
          phone?: string
          bio?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          avatar_url?: string | null
          department?: string
          student_id?: string
          phone?: string
          bio?: string
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          content: string
          images: string[]
          likes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          images?: string[]
          likes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          images?: string[]
          likes?: number
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          content?: string
          created_at?: string
        }
      }
      books: {
        Row: {
          id: string
          user_id: string
          title: string
          author: string
          description: string
          price: number
          condition: string
          images: string[]
          status: 'available' | 'sold' | 'reserved'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          author: string
          description: string
          price: number
          condition: string
          images?: string[]
          status?: 'available' | 'sold' | 'reserved'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          author?: string
          description?: string
          price?: number
          condition?: string
          images?: string[]
          status?: 'available' | 'sold' | 'reserved'
          created_at?: string
          updated_at?: string
        }
      }
      study_groups: {
        Row: {
          id: string
          name: string
          description: string
          course_code: string
          creator_id: string
          max_members: number
          current_members: number
          status: 'active' | 'full' | 'closed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          course_code: string
          creator_id: string
          max_members: number
          current_members?: number
          status?: 'active' | 'full' | 'closed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          course_code?: string
          creator_id?: string
          max_members?: number
          current_members?: number
          status?: 'active' | 'full' | 'closed'
          created_at?: string
          updated_at?: string
        }
      }
      study_group_members: {
        Row: {
          id: string
          group_id: string
          user_id: string
          role: 'admin' | 'member'
          joined_at: string
        }
        Insert: {
          id?: string
          group_id: string
          user_id: string
          role?: 'admin' | 'member'
          joined_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          user_id?: string
          role?: 'admin' | 'member'
          joined_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          group_id: string
          user_id: string
          content: string
          attachments: string[]
          created_at: string
        }
        Insert: {
          id?: string
          group_id: string
          user_id: string
          content: string
          attachments?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          user_id?: string
          content?: string
          attachments?: string[]
          created_at?: string
        }
      }
      resources: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          type: 'note' | 'book' | 'video' | 'link'
          course_code: string
          files: string[]
          downloads: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          type: 'note' | 'book' | 'video' | 'link'
          course_code: string
          files?: string[]
          downloads?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          type?: 'note' | 'book' | 'video' | 'link'
          course_code?: string
          files?: string[]
          downloads?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
