'use client';

import MessageInput from '@/app/channels/[channelId]/components/MessageInput';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import { ChannelContext } from '@/hooks/context/channel-context';
import { UserContext } from '@/hooks/context/user-context';
import { MessagesEntity } from '@/hooks/entities/messages.entities';
import { Container, List } from '@mui/material';
import { getCookie } from 'cookies-next';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChatHeader from './components/ChatHeader';
import EncryptionNotice from './components/EncryptionNotice';
import { GetSocketMessages } from './components/GetSocketMessages';
import MessageThread from './components/MessageThread';

export default function MessagePage() {
  const limit = 20;
  const { channelId } = useParams();
  const [user] = useContext(UserContext);
  const [hasMore, setHasMore] = useState(true);
  const [channel] = useContext(ChannelContext);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<MessagesEntity[]>([]);
  const { getChannelMessages } = useMessageAPI();
  const [checkBox, setCheckBox] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>('');
  const [selectedMessageIds, setSelectedMessageIds] = useState<string[]>([]);
  GetSocketMessages({ setMessages });

  useEffect(() => {
    const backgroundImageCookie = getCookie('imageURL');
    if (backgroundImageCookie && messages.length !== 0)
      setBackgroundImage(backgroundImageCookie);
  }, [backgroundImage, messages.length]);

  const loadChannelMessages = async (initialLoad = false) => {
    const offset = initialLoad ? 0 : messages.length;

    setLoading(true);
    try {
      const messages = await getChannelMessages(channelId as string, {
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
      console.log(error);
      toast.error('Failed to load messages!');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMessages = () => {
    if (hasMore && !loading) {
      loadChannelMessages();
    }
  };

  useEffect(() => {
    if (channelId) loadChannelMessages();
  }, [channelId]); // eslint-disable-line

  return (
    <>
      <Container
        maxWidth="xs"
        style={{
          padding: 0,
          marginBottom: 60
        }}
      >
        <ChatHeader
          channel={channel}
          loading={loading}
          checkBox={checkBox}
          messages={messages}
          setCheckBox={setCheckBox}
          selectedMessageIds={selectedMessageIds}
          setSelectedMessageIds={setSelectedMessageIds}
          setBackgroundImage={setBackgroundImage}
          onDelete={() =>
            setMessages((prev) =>
              prev.map((msg) =>
                selectedMessageIds.includes(msg._id)
                  ? {
                      ...msg,
                      messageIds: selectedMessageIds,
                      deleted: true,
                      deletedAt: new Date()
                    }
                  : msg
              )
            )
          }
        />
        {messages.length === 0 ? (
          <EncryptionNotice />
        ) : (
          <>
            <List
              sx={{
                height: '1000px',
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                background: `url('${backgroundImage}')`,
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
                inverse={true}
                scrollThreshold={0.8}
                next={loadMoreMessages}
                loader={loading}
                initialScrollY={500}
                scrollableTarget="scroll-id"
              >
                <MessageThread
                  user={user}
                  channel={channel}
                  messages={messages}
                  checkBox={checkBox}
                  setMessages={setMessages}
                  selectedMessageIds={selectedMessageIds}
                  setSelectedMessageIds={setSelectedMessageIds}
                />
              </InfiniteScroll>
            </List>
          </>
        )}
        {messages && (
          <MessageInput
            onMessage={(msg) => setMessages((prev) => [msg, ...prev])}
          />
        )}
      </Container>
    </>
  );
}
