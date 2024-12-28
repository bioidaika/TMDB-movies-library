import React, { useState } from 'react';
import css from './SignIn.module.css';
import { NavLink } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const LogIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleGoogleSignIn = () => {
    window.open(
      'https://movies-library-backend-s1fd.onrender.com/auth/get-oauth-url',
      '_blank',
      'width=500,height=600'
    );
  };

  return (
    <div className={css.container}>
      <div className={css.form}>
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
          <input
            className={css.input}
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <NavLink to="/auth/reset-password" className={css.forgotPassword}>
            Forgot password?
          </NavLink>
          <button type="submit" className={css.submitBtn}>
            Sign In
          </button>
          <div className={css.divider} />
        </form>
        <button type="button" onClick={handleGoogleSignIn} className={css.googleBtn}>
          <FcGoogle className={css.googleIcon} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LogIn;
