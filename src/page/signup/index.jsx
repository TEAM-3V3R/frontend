import { useForm } from 'react-hook-form';
import styles from './signup.module.scss';
import { postSignin } from '@/api/authUser';
import { useNavigate } from 'react-router-dom';
import { getCheckId } from '@/api/authAPI';
import { useEffect, useState } from 'react';
function SignUp() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const validateID = async (id) => {
    try {
      const response = await getCheckId(id);
      if (response.data) {
        alert('사용 가능한 ID입니다.');
        setIsChecked(true);
        return true;
      }
    } catch (error) {
      console.error('Error checking ID:', error);
      alert('ID 중복 확인에 실패했습니다. 다른 아이디로 시도해주세요.');
      return false;
    }
  };
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'ID') {
        setIsChecked(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    try {
      const signupData = {
        id: data.ID,
        nickName: data.name,
      };
      const res = await postSignin(signupData);
      if (res.data) {
        alert('회원가입에 성공했습니다.');
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('userNo', res.data.data.userId);
        navigate('/');
      }
    } catch (error) {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      console.error('Error during signup:', error);
    }
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
                  if (!isChecked) {
                    return 'ID 중복 확인을 해주세요.';
                  }
                  return true;
                },
              })}
            />
            <button
              type="button"
              className={styles.doubleCheckBtn}
              onClick={() => {
                const id = watch('ID');
                if (!id) {
                  alert('ID를 입력해주세요.');
                  return;
                }
                if (isChecked) {
                  alert('이미 중복 확인을 했습니다.');
                  return;
                }
                validateID(id);
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
