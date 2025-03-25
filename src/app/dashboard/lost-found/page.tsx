'use client'

import { useState } from 'react'
import { FiSearch, FiPlus, FiMapPin } from 'react-icons/fi'

interface Item {
  id: number
  type: 'lost' | 'found'
  title: string
  category: string
  location: string
  date: string
  description: string
  contact: string
  image?: string
}

export default function LostAndFound() {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      type: 'lost',
      title: "Student ID Card",
      category: "ID/Documents",
      location: "Academic Building 1",
      date: "2025-03-24",
      description: "Lost my student ID card around the cafeteria area.",
      contact: "01712345678"
    },
    // Add more sample items here
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lost & Found</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <FiPlus />
          <span>Report Item</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search lost or found items"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">All Categories</option>
            <option value="id">ID/Documents</option>
            <option value="electronics">Electronics</option>
            <option value="accessories">Accessories</option>
            <option value="others">Others</option>
          </select>
          <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">All Types</option>
            <option value="lost">Lost Items</option>
            <option value="found">Found Items</option>
          </select>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <span className={`inline-block px-2 py-1 rounded text-sm ${
                  item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {item.type === 'lost' ? 'Lost' : 'Found'}
                </span>
                <h2 className="text-xl font-semibold text-gray-900 mt-2">{item.title}</h2>
              </div>
              <FiMapPin className="text-primary text-xl" />
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">Category: {item.category}</p>
              <p className="text-sm text-gray-600">Location: {item.location}</p>
              <p className="text-sm text-gray-600">Date: {item.date}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg mt-2"
                />
              )}
              <button className="w-full bg-primary text-white px-4 py-2 rounded-lg mt-4">
                Contact {item.type === 'lost' ? 'Owner' : 'Finder'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
