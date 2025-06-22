import styles from './chat.module.scss';

function My({ chat }) {
  return <div className={styles.my}>{chat}</div>;
}

export default My;
