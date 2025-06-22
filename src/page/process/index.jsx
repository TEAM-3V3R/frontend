import Keyword from '@/components/keyword';
import styles from './process.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUnrealHistory } from '@/api/unreal.API';
import { CustomDate } from '@/util/formatISODate';

function Process() {
  const params = useParams();
  const navigate = useNavigate();
  const chatId = params.chatId;
  const [processData, setProcessData] = useState([]);

  useEffect(() => {
    const fetchProcessData = async () => {
      const res = await getUnrealHistory(chatId);
      setProcessData(res.data.data);
    };
    fetchProcessData();
  }, [chatId]);
  console.log('processData', processData);
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
        <div className={styles.mainContent}>
          <h1 className={styles.title}>후처리 내역</h1>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>수정 시간</th>
                  <th className={styles.tableHeader}>SAM 이미지 명</th>
                  <th className={styles.tableHeader}>활용 에셋 명</th>
                  <th className={styles.tableHeader}>수정 내역</th>
                </tr>
              </thead>
              <tbody>
                {processData.map((item, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      {CustomDate(item.timestamp)}
                    </td>
                    <td className={styles.tableCell}>{item.uuid}</td>
                    <td className={styles.tableCell}>{item.actorName}</td>
                    <td className={styles.tableCell}>{item.changeType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Process;
