import React, { useState } from 'react';
import css from './ResetPassword.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { selectIsError, selectIsLoading } from '../../redux/auth/selectors';
import LoadingNotification from '../LoadingNotification/LoadingNotification';
import { requestResetPasswordOP } from '../../redux/auth/operations';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingServer = useSelector(selectIsLoading);
  const error = useSelector(selectIsError);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(requestResetPasswordOP({ email }));
  };
  return (
    <div className={css.container}>
      <div className={css.form}>
        {isLoadingServer && <LoadingNotification />}
        {error && <div className={css.error}>{error}</div>}
        <form onSubmit={handleSubmit} className={css.innerForm}>
          <input
            className={css.input}
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={css.submitBtn}>
            Continue
          </button>
          <div className={css.divider} />
        </form>
        <NavLink to="/auth/reset-password">
          <button type="button" className={css.submitBtn}>
            Back to Sign In
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default ResetPassword;
