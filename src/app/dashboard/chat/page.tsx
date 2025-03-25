'use client'

import { useState } from 'react'
import { FiSearch, FiSend, FiPaperclip } from 'react-icons/fi'

interface Message {
  id: number
  senderId: number
  text: string
  timestamp: string
}

interface Chat {
  id: number
  user: {
    id: number
    name: string
    avatar?: string
    department: string
    lastSeen: string
  }
  messages: Message[]
}

export default function Chat() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      user: {
        id: 2,
        name: "Jane Smith",
        department: "CSE",
        lastSeen: "online"
      },
      messages: [
        {
          id: 1,
          senderId: 2,
          text: "Hi! Can you share the notes from today's class?",
          timestamp: "10:30 AM"
        },
        {
          id: 2,
          senderId: 1,
          text: "Sure! I'll send them in a moment.",
          timestamp: "10:32 AM"
        }
      ]
    }
  ])

  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0])
  const [newMessage, setNewMessage] = useState("")

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Chat List */}
      <div className="w-80 border-r bg-white">
        <div className="p-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="overflow-y-auto h-full pb-20">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-50 ${
                selectedChat?.id === chat.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex-shrink-0">
                {chat.user.avatar ? (
                  <img
                    src={chat.user.avatar}
                    alt={chat.user.name}
                    className="h-12 w-12 rounded-full"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {chat.user.name[0]}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {chat.user.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {chat.messages[chat.messages.length - 1]?.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {chat.messages[chat.messages.length - 1]?.text}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Chat Header */}
          <div className="p-4 bg-white border-b flex items-center space-x-3">
            <div className="flex-shrink-0">
              {selectedChat.user.avatar ? (
                <img
                  src={selectedChat.user.avatar}
                  alt={selectedChat.user.name}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  {selectedChat.user.name[0]}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                {selectedChat.user.name}
              </h2>
              <p className="text-sm text-gray-500">
                {selectedChat.user.department} • {selectedChat.user.lastSeen}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedChat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 1 ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === 1
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-900'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === 1 ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-600">
                <FiPaperclip className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                className="text-primary hover:text-primary/80"
                onClick={() => {
                  if (newMessage.trim()) {
                    // Add message logic here
                    setNewMessage("")
                  }
                }}
              >
                <FiSend className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  )
}
