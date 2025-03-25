'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiHome,
  FiBook,
  FiUsers,
  FiSearch,
  FiMessageCircle,
  FiFileText,
  FiMenu,
  FiX,
  FiChevronRight,
  FiStar,
  FiTrendingUp,
} from 'react-icons/fi'
import Image from 'next/image'

const menuItems = [
  { name: 'Dashboard', icon: FiHome, href: '/dashboard' },
  { name: 'Book Exchange', icon: FiBook, href: '/dashboard/books' },
  { name: 'Study Groups', icon: FiUsers, href: '/dashboard/study-groups' },
  { name: 'Lost & Found', icon: FiSearch, href: '/dashboard/lost-found' },
  { name: 'Social Feed', icon: FiMessageCircle, href: '/dashboard/feed' },
  { name: 'Resources', icon: FiFileText, href: '/dashboard/resources' },
]

const quickStats = [
  { name: 'Active Groups', value: '25', icon: FiUsers, trend: '+5' },
  { name: 'Book Listings', value: '150', icon: FiBook, trend: '+12' },
  { name: 'Resources', value: '500', icon: FiFileText, trend: '+45' },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg lg:hidden"
      >
        {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
      </button>

      {/* Sidebar Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50
          flex flex-col
          transform lg:translate-x-0 lg:static
          transition-transform duration-300 ease-in-out
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center"
            >
              <Image
                src="/logo.png"
                alt="UIU Logo"
                width={48}
                height={48}
                className="h-10 w-10"
                priority
              />
            </motion.div>
            <span className="text-2xl font-bold text-gray-900">UIU Hub</span>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="p-4 border-b">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Stats</h3>
          <div className="space-y-3">
            {quickStats.map((stat) => (
              <div key={stat.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <stat.icon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{stat.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">{stat.value}</span>
                  <span className="text-xs text-green-500 ml-1">{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-xl
                      transition-colors duration-200
                      ${isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <FiChevronRight className="h-4 w-4" />
                      </motion.div>
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Activity Summary */}
        <div className="p-4 border-t">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <FiTrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Activity Summary</span>
            </div>
            <div className="text-xs text-gray-600">
              You&apos;re more active than 75% of UIU Hub users this week!
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
