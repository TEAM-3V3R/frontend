import { useRef, useState } from 'react';
import styles from './compareslider.module.scss';

function CompareSlider({ beforeImg, afterImg }) {
  const containerRef = useRef(null);
  const [dividerX, setDividerX] = useState(50);

  const handleDrag = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setDividerX(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseDown = () => {
    window.addEventListener('mousemove', handleDrag);
    window.addEventListener(
      'mouseup',
      () => {
        window.removeEventListener('mousemove', handleDrag);
      },
      { once: true }
    );
  };

  return (
    <div
      className={styles.paperBg}
      ref={containerRef}
      onMouseDown={handleMouseDown}
    >
      <img
        src={afterImg}
        className={`${styles.image} ${styles.after}`}
        alt="After"
      />
      <img
        src={beforeImg}
        className={`${styles.image} ${styles.before}`}
        alt="Before"
        style={{ clipPath: `inset(0 ${100 - dividerX}% 0 0)` }}
      />
      <div className={styles.slider} style={{ left: `${dividerX}%` }} />
    </div>
  );
}

export default CompareSlider;
