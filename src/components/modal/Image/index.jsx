import ReactDOM from 'react-dom';
import styles from './ImageSaveModal.module.scss';
import { useState } from 'react';
import { postImageDownload } from '@/api/chatAPI';

function ImageSaveModal({ chatId, onClose }) {
  const [selectValue, setSelectValue] = useState('');
  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const handleImageSave = async () => {
    if (selectValue === '') {
      alert('저장 방식을 선택해주세요.');
      return;
    }
    try {
      const res = await postImageDownload(chatId, selectValue);
      if (
        selectValue === '요소분리_이미지_저장' ||
        selectValue === '최종_이미지_저장'
      ) {
        const blob = new Blob([res.data], { type: 'image/png' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${chatId}_${selectValue}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        alert('이미지가 저장되었습니다.');
      }
    } catch (error) {
      console.error('Error saving image:', error);
      alert('이미지 저장에 실패했습니다.');
    } finally {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modal}>
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
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default ImageSaveModal;
