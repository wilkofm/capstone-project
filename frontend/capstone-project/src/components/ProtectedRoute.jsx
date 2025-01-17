import { Outlet, Navigate } from "react-router-dom";

// wrap around logged-in user only routes to protect them
function ProtectedRoute({ redirectPath = "/", children }) {
  const storedUser = localStorage.getItem("loggedInUser");
  const currentUser =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  console.log("Current user in ProtectedRoute:", currentUser);
  if (!currentUser) {
    return <Navigate to={redirectPath} replace />;
  }
  // works for both nested and standalone routes
  return children ? children : <Outlet />;
}
export default ProtectedRoute;
