
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const status = localStorage.getItem('status');
  const location = useLocation();

  if (!status) {
    // Redirect them to the login page if not authenticated
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
