import { authCookieKey, ENV } from '@/library/constants';
import { getCookie } from 'cookies-next';
import { UploadedEntity } from '../entities/messages.entities';
import { CommentPostInput, UpdatePostInput } from '../entities/posts.entities';

const usePostAPI = () => {
  const uploadFile = async (formData: FormData) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/posts/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formData
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data as UploadedEntity[];
  };

  const createPost = async (input: {
    imageUrls: string[] | null;
    blurredImageUrls: string[] | null;
    caption: string;
    isExclusive: boolean;
    price: number | null;
  }) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/posts/create`, {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const getPost = async (postId: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/posts/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const getPosts = async () => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const getCreatorPosts = async (userId: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV('NEXT_PUBLIC_API_URL')}/posts/creators/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const getSavedPosts = async () => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/posts/user/saved`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const editPost = async (body: Partial<UpdatePostInput>, _id: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/posts/${_id}/edit`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const deletePost = async (_id: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV('NEXT_PUBLIC_API_URL')}/posts/${_id}/delete`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const likePost = async (_id: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/posts/${_id}/like`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const commentPost = async (body: Partial<CommentPostInput>, _id: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV('NEXT_PUBLIC_API_URL')}/posts/${_id}/create-comment`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const deleteComment = async (postId: string, commentId: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV('NEXT_PUBLIC_API_URL')}/posts/${postId}/comments/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const savePost = async (_id: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/posts/${_id}/save`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const getTimelinePosts = async (query: { offset: number; limit: number }) => {
    const accessToken = getCookie(authCookieKey);
    const { offset, limit } = query;
    const res = await fetch(
      `${ENV(
        'NEXT_PUBLIC_API_URL'
      )}/posts/timeline?offset=${offset}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const getCommentsCreatedByYou = async () => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV('NEXT_PUBLIC_API_URL')}/posts/user/commented`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const getLikedPosts = async () => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/posts/user/liked`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };
  return {
    createPost,
    getPost,
    getPosts,
    editPost,
    deletePost,
    likePost,
    commentPost,
    savePost,
    getTimelinePosts,
    getSavedPosts,
    getCreatorPosts,
    deleteComment,
    getCommentsCreatedByYou,
    getLikedPosts,
    uploadFile
  };
};
export default usePostAPI;
