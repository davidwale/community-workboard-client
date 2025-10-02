import { useEffect, useState } from "react"
import { getUserRole } from "../../lib/auth"
import { ContributorDashboard } from "./components/ContributorDashboard"
import { VolunteerDashboard } from "./components/VolunteerDashboard"

export function Dashboard() {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    setRole(getUserRole())
  }, [])

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-950">
      {role === "contributor" ? <ContributorDashboard /> : <VolunteerDashboard />}
    </div>
  )
}
