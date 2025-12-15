import { useNavigate } from 'react-router-dom';
import styles from './chat.module.scss';
import inpainting from '@/assets/inpainting.svg';
import { useState } from 'react';

function AI({ imgUrl, chatId, isFinished }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleInpainting = () => {
    if (isFinished) {
      alert('채팅이 종료된 상태에서는 인페인팅을 진행할 수 없습니다.');
      return;
    }
    navigate('/inpainting', { state: { imgUrl, chatId } });
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.imgWrapper}>
        <img
          styles={styles.aiImg}
          src={imgUrl}
          alt="result"
          className={styles.aiImg}
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
        <div className={styles.inpainting} onClick={handleInpainting}>
          인페인팅 진행 <img src={inpainting} alt="inpainting" />
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

export default AI;
