"use client"

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: "active-issues", label: "Active Issues" },
    { id: "resolved-issues", label: "Resolved" },
    { id: "report-issue", label: "Report New" },
  ]

  return (
    <div className="tabs flex border-b border-gray-200 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab py-3 px-5 font-semibold cursor-pointer transition-all whitespace-nowrap ${
            activeTab === tab.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  )
}
