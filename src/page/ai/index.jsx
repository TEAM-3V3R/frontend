import Keyword from '@/components/keyword';
import styles from './ai.module.scss';
import { useNavigate } from 'react-router-dom';
import Chart from '@/components/chart';
import redscroll from '@/assets/redscroll.png';
import bluescroll from '@/assets/bluescroll.png';
import warn from '@/assets/warn.svg';

import aiinfo from '@/assets/aiinfo.png';
import { useState } from 'react';

const detailed = {
  'sentence flex': '문장 단위 유연성',
  'keyword flex': '키워드 단위 유연성',
  'idea flex': '아이디어 단위 유연성 (클러스터링 기반)',
  'modifier amount': '수식어(부사/형용사)의 양',
  'modifier density': '수식어의 밀도',
  'clustering density': '군집 내 밀도 (클러스터링 기반)',
};

function AI() {
  const navigate = useNavigate();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const detailScore = {
    'sentence flex': Math.floor(Math.random() * 51) + 50,
    'keyword flex': Math.floor(Math.random() * 51) + 50,
    'idea flex': Math.floor(Math.random() * 51) + 50,
    'modifier amount': Math.floor(Math.random() * 51) + 50,
    'modifier density': Math.floor(Math.random() * 51) + 50,
    'clustering density': Math.floor(Math.random() * 51) + 50,
  };
  const flexibilityScore = Math.floor(
    detailScore['sentence flex'] +
      detailScore['keyword flex'] +
      detailScore['idea flex']
  );
  const persistenceScore = Math.floor(
    detailScore['modifier amount'] +
      detailScore['modifier density'] +
      detailScore['clustering density']
  );

  const score =
    Math.floor(
      Object.values(detailScore).reduce((acc, val) => acc + val, 0) /
        Object.values(detailScore).length
    ) || 0;
  return (
    <div className={styles.content}>
      <div className={styles.main}>
        <div className={styles.header}>
          <Keyword
            keyword="채팅 히스토리로 돌아가기"
            isSelected={true}
            bgColor="green"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className={styles.report}>
          <div className={styles.score}>
            <span className={styles.title}>AI 분석 보고서</span>
            <h2 className={styles.subTitle}>당신의 프롬프트 창의성 점수는</h2>
            <span className={styles.scoreValue}>{score}</span>
          </div>
          <div className={styles.chart}>
            <Chart score={score} />
          </div>
        </div>
        <div className={styles.scroll}>
          {isInfoOpen && (
            <div className={styles.aiInfo}>
              <img
                src={aiinfo}
                alt="AI Info"
                className={styles.aiInfoImg}
                onClick={() => setIsInfoOpen(false)}
              />
            </div>
          )}
          <div
            className={styles.scrollContent}
            style={{ display: isInfoOpen ? 'none' : 'flex' }}
          >
            <img
              src={redscroll}
              alt="red scroll"
              className={styles.scrollImg}
            />
            <div className={styles.scrollText}>
              <div className={styles.scrollHeader}>유연성 (flexibility)</div>
              <div className={styles.scrollMain}>
                {Object.entries(detailed)
                  .slice(0, 3)
                  .map(([key, value], i) => (
                    <div className={styles.scoreText} key={key}>
                      <p>
                        {i + 1}. {value}
                      </p>
                      <p>{detailScore[key]}점</p>
                    </div>
                  ))}
                <div className={styles.totalScore}>
                  유연성 점수: {flexibilityScore}점
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.scrollContent}
            style={{ display: isInfoOpen ? 'none' : 'flex' }}
          >
            <img
              src={bluescroll}
              alt="bluescroll"
              className={styles.scrollImg}
            />
            <div className={styles.scrollText}>
              <div className={styles.scrollHeader}>지속성 (Persistence)</div>
              <div className={styles.scrollMain}>
                {Object.entries(detailed)
                  .slice(3, 6)
                  .map(([key, value], i) => (
                    <div className={styles.scoreText} key={key}>
                      <p>
                        {i + 1}. {value}
                      </p>
                      <p>{detailScore[key]}점</p>
                    </div>
                  ))}
                <div className={styles.totalScore}>
                  지속성 점수: {persistenceScore}점
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.infoBtnWrapper}
          onClick={() => setIsInfoOpen(!isInfoOpen)}
        >
          <button className={styles.infoBtn}>
            AI 보고서의 점수는 최종 창의성 점수입니다.
          </button>
          <div className={styles.info}>
            <img src={warn} alt="info" className={styles.icon} />
            <span className={styles.infoText}>i</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AI;
