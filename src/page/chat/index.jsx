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

        // ⭐ data 배열 여부 확인 후 0번 인덱스 접근
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
            <button className={styles.sendBtn} onClick={debouncedSendChat}>
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

// 코드 원본
// import Keyword from '@/components/keyword';
// import styles from './chat.module.scss';
// import { useEffect, useRef, useState } from 'react';
// import send from '@/assets/send.svg';
// import ChatButton from '@/components/chatbutton';
// import AI from '@/components/chat/Ai.jsx';
// import My from '@/components/chat/My.jsx';
// import {
//   getChat,
//   getChatHistory,
//   patchChatTitle,
//   postChat,
// } from '@/api/chatAPI';
// import { Fragment } from 'react';
// import { postCategory } from '@/api/categoryAPI';
// import { postPrompt } from '@/api/promptAPI';
// import InpaintingChat from '@/components/chat/Inpainting.jsx';
// import ImageSaveModal from '@/components/modal/Image';
// import { debounce } from 'lodash';
// import ImageSendModal from '@/components/modal/ImageSend';

// const keywords = [
//   { keyword: '산수도', bgColor: 'green' },
//   { keyword: '어해도', bgColor: 'blue' },
//   { keyword: '탱화', bgColor: 'red' },
// ];

// function Chat() {
//   const userNo = localStorage.getItem('userNo');
//   const [selectedKeyword, setSelectedKeyword] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [currentChat, setCurrentChat] = useState(chatHistory[0]?.chatId || 0);
//   const [isNewChat, setIsNewChat] = useState(false);
//   const [chatInfo, setChatInfo] = useState(null);
//   const [chat, setChat] = useState('');
//   const [isChatEndedModal, setIsChatEndedModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   //   console.log(chatHistory);
//   const handleChangeTitle = async (oldTitle, newTitle, chatId) => {
//     setChatHistory((prev) =>
//       prev.map((chat) =>
//         chat.chatId === chatId ? { ...chat, chatTitle: newTitle } : chat
//       )
//     );

//     if (currentChat === oldTitle) {
//       setCurrentChat(chatId);
//     }
//     try {
//       const res = await patchChatTitle(chatId, newTitle);
//       if (res.status === 200) {
//         alert('채팅 제목이 변경되었습니다.');
//       }
//     } catch (error) {
//       console.error('Error updating chat title:', error);
//       //  alert추가
//       alert('채팅 제목 변경에 실패했습니다.');
//     }
//   };

//   const handleNewChat = () => {
//     setChatHistory((prev) => [
//       ...prev,
//       { chatId: 0, chatTitle: '새 채팅', promptContent: '' },
//     ]);
//     setCurrentChat(0);
//     setIsNewChat(true);
//   };
//   const postNewChatRoom = async (paints) => {
//     try {
//       const res = await postChat(paints);
//       if (res.status === 200) {
//         setChatHistory((prev) => [
//           ...prev.slice(0, -1),
//           {
//             chatId: res.data.data.chatId,
//             chatTitle: '',
//             promptContent: '',
//           },
//         ]);
//       }
//     } catch (error) {
//       console.error('Error creating new chat:', error);
//       alert('새 채팅 생성에 실패했습니다.');
//     }
//   };

//   const handleSendChat = async () => {
//     if (!chat.trim()) {
//       alert('채팅 내용을 입력해주세요.');
//       return;
//     }
//     if (currentChat === 0) {
//       alert('새 채팅에서는 메시지를 보낼 수 없습니다. 새로고침을 해주세요.');
//       return;
//     }
//     try {
//       setIsLoading(true);
//       const res = await postPrompt(
//         {
//           chatId: currentChat,
//           promptContent: chat,
//         },
//         selectedKeyword
//       );
//       const imageUrl = res.data.data.data[0].url;
//       const promptId = res.data.data.promptId;
//       if (res.status === 200) {
//         setChatInfo((prev) => ({
//           ...prev,
//           prompts: [
//             ...prev.prompts,
//             {
//               promptContent: chat,
//               imageUrl: imageUrl,
//             },
//           ],
//         }));
//       }
//       setChat('');
//       await postCategory(promptId);
//     } catch (error) {
//       console.error('Error sending chat:', error);
//       alert('채팅 전송에 실패했습니다.');
//     } finally {
//       setChat('');
//       setIsLoading(false);
//     }
//   };

//   const latestHandleSendChat = useRef(handleSendChat);
//   latestHandleSendChat.current = handleSendChat;

//   const debouncedSendChat = useRef(
//     debounce(() => {
//       latestHandleSendChat.current();
//     }, 500)
//   ).current;

