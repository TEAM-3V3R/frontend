import styles from './chat.module.scss';

function AIInpainting({ imgUrl }) {
  return (
    <div className={styles.inpaintingWrapper}>
      <img
        styles={styles.inpaintingImg}
        src={imgUrl}
        alt="result"
        className={styles.aiImg}
      />
    </div>
  );
}

export default AIInpainting;
