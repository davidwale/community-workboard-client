import { getUserName } from "../lib/auth"

export function Greeting() {
  const userName = getUserName()
  const hour = new Date().getHours()
  
  const getTimeBasedGreeting = () => {
    if (hour < 12) {
      return "Good morning"
    } else if (hour < 17) {
      return "Good afternoon"
    } else {
      return "Good evening"
    }
  }

  const greeting = getTimeBasedGreeting()

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">
        {greeting}, {userName || "User"}
      </h1>
    </div>
  )
}
