import React from 'react';
import css from './ResetPassword.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
  selectEmailReset,
  selectIsError,
  selectIsLoading,
  selectRequestResetPassword,
} from '../../redux/auth/selectors';
import LoadingNotification from '../LoadingNotification/LoadingNotification';
import { requestResetPasswordOP } from '../../redux/auth/operations';
import { setEmailReset, setRequestResetPassword } from '../../redux/auth/slice';

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingServer = useSelector(selectIsLoading);
  const emailReset = useSelector(selectEmailReset);
  const isRequestResetPassword = useSelector(selectRequestResetPassword);
  const error = useSelector(selectIsError);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(requestResetPasswordOP({ email: emailReset }));
  };

  const handleBacktoLogin = () => {
    dispatch(setRequestResetPassword(false));
    dispatch(setEmailReset(''));
  };

  return (
    <div className={css.container}>
      <div className={css.form}>
        {isLoadingServer && <LoadingNotification />}
        {error && <div className={css.error}>{error}</div>}

        {isRequestResetPassword ? (
          <div className={css.successContainer}>
            <h2 className={css.title}>Success!</h2>
            <p className={css.text}>
              We have sent a link to <strong>{emailReset}</strong> to reset your password.
            </p>
          </div>
        ) : (
          <>
            <h2 className={css.title}>Forgot your Password?</h2>
            <p className={css.text}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className={css.innerForm}>
              <input
                className={css.input}
                type="email"
                placeholder="Email"
                id="email"
                value={emailReset}
                onChange={e => dispatch(setEmailReset(e.target.value))}
                required
              />
              <button type="submit" className={css.submitBtn}>
                Continue
              </button>
              <div className={css.divider} />
            </form>
          </>
        )}
        <NavLink to="/auth/login">
          <button type="button" className={css.backBtn} onClick={() => handleBacktoLogin()}>
            Back to Log In
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default ResetPassword;
