"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MediaTabProps {
  village: any
}

export default function MediaTab({ village }: MediaTabProps) {
  const [activeMediaTab, setActiveMediaTab] = useState("all-media")

  return (
    <div className="card bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/30">
      <h2 className="text-xl font-semibold mb-4">
        <i className="fas fa-images mr-2"></i> Village Media
      </h2>

      <div className="tabs flex border-b border-gray-200 mb-6 overflow-x-auto">
        <div
          className={`tab py-3 px-5 font-semibold cursor-pointer transition-all whitespace-nowrap ${
            activeMediaTab === "all-media"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveMediaTab("all-media")}
        >
          All Media
        </div>
        <div
          className={`tab py-3 px-5 font-semibold cursor-pointer transition-all whitespace-nowrap ${
            activeMediaTab === "events-media"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveMediaTab("events-media")}
        >
          Events
        </div>
        <div
          className={`tab py-3 px-5 font-semibold cursor-pointer transition-all whitespace-nowrap ${
            activeMediaTab === "news-media"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveMediaTab("news-media")}
        >
          News
        </div>
        <div
          className={`tab py-3 px-5 font-semibold cursor-pointer transition-all whitespace-nowrap ${
            activeMediaTab === "share-media"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveMediaTab("share-media")}
        >
          Share New
        </div>
      </div>

      {activeMediaTab === "all-media" && (
        <div className="media-gallery grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {village.mediaGallery &&
            village.mediaGallery.map((media: any) => (
              <div key={media.id} className="media-card bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="media-image h-48 overflow-hidden">
                  <img
                    src={media.image || "/placeholder.svg"}
                    alt={media.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="media-content p-4">
                  <h3 className="media-title font-semibold text-gray-800">{media.title}</h3>
                  <div className="media-meta flex flex-wrap gap-4 my-2 text-sm text-gray-500">
                    <span>
                      <i className="fas fa-user"></i> {media.postedBy}
                    </span>
                    <span>
                      <i className="fas fa-calendar-alt"></i> {media.date}
                    </span>
                  </div>
                  <p className="media-description text-sm text-gray-600 mb-4">{media.description}</p>
                  <div className="media-actions flex justify-between items-center">
                    <div className="verification flex items-center gap-2 text-sm text-gray-500">
                      <i className="fas fa-check-circle text-green-500"></i>
                      <span>{media.verifications} verified</span>
                    </div>
                    <Button size="sm">
                      <i className="fas fa-check mr-2"></i> Verify
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {activeMediaTab === "events-media" && (
        <div className="media-gallery grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {village.mediaGallery &&
            village.mediaGallery
              .filter((media: any) => media.type === "event")
              .map((media: any) => (
                <div key={media.id} className="media-card bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="media-image h-48 overflow-hidden">
                    <img
                      src={media.image || "/placeholder.svg"}
                      alt={media.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="media-content p-4">
                    <h3 className="media-title font-semibold text-gray-800">{media.title}</h3>
                    <div className="media-meta flex flex-wrap gap-4 my-2 text-sm text-gray-500">
                      <span>
                        <i className="fas fa-user"></i> {media.postedBy}
                      </span>
                      <span>
                        <i className="fas fa-calendar-alt"></i> {media.date}
                      </span>
                    </div>
                    <p className="media-description text-sm text-gray-600 mb-4">{media.description}</p>
                    <div className="media-actions flex justify-between items-center">
                      <div className="verification flex items-center gap-2 text-sm text-gray-500">
                        <i className="fas fa-check-circle text-green-500"></i>
                        <span>{media.verifications} verified</span>
                      </div>
                      <Button size="sm">
                        <i className="fas fa-check mr-2"></i> Verify
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      )}

      {activeMediaTab === "news-media" && (
        <div className="media-gallery grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {village.mediaGallery &&
            village.mediaGallery
              .filter((media: any) => media.type === "news" || media.type === "announcement")
              .map((media: any) => (
                <div key={media.id} className="media-card bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="media-image h-48 overflow-hidden">
                    <img
                      src={media.image || "/placeholder.svg"}
                      alt={media.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="media-content p-4">
                    <h3 className="media-title font-semibold text-gray-800">{media.title}</h3>
                    <div className="media-meta flex flex-wrap gap-4 my-2 text-sm text-gray-500">
                      <span>
                        <i className="fas fa-user"></i> {media.postedBy}
                      </span>
                      <span>
                        <i className="fas fa-calendar-alt"></i> {media.date}
                      </span>
                    </div>
                    <p className="media-description text-sm text-gray-600 mb-4">{media.description}</p>
                    <div className="media-actions flex justify-between items-center">
                      <div className="verification flex items-center gap-2 text-sm text-gray-500">
                        <i className="fas fa-check-circle text-green-500"></i>
                        <span>{media.verifications} verified</span>
                      </div>
                      <Button size="sm">
                        <i className="fas fa-check mr-2"></i> Verify
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      )}

      {activeMediaTab === "share-media" && (
        <div className="add-form bg-white p-5 rounded-lg shadow-sm">
          <h3 className="form-title text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-plus-circle"></i> Share New Media
          </h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="media-title">Title</Label>
              <Input id="media-title" placeholder="Enter title" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="media-type">Type</Label>
                <select id="media-type" className="w-full p-2 border border-gray-200 rounded-md" required>
                  <option value="">Select type</option>
                  <option value="event">Event</option>
                  <option value="news">News</option>
                  <option value="announcement">Announcement</option>
                  <option value="celebration">Celebration</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="media-date">Date</Label>
                <Input id="media-date" type="date" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="media-description">Description</Label>
              <Textarea
                id="media-description"
                placeholder="Describe your media..."
                className="min-h-[100px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="media-image">Image URL (Optional)</Label>
              <Input id="media-image" placeholder="Enter image URL" />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <i className="fas fa-share-alt mr-2"></i> Share with Village
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
