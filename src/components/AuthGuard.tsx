import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { checkAuth } from "../lib/auth"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isAuth = await checkAuth()
        setIsAuthenticated(isAuth)
        
        if (requireAuth && !isAuth) {
          navigate("/login")
        } else if (!requireAuth && isAuth) {
          navigate("/dashboard")
        }
      } catch (error) {
        console.error("Auth verification failed:", error)
        if (requireAuth) {
          navigate("/login")
        }
      } finally {
        setIsLoading(false)
      }
    }

    verifyAuth()
  }, [requireAuth, navigate])

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-950">
        <div className="flex flex-col items-center">
          <svg className="h-8 w-8 animate-spin text-purple-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <p className="text-gray-400">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null // Will redirect to login
  }

  if (!requireAuth && isAuthenticated) {
    return null // Will redirect to dashboard
  }

  return <>{children}</>
}