//   useEffect(() => {
//     const getChatHistoryData = async () => {
//       try {
//         const res = await getChatHistory();
//         if (res.status === 200) {
//           setChatHistory(res.data.data);
//           setCurrentChat(res.data.data[0]?.chatId || 0);
//         }
//       } catch (error) {
//         console.error('Error fetching chat history:', error);
//       }
//     };
//     getChatHistoryData();
//   }, [userNo]);

//   useEffect(() => {
//     const fetchChatInfo = async () => {
//       if (currentChat && currentChat !== '새 채팅') {
//         try {
//           const res = await getChat(currentChat);
//           if (res.status === 200) {
//             setChatInfo(res.data.data[0]);
//             setSelectedKeyword(res.data.data[0]?.paints || '');
//           }
//         } catch (error) {
//           console.error('Error fetching chat info:', error);
//           alert('채팅 정보를 불러오는 데 실패했습니다.');
//         }
//       }
//     };
//     fetchChatInfo();
//   }, [currentChat]);
//   useEffect(() => {
//     if (isNewChat) {
//       setSelectedKeyword('');
//       setChatInfo(null);
//       setCurrentChat('새 채팅');
//     }
//   }, [isNewChat]);

//   return (
//     <>
//       <div className={styles.content}>
//         <div className={styles.side}>
//           <button className={styles.chatBtn} onClick={handleNewChat}>
//             + 새 채팅
//           </button>
//           <div className={styles.chatList}>
//             {chatHistory.map((item) => (
//               <ChatButton
//                 key={item.chatId}
//                 onClick={() => {
//                   setCurrentChat(item.chatId);
//                   setIsChatEndedModal(false);
//                 }}
//                 isSelected={currentChat === item.chatId}
//                 title={item.chatTitle || item.promptContent}
//                 onChange={(newTitle) =>
//                   handleChangeTitle(item.chatTitle, newTitle, item.chatId)
//                 }
//               />
//             ))}
//           </div>
//         </div>
//         <div className={styles.main}>
//           <div className={styles.chatview}>
//             <div className={styles.chatviewHeader}>
//               <div className={styles.keywordBtnWrapper}>
//                 {keywords.map((item) => (
//                   <Keyword
//                     key={item.keyword}
//                     keyword={item.keyword}
//                     onClick={() => {
//                       if (isNewChat) {
//                         setSelectedKeyword(item.keyword);
//                         postNewChatRoom(item.keyword);
//                         setIsNewChat(false);
//                       }
//                     }}
//                     isSelected={selectedKeyword === item.keyword}
//                     bgColor={item.bgColor}
//                   />
//                 ))}
//               </div>
//               <Keyword
//                 keyword="채팅종료"
//                 onClick={() => {
//                   if (!chatInfo?.isFinished) {
//                     setIsChatEndedModal(true);
//                   }
//                 }}
//                 isSelected={chatInfo?.isFinished ? false : true}
//                 bgColor="red"
//                 style={{
//                   cursor: chatInfo?.isFinished ? 'not-allowed' : 'pointer',
//                 }}
//               />
//               {isChatEndedModal && (
//                 <ImageSaveModal
//                   chatId={currentChat}
//                   onClose={() => setIsChatEndedModal(false)}
//                 />
//               )}
//             </div>
//             <div className={styles.chatviewContent}>
//               {chatInfo?.prompts.map((prompt, index) =>
//                 prompt.inpaintingImage ? (
//                   <InpaintingChat
//                     key={index}
//                     imgUrl={prompt.imageUrl}
//                     promptContent={prompt.promptContent}
//                   />
//                 ) : (
//                   <Fragment key={index}>
//                     <My chat={prompt.promptContent} />
//                     <AI
//                       imgUrl={prompt.imageUrl}
//                       chatId={currentChat}
//                       isFinished={chatInfo?.isFinished}
//                     />
//                   </Fragment>
//                 )
//               )}
//             </div>
//           </div>
//           <div className={styles.chatInputWrapper}>
//             <input
//               type="text"
//               className={styles.chatInput}
//               placeholder="그리고 싶은 내용을 적어보세요"
//               onChange={(e) => setChat(e.target.value)}
//               value={chat}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   e.preventDefault();
//                   debouncedSendChat();
//                 }
//               }}
//               disabled={chatInfo?.isFinished === true}
//             />
//             <button className={styles.sendBtn} onClick={debouncedSendChat}>
//               <img src={send} alt="send" />
//             </button>
//           </div>
//           {isLoading && (
//             <ImageSendModal
//               onClose={() => setIsLoading(false)}
//               description="이미지 생성 중입니다. 잠시만 기다려주세요."
//               title="이미지 생성 중"
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Chat;