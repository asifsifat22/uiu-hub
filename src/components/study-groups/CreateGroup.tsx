'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Button from '../ui/Button'

export default function CreateGroup() {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [course, setCourse] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !description || !course) return

    setLoading(true)
    try {
      const userId = (await supabase.auth.getUser()).data.user?.id
      
      const { data: group, error: groupError } = await supabase
        .from('study_groups')
        .insert({
          name,
          description,
          course,
          created_by: userId,
        })
        .select()
        .single()

      if (groupError) throw groupError

      // Add creator as admin member
      const { error: memberError } = await supabase
        .from('group_members')
        .insert({
          group_id: group.id,
          user_id: userId,
          role: 'admin'
        })

      if (memberError) throw memberError

      // Reset form
      setName('')
      setDescription('')
      setCourse('')
    } catch (error) {
      console.error('Error creating study group:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Group Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Course</label>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g. CSE 4125"
          required
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Group'}
      </Button>
    </form>
  )
}
