import { useAuthStore } from "../../../stores/zustand";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute({ children }) {
  const isAdmin= useAuthStore((state) => state.is_admin);

  if (!isAdmin) return <Navigate to="/" replace />;
  return children ? children : <Outlet />;
}

export default AdminRoute;
