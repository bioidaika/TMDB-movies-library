import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

interface RestrictRouteProps {
  component: JSX.Element;
  redirectTo: string;
}

export const RestrictRoute = ({ component, redirectTo }: RestrictRouteProps) => {
  const isLogged = useSelector(selectIsLoggedIn);
  return !isLogged ? <Navigate to={redirectTo} /> : component;
};
