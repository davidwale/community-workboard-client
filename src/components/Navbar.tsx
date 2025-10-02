"use client"

import { Link, useNavigate } from "react-router-dom"
import { logout, isAuthenticated } from "../lib/auth"

export function Navbar() {
  const navigate = useNavigate()
  const isLoggedIn = isAuthenticated()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="border-b border-gray-800 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white">
            Community WorkBoard
          </Link>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-sm text-gray-300 hover:text-white transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
