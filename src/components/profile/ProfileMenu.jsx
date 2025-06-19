import styles from './Profile.module.scss';
import ProfileImg from '@/assets/profile.svg';
import { getFindUser } from '@/api/authUser';
import { useEffect, useState } from 'react';
import formatDate from '@/util/date';
import { postLogout } from '@/api/authAPI';
function ProfileMenu() {
  const [userData, setUserData] = useState(null);
  const userNo = localStorage.getItem('userNo');

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await getFindUser(userNo);
        if (res.data) {
          setUserData(res.data.data);
        }
      } catch (error) {
        alert('사용자 정보를 불러오는 데 실패했습니다.');
        console.error('Error fetching user info:', error);
      }
    };
    if (userNo) {
      getUserInfo();
    }
  }, [userNo]);

  const handleLogout = async () => {
    try {
      await postLogout({ idName: userNo });
      localStorage.removeItem('isLogin');
      localStorage.removeItem('userNo');
      window.location.reload();
      alert('로그아웃되었습니다.');
    } catch (error) {
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
      console.error('Logout error:', error);
      return;
    }
  };

  return (
    <div className={styles.profilemenu}>
      <div className={styles.profileitemWrapper}>
        <img src={ProfileImg} alt="Profile" className={styles.profileImg} />
        <span className={styles.profileName}>{userData?.nickName} 님</span>
        <div className={styles.userInfo}>
          <span className={styles.title}>활동 현황</span>
          <div className={styles.bar} />
          <div className={styles.since}>
            <span>Since</span>
            <span>{formatDate(userData?.createdAt)}</span>
          </div>
        </div>
      </div>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
}

export default ProfileMenu;
