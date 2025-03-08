import MovieList from '../components/MovieList/MovieList';
import { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/Container/Container';
import Title from '../components/Title/Title';

export default function SearchPage() {
  const [params] = useSearchParams();
  const queryURL = params.get('query') ?? ' ';

  return (
    <>
      <Toaster />
      <Title text={`Search results for ${queryURL}`} />
      <Container>
        <MovieList />
      </Container>
    </>
  );
}
