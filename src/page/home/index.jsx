import { useEffect, useState, useRef } from 'react';
import Layout from '../../components/Layout';
import styles from './home.module.scss';

import downArrow from '@/assets/downarrow.svg';
import red from '@/assets/red.svg';
import blue from '@/assets/blue.svg';
import green from '@/assets/green.svg';
import bg from '@/assets/bg.svg';
import paper from '@/assets/paper.png';
import hoverBg from '@/assets/hoverBg.svg';

const phrases = {
  化록: 'AI 창작자가 되고 싶은 당신을 위하여',
  華록: '당신의 모든 빛나는 아이디어를 위하여',
  畫록: '당신이 만든 모든 이미지를 위하여',
  話록: '당신이 작성한 모든 프롬프트를 위하여',
  韡록: '당신의 활짝 필 작품들을 위하여',
};
const keys = Object.keys(phrases);

function Home() {
  const [index, setIndex] = useState(0);
  const contentRef = useRef(null);
  const subRef = useRef(null);
  const [currentSection, setCurrentSection] = useState('content');
  const [redHover, setRedHover] = useState(false);
  const [blueHover, setBlueHover] = useState(false);
  const [greenHover, setGreenHover] = useState(false);

  const handleMouseEnter = (color) => {
    if (color === 'red') {
      setRedHover(true);
    } else if (color === 'blue') {
      setBlueHover(true);
    } else if (color === 'green') {
      setGreenHover(true);
    }
  };
  const handleMouseLeave = (color) => {
    if (color === 'red') {
      setRedHover(false);
    } else if (color === 'blue') {
      setBlueHover(false);
    } else if (color === 'green') {
      setGreenHover(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % keys.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (target) => {
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleWheel = (e) => {
      const direction = e.deltaY;

      if (direction > 50 && currentSection === 'content') {
        scrollTo(subRef.current);
        setCurrentSection('sub');
      } else if (
        direction < -50 &&
        currentSection === 'sub' &&
        window.scrollY <= subRef.current.offsetTop
      ) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentSection('content');
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection]);

  return (
    <>
      <div className={styles.content} ref={contentRef}>
        <div className={styles.phraseWrapper}>
          <span className={styles.mainPhrase}>{keys[index]}</span>
          <span className={styles.subPhrase}>{phrases[keys[index]]}</span>
        </div>
        <div className={styles.arrowWrapper}>
          <div className={styles.arrowBackground}>
            <img
              src={downArrow}
              alt="Down Arrow"
              className={styles.arrow}
              onClick={() => {
                scrollTo(subRef.current);
                setCurrentSection('sub');
              }}
            />
            <span className={styles.guide}> 클릭 또는 스크롤하여 더보기</span>
          </div>
        </div>
      </div>
      <div className={styles.subContent} ref={subRef}>
        <div className={styles.imgWrapper}>
          <div
            className={styles.imgItem}
            onMouseEnter={() => handleMouseEnter('red')}
            onMouseLeave={() => handleMouseLeave('red')}
          >
            <img
              src={red}
              alt="Red"
              className={`${styles.img} ${styles.icon}`}
            />
            <img src={bg} alt="Background" className={styles.img} />
            {redHover && (
              <div>
                {' '}
                <img
                  src={hoverBg}
                  alt="Hover Background"
                  className={`${styles.img} ${styles.hoverBg}`}
                />
                <div className={styles.hoverTextWrapper}>
                  <span className={styles.title}>AI와의 채팅</span>
                  <span className={styles.description}>
                    AI와의 채팅을 통해 원하는 이미지를 생성하세요. 당신의
                    프롬프트로 이미지를 만들 수 있습니다.
                  </span>
                </div>
              </div>
            )}
          </div>
          <div
            className={styles.imgItem}
            onMouseEnter={() => handleMouseEnter('blue')}
            onMouseLeave={() => handleMouseLeave('blue')}
          >
            <img
              src={blue}
              alt="Blue"
              className={`${styles.img} ${styles.icon}`}
            />
            <img src={bg} alt="Background" className={styles.img} />
            {blueHover && (
              <div>
                {' '}
                <img
                  src={hoverBg}
                  alt="Hover Background"
                  className={`${styles.img} ${styles.hoverBg}`}
                />
                <div className={styles.hoverTextWrapper}>
                  <span className={styles.title}>히스토리 저장</span>
                  <span className={styles.description}>
                    채팅을 통해 만들어진 이미지들의 변화 과정을 히스토리를 통해
                    파악하세요.
                  </span>
                </div>
              </div>
            )}
          </div>
          <div
            className={styles.imgItem}
            onMouseEnter={() => handleMouseEnter('green')}
            onMouseLeave={() => handleMouseLeave('green')}
          >
            <img
              src={green}
              alt="Green"
              className={`${styles.img} ${styles.icon}`}
            />
            <img src={bg} alt="Background" className={styles.img} />
            {greenHover && (
              <div>
                {' '}
                <img
                  src={hoverBg}
                  alt="Hover Background"
                  className={`${styles.img} ${styles.hoverBg}`}
                />
                <div className={styles.hoverTextWrapper}>
                  <span className={styles.title}>AI 보고서</span>
                  <span className={styles.description}>
                    이미지의 생성 과정에 있어 당신의 창의적 기여 정도를 AI
                    보고서를 통해 확인하세요.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.paperWrapper}>
          <div className={styles.paperItem}>
            <img src={paper} alt="Paper" className={styles.paper} />
            <div className={styles.paperBg}>
              <div className={styles.lightgray} />
              <div className={styles.darkgray} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
