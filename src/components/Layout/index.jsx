import styles from './Layout.module.scss';
import Logo from '@/assets/logo.png';
import MainBG from '@/assets/mainBG.png';
import BaseBG from '@/assets/baseBG.png';
import { Outlet, useNavigate } from 'react-router-dom';
import MenuBar from '../menubar';
import Profile from '../profile';
import Side1 from '@/assets/side1.png';
import Side2 from '@/assets/side2.svg';
import Side3 from '@/assets/side3.png';

function Layout() {
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
          <img src={Side1} alt="Side1" className={styles.navitem} />
          <img src={Side2} alt="Side2" className={styles.navitem} />
          <img src={Side3} alt="Side3" className={styles.navitem} />
        </div>
      </div>
      <div className={styles.content}>
        <MenuBar />
        <Outlet />
      </div>
      <div className={styles.profile}>
        <Profile />
      </div>
    </div>
  );
}

export default Layout;
