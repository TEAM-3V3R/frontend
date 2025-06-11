import styles from './Profile.module.scss';
import ProfileImg from '@/assets/profile.svg';
function ProfileMenu() {
  return (
    <div className={styles.profilemenu}>
      <div className={styles.profileitemWrapper}>
        <img src={ProfileImg} alt="Profile" className={styles.profileImg} />
        <span className={styles.profileName}>최준영 님</span>
        <div className={styles.userInfo}>
          <span className={styles.title}>활동 현황</span>
          <div className={styles.bar} />
          <div className={styles.since}>
            <span>Since</span>
            <span>2023.01.01</span>
          </div>
        </div>
      </div>
      <button className={styles.logoutBtn}>LOGOUT</button>
    </div>
  );
}

export default ProfileMenu;
