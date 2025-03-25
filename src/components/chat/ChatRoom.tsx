'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Button from '../ui/Button'

interface Message {
  id: string
  content: string
  sender_id: string
  created_at: string
}

interface Profile {
  id: string
  full_name: string
  avatar_url: string | null
}

export default function ChatRoom({ recipientId }: { recipientId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [recipient, setRecipient] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const fetchRecipient = async () => {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .eq('id', recipientId)
          .single()

        if (error) throw error
        setRecipient(profile)
      } catch (error) {
        console.error('Error fetching recipient:', error)
      }
    }

    const fetchMessages = async () => {
      try {
        const userId = (await supabase.auth.getUser()).data.user?.id
        const { data: messages, error } = await supabase
          .from('messages')
          .select('*')
          .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
          .order('created_at', { ascending: true })

        if (error) throw error
        setMessages(messages || [])
      } catch (error) {
        console.error('Error fetching messages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipient()
    fetchMessages()

    // Subscribe to new messages
    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages' 
      }, payload => {
        const newMessage = payload.new as Message
        setMessages(prev => [...prev, newMessage])
        scrollToBottom()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [recipientId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const userId = (await supabase.auth.getUser()).data.user?.id
      const { error } = await supabase.from('messages').insert({
        content: newMessage,
        sender_id: userId,
        receiver_id: recipientId
      })

      if (error) throw error
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  if (loading || !recipient) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            {recipient.avatar_url ? (
              <Image
                src={recipient.avatar_url}
                alt={recipient.full_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                {recipient.full_name[0]}
              </div>
            )}
          </div>
          <h2 className="ml-3 font-medium">{recipient.full_name}</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender_id === recipientId ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender_id === recipientId
                  ? 'bg-gray-100'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded"
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  )
}
