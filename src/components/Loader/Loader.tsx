import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <RotatingLines
        visible={true}
        // height="55"
        width="55"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        strokeColor="#6488ea"
      />
      <div>This may take up to 50 seconds due to server idle state.</div>
    </div>
  );
}
