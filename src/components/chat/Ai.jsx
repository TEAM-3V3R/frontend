import { useNavigate } from 'react-router-dom';
import styles from './chat.module.scss';
import inpainting from '@/assets/inpainting.svg';

function AI({ imgUrl, chatId, isFinished }) {
  const navigate = useNavigate();
  const handleInpainting = () => {
    if (isFinished) {
      alert('채팅이 종료된 상태에서는 인페인팅을 진행할 수 없습니다.');
      return;
    }
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
