import styles from './card.module.scss';

function Category({ category }) {
  let categoryStyle;
  switch (category) {
    case '산수도':
      categoryStyle = styles.green;
      break;
    case '어해도':
      categoryStyle = styles.blue;
      break;
    case '탱화':
      categoryStyle = styles.red;
      break;
    default:
      categoryStyle = styles.default; // 기본 스타일
  }

  return (
    <div className={`${styles.category} ${categoryStyle}`}>{category}</div>
  );
}

export default Category;
