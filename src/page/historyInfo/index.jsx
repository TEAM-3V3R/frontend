import Keyword from '@/components/keyword';
import styles from './historyinfo.module.scss';
import back from '@/assets/back.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoCard from '@/components/infocard';

const keywords = {
  산수도: { bgColor: 'green' },
  어해도: { bgColor: 'blue' },
  탱화: { bgColor: 'red' },
};

function HistoryInfo() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('산수도');

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.front}>
              <h1 className={styles.title}>채팅 제목</h1>
              <Keyword
                keyword={keyword}
                isSelected={true}
                bgColor={keywords[keyword].bgColor}
              />
            </div>
            <div className={styles.front}>
              <img
                className={styles.backIcon}
                src={back}
                alt="뒤로가기"
                onClick={handleClickBack}
              />
              <Keyword
                keyword="AI 보고서 보러 가기"
                isSelected={true}
                bgColor="green"
              />
            </div>
          </div>
          <div className={styles.keywordsList}>
            <div className={styles.keywordsListGrid}>
              <InfoCard
                imgUrl="https://pbs.twimg.com/media/Gt-3PRAXEAA_vl-?format=jpg&name=medium"
                prompt="산수도dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
                keyArr={['산수도', '어해도', '탱화']}
                index={1}
                date="2025-06-21T06:24:20.643145"
              />
              <InfoCard
                imgUrl="https://pbs.twimg.com/media/Gt-3PRAXEAA_vl-?format=jpg&name=medium"
                prompt="산수도dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
                keyArr={['산수도', '어해도', '탱화']}
                index={1}
                date="2025-06-21T06:24:20.643145"
              />
              <InfoCard
                imgUrl="https://pbs.twimg.com/media/Gt-3PRAXEAA_vl-?format=jpg&name=medium"
                prompt="산수도dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
                keyArr={['산수도', '어해도', '탱화']}
                index={1}
                date="2025-06-21T06:24:20.643145"
              />
              <InfoCard
                imgUrl="https://pbs.twimg.com/media/Gt-3PRAXEAA_vl-?format=jpg&name=medium"
                prompt="산수도dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
                keyArr={['산수도', '어해도', '탱화']}
                index={1}
                date="2025-06-21T06:24:20.643145"
              />
              <InfoCard
                imgUrl="https://pbs.twimg.com/media/Gt-3PRAXEAA_vl-?format=jpg&name=medium"
                prompt="산수도dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
                keyArr={['산수도', '어해도', '탱화']}
                index={1}
                date="2025-06-21T06:24:20.643145"
              />
              <InfoCard
                imgUrl="https://pbs.twimg.com/media/Gt-3PRAXEAA_vl-?format=jpg&name=medium"
                prompt="산수도dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
                keyArr={['산수도', '어해도', '탱화']}
                index={1}
                date="2025-06-21T06:24:20.643145"
              />
              <InfoCard
                imgUrl="https://pbs.twimg.com/media/Gt-3PRAXEAA_vl-?format=jpg&name=medium"
                prompt="산수도dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
                keyArr={['산수도', '어해도', '탱화']}
                index={1}
                date="2025-06-21T06:24:20.643145"
              />
              <InfoCard
                imgUrl="https://pbs.twimg.com/media/Gt-3PRAXEAA_vl-?format=jpg&name=medium"
                prompt="산수도dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
                keyArr={['산수도', '어해도', '탱화']}
                index={1}
                date="2025-06-21T06:24:20.643145"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryInfo;
