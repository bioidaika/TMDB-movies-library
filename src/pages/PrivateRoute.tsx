import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo: string;
}

export const PrivateRoute = ({ component, redirectTo }: PrivateRouteProps) => {
  const isLogged = useSelector(selectIsLoggedIn);
  return isLogged ? <Navigate to={redirectTo} /> : component;
};
