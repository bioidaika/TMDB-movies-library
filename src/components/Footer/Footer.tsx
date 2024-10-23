import css from './Footer.module.css';
import { memo } from 'react';
import { FaLinkedin } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';

const Footer = memo(() => {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.about}>
          <p className={css.text}>Created by Dmytrii Tsybuliak</p>
          <p className={css.text}>Full Stack Developer | Passionate about Web Development</p>
        </div>

        <div className={css.socialLinks}>
          <a
            href="https://github.com/DmytriiTsybuliak"
            target="_blank"
            rel="noopener noreferrer"
            className={css.link}
          >
            {/* GitHub */}
            <FaGithub className={css.social_media} />
          </a>
          <a
            href="https://www.linkedin.com/in/dmytrii-tsybuliak-9a6320155/"
            target="_blank"
            rel="noopener noreferrer"
            className={css.link}
          >
            {/* LinkedIn */}
            <FaLinkedin className={css.social_media} />
          </a>
        </div>
      </div>

      <div className={css.copyright}>
        <p>© {new Date().getFullYear()} Dmytrii Tsybuliak. All Rights Reserved.</p>
      </div>
    </footer>
  );
});

export default Footer;
