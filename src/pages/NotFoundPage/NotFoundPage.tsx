// NotFoundPage.tsx
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/');

  return (
    <div className={css.container}>
      <div className={css.content}>
        <h1 className={css.title}>404</h1>
        <p className={css.text}>Oops! The page you're looking for doesn't exist.</p>
        <Link to={backLinkRef.current} className={css.backHomeLink}>
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
