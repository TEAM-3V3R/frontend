import Keyword from '@/components/keyword';
import styles from './historyinfo.module.scss';
import back from '@/assets/back.svg';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InfoCard from '@/components/infocard';
import { getHistoryDetail } from '@/api/historyAPI';
import leftarrow from '@/assets/leftarrow.svg';
import rightarrow from '@/assets/rightarrow.svg';
import close from '@/assets/close.svg';

const keywords = {
  산수도: { bgColor: 'green' },
  어해도: { bgColor: 'blue' },
  탱화: { bgColor: 'red' },
};

function HistoryInfo() {
  const navigate = useNavigate();
  const params = useParams();
  const chatId = params.chatId;
  const [keyword, setKeyword] = useState('산수도');
  const [historyInfoData, setHistoryInfoData] = useState();
  const [promptAllData, setPromptAllData] = useState([]);
  const [promptData, setPromptData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchHistoryInfo = async () => {
      const res = await getHistoryDetail(chatId);
      setHistoryInfoData(res.data.data);
      setKeyword(res.data.data.paints);
      setPromptAllData(res.data.data.prompts);
    };
    fetchHistoryInfo();
  }, [chatId]);

  useEffect(() => {
    const sliceStart = (page - 1) * 8;
    const sliceEnd = page * 8;
    const promptDataSlice = promptAllData?.slice(sliceStart, sliceEnd);
    setPromptData(promptDataSlice);
  }, [page, promptAllData]);
  const totalPages = Math.ceil(promptAllData.length / 8);
  console.log('totalPages', totalPages);
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
            <img
              src={leftarrow}
              alt="이전"
              className={styles.leftArrow}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              style={{
                display: page > 1 ? 'block' : 'none',
              }}
            />
            <div className={styles.keywordsListGrid}>
              {promptData.map((item, index) => (
                <InfoCard
                  key={index}
                  imgUrl={item.imageUrl}
                  prompt={item.promptContent}
                  keyArr={item.classifications}
                  index={(page - 1) * 8 + index + 1}
                  date={item.createdAt}
                  page={page}
                  onClick={() => setSelectedImage(item.imageUrl)}
                />
              ))}
            </div>
            <img
              src={rightarrow}
              alt="다음"
              className={styles.rightArrow}
              onClick={() => setPage((prev) => prev + 1)}
              style={{
                display: page < totalPages ? 'block' : 'none',
              }}
            />
          </div>
          {selectedImage && (
            <div className={styles.createImgWrapper}>
              <img
                className={styles.createImg}
                src={selectedImage}
                alt="선택된 이미지"
              />
              <img
                className={styles.closeIcon}
                src={close}
                alt="닫기"
                onClick={() => setSelectedImage(null)}
              />
            </div>
          )}
          <div className={styles.buttonWrapper}>
            <Keyword
              keyword="후처리 내역 보러 가기"
              isSelected={true}
              bgColor="blue"
              onClick={() => navigate(`/process/${chatId}`)}
            />
          </div>
          <div className={styles.createImgWrapper}>
            <img
              className={styles.createImg}
              src={historyInfoData?.finalImageUrl}
              alt="선택된 이미지"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryInfo;
