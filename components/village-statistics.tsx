interface VillageStats {
  population: number
  households: number
  issues: number
}

interface VillageStatisticsProps {
  village: {
    population: number
    households: number
    issues: number
  }
}

export default function VillageStatistics({ village }: VillageStatisticsProps) {
  return (
    <div className="card bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/30 mb-6">
      <h3 className="text-xl font-semibold mb-4">
        <i className="fas fa-chart-pie mr-2"></i> Village Statistics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500">Population</div>
          <div className="text-2xl font-bold">{village.population}</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500">Households</div>
          <div className="text-2xl font-bold">{village.households}</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500">Active Issues</div>
          <div className="text-2xl font-bold">{village.issues}</div>
        </div>
      </div>
    </div>
  )
}
