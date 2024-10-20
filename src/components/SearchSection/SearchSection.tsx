import { FC, ReactNode } from 'react';

interface SearchProps {
  children?: ReactNode;
}

const SearchSection: FC<SearchProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default SearchSection;
