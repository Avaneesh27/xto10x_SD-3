"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface HeaderProps {
  currentVillage: string
  onVillageChange: (village: string) => void
  isLoggedIn: boolean
  onLogout: () => void
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Header({
  currentVillage,
  onVillageChange,
  isLoggedIn,
  onLogout,
  activeTab,
  onTabChange,
}: HeaderProps) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const router = useRouter()

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onVillageChange(e.target.value)
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      onLogout()
    }
  }

  const handleTabClick = (tab: string, e: React.MouseEvent) => {
    e.preventDefault()
    onTabChange(tab)
  }

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center py-4 gap-4">
          <div className="logo text-2xl font-bold flex items-center gap-2">
            <i className="fas fa-hands-helping"></i>
            <span>Gram Vaani</span>
          </div>

          <button className="md:hidden text-2xl" onClick={toggleNav}>
            <i className="fas fa-bars"></i>
          </button>

          <nav className={`w-full md:w-auto ${isNavOpen ? "block" : "hidden md:block"}`}>
            <ul className="flex flex-col md:flex-row gap-4 md:gap-6">
              <li>
                <a
                  href="#"
                  onClick={(e) => handleTabClick("home", e)}
                  className={`flex items-center gap-1 hover:text-blue-100 transition-colors ${activeTab === "home" ? "font-bold" : ""}`}
                >
                  <i className="fas fa-home"></i> Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleTabClick("issues", e)}
                  className={`flex items-center gap-1 hover:text-blue-100 transition-colors ${activeTab === "issues" ? "font-bold" : ""}`}
                >
                  <i className="fas fa-exclamation-triangle"></i> Issues
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleTabClick("panchayat", e)}
                  className={`flex items-center gap-1 hover:text-blue-100 transition-colors ${activeTab === "panchayat" ? "font-bold" : ""}`}
                >
                  <i className="fas fa-users"></i> Panchayat
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleTabClick("media", e)}
                  className={`flex items-center gap-1 hover:text-blue-100 transition-colors ${activeTab === "media" ? "font-bold" : ""}`}
                >
                  <i className="fas fa-images"></i> Media
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleTabClick("initiatives", e)}
                  className={`flex items-center gap-1 hover:text-blue-100 transition-colors ${activeTab === "initiatives" ? "font-bold" : ""}`}
                >
                  <i className="fas fa-lightbulb"></i> Initiatives
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="village-selector w-full md:w-auto">
              <select
                id="village-select"
                value={currentVillage}
                onChange={handleVillageChange}
                className="w-full md:w-auto p-2 rounded bg-white text-gray-800 font-medium"
              >
                <option value="bishnupur">Bishnupur Village</option>
                <option value="chandpur">Chandpur Village</option>
                <option value="devgaon">Devgaon Village</option>
                <option value="amritpur">Amritpur Village</option>
                <option value="songarh">Songarh Village</option>
              </select>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              {isLoggedIn ? (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-semibold flex items-center gap-2 transition-colors w-full md:w-auto justify-center"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-semibold flex items-center gap-2 transition-colors w-full md:w-auto justify-center"
                  >
                    <i className="fas fa-sign-in-alt"></i> Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold flex items-center gap-2 transition-colors w-full md:w-auto justify-center"
                  >
                    <i className="fas fa-user-plus"></i> Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
