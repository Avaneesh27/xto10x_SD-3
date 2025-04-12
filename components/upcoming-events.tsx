interface Event {
  title: string
  date: string
  location: string
  description: string
}

interface UpcomingEventsProps {
  event: Event
}

export default function UpcomingEvents({ event }: UpcomingEventsProps) {
  return (
    <div className="card bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/30 mb-6">
      <h3 className="text-xl font-semibold mb-4">
        <i className="fas fa-calendar-alt mr-2"></i> Upcoming Events
      </h3>
      <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
        <div className="text-lg font-semibold">{event.title}</div>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <i className="fas fa-clock mr-2"></i> {event.date}
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <i className="fas fa-map-marker-alt mr-2"></i> {event.location}
        </div>
        <div className="mt-3 text-sm">{event.description}</div>
      </div>
    </div>
  )
}
