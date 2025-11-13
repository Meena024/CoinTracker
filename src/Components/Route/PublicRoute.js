import { Navigate } from "react-router-dom";

const PublicRoute = ({ isLoggedIn, children }) => {
  if (isLoggedIn) {
    return <Navigate to="/UserProfile" replace />;
  }
  return children;
};

export default PublicRoute;
