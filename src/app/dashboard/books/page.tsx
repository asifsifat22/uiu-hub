'use client'

import { useState } from 'react'
import { FiBook, FiSearch, FiUpload } from 'react-icons/fi'

interface Book {
  id: number
  title: string
  author: string
  courseCode: string
  price: number
  condition: string
  description: string
  contact: string
}

export default function BooksExchange() {
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: "Data Structures and Algorithms",
      author: "Thomas H. Cormen",
      courseCode: "CSE-2201",
      price: 500,
      condition: "Good",
      description: "Used for one semester only. All pages intact.",
      contact: "01712345678"
    },
    // Add more sample books here
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Book Exchange</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <FiUpload />
          <span>List a Book</span>
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
                placeholder="Search by title, author, or course code"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">All Departments</option>
            <option value="cse">CSE</option>
            <option value="eee">EEE</option>
            <option value="bba">BBA</option>
          </select>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{book.title}</h2>
                <p className="text-gray-600">{book.author}</p>
              </div>
              <FiBook className="text-primary text-xl" />
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">Course: {book.courseCode}</p>
              <p className="text-sm text-gray-600">Condition: {book.condition}</p>
              <p className="text-lg font-semibold text-primary">৳{book.price}</p>
              <p className="text-sm text-gray-600">{book.description}</p>
              <button className="w-full bg-primary text-white px-4 py-2 rounded-lg mt-4">
                Contact Seller
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
