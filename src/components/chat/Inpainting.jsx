import styles from './chat.module.scss';

function InpaintingChat({ imgUrl, promptContent }) {
  return (
    <div className={styles.inpaintingChatWrapper}>
      <img src={imgUrl} alt="Inpainting" className={styles.inpaintingChatImg} />
      <div className={styles.inpaintingChatTextWrapper}>
        <span className={styles.title}>인페인팅 진행</span>
        <span className={styles.promptContent}>{promptContent}</span>
      </div>
    </div>
  );
}

export default InpaintingChat;
