'use client'

import { useState } from 'react'
import { FiHome, FiPlus, FiSearch, FiMapPin, FiDollarSign } from 'react-icons/fi'

interface Listing {
  id: number
  type: 'roommate' | 'hostel'
  title: string
  location: string
  rent: number
  preferences: string[]
  description: string
  contact: string
  image?: string
}

export default function RoommateFinder() {
  const [listings, setListings] = useState<Listing[]>([
    {
      id: 1,
      type: 'roommate',
      title: "Looking for a roommate",
      location: "Dhanmondi, Near UIU",
      rent: 5000,
      preferences: ["Male", "CSE Student", "Non-smoker"],
      description: "Looking for a roommate to share a 2-bedroom apartment. 5 minutes walk to UIU.",
      contact: "01712345678"
    },
    // Add more sample listings here
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Roommate & Hostel Finder</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <FiPlus />
          <span>Create Listing</span>
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
                placeholder="Search by location or preferences"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">All Types</option>
            <option value="roommate">Looking for Roommate</option>
            <option value="hostel">Hostel Available</option>
          </select>
          <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Any Budget</option>
            <option value="5000">Under ৳5,000</option>
            <option value="10000">Under ৳10,000</option>
            <option value="15000">Under ৳15,000</option>
          </select>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <span className={`inline-block px-2 py-1 rounded text-sm ${
                  listing.type === 'roommate' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {listing.type === 'roommate' ? 'Roommate Wanted' : 'Hostel Available'}
                </span>
                <h2 className="text-xl font-semibold text-gray-900 mt-2">{listing.title}</h2>
              </div>
              <FiHome className="text-primary text-xl" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-gray-600">
                <FiMapPin className="mr-2" />
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiDollarSign className="mr-2" />
                <span>৳{listing.rent}/month</span>
              </div>
              {listing.preferences.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {listing.preferences.map((pref, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-600">{listing.description}</p>
              {listing.image && (
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-40 object-cover rounded-lg mt-2"
                />
              )}
              <button className="w-full bg-primary text-white px-4 py-2 rounded-lg mt-4">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
