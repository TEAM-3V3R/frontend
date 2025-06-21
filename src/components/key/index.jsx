import styles from './key.module.scss';

function Key({ children }) {
  return <div className={styles.keyWrapper}>{children}</div>;
}

export default Key;
