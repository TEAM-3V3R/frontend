import styles from './chatbutton.module.scss';
import Chat from '@/assets/chat.svg';
import NoChat from '@/assets/nochat.svg';
import { useState } from 'react';

function ChatButton({ onClick, isSelected, title, onChange, chatId }) {
  const [isClicked, setIsClicked] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const buttonClass = isSelected
    ? `${styles.chatBtn} ${styles.selected}`
    : `${styles.chatBtn} ${styles.notSelected}`;

  const handleInputChange = (e) => {
    setTempTitle(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsClicked(false);
      onChange(tempTitle);
      // api보내기
      console.log(chatId);
    }
  };

  return (
    <div className={buttonClass} onClick={onClick}>
      <img
        src={isSelected ? Chat : NoChat}
        alt="Chat Icon"
        className={styles.chatIcon}
      />

      {isClicked && isSelected ? (
        <input
          type="text"
          value={tempTitle}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className={styles.input}
          autoFocus
        />
      ) : (
        <span
          onClick={(e) => {
            e.stopPropagation();
            setIsClicked(true);
          }}
        >
          {tempTitle}
        </span>
      )}
    </div>
  );
}

export default ChatButton;
