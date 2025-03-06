import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
