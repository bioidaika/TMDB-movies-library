import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import css from './Settings.module.css';
import { updateUserOP } from '../../redux/auth/operations';
import { AppDispatch } from '../../redux/store';

export const Settings: React.FC = () => {
  const userInfo = useSelector(selectUser);
  const [inputValue, setInputValue] = useState(userInfo!);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const userForm = new FormData();
      userForm.append('name', inputValue.name!);
      userForm.append('email', inputValue.email!);
      userForm.append('gender', inputValue.gender!);
      if (avatarFile) {
        userForm.append('avatar', avatarFile);
      }
      dispatch(updateUserOP(userForm));
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <div className={css.settings}>
      <div className={css.main}>
        <div className={css.avatarWrap}>
          <img
            src={avatarPreview || inputValue.avatar || ''}
            alt="User Avatar"
            className={css.avatar}
          />
          <label className={css.fileLabel}>
            Choose file
            <input
              type="file"
              accept="image/*"
              className={css.fileInput}
              onChange={handleAvatarChange}
            />
          </label>
        </div>
        <p>{userInfo?.name}</p>
      </div>

      <form onSubmit={handleSubmit} className={css.updateForm}>
        <label className={css.label} htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name..."
          className={css.input}
          value={inputValue?.name || ''}
          onChange={e => setInputValue({ ...inputValue, name: e.target.value })}
        />
        <label className={css.label} htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email..."
          className={css.input}
          value={inputValue?.email || ''}
          onChange={e => setInputValue({ ...inputValue, email: e.target.value })}
        />
        <label className={css.label} htmlFor="gender">
          Gender
        </label>
        <select
          name="gender"
          className={css.input}
          value={inputValue?.gender || ''}
          onChange={e => setInputValue({ ...inputValue, gender: e.target.value })}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit" className={css.updateButton} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};
