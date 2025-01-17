"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { UserContext } from "./user-context";

const emptySocket = null as unknown as Socket;

export const SocketContext = createContext<{
  socket: Socket | null;
  onlineUsers: string[];
}>({
  socket: emptySocket,
  onlineUsers: [],
});

export const SocketContextProvider = ({
  children,
  serverURL,
}: {
  children: React.ReactNode;
  serverURL: string;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnLineUsers] = useState<string[]>([]);
  const [user] = useContext(UserContext);

  const userId = user?.userId || null;

  useEffect(() => {
    if (userId) {
      const socketConnection = io(serverURL, { query: { userId } });
      setSocket(socketConnection);

      socketConnection.on("connect", () => {
        console.log("Socket connected successfully:", socketConnection.id);
      });

      socketConnection.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });

      socketConnection.on("getOnlineUsers", (users: string[]) => {
        setOnLineUsers(users);
      });

      socketConnection.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      return () => {
        if (socketConnection) {
          socketConnection.disconnect();
        }
      };
    }
  }, [userId, serverURL]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
