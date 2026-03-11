import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import type { RootState } from "../app/store"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

  const user = useSelector((state: RootState) => state.auth.user)

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute