'use client';

import { GetSocketMessagesForGroup } from '@/app/groups/[groupId]/components/GetSocketMessagesForGroup';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import { GroupContext } from '@/hooks/context/group-context';
import { GroupMessagesEntity } from '@/hooks/entities/messages.entities';
import { Container, List } from '@mui/material';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import HeaderPage from './components/Header';
import MessageInputPage from './components/MessageInput';
import MessageThread from './components/MessageThread';

export default function MessagePage() {
  const limit = 20;
  const { groupId } = useParams();
  const [loading, setLoading] = useState(false);
  const { getGroupMessages } = useMessageAPI();
  const [group] = useContext(GroupContext);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [messages, setMessages] = useState<GroupMessagesEntity[]>([]);
  GetSocketMessagesForGroup({ setMessages });

  const loadGroupMessages = async (initialLoad = false) => {
    const offset = initialLoad ? 0 : messages.length;
    setLoading(true);
    try {
      const messages = await getGroupMessages(groupId as string,{
        offset,
        limit
      });
      if (initialLoad) {
        setMessages(messages);
      } else {
        setHasMore(messages.length === limit);
        setMessages((prev) => [...prev, ...messages]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMessages = () => {
    if (hasMore && !loading) {
      loadGroupMessages();
    }
  };

  useEffect(() => {
    if (groupId) loadGroupMessages();
  }, [groupId]); //eslint-disable-line
  return (
    <>
      <Container
        maxWidth="xs"
        style={{
          padding: 0,
          marginBottom: 60
        }}
      >
        <HeaderPage group={group} />
        <List
          sx={{
            marginTop: 10,
            height: '800px',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column-reverse',
            objectFit: 'cover'
          }}
          id="scroll-id"
        >
          <InfiniteScroll
            style={{
              overflow: 'scroll',
              display: 'flex',
              flexDirection: 'column-reverse'
            }}
            dataLength={messages.length}
            hasMore={hasMore}
            loader={loading}
            inverse={true}
            scrollThreshold={0.8}
            initialScrollY={500}
            next={loadMoreMessages}
            scrollableTarget="scroll-id"
          >
            <MessageThread messages={messages} setMessages={setMessages} />
          </InfiniteScroll>
        </List>
        {messages && (
          <MessageInputPage
            onSend={(msg) => setMessages((prev) => [msg, ...prev])}
          />
        )}
      </Container>
    </>
  );
}
