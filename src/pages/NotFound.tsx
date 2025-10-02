import { Link } from "react-router-dom"

export function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-950 px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-purple-500">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-white">Page Not Found</h2>
          <p className="mt-4 text-lg text-gray-400">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-700 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go to Dashboard
          </Link>
          
          <div className="text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-300 transition-colors">
              Or go back to login
            </Link>
          </div>
        </div>
        
        <div className="mt-12">
          <div className="mx-auto max-w-md">
            <div className="grid grid-cols-3 gap-4 text-6xl text-gray-800">
              <div>🌱</div>
              <div>🤝</div>
              <div>💚</div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Building communities, one task at a time
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
