import { useState, useEffect, type FormEvent } from "react"
import { tasksAPI } from "../../../lib/api"
import type { Task, Application } from "../../../types/index"
import { Greeting } from "../../../components/Greeting"

export function ContributorDashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [applications, setApplications] = useState<Application[]>([])
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [loadingApplications, setLoadingApplications] = useState(false)
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showModal) {
        closeModal()
      }
    }

    if (showModal) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [showModal])

  const fetchTasks = async () => {
    try {
      const response = await tasksAPI.getMyTasks()
      console.log(response.data)
      setTasks(response.data)
    } catch (err) {
      console.error("Error fetching tasks:", err)
    }
  }

  const handleCreateTask = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await tasksAPI.create(title, description)
      setTitle("")
      setDescription("")
      fetchTasks()
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const viewApplications = async (taskId: string) => {
    setCurrentTaskId(taskId)
    setShowModal(true)
    setLoadingApplications(true)
    setError("")
    setApplications([])
    
    try {
      const response = await tasksAPI.getApplications(taskId)
      setApplications(response.data)
    } catch (err) {
      setError("Could not fetch applications for this task")
    } finally {
      setLoadingApplications(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setApplications([])
    setCurrentTaskId(null)
    setError("")
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Greeting />
      <div className="mb-8">
        <p className="mt-2 text-gray-400">Create and manage your community tasks</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <div className="mb-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Task
            </h2>
            <p className="mt-1 text-sm text-gray-400">Post a task for volunteers to apply</p>
          </div>

          <form onSubmit={handleCreateTask} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">{error}</div>
            )}

            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-200">
                Task Title
              </label>
              <input
                id="title"
                placeholder="e.g., Community Garden Cleanup"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-200">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Describe the task, requirements, and what volunteers will do..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">Your Tasks</h2>
              <p className="mt-1 text-sm text-gray-400">Manage your posted tasks and applications</p>
            </div>

            <div className="space-y-4">
              {tasks.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-400">No tasks yet. Create your first task!</p>
              ) : (
                tasks.map((task) => (
                  <div key={task._id} className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                    <h3 className="font-semibold text-white">{task.title}</h3>
                    <p className="mt-1 text-sm text-gray-400">{task.category}</p>
                    <p className="mt-2 text-sm text-gray-300 line-clamp-2">{task.description}</p>
                    <button
                      onClick={() => viewApplications(task._id)}
                      className="mt-3 flex items-center gap-2 rounded-lg border border-gray-700 bg-transparent px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      View Applications
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Applications Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeModal}
        >
          <div 
            className="w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-xl border border-gray-800 bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-800 p-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Applications</h2>
                <p className="mt-1 text-sm text-gray-400">Volunteers interested in this task</p>
              </div>
              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-6">
              {loadingApplications ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <svg className="h-8 w-8 animate-spin text-purple-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <p className="text-gray-400">Loading applications...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <svg className="h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-red-400 text-center">{error}</p>
                  <button
                    onClick={() => currentTaskId && viewApplications(currentTaskId)}
                    className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.length === 0 ? (
                    <div className="py-8 text-center">
                      <svg className="mx-auto mb-4 h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <p className="text-gray-400">No applications yet</p>
                    </div>
                  ) : (
                    applications.map((app) => (
                      <div key={app.id} className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-white">{app.userId.name}</p>
                            <p className="text-sm text-gray-400">{app.userId.email}</p>
                          </div>
                          <span className="text-xs text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-300">{app.message}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
