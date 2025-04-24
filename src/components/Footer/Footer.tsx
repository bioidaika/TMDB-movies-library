import css from './Footer.module.css';
import { memo } from 'react';
import { FaGithub, FaDiscord } from 'react-icons/fa'; // Import icon Discord
import { SiZalo } from 'react-icons/si'; // Import icon Zalo

const Footer = memo(() => {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        {/* Thông tin về ứng dụng */}
        <div className={css.about}>
          <p className={css.text}>Liên hệ hợp tác, mua điểm thưởng Fshare</p>
        </div>

        {/* Liên kết mạng xã hội */}
        <div className={css.socialLinks}>
          <a
            href="https://github.com/bioidaika"
            target="_blank"
            rel="noopener noreferrer"
            className={css.link}
          >
            {/* GitHub */}
            <FaGithub className={css.social_media} />
          </a>
          <a
            href="https://zalo.me/0942745244"
            target="_blank"
            rel="noopener noreferrer"
            className={css.link}
          >
            {/* Zalo */}
            <SiZalo className={css.social_media} />
          </a>
          <a
            href="https://discord.gg/9Pa8A9ssKA"
            target="_blank"
            rel="noopener noreferrer"
            className={css.link}
          >
            {/* Discord */}
            <FaDiscord className={css.social_media} />
          </a>
        </div>
      </div>

      {/* Bản quyền */}
      <div className={css.copyright}>
        <p>© {new Date().getFullYear()} Bioidaika. All Rights Reserved.</p>
      </div>
    </footer>
  );
});

export default Footer;
