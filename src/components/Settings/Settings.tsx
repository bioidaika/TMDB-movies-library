import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import css from './Settings.module.css';

export const Settings: React.FC = () => {
  const userInfo = useSelector(selectUser);
  const [inputValue, setInputValue] = useState(userInfo!);
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log('Updated user info:', inputValue);
  };

  return (
    <div>
      <div className={css.main}>
        <img src={inputValue.avatar || ''} alt="User Avatar" />
        <p>{inputValue.name}</p>
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email..."
          //   className={styleModule.searchInput}
          value={inputValue?.email || ''}
          onChange={e => setInputValue({ ...inputValue, email: e.target.value })}
        />
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          value={inputValue?.gender || ''}
          onChange={e => setInputValue({ ...inputValue, gender: e.target.value })}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit" className={css.updateButton}>
          Save
        </button>
      </form>
    </div>
  );
};
