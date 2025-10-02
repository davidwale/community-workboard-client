import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { AuthGuard } from "./components/AuthGuard"
import { Login } from "./pages/Auth/Login"
import { Register } from "./pages/Auth/Register"
import { Dashboard } from "./pages/Dashboard/Dashboard"
import { TaskDetail } from "./pages/Dashboard/components/TaskDetails"
import { NotFound } from "./pages/NotFound"

function AppContent() {
  const location = useLocation()
  
  // Pages that should NOT have navbar
  const noNavbarPages = ['/', '/login', '/register']
  const shouldShowNavbar = !noNavbarPages.includes(location.pathname)

  return (
    <div className="min-h-screen bg-gray-950">
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route 
          path="/" 
          element={
            <AuthGuard requireAuth={false}>
              <Login />
            </AuthGuard>
          } 
        />
        <Route 
          path="/login" 
          element={
            <AuthGuard requireAuth={false}>
              <Login />
            </AuthGuard>
          } 
        />
        <Route 
          path="/register" 
          element={
            <AuthGuard requireAuth={false}>
              <Register />
            </AuthGuard>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <AuthGuard requireAuth={true}>
              <Dashboard />
            </AuthGuard>
          } 
        />
        <Route 
          path="/tasks/:id" 
          element={
            <AuthGuard requireAuth={true}>
              <TaskDetail />
            </AuthGuard>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
