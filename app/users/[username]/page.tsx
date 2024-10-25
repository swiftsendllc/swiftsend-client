"use client";

import AccountPostPage from "@/app/account/components/Account";
import AccountPage from "@/components/Account";
import BottomNav from "@/components/BottomNav";
import { UserProfilesEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SingleUser() {
  const { getUserProfileById } = useAPI();
  const [getUser, setGetUser] = useState<UserProfilesEntity>();
  const { username } = useParams();

  const loadUser = async () => {
    try {
      const fetchUser = await getUserProfileById(username as string);
      setGetUser(fetchUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []); //eslint-disable-line

  return (
    <>
      {getUser && (
        <>
          <AccountPage user={getUser} />
          <AccountPostPage user={getUser} />
          <BottomNav />
        </>
      )}
    </>
  );
}
