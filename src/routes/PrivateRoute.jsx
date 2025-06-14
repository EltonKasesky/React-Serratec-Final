import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, userInfo, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  const userRoles = userInfo?.roles || [];
  const hasAccess = roles.length === 0 || roles.some(role => userRoles.includes(role));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
