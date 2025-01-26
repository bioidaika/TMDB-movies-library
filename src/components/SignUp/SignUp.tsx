import React, { useState } from 'react';
import css from './SignUp.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsError, selectIsLoading } from '../../redux/auth/selectors';
import { AppDispatch } from '../../redux/store';
import { getGoogleOAuthUrlOP, signinUserOP } from '../../redux/auth/operations';
import LoadingNotification from '../SignIn/LoadingNotification/LoadingNotification';
import { FcGoogle } from 'react-icons/fc';
import { setError } from '../../redux/auth/slice';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const isLoadingServer = useSelector(selectIsLoading);
  const error = useSelector(selectIsError);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      setError('Passwords do not match');
      return;
    }
    dispatch(signinUserOP({ email, password }));
    // console.log('Email:', email);
    // console.log('Password:', password);
  };

  const handleGoogleSignIn = () => {
    dispatch(getGoogleOAuthUrlOP());
  };

  return (
    <div className={css.container}>
      <div className={css.form}>
        {isLoadingServer && <LoadingNotification />}
        {error && <div className={css.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className={css.input}
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            className={css.input}
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className={css.submitBtn}>
            Sign Up
          </button>
          <div className={css.divider} />
        </form>
        <button onClick={handleGoogleSignIn} className={css.googleBtn}>
          <FcGoogle className={css.googleIcon} />
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
