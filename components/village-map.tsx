"use client"

import { useEffect, useRef } from "react"
import "ol/ol.css"
import Map from "ol/Map"
import View from "ol/View"
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import { fromLonLat } from "ol/proj"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import Feature from "ol/Feature"
import Point from "ol/geom/Point"
import { Style, Circle, Fill, Stroke } from "ol/style"

export default function VillageMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Create vector sources for different types of points
    const waterSource = new VectorSource()
    const farmlandSource = new VectorSource()
    const issueSource = new VectorSource()

    // Sample data points (would come from API in real app)
    const waterPoints = [
      [77.209, 28.6139], // Example coordinates
      [77.219, 28.6239],
      [77.229, 28.6039],
    ]

    const farmlandPoints = [
      [77.239, 28.6339],
      [77.249, 28.6439],
      [77.259, 28.6539],
    ]

    const issuePoints = [
      [77.219, 28.6339],
      [77.229, 28.6439],
    ]

    // Add features to sources
    waterPoints.forEach((point) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(point)),
      })
      waterSource.addFeature(feature)
    })

    farmlandPoints.forEach((point) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(point)),
      })
      farmlandSource.addFeature(feature)
    })

    issuePoints.forEach((point) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(point)),
      })
      issueSource.addFeature(feature)
    })

    // Create vector layers with styles
    const waterLayer = new VectorLayer({
      source: waterSource,
      style: new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({ color: "#3b82f6" }),
          stroke: new Stroke({ color: "white", width: 2 }),
        }),
      }),
    })

    const farmlandLayer = new VectorLayer({
      source: farmlandSource,
      style: new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({ color: "#10b981" }),
          stroke: new Stroke({ color: "white", width: 2 }),
        }),
      }),
    })

    const issueLayer = new VectorLayer({
      source: issueSource,
      style: new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({ color: "#ef4444" }),
          stroke: new Stroke({ color: "white", width: 2 }),
        }),
      }),
    })

    // Create map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        waterLayer,
        farmlandLayer,
        issueLayer,
      ],
      view: new View({
        center: fromLonLat([77.209, 28.6139]), // Default center (Delhi area)
        zoom: 12,
      }),
    })

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined)
        mapInstanceRef.current = null
      }
    }
  }, [])

  return <div ref={mapRef} className="h-[300px] rounded-xl mb-6 overflow-hidden shadow-md border-2 border-white"></div>
}
