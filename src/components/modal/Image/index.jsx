import ReactDOM from 'react-dom';
import styles from './ImageSaveModal.module.scss';
import { useState } from 'react';
import { postImageDownload } from '@/api/chatAPI';
import ImageSendModal from '../ImageSend';

function ImageSaveModal({ chatId, onClose, onConfirmEnd }) {
  const [selectValue, setSelectValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const handleImageSave = async () => {
    if (selectValue === '') {
      alert('저장 방식을 선택해주세요.');
      return;
    }
    try {
      if (selectValue === '요소분리_이미지_저장') {
        setIsLoading(true);
      }
      const res = await postImageDownload(chatId, selectValue);
      if (
        selectValue === '요소분리_이미지_저장' ||
        selectValue === '최종_이미지_저장'
      ) {
        const blob = new Blob([res.data], {
          type:
            selectValue === '요소분리_이미지_저장'
              ? 'application/zip'
              : 'image/png',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download =
          selectValue === '요소분리_이미지_저장'
            ? `${chatId}_${selectValue}.zip`
            : `${chatId}_${selectValue}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
      if (typeof onConfirmEnd === 'function') {
        await onConfirmEnd();
      }
    } catch (error) {
      console.error('Error saving image:', error);
      alert('이미지 저장에 실패했습니다.');
    } finally {
      onClose();
      setIsLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div
      className={styles.modal}
      style={{ display: isLoading ? 'none' : 'flex' }}
    >
      <span className={styles.title}>채팅 종료하기</span>
      <div className={styles.bar} />
      <p className={styles.description}>
        채팅 종료 시 수정이 불가합니다.
        <br />
        현재 채팅을 종료 하시겠습니까?
      </p>
      <select
        className={styles.select}
        onChange={handleSelectChange}
        value={selectValue}
      >
        <option value="" disabled hidden>
          이미지 저장 방식 선택
        </option>
        <option value="채팅방_종료">저장 없이 종료하기</option>
        <option value="최종_이미지_저장">최종 이미지만 저장하기</option>
        <option value="요소분리_이미지_저장">
          요소 분리 + 최종 이미지 저장하기
        </option>
      </select>
      <div className={styles.buttonWrapper}>
        <button className={styles.blueBtn} onClick={handleImageSave}>
          예<br />
          (채팅 종료)
        </button>
        <button className={styles.blackBtn} onClick={onClose}>
          아니오
          <br />
          (뒤로가기)
        </button>
        {isLoading && (
          <ImageSendModal
            onClose={() => setIsLoading(false)}
            description="이미지 저장 중입니다. 잠시만 기다려주세요."
            title="이미지 저장 중"
          />
        )}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default ImageSaveModal;
