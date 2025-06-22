import Login from './Login';
import ProfileMenu from './profilemenu';
import styles from './Profile.module.scss';
function Profile() {
  const isLogin = localStorage.getItem('isLogin') === 'true' || false;
  // const isLogin = true;
  return (
    <div className={styles.profile}>
      {isLogin ? <ProfileMenu /> : <Login />}
    </div>
  );
}

export default Profile;
