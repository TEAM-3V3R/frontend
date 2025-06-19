import styles from './chat.module.scss';
import inpainting from '@/assets/inpainting.svg';

function AI({ imgUrl }) {
  //console.log(chatId);
  return (
    <div className={styles.imgWrapper}>
      <img
        styles={styles.aiImg}
        src={imgUrl}
        alt="result"
        className={styles.aiImg}
      />
      <div className={styles.inpainting}>
        인페인팅 진행 <img src={inpainting} alt="inpainting" />
      </div>
    </div>
  );
}

export default AI;
