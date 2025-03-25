'use client'

import { useState } from 'react'
import { FiBook, FiSearch } from 'react-icons/fi'
import FileUpload from '@/components/FileUpload'

interface Book {
  id: number
  title: string
  author: string
  courseCode: string
  price: number
  condition: string
  description: string
  contact: string
  imageUrl?: string
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
      contact: "01712345678",
      imageUrl: ""
    },
  ])

  const [isAddingBook, setIsAddingBook] = useState(false)
  const [newBook, setNewBook] = useState<Partial<Book>>({})

  const handleUploadComplete = (url: string) => {
    setNewBook(prev => ({ ...prev, imageUrl: url }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Book Exchange</h1>
        <button 
          onClick={() => setIsAddingBook(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <FiBook />
          <span>List a Book</span>
        </button>
      </div>

      {/* Add Book Modal */}
      {isAddingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">List a Book</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded"
                value={newBook.title || ''}
                onChange={e => setNewBook(prev => ({ ...prev, title: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Author"
                className="w-full p-2 border rounded"
                value={newBook.author || ''}
                onChange={e => setNewBook(prev => ({ ...prev, author: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Course Code"
                className="w-full p-2 border rounded"
                value={newBook.courseCode || ''}
                onChange={e => setNewBook(prev => ({ ...prev, courseCode: e.target.value }))}
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full p-2 border rounded"
                value={newBook.price || ''}
                onChange={e => setNewBook(prev => ({ ...prev, price: Number(e.target.value) }))}
              />
              <select
                className="w-full p-2 border rounded"
                value={newBook.condition || ''}
                onChange={e => setNewBook(prev => ({ ...prev, condition: e.target.value }))}
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
              <textarea
                placeholder="Description"
                className="w-full p-2 border rounded"
                value={newBook.description || ''}
                onChange={e => setNewBook(prev => ({ ...prev, description: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Contact Number"
                className="w-full p-2 border rounded"
                value={newBook.contact || ''}
                onChange={e => setNewBook(prev => ({ ...prev, contact: e.target.value }))}
              />
              <FileUpload 
                type="book" 
                onUploadComplete={handleUploadComplete}
                className="w-full"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddingBook(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setBooks(prev => [...prev, { ...newBook as Book, id: Date.now() }])
                    setIsAddingBook(false)
                    setNewBook({})
                  }}
                  className="px-4 py-2 bg-primary text-white rounded"
                >
                  Add Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book.id} className="bg-white rounded-lg shadow overflow-hidden">
            {book.imageUrl && (
              <img 
                src={book.imageUrl} 
                alt={book.title} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{book.title}</h3>
              <p className="text-gray-600">By {book.author}</p>
              <p className="text-sm text-gray-500">{book.courseCode}</p>
              <p className="font-bold text-primary mt-2">৳{book.price}</p>
              <p className="text-sm text-gray-600 mt-1">Condition: {book.condition}</p>
              <p className="text-sm text-gray-600 mt-1">{book.description}</p>
              <p className="text-sm font-medium mt-2">Contact: {book.contact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
