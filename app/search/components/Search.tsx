'use client';
import { StyledBadge } from '@/components/SearchComponents';
import useAPI from '@/hooks/api/useAPI';
import usePostAPI from '@/hooks/api/usePostAPI';
import { UserContext } from '@/hooks/context/user-context';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import { UserProfilesEntity } from '@/hooks/entities/users.entities';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Fab,
  LinearProgress,
  List,
  Stack,
  TextField
} from '@mui/material';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDebounce } from 'use-debounce';
import { SearchFeed } from './SearchFeed';

export default function SearchPage() {
  const limit = 20;
  const { getUserProfiles } = useAPI();
  const [user] = useContext(UserContext);
  const { getTimelinePosts } = usePostAPI();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isSearchFieldOpen, setIsSearchFieldOpen] = useState(false);
  const [posts, setPosts] = useState<PostsEntity[]>([]);
  const [users, setUsers] = useState<UserProfilesEntity[]>([]);

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
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async (query: string) => {
    try {
      const searchUsers = (await getUserProfiles(query)) as UserProfilesEntity[];
      setUsers(searchUsers);
    } catch (error) {
      console.log(error);
    }
  };
  const [debouncedSearch] = useDebounce(loadUsers, 350);

  const handleClose = () => {
    setIsSearchFieldOpen(false);
  };
  const loadMorePosts = () => {
    if (hasMore && !loading) {
      loadPosts();
    }
  };

  useEffect(() => {
    loadPosts();
  }, []); // eslint-disable-line

  return (
    <Container sx={{ p: 0, mt: 2, pl: { xs: 0, md: 24 },position:"fixed" }}>
      {isSearchFieldOpen ? (
        <TextField
          label="Search"
          sx={{ width: '100%' }}
          slotProps={{
            input: {
              sx: { borderRadius: '10px', padding: '0' },
              startAdornment: (
                <Button onClick={handleClose} sx={{ p: '0' }}>
                  <ArrowBackIcon />
                  <Divider orientation="vertical" variant="middle" />
                </Button>
              ),
              endAdornment: (
                <Button color="inherit">
                  <FilterAltIcon />
                </Button>
              )
            }
          }}
          onFocus={() => setIsSearchFieldOpen(true)}
          onChange={(e) => {
            debouncedSearch(e.target.value);
          }}
        />
      ) : (
        <Stack direction="row" justifyContent="space-between" alignContent="center" alignItems="center">
          <Avatar src={user.avatarURL} alt="Profile picture" sx={{ width: 40, height: 40 }} />

          <TextField
            label="Search"
            sx={{ width: '60%' }}
            slotProps={{
              input: {
                sx: { borderRadius: '10px' }
              }
            }}
            onFocus={() => setIsSearchFieldOpen(true)}
            onChange={(e) => {
              debouncedSearch(e.target.value);
            }}
          />

          <Fab sx={{ width: 40, height: 40 }} color="primary" aria-label="edit" variant="circular">
            <NotificationsNoneOutlinedIcon />
          </Fab>
          <Fab
            sx={{ width: 40, height: 40 }}
            color="secondary"
            aria-label="edit"
            variant="circular"
            href="/saved"
            LinkComponent={Link}
          >
            <BookmarkBorderOutlinedIcon />
          </Fab>
        </Stack>
      )}

      <Divider sx={{ mt: 1 }} />

      {isSearchFieldOpen ? (
        <>
          {users.map((user) => (
            <Card sx={{ mb: 0.5, width: '100%', p: 0, m: 0 }} key={user.userId} onBlur={handleClose}>
              <CardHeader
                avatar={
                  <StyledBadge
                    isOnline={user.isOnline}
                    overlap="circular"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    badgeContent
                    variant="dot"
                  >
                    <Avatar
                      aria-label="recipe"
                      src={user.avatarURL}
                      alt={user.fullName}
                      sx={{ width: 40, height: 40 }}
                    />
                  </StyledBadge>
                }
                title={user.fullName}
                subheader={user.username}
              />
            </Card>
          ))}
        </>
      ) : (
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
            style={{
              flexDirection: 'column',
              display: 'flex',
              overflow: 'hidden'
            }}
            hasMore={hasMore}
            dataLength={posts.length}
            next={loadMorePosts}
            scrollThreshold={0.9}
            scrollableTarget="scroll-id"
            initialScrollY={500}
            loader={loading && <LinearProgress />}
          >
            <SearchFeed post={posts} />
          </InfiniteScroll>
        </List>
      )}
    </Container>
  );
}
