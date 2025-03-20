import React, { useState, useEffect } from 'react';
import css from '../SignIn.module.css';

const LoadingNotification: React.FC = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={css.notification}>
      <div> Loading{dots}</div>
      <div>This may take up to 50 seconds due to server idle state.</div>
    </div>
  );
};

export default LoadingNotification;
