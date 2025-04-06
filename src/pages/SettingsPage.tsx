import React from 'react';
import Container from '../components/Container/Container';
import { Settings } from '../components/Settings/Settings';

const SettingsPage: React.FC = () => {
  return (
    <div>
      <Container>
        <Settings />
      </Container>
    </div>
  );
};

export default SettingsPage;
