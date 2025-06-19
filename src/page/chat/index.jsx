import Keyword from '@/components/keyword';
import styles from './chat.module.scss';
import { useState } from 'react';
import send from '@/assets/send.svg';
import ChatButton from '@/components/chatbutton';
import AI from '@/components/chat/ai';
import My from '@/components/chat/my';

const keywords = [
  { keyword: '산수도', bgColor: 'green' },
  { keyword: '어해도', bgColor: 'blue' },
  { keyword: '탱화', bgColor: 'red' },
];
const mockData = [
  { title: '산수도', content: '산수도에 대한 내용입니다.' },
  { title: '어해도', content: '어해도에 대한 내용입니다.' },
  { title: '탱화', content: '탱화에 대한 내용입니다.' },
];

function Chat() {
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [chatHistory, setChatHistory] = useState(mockData);
  const [currentChat, setCurrentChat] = useState(chatHistory[0].title);
  //   console.log(chatHistory);
  const handleChangeTitle = (oldTitle, newTitle) => {
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.title === oldTitle ? { ...chat, title: newTitle } : chat
      )
    );

    // 현재 선택된 채팅일 경우 currentChat도 변경
    if (currentChat === oldTitle) {
      setCurrentChat(newTitle);
    }
  };
  return (
    <>
      <div className={styles.content}>
        <div className={styles.side}>
          <button className={styles.chatBtn}>+ 새 채팅</button>
          <div className={styles.chatList}>
            {chatHistory.map((item) => (
              <ChatButton
                key={item.title}
                onClick={() => setCurrentChat(item.title)}
                isSelected={currentChat === item.title}
                title={item.title}
                onChange={(newTitle) => handleChangeTitle(item.title, newTitle)}
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
                    onClick={() => setSelectedKeyword(item.keyword)}
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
              <My chat="음뵈모가 맨유옷을 입고있는 사진." />
              <AI imgUrl="https://pbs.twimg.com/media/Gt0BWfQXgAAafUo?format=jpg&name=large" />
              <My chat="쿠냐가 맨유옷을 입고있는 사진." />
              <AI imgUrl="https://pbs.twimg.com/media/GtVSA90XAAE6zEW?format=jpg&name=small" />
              <My chat="우리 주장님 트로피든 사진" />
              <AI imgUrl="https://pbs.twimg.com/media/Gs9J4q3WgAA8HP4?format=jpg&name=small" />
              <My chat="음뵈모가 맨유옷을 입고있는 사진." />
              <AI imgUrl="https://pbs.twimg.com/media/Gt0BWfQXgAAafUo?format=jpg&name=large" />
              <My chat="쿠냐가 맨유옷을 입고있는 사진." />
              <AI imgUrl="https://pbs.twimg.com/media/GtVSA90XAAE6zEW?format=jpg&name=small" />
              <My chat="우리 주장님 트로피든 사진" />
              <AI imgUrl="https://pbs.twimg.com/media/Gs9J4q3WgAA8HP4?format=jpg&name=small" />
              <My chat="음뵈모가 맨유옷을 입고있는 사진." />
              <AI imgUrl="https://pbs.twimg.com/media/Gt0BWfQXgAAafUo?format=jpg&name=large" />
              <My chat="쿠냐가 맨유옷을 입고있는 사진." />
              <AI imgUrl="https://pbs.twimg.com/media/GtVSA90XAAE6zEW?format=jpg&name=small" />
              <My chat="우리 주장님 트로피든 사진" />
              <AI imgUrl="https://pbs.twimg.com/media/Gs9J4q3WgAA8HP4?format=jpg&name=small" />
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
