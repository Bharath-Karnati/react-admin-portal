// Import Navigate and Outlet from React Router
import { Navigate, Outlet } from "react-router-dom";

// Import our authentication check
import { isAuthenticated } from "../services/authService";

function ProtectedRoute() {
  // Check whether an admin is currently logged in
  const loggedIn = isAuthenticated();

  /*
    If the admin is not logged in,
    redirect them to the Login page.
  */
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  /*
    If the admin is logged in,
    display the protected page.
  */
  return <Outlet />;
}

export default ProtectedRoute;