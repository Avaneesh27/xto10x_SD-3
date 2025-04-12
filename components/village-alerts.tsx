interface Alert {
  type: string
  icon: string
  title: string
  description: string
  time: string
}

interface VillageAlertsProps {
  alerts: Alert[]
}

export default function VillageAlerts({ alerts }: VillageAlertsProps) {
  return (
    <div className="card bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/30">
      <h3 className="flex justify-between items-center mb-4">
        <span>
          <i className="fas fa-bell mr-2"></i> Village Alerts
        </span>
        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">{alerts.length}</span>
      </h3>
      <div className="notification-list space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`flex gap-4 p-3 rounded-lg bg-white transition-transform hover:translate-x-1 shadow-sm ${alert.type === "urgent" ? "border-l-4 border-red-500" : ""}`}
          >
            <div className="text-xl text-blue-600 min-w-6" dangerouslySetInnerHTML={{ __html: alert.icon }}></div>
            <div className="flex-1">
              <div className="font-semibold">{alert.title}</div>
              <p className="text-sm">{alert.description}</p>
              <small className="text-gray-500">{alert.time}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
