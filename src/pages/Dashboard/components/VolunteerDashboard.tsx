import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { tasksAPI } from "../../../lib/api"
import type { Task } from "../../../types/index"
import { Greeting } from "../../../components/Greeting"

export function VolunteerDashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await tasksAPI.list()
      setTasks(response.data)
    } catch (err) {
      console.error("Error fetching tasks:", err)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Greeting />
      <div className="mb-8">
        <p className="mt-2 text-gray-400">Browse available tasks and apply to help</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.length === 0 ? (
          <div className="col-span-full">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-12">
              <div className="flex flex-col items-center justify-center">
                <svg className="mb-4 h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-center text-gray-400">No tasks available at the moment</p>
              </div>
            </div>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="rounded-xl border border-gray-800 bg-gray-900 p-6 hover:border-purple-500/50 transition-colors"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="flex-1 text-lg font-semibold text-white">{task.title}</h3>
                {/* <span className="ml-2 shrink-0 rounded-full bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-400">
                  {task.category}
                </span> */}
              </div>
              <p className="mb-1 text-sm text-gray-400">by {task.createdBy.name}</p>
              <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-300">{task.description}</p>
              <button
                onClick={() => navigate(`/tasks/${task._id}`)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-700 bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
              >
                View Details
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
