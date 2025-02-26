'use client';

import usePostAPI from '@/hooks/api/usePostAPI';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import { Container, Divider, LinearProgress, List } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostCard } from '../../posts/components/Post';
import { HomeHeaderPage } from './HomeHeader';

export default function HomePage() {
  const limit = 10;
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const { getTimelinePosts } = usePostAPI();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
              <PostCard key={post._id} post={post} />
            ))}
          </InfiniteScroll>
        </List>
      </Container>
    </>
  );
}
