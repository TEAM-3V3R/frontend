import styles from './chat.module.scss';

function MyInpainting({ chat }) {
  return <div className={styles.myInpainting}>{chat}</div>;
}

export default MyInpainting;
