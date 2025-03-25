'use client'

import { useState } from 'react'
import { FiFile, FiDownload, FiUpload, FiSearch } from 'react-icons/fi'

interface Resource {
  id: number
  title: string
  type: string
  courseCode: string
  department: string
  uploadedBy: string
  downloads: number
  description: string
  fileUrl: string
}

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      title: "Data Structures Notes",
      type: "PDF",
      courseCode: "CSE-2201",
      department: "CSE",
      uploadedBy: "John Doe",
      downloads: 45,
      description: "Complete lecture notes for Data Structures and Algorithms course",
      fileUrl: "#"
    },
    // Add more sample resources here
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <FiUpload />
          <span>Upload Resource</span>
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
                placeholder="Search resources by title or course code"
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
          <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">All Types</option>
            <option value="pdf">PDF</option>
            <option value="doc">Word Doc</option>
            <option value="ppt">PowerPoint</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{resource.title}</h2>
                <p className="text-gray-600">{resource.courseCode}</p>
              </div>
              <FiFile className="text-primary text-xl" />
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">Department: {resource.department}</p>
              <p className="text-sm text-gray-600">Type: {resource.type}</p>
              <p className="text-sm text-gray-600">Uploaded by: {resource.uploadedBy}</p>
              <p className="text-sm text-gray-600">Downloads: {resource.downloads}</p>
              <p className="text-sm text-gray-600">{resource.description}</p>
              <button className="w-full bg-primary text-white px-4 py-2 rounded-lg mt-4 flex items-center justify-center space-x-2">
                <FiDownload />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
