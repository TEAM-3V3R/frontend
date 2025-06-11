import styles from './Layout.module.scss';
import Logo from '@/assets/logo.png';
import MainBG from '@/assets/mainBG.png';
import BaseBG from '@/assets/baseBG.png';
import { useNavigate } from 'react-router-dom';
import MenuBar from '../menubar';
import Profile from '../profile';

function Layout({ children }) {
  const bg = window.location.pathname === '/' ? MainBG : BaseBG;
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <div className={styles.layout}>
      <img
        src={bg}
        alt="Background"
        className={styles.background}
        onClick={handleLogoClick}
      />
      <div className={styles.navbar}>
        <img src={Logo} alt="Logo" className={styles.logo} />
        <div className={styles.navsquare}>
          <div className={styles.navitem} />
          <div className={styles.navitem} />
          <div className={styles.navitem} />
        </div>
      </div>
      <div className={styles.content}>
        <MenuBar />
        {children}
      </div>
      <div className={styles.profile}>
        <Profile />
      </div>
    </div>
  );
}

export default Layout;
