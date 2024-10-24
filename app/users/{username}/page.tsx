"use client";

import { AccountPage } from "@/app/account/components/Account";
import { UserProfilesEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import { UserContext } from "@/hooks/useContext";
import { useContext, useEffect, useState } from "react";

export default function SingleUser() {
  const { getUserProfileById } = useAPI();
  const [getUser, setGetUser] = useState<UserProfilesEntity | undefined>(
    undefined
  );
  const [user] = useContext(UserContext);

  const loadUser = async () => {
    if (!user || !user.userId) return;
    try {
      const fetchUser = await getUserProfileById(user.userId as string);
      setGetUser(fetchUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.userId) loadUser();
  }, [user?.userId]);

  return (
    <>
      {getUser && <AccountPage user={getUser} onMutation={loadUser} />}
    </>
  );
}
