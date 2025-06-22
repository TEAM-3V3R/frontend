import styles from './ImageSave.module.scss';
import ReactDOM from 'react-dom';
function ImageSendModal({ onClose, description, title }) {
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <span className={styles.title}>{title}</span>
      <div className={styles.bar} />
      <p className={styles.description}>{description}</p>
      <button className={styles.btn} onClick={onClose}>
        확인
      </button>
    </div>,
    document.getElementById('modal-root')
  );
}
export default ImageSendModal;
