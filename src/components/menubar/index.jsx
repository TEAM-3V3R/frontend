import { useNavigate } from 'react-router-dom';
import styles from './MenuBar.module.scss';

function MenuBar() {
  const navigate = useNavigate();
  const url = window.location.pathname;
  const mainitemStyle =
    url === '/' ? `${styles.menuitem} ${styles.main}` : styles.menuitem;
  const chatitemStyle =
    url === '/chat' ? `${styles.menuitem} ${styles.chat}` : styles.menuitem;
  const historyitemStyle =
    url === '/history'
      ? `${styles.menuitem} ${styles.history}`
      : styles.menuitem;
  const demoitemStyle =
    url === '/demo' ? `${styles.menuitem} ${styles.demo}` : styles.menuitem;

  return (
    <div className={styles.menubar}>
      <div className={mainitemStyle} onClick={() => navigate('/')}>
        Main
      </div>
      <div className={chatitemStyle} onClick={() => navigate('/chat')}>
        Chat
      </div>
      <div className={historyitemStyle} onClick={() => navigate('/history')}>
        History
      </div>
      <div className={demoitemStyle} onClick={() => navigate('/demo')}>
        Demo
      </div>
    </div>
  );
}

export default MenuBar;
