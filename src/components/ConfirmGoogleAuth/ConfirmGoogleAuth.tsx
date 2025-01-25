import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { signinGoogleOauthOP } from '../../redux/auth/operations';

const ConfirmGoogleAuth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      //   console.log('Code:', code);
      dispatch(signinGoogleOauthOP(code))
        .then(() => {
          navigate('/auth/my-profile');
        })
        .catch(error => {
          console.error('Google OAuth failed:', error);
          navigate('/auth/login');
        });
    }
  }, [searchParams, dispatch, navigate]);
  return <div>Processing Google Authentication...</div>;
};

export default ConfirmGoogleAuth;
