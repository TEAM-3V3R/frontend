import ReactDOM from 'react-dom';
import styles from './InpaintingModal.module.scss';
import { useNavigate } from 'react-router-dom';

function InpaintingModal({ onClose }) {
  const navigate = useNavigate();
  const navigateToChat = () => {
    navigate(-1);
    onClose();
  };
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <span className={styles.title}>인페인팅 종료하기</span>
      <div className={styles.bar} />
      <p className={styles.description}>
        현재 진행 중인 인페인팅을 종료하고
        <br />
        원래 채팅 페이지로 돌아가시겠습니까?
      </p>

      <div className={styles.buttonWrapper}>
        <button className={styles.blueBtn} onClick={navigateToChat}>
          예 <br />
          (종료하기)
        </button>
        <button className={styles.blackBtn} onClick={onClose}>
          아니오
          <br />
          (뒤로가기)
        </button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
export default InpaintingModal;
