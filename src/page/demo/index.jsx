import styles from './demo.module.scss';

function Demo() {
  return (
    <div className={styles.content}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>실제 LED 화면 시연 영상</h1>
      </div>
      <div className={styles.videoWrapper}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/aaMGEl3ipdU?si=HpEGxLorKl6fX79l"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default Demo;
