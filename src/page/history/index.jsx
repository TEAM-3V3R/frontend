import Keyword from '@/components/keyword';
import styles from './history.module.scss';
import { useEffect, useState } from 'react';
import Card from '@/components/card';
import { getHistory } from '@/api/historyAPI';
import formatDate from '@/util/date';

const keywords = [
  { keyword: '산수도', bgColor: 'green', isSelected: true },
  { keyword: '어해도', bgColor: 'blue', isSelected: true },
  { keyword: '탱화', bgColor: 'red', isSelected: true },
];

function History() {
  const userNo = localStorage.getItem('userNo');
  const [keywordState, setKeywordState] = useState(keywords);
  const [sortOption, setSortOption] = useState('최신순');
  const [history, setHistory] = useState([]);

  //   const handleKeywordClick = (keyword) => {
  //     setKeywordState((prev) =>
  //       prev.map((item) =>
  //         item.keyword === keyword
  //           ? { ...item, isSelected: !item.isSelected }
  //           : item
  //       )
  //     );
  //   }; 3,2,1 조회시
  const handleKeywordClick = (keyword) => {
    setKeywordState((prev) => {
      const selectedItems = prev.filter((item) => item.isSelected);
      const isOnlySelected =
        selectedItems.length === 1 && selectedItems[0].keyword === keyword;

      if (isOnlySelected) {
        // 모든 항목을 true로 설정
        return prev.map((item) => ({ ...item, isSelected: true }));
      }

      // 일반 클릭: 클릭한 항목만 true, 나머지 false
      return prev.map((item) =>
        item.keyword === keyword
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      );
    });
  };
  useEffect(() => {
    const fetchHistory = async () => {
      const keywordOptions = keywordState
        .filter((item) => item.isSelected)
        .map((item) => item.keyword);

      const res = await getHistory(keywordOptions, sortOption);
      setHistory(res.data.data);
    };
    fetchHistory();
  }, [userNo, keywordState, sortOption]);
  return (
    <>
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.optionWrapper}>
              {keywordState.map((item) => (
                <Keyword
                  key={item.keyword}
                  keyword={item.keyword}
                  onClick={handleKeywordClick}
                  isSelected={item.isSelected}
                  bgColor={item.bgColor}
                />
              ))}
            </div>
            <select
              className={styles.selectBox}
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="최신순">최신순</option>
              <option value="과거순">과거순</option>
            </select>
          </div>
          <div className={styles.historyList}>
            <div className={styles.historyListGrid}>
              {history?.map((item) => (
                <Card
                  key={item.chatId}
                  imgUrl={item.image_url}
                  date={formatDate(item.createAt)}
                  chatId={item.chatId}
                  title={item.chatTitle || ''}
                  category={item.paints}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
