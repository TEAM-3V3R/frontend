import { useNavigate } from 'react-router-dom';
import styles from './chat.module.scss';
import inpainting from '@/assets/inpainting.svg';

function AI({ imgUrl, chatId }) {
  const navigate = useNavigate();
  const handleInpainting = () => {
    navigate('/inpainting', { state: { imgUrl, chatId } });
  };
  //console.log(chatId);
  return (
    <div className={styles.imgWrapper}>
      <img
        styles={styles.aiImg}
        src={imgUrl}
        alt="result"
        className={styles.aiImg}
      />
      <div className={styles.inpainting} onClick={handleInpainting}>
        인페인팅 진행 <img src={inpainting} alt="inpainting" />
      </div>
    </div>
  );
}

export default AI;
