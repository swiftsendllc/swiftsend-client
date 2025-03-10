'use client';

import PaymentModalWrapper from '@/components/PaymentModal';
import usePaymentAPI from '@/hooks/api/usePaymentAPI';
import usePostAPI from '@/hooks/api/usePostAPI';
import { UserContext } from '@/hooks/context/user-context';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import { Container, Divider, LinearProgress, List } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostCard } from '../../posts/components/Post';
import { HomeHeaderPage } from './HomeHeader';

export default function HomePage() {
  const limit = 10;
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const { getTimelinePosts, getPost } = usePostAPI();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState<PostsEntity | null>(null);
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const [purchased, setPurchased] = useState<boolean>(false);
  const [user] = useContext(UserContext);
  const { createPayment } = usePaymentAPI();

  const loadPosts = async (initialLoad = false) => {
    const offset = initialLoad ? 0 : posts.length;
    setLoading(true);
    try {
      const posts = await getTimelinePosts({ offset, limit });

      if (initialLoad) {
        setPosts(posts);
      } else {
        setHasMore(posts.length === limit);
        setPosts((prev) => [...prev, ...posts]);
      }
    } catch (error) {
      console.log(error);
      toast.success('Loading feed...');
    } finally {
      setLoading(false);
    }
  };

  const makePayment = async (paymentMethodId: string) => {
    if (!selectedPost) {
      return {
        requiresAction: false,
        clientSecret: ''
      };
    }

    const paymentResponse = await createPayment(selectedPost.user.userId, {
      amount: selectedPost.price,
      contentId: selectedPost._id,
      payment_method: paymentMethodId,
      payment_method_types: ['card']
    });
    return {
      requiresAction: paymentResponse.requiresAction,
      clientSecret: paymentResponse.clientSecret
    };
  };

  const handleSuccess = async (postId: string) => {
    try {
      const purchasedPost =( await getPost(postId) as PostsEntity);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === selectedPost?._id
            ? { ...post, imageUrls:purchasedPost.imageUrls }
            : post
        )
      );
      setPurchased(true);
    } catch (error) {
      console.error(error);
      toast.error('SOMETHING WRONG HAPPENED');
    }
  };

  const handleClose = () => {
    setSelectedPost(null);
    setPaymentModal(false);
  };

  const loadMorePosts = () => {
    console.log('end');
    if (hasMore && !loading) {
      loadPosts();
    }
  };

  useEffect(() => {
    loadPosts();
  }, []); //eslint-disable-line

  return (
    <>
      {selectedPost && (
        <PaymentModalWrapper
          isOpen={paymentModal}
          onClose={handleClose}
          metadata={{
            userId: user.userId,
            creatorId: selectedPost.user.userId,
            contentId: selectedPost._id
          }}
          makePayment={makePayment}
          onSuccess={() => handleSuccess(selectedPost._id)}
        />
      )}
      <Container maxWidth="xs" style={{ padding: 0 }} sx={{ mt: 2, mb: 8 }}>
        <HomeHeaderPage />
        <Divider sx={{ mt: 1 }} />
        <List
          sx={{
            height: '800px',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            objectFit: 'cover'
          }}
          id="scroll-id"
        >
          <InfiniteScroll
            style={{
              flexDirection: 'column',
              display: 'flex',
              overflow: 'hidden'
            }}
            dataLength={posts.length}
            next={loadMorePosts}
            hasMore={hasMore}
            loader={loading && <LinearProgress />}
            initialScrollY={500}
            scrollThreshold={0.9}
            scrollableTarget="scroll-id"
          >
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                setPaymentModal={setPaymentModal}
                setSelectedPost={setSelectedPost}
                purchased={purchased}
                isFollowing={isFollowing}
                setIsFollowing={setIsFollowing}
              />
            ))}
          </InfiniteScroll>
        </List>
      </Container>
    </>
  );
}
