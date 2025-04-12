"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface InitiativesTabProps {
  village: any
}

export default function InitiativesTab({ village }: InitiativesTabProps) {
  const [activeInitiativesTab, setActiveInitiativesTab] = useState("active-initiatives")

  return (
    <div className="card bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/30">
      <h2 className="text-xl font-semibold mb-4">
        <i className="fas fa-lightbulb mr-2"></i> Community Initiatives
      </h2>

      <div className="tabs flex border-b border-gray-200 mb-6 overflow-x-auto">
        <div
          className={`tab py-3 px-5 font-semibold cursor-pointer transition-all whitespace-nowrap ${
            activeInitiativesTab === "active-initiatives"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveInitiativesTab("active-initiatives")}
        >
          Active
        </div>
        <div
          className={`tab py-3 px-5 font-semibold cursor-pointer transition-all whitespace-nowrap ${
            activeInitiativesTab === "completed-initiatives"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveInitiativesTab("completed-initiatives")}
        >
          Completed
        </div>
        <div
          className={`tab py-3 px-5 font-semibold cursor-pointer transition-all whitespace-nowrap ${
            activeInitiativesTab === "start-initiative"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveInitiativesTab("start-initiative")}
        >
          Start New
        </div>
      </div>

      {activeInitiativesTab === "active-initiatives" && (
        <div className="initiatives-list space-y-5">
          {village.activeInitiatives &&
            village.activeInitiatives.map((initiative: any) => {
              // Calculate progress percentage
              const progress = Math.round((initiative.current / initiative.target) * 100)

              return (
                <div key={initiative.id} className="initiative-card bg-white p-5 rounded-lg shadow-sm">
                  <div className="initiative-title font-semibold text-gray-800 flex items-center gap-2 mb-2">
                    <i className="fas fa-lightbulb"></i> {initiative.title}
                  </div>
                  <p className="mb-1">
                    <strong>Category:</strong> {initiative.category}
                  </p>
                  <p className="text-gray-600 mb-4">{initiative.description}</p>
                  <div className="initiative-progress mb-4">
                    <div className="progress-label flex justify-between items-center mb-1 text-sm">
                      <span>Support Progress</span>
                      <span>
                        {initiative.current}/{initiative.target} supporters
                      </span>
                    </div>
                    <div className="progress-bar h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="progress-fill h-full bg-blue-600 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="initiative-supporters text-sm text-gray-500 mb-4">
                    Started on {initiative.startDate} by {initiative.initiator}
                  </p>
                  <div className="initiative-actions flex gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <i className="fas fa-hands-helping mr-2"></i> Support This
                    </Button>
                    <Button variant="outline">
                      <i className="fas fa-share-alt mr-2"></i> Share
                    </Button>
                  </div>
                </div>
              )
            })}
        </div>
      )}

      {activeInitiativesTab === "completed-initiatives" && (
        <div className="initiatives-list space-y-5">
          {village.completedInitiatives &&
            village.completedInitiatives.map((initiative: any) => {
              // Calculate progress percentage (may be over 100%)
              const progress = Math.min(Math.round((initiative.current / initiative.target) * 100), 100)

              return (
                <div key={initiative.id} className="initiative-card bg-white p-5 rounded-lg shadow-sm">
                  <div className="initiative-title font-semibold text-gray-800 flex items-center gap-2 mb-2">
                    <i className="fas fa-check-circle"></i> {initiative.title}
                  </div>
                  <p className="mb-1">
                    <strong>Category:</strong> {initiative.category}
                  </p>
                  <p className="text-gray-600 mb-4">{initiative.description}</p>
                  <div className="initiative-progress mb-4">
                    <div className="progress-label flex justify-between items-center mb-1 text-sm">
                      <span>Final Support</span>
                      <span>
                        {initiative.current}/{initiative.target} supporters
                      </span>
                    </div>
                    <div className="progress-bar h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="progress-fill h-full bg-green-600 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  <p className="initiative-supporters text-sm text-gray-500">
                    Completed on {initiative.completionDate} (Started: {initiative.startDate})
                  </p>
                  <p className="initiative-supporters text-sm text-gray-500 mb-4">
                    Initiated by: {initiative.initiator}
                  </p>
                </div>
              )
            })}
          {(!village.completedInitiatives || village.completedInitiatives.length === 0) && (
            <div className="text-center py-10 text-gray-500">No completed initiatives to display</div>
          )}
        </div>
      )}

      {activeInitiativesTab === "start-initiative" && (
        <div className="add-form bg-white p-5 rounded-lg shadow-sm">
          <h3 className="form-title text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-plus-circle"></i> Start New Initiative
          </h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="initiative-title">Initiative Title</Label>
              <Input id="initiative-title" placeholder="Enter initiative title" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="initiative-category">Category</Label>
                <select id="initiative-category" className="w-full p-2 border border-gray-200 rounded-md" required>
                  <option value="">Select category</option>
                  <option value="environment">Environment</option>
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="community">Community</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="initiative-target">Target Supporters</Label>
                <Input id="initiative-target" type="number" min="10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="initiative-description">Description</Label>
              <Textarea
                id="initiative-description"
                placeholder="Describe your initiative..."
                className="min-h-[100px]"
                required
              />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <i className="fas fa-rocket mr-2"></i> Launch Initiative
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
