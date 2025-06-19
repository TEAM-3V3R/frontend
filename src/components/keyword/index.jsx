import React from 'react';
import styles from './keyword.module.scss';

function Keyword({ keyword, onClick, isSelected, bgColor }) {
  let buttonStyle;
  switch (bgColor) {
    case 'blue':
      buttonStyle = isSelected
        ? `${styles.keywordButton} ${styles.blue}`
        : `${styles.keywordButton} ${styles.disabled}`;
      break;
    case 'green':
      buttonStyle = isSelected
        ? `${styles.keywordButton} ${styles.green}`
        : `${styles.keywordButton} ${styles.disabled}`;
      break;
    case 'red':
      buttonStyle = isSelected
        ? `${styles.keywordButton} ${styles.red}`
        : `${styles.keywordButton} ${styles.disabled}`;
      break;
    default:
      buttonStyle = `${styles.keywordButton} ${styles.disabled}`;
  }

  return (
    <button className={buttonStyle} onClick={() => onClick(keyword)}>
      {keyword}
    </button>
  );
}

export default Keyword;
