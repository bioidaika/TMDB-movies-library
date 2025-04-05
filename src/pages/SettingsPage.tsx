import React from 'react';
import Container from '../components/Container/Container';
import { Settings } from '../components/Settings/Settings';

export const SettingsPage: React.FC = () => {
  return (
    <div>
      <Container>
        <Settings />
      </Container>
    </div>
  );
};
