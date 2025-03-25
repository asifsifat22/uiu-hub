'use client'

export default function StudyGroupsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  )
}
