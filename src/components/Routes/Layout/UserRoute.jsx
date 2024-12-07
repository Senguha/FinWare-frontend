import { useAuthStore } from "../../../stores/zustand";
import { Navigate, Outlet } from "react-router-dom";

function UserRoute({ children }) {
  const login = useAuthStore((state) => state.login);

  if (!login) return <Navigate to="/" replace />;
  return children ? children : <Outlet />;
}

export default UserRoute;
