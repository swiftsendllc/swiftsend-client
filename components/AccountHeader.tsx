import UnFollowModal from '@/app/[username]/components/UnFollowModal';
import UploadModal from '@/app/[username]/components/UploadModal';
import useAPI from '@/hooks/api/useAPI';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import { CreatorContext } from '@/hooks/context/creator-context';
import { UserContext } from '@/hooks/context/user-context';
import {
  Add,
  ArrowBack,
  Dashboard,
  Edit,
  MessageOutlined,
  MoreVertOutlined,
  Navigation,
  ViewList
} from '@mui/icons-material';
import { Box, Button, Link, Stack, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { MusicModal } from './MusicModal';

interface FollowButtonProps {
  isFollowedByMe: boolean;
  setUnFollowModal: (following: boolean) => unknown;
  handleFollow: () => unknown;
}

const FollowButton = (props: FollowButtonProps) => {
  const [isFollowedByMe, setIsFollowedByMe] = useState<boolean>(props.isFollowedByMe);
  useEffect(() => setIsFollowedByMe(props.isFollowedByMe), [props.isFollowedByMe]);
  return (
    <Button
      fullWidth
      variant="contained"
      color="inherit"
      onClick={() => (isFollowedByMe ? props.setUnFollowModal(true) : props.handleFollow())}
      sx={{
        borderRadius: '30px',
        transition: 'all 0.3s ease',
        '&:hover': { backgroundColor: 'primary.main', color: 'white' }
      }}
    >
      <Typography color="primary">{isFollowedByMe ? 'Connected' : 'Connect'}</Typography>
    </Button>
  );
};

export function AccountHeader() {
  const { followProfile } = useAPI();
  const { createChannel } = useMessageAPI();
  const [user] = useContext(UserContext);
  const router = useRouter();
  const [unFollowModal, setUnFollowModal] = useState(false);
  const [musicModal, setMusicModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [creator, setCreator] = useContext(CreatorContext);

  const stats = [
    { title: 'entries', count: creator.postCount },
    { title: 'connections', count: creator.followerCount, path: `/${creator.username}/connections` },
    { title: 'connected', count: creator.followingCount, path: `/${creator.username}/connected` }
  ];

  const loadChannel = async (userId: string) => {
    try {
      const { _id } = await createChannel(userId);
      router.push(`/channels/${_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (userId: string) => {
    try {
      await followProfile(userId);
      setCreator((prev) => ({
        ...prev,
        isFollowedByMe: true,
        followerCount: prev.followerCount + 1
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const isViewer = user.userId !== creator.userId;

  return (
    <Box display={'flex'}>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        sx={{
          borderBottom: '1px solid',
          backdropFilter: 'blur(4px)',
          px: 2,
          py: 3
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          maxWidth="1200px"
        >
          {/* ===========>>>>>...LEFT BUTTONS....<<<<<<==============*/}
          <Stack direction="row" spacing={1}>
            <Tooltip title="RETURN">
              <Button onClick={() => router.back()} variant="contained" color="primary">
                <ArrowBack />
              </Button>
            </Tooltip>
            <Tooltip title="Share">
              <Button variant="contained" color="primary">
                <Navigation />
              </Button>
            </Tooltip>
            <Tooltip title="New Upload">
              <Button variant="contained" color="secondary" onClick={() => setCreateModal(true)}>
                <Add />
              </Button>
            </Tooltip>
            {isViewer ? (
              <Tooltip title="More Options">
                <Button variant="contained">
                  <MoreVertOutlined />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title="Settings">
                <Button variant="contained" color="inherit" onClick={() => router.push(`/${user.username}/settings`)}>
                  <ViewList />
                </Button>
              </Tooltip>
            )}
          </Stack>
          {/* ===========>>>>>...STATS....<<<<<<==============*/}
          <Stack direction="row" spacing={4} alignItems="center">
            {stats.map((item, idx) => (
              <Box key={idx} textAlign="center">
                {item.path ? (
                  <Link href={item.path}>
                    <Tooltip title={item.title.toLocaleUpperCase()}>
                      <Typography variant="h6">{item.count}</Typography>
                    </Tooltip>
                  </Link>
                ) : (
                  <Typography variant="h6">{item.count}</Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  {item.title}
                </Typography>
              </Box>
            ))}
          </Stack>
          {/* ===========>>>>>...ACTION BUTTONS....<<<<<<==============*/}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {isViewer ? (
              creator.hasSubscribed && (
                <>
                  <Tooltip title="Follow user">
                    <FollowButton
                      handleFollow={() => handleFollow(creator.userId)}
                      isFollowedByMe={creator.isFollowedByMe}
                      setUnFollowModal={setUnFollowModal}
                    />
                  </Tooltip>
                  <Tooltip title="Send message">
                    <Button variant="contained" color="secondary" onClick={() => loadChannel(creator.userId)}>
                      <MessageOutlined />
                      &nbsp;Message
                    </Button>
                  </Tooltip>
                </>
              )
            ) : (
              <>
                <Tooltip title="Edit tour profile">
                  <Button fullWidth variant="contained" href={`/${user.username}/profile`} LinkComponent={Link}>
                    <Edit />
                    &nbsp;Profile
                  </Button>
                </Tooltip>
                <Tooltip title="View dashboard">
                  <Button fullWidth variant="contained">
                    <Dashboard />
                    &nbsp;Dashboard
                  </Button>
                </Tooltip>
              </>
            )}
          </Stack>
        </Stack>

        <UnFollowModal isOpen={unFollowModal} onClose={() => setUnFollowModal(false)} />
        <MusicModal isOpen={musicModal} onClose={() => setMusicModal(false)} />
        <UploadModal isOpen={createModal} onClose={() => setCreateModal(false)} />
      </Box>
    </Box>
  );
}
