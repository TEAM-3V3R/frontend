import Keyword from '@/components/keyword';
import styles from './chat.module.scss';
import { useEffect, useRef, useState, Fragment } from 'react';
import send from '@/assets/send.svg';
import ChatButton from '@/components/chatbutton';
import AI from '@/components/chat/Ai.jsx';
import My from '@/components/chat/My.jsx';
import {
  getChat,
  getChatHistory,
  patchChatTitle,
  postChat,
} from '@/api/chatAPI';
import { postCategory } from '@/api/categoryAPI';
import { postPrompt } from '@/api/promptAPI';
import InpaintingChat from '@/components/chat/Inpainting.jsx';
import ImageSaveModal from '@/components/modal/Image';
import { debounce } from 'lodash';
import ImageSendModal from '@/components/modal/ImageSend';
import { postReports } from '@/api/reportAPI';

const keywords = [
  { keyword: '산수도', bgColor: 'green' },
  { keyword: '어해도', bgColor: 'blue' },
  { keyword: '탱화', bgColor: 'red' },
];

function Chat() {
  const userNo = localStorage.getItem('userNo');
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState(0); // 초기값에서 chatHistory[0] 직접 참조하지 않음
  const [isNewChat, setIsNewChat] = useState(false);
  const [chatInfo, setChatInfo] = useState(null);
  const [chat, setChat] = useState('');
  const [isChatEndedModal, setIsChatEndedModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isPromptInfoOpen, setIsPromptInfoOpen] = useState(false);

  const [isPromptPopoverOpen, setIsPromptPopoverOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const promptExamples = [
    '옛날 한국 전통 산수화 스타일의 풍경, 안개 낀 산과 잔잔한 물결, 섬세한 먹 효과',
    '동양화 느낌의 어해도, 금박을 사용한 장식적 요소와 섬세한 붓터치',
    '불교 탱화 스타일, 강렬한 색채와 상징적 인물 배치, 세밀한 디테일 강조',
    '현대적 해석의 산수도, 미니멀한 색상 팔레트와 부드러운 명암',
  ];

  const handleCopy = async (text, i) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(i);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      console.error('복사 실패', err);
      alert('복사에 실패했습니다. 브라우저 권한을 확인해주세요.');
    }
  };

  const handleEndChatConfirm = async () => {
    try {
      await postReports(currentChat);
      setIsChatEndedModal(false);
    } catch (e) {
      const status = e?.response?.status;
      const msg = e?.response?.data?.error?.message;

      if (!(status === 403 && msg?.includes('이미 종료'))) {
        console.error('리포트 생성 실패:', e);
        alert('리포트 생성에 실패했습니다.');
        return;
      }
    }
    setChatInfo((prev) => (prev ? { ...prev, isFinished: true } : prev));
    setIsChatEndedModal(false);
  };

  const handleChangeTitle = async (oldTitle, newTitle, chatId) => {
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.chatId === chatId ? { ...chat, chatTitle: newTitle } : chat
      )
    );

    if (currentChat === oldTitle) {
      setCurrentChat(chatId);
    }
    try {
      const res = await patchChatTitle(chatId, newTitle);
      if (res.status === 200) {
        alert('채팅 제목이 변경되었습니다.');
      }
    } catch (error) {
      console.error('Error updating chat title:', error);
      alert('채팅 제목 변경에 실패했습니다.');
    }
  };

  const handleNewChat = () => {
    setChatHistory((prev) => [
      ...prev,
      { chatId: 0, chatTitle: '새 채팅', promptContent: '' },
    ]);
    setCurrentChat(0);
    setIsNewChat(true);
  };

  const postNewChatRoom = async (paints) => {
    try {
      const res = await postChat(paints);
      if (res.status === 200) {
        setChatHistory((prev) => [
          ...prev.slice(0, -1),
          {
            chatId: res.data.data.chatId,
            chatTitle: '',
            promptContent: '',
          },
        ]);
      }
    } catch (error) {
      console.error('Error creating new chat:', error);
      alert('새 채팅 생성에 실패했습니다.');
    }
  };

  const handleSendChat = async () => {
    if (!chat.trim()) {
      alert('채팅 내용을 입력해주세요.');
      return;
    }
    if (currentChat === 0) {
      alert('새 채팅에서는 메시지를 보낼 수 없습니다. 새로고침을 해주세요.');
      return;
    }
    try {
      setIsLoading(true);
      const res = await postPrompt(
        {
          chatId: currentChat,
          promptContent: chat,
        },
        selectedKeyword
      );
      const imageUrl = res.data.data.data[0].url;
      const promptId = res.data.data.promptId;
      if (res.status === 200) {
        setChatInfo((prev) => ({
          ...prev,
          prompts: [
            ...(prev?.prompts ?? []), // prev가 null일 수도 있으니 방어
            {
              promptContent: chat,
              imageUrl: imageUrl,
            },
          ],
        }));
      }
      setChat('');
      await postCategory(promptId);
    } catch (error) {
      console.error('Error sending chat:', error);
      alert('채팅 전송에 실패했습니다.');
    } finally {
      setChat('');
      setIsLoading(false);
    }
  };

  const latestHandleSendChat = useRef(handleSendChat);
  latestHandleSendChat.current = handleSendChat;

  const debouncedSendChat = useRef(
    debounce(() => {
      latestHandleSendChat.current();
    }, 500)
  ).current;

  useEffect(() => {
    const getChatHistoryData = async () => {
      try {
        const res = await getChatHistory();

        // 응답이 없거나 data 구조가 달라도 죽지 않게 방어
        if (res?.status === 200) {
          const history = Array.isArray(res.data?.data)
            ? res.data.data
            : [];

          setChatHistory(history);

          if (history.length > 0) {
            setCurrentChat(history[0].chatId);
          } else {
            setCurrentChat(0); // 채팅이 없을 때
          }
        } else {
          setChatHistory([]);
          setCurrentChat(0);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
        setChatHistory([]); // 에러 시에도 안전한 값 세팅
        setCurrentChat(0);
      }
    };
    getChatHistoryData();
  }, [userNo]);

  useEffect(() => {
    const fetchChatInfo = async () => {
      if (!currentChat || currentChat === '새 채팅') return; // 조건 명확히

      try {
        const res = await getChat(currentChat);

        // data 배열 여부 확인 후 0번 인덱스 접근
        if (res?.status === 200) {
          const dataArray = Array.isArray(res.data?.data)
            ? res.data.data
            : [];
          const chatData = dataArray[0];

          if (chatData) {
            setChatInfo(chatData);
            setSelectedKeyword(chatData.paints || '');
          } else {
            setChatInfo(null);
            setSelectedKeyword('');
          }
        }
      } catch (error) {
        console.error('Error fetching chat info:', error);
        alert('채팅 정보를 불러오는 데 실패했습니다.');
        setChatInfo(null); // 에러 시에도 상태 초기화
      }
    };
    fetchChatInfo();
  }, [currentChat]);

  useEffect(() => {
    if (isNewChat) {
      setSelectedKeyword('');
      setChatInfo(null);
      setCurrentChat('새 채팅');
    }
  }, [isNewChat]);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.side}>
          <button className={styles.chatBtn} onClick={handleNewChat}>
            + 새 채팅
          </button>
          <div className={styles.chatList}>
            {chatHistory.map((item) => (
              <ChatButton
                key={item.chatId}
                onClick={() => {
                  setCurrentChat(item.chatId);
                  setIsChatEndedModal(false);
                }}
                isSelected={currentChat === item.chatId}
                title={item.chatTitle || item.promptContent}
                onChange={(newTitle) =>
                  handleChangeTitle(item.chatTitle, newTitle, item.chatId)
                }
              />
            ))}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.chatview}>
            <div className={styles.chatviewHeader}>
              <div className={styles.keywordBtnWrapper}>
                {keywords.map((item) => (
                  <Keyword
                    key={item.keyword}
                    keyword={item.keyword}
                    onClick={() => {
                      if (isNewChat) {
                        setSelectedKeyword(item.keyword);
                        postNewChatRoom(item.keyword);
                        setIsNewChat(false);
                      }
                    }}
                    isSelected={selectedKeyword === item.keyword}
                    bgColor={item.bgColor}
                  />
                ))}
              </div>
              <div
                className={styles.infoWrapper}
                onMouseEnter={() => setIsPromptPopoverOpen(true)}
                onMouseLeave={() => setIsPromptPopoverOpen(false)}
              >
                <button
                  className={styles.infoCircle}
                  title="프롬프트 예시 보기"
                  aria-label="프롬프트 예시 열기"
                >
                  i
                </button>
                <Keyword
                  keyword="채팅종료"
                  onClick={() => {
                    if (!chatInfo?.isFinished) {
                      setIsChatEndedModal(true);
                    }
                  }}
                  isSelected={chatInfo?.isFinished ? false : true}
                  bgColor="red"
                  style={{
                    cursor: chatInfo?.isFinished ? 'not-allowed' : 'pointer',
                  }}
                />
                {isChatEndedModal && (
                  <ImageSaveModal
                    chatId={currentChat}
                    onClose={() => setIsChatEndedModal(false)}
                  />
                )}

                {isPromptPopoverOpen && (
                  <div
                    className={styles.popover}
                    role="dialog"
                    aria-label="프롬프트 예시 팝오버"
                    onMouseEnter={() => setIsPromptPopoverOpen(true)}
                  >
                    <div className={styles.popoverHeader}>
                      <strong>프롬프트 예시</strong>
                    </div>
                    <div className={styles.promptExamples}>
                      {promptExamples.map((p, i) => (
                        <div key={i} className={styles.promptExample}>
                          <span style={{ flex: 1, marginRight: 8 }}>{p}</span>
                          <button
                            className={styles.copyBtn}
                            onClick={() => handleCopy(p, i)}
                            aria-label={`예시 ${i + 1} 복사`}
                          >
                            {copiedIndex === i ? '복사됨' : '복사'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.chatviewContent}>
              {chatInfo?.prompts?.map((prompt, index) => ( // prompts에도 ?. 추가
                prompt.inpaintingImage ? (
                  <InpaintingChat
                    key={index}
                    imgUrl={prompt.imageUrl}
                    promptContent={prompt.promptContent}
                  />
                ) : (
                  <Fragment key={index}>
                    <My chat={prompt.promptContent} />
                    <AI
                      imgUrl={prompt.imageUrl}
                      chatId={currentChat}
                      isFinished={chatInfo?.isFinished}
                    />
                  </Fragment>
                )
              ))}
            </div>
          </div>
          <div className={styles.chatInputWrapper}>
            <input
              type="text"
              className={styles.chatInput}
              placeholder="그리고 싶은 내용을 적어보세요"
              onChange={(e) => setChat(e.target.value)}
              value={chat}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  debouncedSendChat();
                }
              }}
              disabled={chatInfo?.isFinished === true}
            />
            <button className={styles.sendBtn} onClick={debouncedSendChat} disabled={chatInfo?.isFinished === true}>
              <img src={send} alt="send" />
            </button>
          </div>
          {isLoading && (
            <ImageSendModal
              onClose={() => setIsLoading(false)}
              description="이미지 생성 중입니다. 잠시만 기다려주세요."
              title="이미지 생성 중"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;