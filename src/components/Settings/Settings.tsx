import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import css from './Settings.module.css';

export const Settings: React.FC = () => {
  const userInfo = useSelector(selectUser);
  const { name, email, gender, avatar, createdAt, updatedAt } = userInfo;
  const [inputValue, setInputValue] = useState(userInfo!);
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <div>
      <div className={css.main}>
        <img src={avatar} alt="User Avatar" />
        <p>{name}</p>
      </div>
      <form onSubmit={handleSubmit} className={css.updateForm}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name..."
          //   className={styleModule.searchInput}
          value={inputValue?.name || ''}
          onChange={e => setInputValue({ ...inputValue, name: e.target.value })}
        />
        <button type="submit" className={css.updateButton}>
          Save
        </button>
      </form>
    </div>
  );
};
