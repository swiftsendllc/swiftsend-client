'use client';

import { PostAnalyticsBar } from '@/app/posts/components/PostAnalyticsbar';
import PaymentModalWrapper from '@/components/PaymentModal';
import { GenerateWallpaper } from '@/components/Wallpaper';
import usePaymentAPI from '@/hooks/api/usePaymentAPI';
import usePostAPI from '@/hooks/api/usePostAPI';
import { UserContext } from '@/hooks/context/user-context';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import { Box, LinearProgress, List, useMediaQuery } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostCard } from '../../posts/components/Post';
import { HomeHeader } from './HomeHeader';

export default function HomePage() {
  const limit = 10;
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const { getTimelinePosts, getPost } = usePostAPI();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState<PostsEntity | null>(null);
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [user] = useContext(UserContext);
  const { createPayment } = usePaymentAPI();
  const isMobile = useMediaQuery('max-width(954px)');
  const defaultUrl = `/photos/pexels-nout-gons-80280-378570.jpg`;
  const [wallpaper, setWallpaper] = useState<string>(defaultUrl);
  GenerateWallpaper({ setWallpaper });

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

    const paymentResponse = await createPayment(selectedPost.user.userId, 'post', {
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
      await new Promise((res) => setTimeout(res, 1500));
      const purchasedPost = (await getPost(postId)) as PostsEntity;
      setPosts((prev) =>
        prev.map((post) => {
          const updated =
            post._id === selectedPost?._id
              ? {
                  ...post,
                  isPurchased: purchasedPost.isPurchased,
                  purchasedBy: [...post.purchasedBy, user.userId]
                }
              : post;
          return updated;
        })
      );
      toast.success('Purchased');
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
    if (hasMore && !loading) loadPosts();
  };

  useEffect(() => {
    loadPosts();
  }, []); //eslint-disable-line

  return (
    <Box
      display="flex"
      flexDirection={'row'}
      width="100%"
      height="100vh"
      borderRight={'1px solid'}
      sx={{
        transition: 'backdrop-filter 0.3s ease',
        overflow: 'hidden',
        backgroundImage: `url(${wallpaper})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Box display="flex" flexDirection={'column'}>
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
        <HomeHeader />
        <Box sx={{ borderRight: '1px solid' }}>
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '800px',
              objectFit: 'contain',
              overflowY: 'scroll'
            }}
            id="scroll-d"
          >
            <InfiniteScroll
              dataLength={posts.length}
              next={loadMorePosts}
              hasMore={hasMore}
              loader={<LinearProgress />}
              scrollableTarget="scroll-id"
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  setPaymentModal={setPaymentModal}
                  setSelectedPost={setSelectedPost}
                />
              ))}
            </InfiniteScroll>
          </List>
        </Box>
      </Box>
      {!isMobile && (
        <Box flex={1} display="flex" justifyContent="center" alignItems="center" width={'100%'}>
          <PostAnalyticsBar />
        </Box>
      )}
    </Box>
  );
}
