"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface IssuesTabProps {
  village: any
}

export default function IssuesTab({ village }: IssuesTabProps) {
  const [activeIssuesTab, setActiveIssuesTab] = useState("active-issues")

  return (
    <div className="card bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/30">
      <h2 className="text-xl font-semibold mb-4">
        <i className="fas fa-exclamation-triangle mr-2"></i> Village Issues
      </h2>

      <div className="tabs flex border-b border-gray-200 mb-6 overflow-x-auto">
        <div
          className={`tab py-3 px-5 font-semibold cursor-pointer transition-all whitespace-nowrap ${
            activeIssuesTab === "active-issues"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveIssuesTab("active-issues")}
        >
          Active Issues
        </div>
        <div
          className={`tab py-3 px-5 font-semibold cursor-pointer transition-all whitespace-nowrap ${
            activeIssuesTab === "resolved-issues"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveIssuesTab("resolved-issues")}
        >
          Resolved
        </div>
        <div
          className={`tab py-3 px-5 font-semibold cursor-pointer transition-all whitespace-nowrap ${
            activeIssuesTab === "report-issue"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveIssuesTab("report-issue")}
        >
          Report New
        </div>
      </div>

      {activeIssuesTab === "active-issues" && (
        <div className="issues-list space-y-5">
          {village.activeIssues.map((issue: any) => (
            <div key={issue.id} className="issue-card bg-white p-5 rounded-lg shadow-sm">
              <div className="issue-header flex justify-between items-center mb-3">
                <div className="issue-title font-semibold text-gray-800 flex items-center gap-2">
                  <i className="fas fa-exclamation-circle"></i> {issue.title}
                </div>
                <span className="status-badge bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Pending
                </span>
              </div>
              <div className="issue-details text-sm text-gray-600">
                <p>
                  <strong>Location:</strong> {issue.location}
                </p>
                <p>
                  <strong>Reported by:</strong> {issue.reporter} on {issue.date}
                </p>
                <p>
                  <strong>Description:</strong> {issue.description}
                </p>
              </div>
              <div className="issue-progress mt-3 p-3 bg-gray-50 rounded-md text-sm">
                <strong>Progress:</strong> {issue.progress}
              </div>
              <div className="issue-actions flex gap-3 mt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <i className="fas fa-hands-helping mr-2"></i> Support ({issue.supporters})
                </Button>
                <Button variant="outline">
                  <i className="fas fa-comment mr-2"></i> Comment
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeIssuesTab === "resolved-issues" && (
        <div className="issues-list space-y-5">
          {village.resolvedIssues &&
            village.resolvedIssues.map((issue: any) => (
              <div key={issue.id} className="issue-card bg-white p-5 rounded-lg shadow-sm">
                <div className="issue-header flex justify-between items-center mb-3">
                  <div className="issue-title font-semibold text-gray-800 flex items-center gap-2">
                    <i className="fas fa-check-circle"></i> {issue.title}
                  </div>
                  <span className="status-badge bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Resolved
                  </span>
                </div>
                <div className="issue-details text-sm text-gray-600">
                  <p>
                    <strong>Location:</strong> {issue.location}
                  </p>
                  <p>
                    <strong>Reported by:</strong> {issue.reporter} on {issue.date}
                  </p>
                  <p>
                    <strong>Description:</strong> {issue.description}
                  </p>
                </div>
                <div className="issue-progress mt-3 p-3 bg-gray-50 rounded-md text-sm">
                  <strong>Resolution:</strong> {issue.resolution}
                </div>
                <div className="issue-actions flex gap-3 mt-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <i className="fas fa-check mr-2"></i> Verify Resolution
                  </Button>
                </div>
              </div>
            ))}
          {(!village.resolvedIssues || village.resolvedIssues.length === 0) && (
            <div className="text-center py-10 text-gray-500">No resolved issues to display</div>
          )}
        </div>
      )}

      {activeIssuesTab === "report-issue" && (
        <div className="add-form bg-white p-5 rounded-lg shadow-sm">
          <h3 className="form-title text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-plus-circle"></i> Report New Issue
          </h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="issue-title">Issue Title</Label>
              <Input id="issue-title" placeholder="Enter issue title" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issue-location">Location</Label>
                <select id="issue-location" className="w-full p-2 border border-gray-200 rounded-md" required>
                  <option value="">Select location</option>
                  <option value="center">Village Center</option>
                  <option value="north">North Side</option>
                  <option value="south">South Side</option>
                  <option value="east">East Side</option>
                  <option value="west">West Side</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="issue-category">Category</Label>
                <select id="issue-category" className="w-full p-2 border border-gray-200 rounded-md" required>
                  <option value="">Select category</option>
                  <option value="water">Water Supply</option>
                  <option value="road">Road & Transport</option>
                  <option value="electricity">Electricity</option>
                  <option value="sanitation">Sanitation</option>
                  <option value="health">Health Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="issue-description">Description</Label>
              <Textarea
                id="issue-description"
                placeholder="Describe the issue in detail..."
                className="min-h-[100px]"
                required
              />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <i className="fas fa-paper-plane mr-2"></i> Submit Issue
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
