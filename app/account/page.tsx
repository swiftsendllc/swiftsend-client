import { UserContext } from "@/hooks/useContext";
import { useContext } from "react";
import AccountPostPage from "./components/Account";

export default function Account() {
  const [user] = useContext(UserContext);
  return <AccountPostPage user={user} />;
}
