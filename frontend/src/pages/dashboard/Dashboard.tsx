import DashboardLayout from "../../layouts/DashboardLayout"
import { useSelector } from "react-redux"
import type { RootState } from "../../app/store"

function Dashboard() {

  const user = useSelector((state:RootState)=>state.auth.user)

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-4">
        Welcome {user?.name}
      </h1>

      <p className="text-gray-600">
        CivicPulse Issue Dashboard
      </p>

    </DashboardLayout>

  )
}

export default Dashboard