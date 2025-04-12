"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import Header from "@/components/header"
import VillageAlerts from "@/components/village-alerts"
import VillageStatistics from "@/components/village-statistics"
import UpcomingEvents from "@/components/upcoming-events"
import { villages } from "@/lib/village-data"
import IssuesTab from "@/components/tabs/issues-tab"
import PanchayatTab from "@/components/tabs/panchayat-tab"
import MediaTab from "@/components/tabs/media-tab"
import InitiativesTab from "@/components/tabs/initiatives-tab"

// Dynamically import the map component to avoid SSR issues
const DynamicVillageMap = dynamic(() => import("@/components/village-map"), {
  ssr: false,
  loading: () => (
    <div className="village-map">
      <div className="map-placeholder">
        <i className="fas fa-map-marked-alt text-4xl mb-2"></i>
        <p>Loading Village Map...</p>
      </div>
    </div>
  ),
})

export default function Home() {
  const router = useRouter()
  const [currentVillage, setCurrentVillage] = useState("bishnupur")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("home")

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("authToken")
    if (token) {
      setIsLoggedIn(true)
    } else {
      // Uncomment to force login
      // router.push("/auth/signin");
    }
  }, [router])

  const handleVillageChange = (village: string) => {
    setCurrentVillage(village)
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setIsLoggedIn(false)
    router.push("/auth/signin")
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const village = villages[currentVillage as keyof typeof villages]

  return (
    <div
      className="min-h-screen bg-gray-100 bg-blend-overlay bg-opacity-90"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1470&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <Header
        currentVillage={currentVillage}
        onVillageChange={handleVillageChange}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="container max-w-7xl mx-auto px-4 py-6">
        {activeTab === "home" && (
          <main className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <aside className="md:col-span-1">
              <VillageAlerts alerts={village.alerts} />
            </aside>

            <div className="md:col-span-3">
              <div className="card bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/30 mb-6">
                <h2 className="text-xl font-semibold mb-4" id="village-name">
                  {village.name}
                </h2>
                <DynamicVillageMap />
                <div className="map-legend flex gap-4 mt-2 flex-wrap">
                  <div className="legend-item flex items-center gap-1">
                    <div className="legend-color w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Water Sources</span>
                  </div>
                  <div className="legend-item flex items-center gap-1">
                    <div className="legend-color w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Farmlands</span>
                  </div>
                  <div className="legend-item flex items-center gap-1">
                    <div className="legend-color w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Issues</span>
                  </div>
                </div>
              </div>

              <VillageStatistics village={village} />
              <UpcomingEvents event={village.nextEvent} />
            </div>
          </main>
        )}

        {activeTab === "issues" && <IssuesTab village={village} />}
        {activeTab === "panchayat" && <PanchayatTab village={village} />}
        {activeTab === "media" && <MediaTab village={village} />}
        {activeTab === "initiatives" && <InitiativesTab village={village} />}
      </div>
    </div>
  )
}
