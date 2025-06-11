import styles from './Profile.module.scss';

function Login() {
  return (
    <div className={styles.login}>
      <div className={styles.idInput}>
        <label className={styles.label}>ID</label>
        <input type="text" className={styles.input} />
      </div>
      <div className={styles.loginButtonWrapper}>
        <button className={styles.btn}>LOGIN</button>
        <a href="/register" className={styles.signup}>
          회원가입
        </a>
      </div>
    </div>
  );
}

export default Login;
