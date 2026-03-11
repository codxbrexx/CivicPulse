import { Link } from "react-router-dom"

function Sidebar() {

  return (
    <div className="w-60 bg-gray-900 text-white min-h-screen p-4">

      <h2 className="text-lg font-semibold mb-6">
        Menu
      </h2>

      <nav className="flex flex-col gap-3">

        <Link
          to="/dashboard"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/issues"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Issues
        </Link>

        <Link
          to="/create-issue"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Report Issue
        </Link>

        <Link
          to="/audit"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Audit Logs
        </Link>

      </nav>

    </div>
  )
}

export default Sidebar