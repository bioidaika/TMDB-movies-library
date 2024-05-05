import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  const backLinkRef = useRef(location.state ?? '/');
  return (
    <div>
      <Link to={backLinkRef.current}>Back to Home</Link>
      <p>Not Found Page</p>
    </div>
  );
}
