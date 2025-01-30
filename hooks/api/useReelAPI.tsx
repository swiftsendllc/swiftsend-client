import { authCookieKey } from "@/library/constants";
import { getCookie } from "cookies-next";
import { CreateReelInput } from "../entities/reels.entities";
import { ENV } from "@/util/constants";

const userReelAPI = () => {
  const createReel = async (body: Partial<CreateReelInput>) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV("NEXT_PUBLIC_API_URL")}/reels/create`, {
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

  const getReels = async () => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV("NEXT_PUBLIC_API_URL")}/reels`, {
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

  const getCreatorReels = async (userId: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV("NEXT_PUBLIC_API_URL")}/reels/creators/${userId}`,
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
    createReel,
    getReels,
    getCreatorReels,
  };
};
export default userReelAPI;
