import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("adminAuthenticated");
  
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }
  
  return children;
}