import { useState } from 'react';
import { IReviews } from '../../types/types';
import css from './ReviewCard.module.css';
import Title from '../Title/Title';

export const ReviewCard = ({ item }: { item: IReviews }) => {
  const MAX_LENGTH = 200;
  const [expanded, setExpanded] = useState(false);
  const isLongReview = item.content.length > MAX_LENGTH;

  return (
    <li key={item.id} className={css.reviews__card}>
      <Title
        text={`Written by ${item.author} on ${new Date(item.created_at).toLocaleDateString(
          'en-US',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        )}`}
        size="16px"
      />
      <p> {expanded || !isLongReview ? item.content : `${item.content.slice(0, MAX_LENGTH)}...`}</p>
      {isLongReview && (
        <button className={css.seeMoreBtn} onClick={() => setExpanded(prev => !prev)}>
          {expanded ? 'See less' : 'See more'}
        </button>
      )}
    </li>
  );
};
