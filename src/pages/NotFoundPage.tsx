import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NotFoundPage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/');
  return (
    <div>
      <Link to={backLinkRef.current}>Back to Home</Link>
      <p>Not Found Page</p>
    </div>
  );
}
