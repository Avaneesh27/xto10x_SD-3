interface PanchayatTabProps {
  village: any
}

export default function PanchayatTab({ village }: PanchayatTabProps) {
  return (
    <div>
      <div className="card bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/30 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          <i className="fas fa-users mr-2"></i> Panchayat Members
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {village.panchayatMembers &&
            village.panchayatMembers.map((member: any, index: number) => (
              <div
                key={index}
                className="leader-card bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center"
              >
                <img
                  src={member.photo || "/placeholder.svg"}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover border-3 border-blue-600 mb-4"
                />
                <h3 className="font-semibold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                <div className="leader-contact flex flex-col gap-2 w-full mt-4">
                  <button className="contact-btn bg-green-500 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 text-sm font-semibold">
                    <i className="fas fa-phone"></i> Call
                  </button>
                  <button className="contact-btn bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 text-sm font-semibold">
                    <i className="fas fa-envelope"></i> Message
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="card bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/30">
        <h2 className="text-xl font-semibold mb-4">
          <i className="fas fa-file-alt mr-2"></i> Recent Decisions
        </h2>
        <div className="decisions-list space-y-5">
          {village.panchayatDecisions &&
            village.panchayatDecisions.map((decision: any, index: number) => (
              <div key={index} className="decision-card bg-white p-5 rounded-lg shadow-sm">
                <h3 className="decision-title font-semibold text-gray-800 mb-3">{decision.title}</h3>
                <p className="decision-details text-sm text-gray-600">
                  <strong>Date:</strong> {decision.date}
                </p>
                <p className="decision-details text-sm text-gray-600 mb-3">{decision.description}</p>
                <div className="decision-votes flex gap-4">
                  <span className="vote-badge bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <i className="fas fa-thumbs-up"></i> {decision.yesVotes}
                  </span>
                  <span className="vote-badge bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <i className="fas fa-thumbs-down"></i> {decision.noVotes}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
