import { authCookieKey } from "@/library/constants";
import { getCookie, setCookie } from "cookies-next";
import {
  CommentPostInput,
  CreatePostInput,
  UpdatePostInput,
  UpdateUserInput,
} from "./types";

const useAPI = () => {
  const login = async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    setCookie(authCookieKey, data.accessToken);

    return data;
  };

  const signup = async (input: {
    email: string;
    password: string;
    fullName: string;
    dateOfBirth: Date;
    region: string;
    gender: string;
  }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    setCookie(authCookieKey, data.accessToken);
    return data;
  };

  const testToken = async () => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const uploadFile = async (formData: FormData) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return {
      path: data.path,
      url: data.url,
    };
  };

  const updateUser = async (body: Partial<UpdateUserInput>) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me/edit`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const createPost = async (body: Partial<CreatePostInput>) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/create`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const getPost = async (postId: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const getPosts = async () => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const editPost = async (body: Partial<UpdatePostInput>, _id: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${_id}/edit`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const deletePost = async (_id: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${_id}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${_id}/like`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const commentPost = async (body: Partial<CommentPostInput>, _id: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${_id}/create-comment`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${_id}/save`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const getTimelinePosts = async () => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/timeline`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  return {
    login,
    signup,
    testToken,
    uploadFile,
    updateUser,
    createPost,
    getPosts,
    editPost,
    deletePost,
    likePost,
    commentPost,
    savePost,
    getTimelinePosts,
    getPost,
  };
};
export default useAPI;
