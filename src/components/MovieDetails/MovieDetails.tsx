import { useSelector } from 'react-redux';
import { selectSelectedMovie } from '../../redux/movie/selectors';
import css from './MovieDetails.module.css';
import { Suspense, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { isActive } from '../../types/types';
import clsx from 'clsx';
import Title from '../Title/Title';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';

const MovieDetails = () => {
  const selectedMovie = useSelector(selectSelectedMovie);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');
  const makeLinkClass = ({ isActive }: isActive) => {
    return clsx(css.link, isActive && css.isActive);
  };

  const [customMessage, setCustomMessage] = useState(''); // Trạng thái lưu nội dung người dùng nhập

  // Hàm gửi URL hiện tại và nội dung tới Discord webhook
  const sendRequestToDiscord = async () => {
    const webhookUrl =
      'https://discord.com/api/webhooks/1364669804224450681/xpXF23inADAFHCpB9S8YDTKzZkTyorttYN87GqL56NcC-ORQcyU0YBB3j6Td9y1eGJh6';
    const currentUrl = window.location.href; // Lấy URL hiện tại

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `Request from website: ${currentUrl}\nMessage: ${customMessage}`, // Nội dung gửi tới Discord
        }),
      });
      alert('Yêu cầu đã được gửi tới Discord!');
      setCustomMessage(''); // Xóa nội dung sau khi gửi
    } catch (error) {
      console.error('Error sending request to Discord:', error);
      alert('Failed to send request. Please try again.');
    }
  };

  return (
    <>
      {selectedMovie && (
        <div className={css.section}>
          <Link to={backLinkRef.current} className={css.btn}>
            Back to Home
          </Link>
          <div className={css.container}>
            <div className={css.poster}>
              <img
                src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
                alt={selectedMovie.original_title}
              />
              <FavoriteButton movieId={selectedMovie.id} mediaType={'movie'} />
            </div>
            <div className={css.description}>
              <Title text={selectedMovie.original_title} size="45px" />
              <p>{`Vote Average: ${selectedMovie.vote_average.toFixed(1)}/10 (${
                selectedMovie.vote_count
              })`}</p>
              {Number(selectedMovie.vote_average.toFixed(1)) > 1 ? (
                <span
                  className={css.rating}
                  style={
                    {
                      background: `linear-gradient(90deg, gold ${Math.round(
                        selectedMovie.vote_average * 10
                      )}%, gray ${Math.round(selectedMovie.vote_average * 10)}%) text`,
                      color: 'transparent',
                    } as React.CSSProperties
                  }
                >
                  {'★★★★★★★★★★'}
                </span>
              ) : (
                <span
                  className={css.rating}
                  style={
                    {
                      color: 'gray',
                    } as React.CSSProperties
                  }
                >
                  {'★★★★★★★★★★'}
                </span>
              )}
              <Title text={`Overview`} />
              <p>{selectedMovie.overview}</p>
              <Title text={`Genres`} />
              <ul className={css.list}>
                {selectedMovie.genres.map(item => (
                  <li className={css.list__item} key={item.id}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Title text={`Additional information`} />
          <ul className={css.add_info_list}>
            <li className={css.add_info_item}>
              <NavLink to="cast" className={makeLinkClass}>
                Cast
              </NavLink>
            </li>
            <li className={css.add_info_item}>
              <NavLink to="reviews" className={makeLinkClass}>
                Reviews
              </NavLink>
            </li>
            {/* Nút Download */}
            <li className={css.add_info_item}>
              <NavLink to="download" className={makeLinkClass}>
                Download
              </NavLink>
            </li>
          </ul>
          {/* Input và nút Request */}
          <div style={{ marginTop: '20px' }}>
            <input
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Nhập nội dung của bạn..."
              style={{
                padding: '10px',
                width: '100%',
                maxWidth: '400px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
            <button
              onClick={sendRequestToDiscord}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Request
            </button>
          </div>
          <Suspense fallback={''}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default MovieDetails;