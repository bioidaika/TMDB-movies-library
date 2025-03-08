import Container from '../components/Container/Container';
import { ProfileFavorites } from '../components/ProfileFavorites/ProfileFavorites';

export const FavoritePage: React.FC = () => {
  return (
    <div>
      <Container>
        <ProfileFavorites />
      </Container>
    </div>
  );
};
