import Keyword from '@/components/keyword';
import styles from './chat.module.scss';
import { useEffect, useState } from 'react';
import send from '@/assets/send.svg';
import ChatButton from '@/components/chatbutton';
import AI from '@/components/chat/ai';
import My from '@/components/chat/my';
import {
  getChat,
  getChatHistory,
  patchChatTitle,
  postChat,
} from '@/api/chatAPI';
import { Fragment } from 'react';

const keywords = [
  { keyword: '산수도', bgColor: 'green' },
  { keyword: '어해도', bgColor: 'blue' },
  { keyword: '탱화', bgColor: 'red' },
];

function Chat() {
  const userNo = localStorage.getItem('userNo');
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState(chatHistory[0]?.chatId || '');
  const [isNewChat, setIsNewChat] = useState(false);

  const [chatInfo, setChatInfo] = useState(null);

  //   console.log(chatHistory);
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
  useEffect(() => {
    const getChatHistoryData = async () => {
      try {
        const res = await getChatHistory();
        if (res.status === 200) {
          setChatHistory(res.data.data);
          setCurrentChat(res.data.data[0]?.chatId || '');
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };
    getChatHistoryData();
  }, [userNo]);

  useEffect(() => {
    const fetchChatInfo = async () => {
      if (currentChat && currentChat !== '새 채팅') {
        try {
          const res = await getChat(currentChat);
          if (res.status === 200) {
            setChatInfo(res.data.data[0]);
            setSelectedKeyword(res.data.data[0]?.paints || '');
          }
        } catch (error) {
          console.error('Error fetching chat info:', error);
          alert('채팅 정보를 불러오는 데 실패했습니다.');
        }
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
                onClick={() => setCurrentChat(item.chatId)}
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
              <Keyword
                keyword="채팅종료"
                onClick={() => {}}
                isSelected={true}
                bgColor="red"
              />
            </div>
            <div className={styles.chatviewContent}>
              {chatInfo?.prompts.map((prompt, index) => (
                <Fragment key={index}>
                  <My chat={prompt.promptContent} />
                  <AI imgUrl={prompt.imageUrl} />
                </Fragment>
              ))}
            </div>
          </div>
          <div className={styles.chatInputWrapper}>
            <input
              type="text"
              className={styles.chatInput}
              placeholder="그리고 싶은 내용을 적어보세요"
            />
            <button className={styles.sendBtn}>
              <img src={send} alt="send" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
