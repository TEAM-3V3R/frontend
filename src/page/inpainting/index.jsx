import { useLocation } from 'react-router-dom';
import styles from './inpainting.module.scss';

import send from '@/assets/send.svg';
import Slider from '@/components/slider';
import change from '@/assets/change.svg';
import erase from '@/assets/erase.svg';
import front from '@/assets/front.svg';
import back from '@/assets/back.svg';
import { useRef, useState } from 'react';
import Keyword from '@/components/keyword';
import Canvas from '@/components/canvas';
import { postInpainting } from '@/api/promptAPI';
import MyInpainting from '@/components/chat/myInpainting';
import AIInpainting from '@/components/chat/aiInpainting';

function Inpainting() {
  const canvasRef = useRef();
  const location = useLocation();
  const { imgUrl, chatId } = location.state || {};
  const [canvasImgUrl, setCanvasImgUrl] = useState(imgUrl);
  const [brushSize, setBrushSize] = useState(10); // 초기값 10
  const [mode, setMode] = useState('draw');
  const [inpaintingChat, setInpaintingChat] = useState('');
  const [inpaintingResult, setInpaintingResult] = useState([]);

  const handleSend = async () => {
    const maskBase64 = canvasRef.current?.getMaskBase64?.();
    console.log('Mask Base64:', maskBase64);
    const pureBase64 = maskBase64?.split(',')[1];
    const data = {
      chatId: chatId,
      promptContent: inpaintingChat,
      imageFileUrl: canvasImgUrl,
      maskFile: pureBase64,
    };
    try {
      setInpaintingResult((prev) => [
        ...prev,
        {
          chat: inpaintingChat,
          imgUrl: '',
          send: 'my',
        },
      ]);

      const res = await postInpainting(data);
      const result = res.data;
      const resultUrl = result.data.data[0].url;

      setInpaintingResult((prev) => [
        ...prev,
        {
          chat: '',
          imgUrl: resultUrl,
          send: 'ai',
        },
      ]);
      setCanvasImgUrl(resultUrl);
      console.log('Returned URL:', result.data.data[0].url);
      console.log(inpaintingResult);
    } catch (error) {
      console.error('Error sending inpainting request:', error);
      alert('인페인팅 요청에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setInpaintingChat('');
      canvasRef.current?.clear(); // 초기화
    }
  };

  return (
    <>
      <div className={styles.content}>
        <div className={styles.side}>
          <div className={styles.sideHeader}>인페인팅 진행 내역</div>
          <div className={styles.sideContent}>
            {inpaintingResult.map((item, index) =>
              item.send === 'my' ? (
                <MyInpainting chat={item.chat} key={index} />
              ) : (
                <AIInpainting imgUrl={item.imgUrl} key={index} />
              )
            )}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.chatview}>
            <div className={styles.chatviewHeader}>
              <div className={styles.headerFront}>
                <img
                  src={change}
                  alt="change"
                  className={styles.icon}
                  onClick={() => setMode('draw')}
                />
                <img
                  src={erase}
                  alt="erase"
                  className={styles.icon}
                  onClick={() => setMode('erase')}
                />
                <Slider initialSize={10} onChange={setBrushSize} />
              </div>
              <div className={styles.headerBack}>
                <img
                  src={back}
                  alt="back"
                  className={styles.icon}
                  onClick={() => canvasRef.current?.undo()}
                />
                <img
                  src={front}
                  alt="front"
                  className={styles.icon}
                  onClick={() => canvasRef.current?.redo()}
                />
                <Keyword
                  keyword={'인페인팅 종료하기'}
                  isSelected={true}
                  bgColor="red"
                />
              </div>
            </div>
            <div className={styles.chatviewContent}>
              <Canvas
                ref={canvasRef}
                imgUrl={canvasImgUrl}
                brushSize={brushSize}
                mode={mode}
              />
            </div>
          </div>
          <div className={styles.chatInputWrapper}>
            <input
              type="text"
              className={styles.chatInput}
              placeholder="수정하고 싶은 내용을 적어보세요"
              value={inpaintingChat}
              onChange={(e) => setInpaintingChat(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
            />
            <button className={styles.sendBtn} onClick={handleSend}>
              <img src={send} alt="send" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inpainting;
