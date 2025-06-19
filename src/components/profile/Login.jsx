import { useState } from 'react';
import styles from './Profile.module.scss';
import { postLogin } from '@/api/authAPI';

function Login() {
  const [id, setId] = useState('');
  const handleLogin = async () => {
    if (!id) {
      alert('아이디를 입력해주세요.');
      return;
    }
    try {
      const res = await postLogin({ id });
      if (res.data) {
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('userNo', res.data.data.userId);
        window.location.reload();
      }
    } catch (e) {
      alert('로그인에 실패했습니다. 아이디를 확인해주세요.');
      console.error('Login error:', e);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.idInput}>
        <label className={styles.label}>ID</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className={styles.loginButtonWrapper}>
        <button className={styles.btn} onClick={handleLogin}>
          LOGIN
        </button>
        <a href="/register" className={styles.signup}>
          회원가입
        </a>
      </div>
    </div>
  );
}

export default Login;
