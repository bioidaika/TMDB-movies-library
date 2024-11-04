import { FC, memo, ReactNode } from 'react';
import css from './Container.module.css';

interface IContainer {
  children?: ReactNode;
}

const Container: FC<IContainer> = memo(({ children }) => {
  return <div className={css.section}>{children}</div>;
});

export default Container;
