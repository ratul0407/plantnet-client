import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const PrivateRoute = ({ children }) => {
  const { role, isLoading } = useRole();
  if (isLoading) return <LoadingSpinner />;
  if (role === "Seller") return children;
  return <Navigate to="/dashboard" replace="true" />;
};
export default PrivateRoute;
