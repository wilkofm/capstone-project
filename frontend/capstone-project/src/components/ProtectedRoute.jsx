import { Outlet, Navigate } from "react-router-dom";

// wrap around logged-in user only routes to protect them
function ProtectedRoute({ redirectPath = "/", children }) {
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!currentUser) {
    alert("You must be signed in to visit this page");
    return <Navigate to={redirectPath} replace />;
  }
  // works for both nested and standalone routes
  return children ? children : <Outlet />;
}
export default ProtectedRoute;
