import { useEffect, useRef } from 'react';

import { ChatMessage } from '@morak/chat/src/interface/message.interface';

import { Member } from '@/types';

import * as styles from './index.css';
import { MemorizedTalkItem } from './TalkItem';

type ChatListProps = {
  chatItems: ChatMessage[];
  currentUserId: string;
  participants: Member[];
};

export function ChatList({
  chatItems,
  currentUserId,
  participants,
}: ChatListProps) {
  const listElemRef = useRef<HTMLUListElement>(null);
  const prevScrollHeightRef = useRef(0);

  const scrollToBottom = () => {
    if (!listElemRef.current) {
      return;
    }

    const { scrollHeight, clientHeight } = listElemRef.current;
    listElemRef.current.scrollTo({
      top: scrollHeight - clientHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!listElemRef.current) {
      return;
    }

    const { scrollTop, clientHeight, scrollHeight } = listElemRef.current;
    if (scrollTop + clientHeight === prevScrollHeightRef.current) {
      scrollToBottom();
    }

    prevScrollHeightRef.current = scrollHeight;
  }, [chatItems]);

  return (
    <ul className={styles.chatList} ref={listElemRef}>
      {chatItems.map((chatItem) => {
        const participantInfo = participants.find(
          (participant) => participant.providerId === chatItem.user,
        );
        return (
          <MemorizedTalkItem
            key={chatItem.date.toString()}
            nickname={participantInfo?.nickname || ''}
            profilePicture={participantInfo?.profilePicture || ''}
            contents={chatItem.contents}
            date={chatItem.date}
            isMine={chatItem.user === currentUserId}
          />
        );
      })}
    </ul>
  );
}
