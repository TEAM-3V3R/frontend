import styles from './chat.module.scss';
import { useState } from 'react';

function InpaintingChat({ imgUrl, promptContent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.inpaintingChatWrapper}>
        <img
          src={imgUrl}
          alt="Inpainting"
          className={styles.inpaintingChatImg}
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
        <div className={styles.inpaintingChatTextWrapper}>
          <span className={styles.title}>인페인팅 진행</span>
          <span className={styles.promptContent}>{promptContent}</span>
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.imageModal} onClick={handleModalClose}>
          <div className={styles.imageModalContent}>
            <img src={imgUrl} alt="enlarged" className={styles.enlargedImage} />
          </div>
        </div>
      )}
    </>
  );
}

export default InpaintingChat;
