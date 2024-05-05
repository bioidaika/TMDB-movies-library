import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ filtered }) {
  const location = useLocation();
  return (
    <div>
      <ul>
        {filtered.map(item => (
          <li key={item.id}>
            <Link to={`/movies/${item.id}`} state={location}>
              {item.original_title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
