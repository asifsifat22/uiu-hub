'use client'

import { useState } from 'react'
import { FiUsers, FiPlus, FiSearch } from 'react-icons/fi'

interface StudyGroup {
  id: number
  name: string
  course: string
  department: string
  members: number
  description: string
  schedule: string
}

export default function StudyGroups() {
  const [groups, setGroups] = useState<StudyGroup[]>([
    {
      id: 1,
      name: "Data Structures Study Group",
      course: "CSE-2201",
      department: "CSE",
      members: 5,
      description: "Weekly study sessions for Data Structures and Algorithms",
      schedule: "Every Sunday & Tuesday, 5:00 PM"
    },
    // Add more sample groups here
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Study Groups</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <FiPlus />
          <span>Create Group</span>
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
                placeholder="Search by group name or course"
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

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{group.name}</h2>
                <p className="text-gray-600">{group.course}</p>
              </div>
              <FiUsers className="text-primary text-xl" />
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">Department: {group.department}</p>
              <p className="text-sm text-gray-600">Members: {group.members}</p>
              <p className="text-sm text-gray-600">Schedule: {group.schedule}</p>
              <p className="text-sm text-gray-600">{group.description}</p>
              <button className="w-full bg-primary text-white px-4 py-2 rounded-lg mt-4">
                Join Group
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
