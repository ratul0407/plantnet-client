import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
const AdminRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  if (isLoading) return <LoadingSpinner />;
  if (role === "Admin") return children;
  return <Navigate to="/dashboard" replace="true" />;
};

export default AdminRoute;
