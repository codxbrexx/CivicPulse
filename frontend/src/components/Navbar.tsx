import { useDispatch } from "react-redux"
import { logoutUser } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"

function Navbar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate("/login")
  }

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3">

      <h1 className="text-xl font-bold text-blue-600">
        CivicPulse
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar