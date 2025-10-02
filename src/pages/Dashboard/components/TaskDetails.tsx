import { useState, useEffect, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { tasksAPI, applicationsAPI } from "../../../lib/api"
import type { Task } from "../../../types"

export function TaskDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [task, setTask] = useState<Task | null>(null)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [applied, setApplied] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (id) {
      fetchTask(id)
    }
  }, [id])

  const fetchTask = async (taskId: string) => {
    try {
      const response = await tasksAPI.getById(taskId)
      setTask(response.data)
    } catch (err) {
      setError("Failed to load task details")
    }
  }

  const handleApply = async (e: FormEvent) => {
    e.preventDefault()
    if (!task) return

    setLoading(true)
    setError("")

    try {
      await applicationsAPI.create(task._id, message)
      setApplied(true)
      setMessage("")
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (error && !task) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-950">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-950">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-950">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white">{task.title}</h1>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {task.createdBy.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <span className="rounded-full bg-teal-500/10 px-3 py-1 text-sm font-medium text-teal-400">
                {task.category}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 font-semibold text-white">Description</h3>
              <p className="whitespace-pre-wrap leading-relaxed text-gray-300">{task.description}</p>
            </div>

            {!applied ? (
              <form onSubmit={handleApply} className="space-y-4 border-t border-gray-800 pt-6">
                {error && (
                  <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200">
                    Application Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell the contributor why you'd like to help with this task..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
                  {loading ? "Submitting..." : "Apply to Help"}
                </button>
              </form>
            ) : (
              <div className="border-t border-gray-800 pt-6">
                <div className="rounded-lg border border-teal-500/20 bg-teal-500/10 p-4">
                  <p className="text-center font-medium text-teal-400">✓ Application submitted successfully!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  )
}
