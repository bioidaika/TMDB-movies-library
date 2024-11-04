import { FC } from 'react';
import css from './Title.module.css';

interface TitleProps {
  text: string;
  size?: string;
}

const Title: FC<TitleProps> = ({ text, size }) => (
  <h2 className={css.title} style={{ fontSize: size }}>
    {text}
  </h2>
);

export default Title;
