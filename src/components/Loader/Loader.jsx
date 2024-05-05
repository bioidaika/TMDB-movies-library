import { RotatingLines } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div>
      <RotatingLines
        visible={true}
        height="55"
        width="55"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        strokeColor="#6488ea"
      />
    </div>
  );
}
