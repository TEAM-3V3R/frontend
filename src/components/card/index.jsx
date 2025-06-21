import { useNavigate } from 'react-router-dom';
import styles from './card.module.scss';
import Category from './category';

function Card({ imgUrl, date, chatId, title, category }) {
  const navigate = useNavigate();
  return (
    <div className={styles.card} onClick={() => navigate(`/history/${chatId}`)}>
      <img src={imgUrl} alt="thumbnail" className={styles.thumbnail} />
      <div className={styles.content}>
        <div className={styles.dateWrapper}>
          <span className={styles.date}>{date}</span>
          <Category category={category} />
        </div>
        <span className={styles.title}>{title}</span>
      </div>
    </div>
  );
}

export default Card;
