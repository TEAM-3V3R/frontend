import formatIsoToCustomDate from '@/util/formatISODate';
import styles from './infocard.module.scss';
import up from '@/assets/up.svg';
import down from '@/assets/down(1).svg';
import { useState } from 'react';
import Key from '../key';

function InfoCard({ imgUrl, prompt, keyArr, index, date }) {
  const [isOpen, setIsOpen] = useState(false);
  const formateDate = formatIsoToCustomDate(date);
  const [monthDay, time] = formateDate.split(/\s+/);
  const realIndex = index < 10 ? `0${index}` : index;

  return (
    <div className={styles.infocardWrapper}>
      <div className={styles.indexWrapper}>
        <div className={styles.monthWrapper}>
          <span className={styles.index}>{realIndex}</span>
          <span className={styles.date}>{monthDay}</span>
        </div>

        <span className={styles.date}>{time}</span>
      </div>
      <div className={styles.card}>
        <img src={imgUrl} alt="thumbnail" className={styles.thumbnail} />
        <div className={styles.content}>
          <div className={styles.keyWrapper}>
            <img
              src={isOpen ? up : down}
              alt="toggle"
              className={styles.toggleIcon}
              onClick={() => setIsOpen(!isOpen)}
            />
            <Key>Key1</Key>
            <Key>Ke2</Key>
          </div>
          <span className={styles.prompt}>{prompt}</span>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
