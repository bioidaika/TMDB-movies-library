import { useSelector } from 'react-redux';
import { selectSelectedTV } from '../../redux/movie/selectors';
import css from './TvDetails.module.css';
import { Suspense, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { isActive } from '../../types/types';
import clsx from 'clsx';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import Title from '../Title/Title';

const TvDetails = () => {
  const selectedTV = useSelector(selectSelectedTV);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/tv');
  const makeLinkClass = ({ isActive }: isActive) => {
    return clsx(css.link, isActive && css.isActive);
  };

  const [customMessage, setCustomMessage] = useState(''); // Trạng thái lưu nội dung người dùng nhập

  // Hàm gửi URL hiện tại và nội dung tới Discord webhook
  const sendRequestToDiscord = async () => {
    const webhookUrl =
      'https://discord.com/api/webhooks/1364669804224450681/xpXF23inADAFHCpB9S8YDTKzZkTyorttYN87GqL56NcC-ORQcyU0YBB3j6Td9y1eGJh6';
    const currentUrl = window.location.href; // Lấy URL hiện tại

    if (!selectedTV) {
      alert('Không có thông tin TV show để gửi!');
      return;
    }

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [
            {
              title: selectedTV.original_name, // Tiêu đề TV show
              description: selectedTV.overview || 'Không có mô tả.', // Mô tả TV show
              color: 3447003, // Màu xanh dương (hex: #3498DB)
              fields: [
                {
                  name: 'Vote Average',
                  value: `${selectedTV.vote_average.toFixed(1)}/10 (${selectedTV.vote_count} votes)`,
                  inline: true,
                },
                {
                  name: 'Genres',
                  value: selectedTV.genres.map((genre) => genre.name).join(', ') || 'Không có thể loại.',
                  inline: true,
                },
                {
                  name: 'Message',
                  value: customMessage || 'Không có nội dung.',
                },
                {
                  name: 'URL',
                  value: `[Xem chi tiết](${currentUrl})`,
                },
              ],
              image: {
                url: `https://image.tmdb.org/t/p/original${selectedTV.poster_path}`, // Ảnh lớn của TV show
              },
              footer: {
                text: 'TMDB TV Library',
              },
              timestamp: new Date().toISOString(),
            },
          ],
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
      {selectedTV && (
        <div className={css.section}>
          <Link to={backLinkRef.current} className={css.btn}>
            Back to Home
          </Link>
          <div className={css.container}>
            <div className={css.poster}>
              <img
                src={`https://image.tmdb.org/t/p/w300/${selectedTV.poster_path}`}
                alt={selectedTV.original_name}
              />
              <FavoriteButton movieId={selectedTV.id} mediaType={'tv'} />
            </div>
            <div className={css.description}>
              <Title text={selectedTV.original_name} size="45px" />
              <p>{`Vote Average: ${selectedTV.vote_average.toFixed(1)}/10 (${
                selectedTV.vote_count
              })`}</p>
              {Number(selectedTV.vote_average.toFixed(1)) > 1 ? (
                <span
                  className={css.rating}
                  style={
                    {
                      background: `linear-gradient(90deg, gold ${Math.round(
                        selectedTV.vote_average * 10
                      )}%, gray ${Math.round(selectedTV.vote_average * 10)}%) text`,
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
              <p>{selectedTV.overview}</p>
              <Title text={`Genres`} />
              <ul className={css.list}>
                {selectedTV.genres.map(item => (
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
          <Suspense fallback={'Loading...'}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default TvDetails;
