import { useForm } from 'react-hook-form';
import styles from './signup.module.scss';
function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className={styles.content}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>회원가입</h1>
      </div>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputGroup}>
            <label htmlFor="ID" className={styles.label}>
              ID
            </label>
            <input
              type="text"
              className={styles.input}
              {...register('ID', {
                required: 'ID는 필수 입력입니다.',
                validate: (value) => {
                  const isValidLength = value.length >= 4 && value.length <= 20;
                  const isValidChars = /^[A-Za-z0-9]+$/.test(value);
                  if (!isValidLength) {
                    return 'ID는 최소 4 자, 최대 20 자 입니다.';
                  }
                  if (!isValidChars) {
                    return 'ID에 특수기호 사용은 불가능합니다.';
                  }
                  // 중복체크까지
                  return true;
                },
              })}
            />
            <button
              type="button"
              className={styles.doubleCheckBtn}
              onClick={() => {
                // 중복 체크 로직 추가
                console.log('중복 체크');
              }}
            >
              중복 확인
            </button>
          </div>
          {errors.ID && (
            <span className={styles.error}>{errors.ID.message}</span>
          )}
          <div className={styles.inputGroup} style={{ gap: '14px' }}>
            <label htmlFor="name" className={styles.label}>
              이름
            </label>
            <input
              type="text"
              id="name"
              className={styles.input}
              {...register('name', {
                required: '이름은 필수 입력입니다.',
              })}
            />
          </div>
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
          <button type="submit" className={styles.submitBtn}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
