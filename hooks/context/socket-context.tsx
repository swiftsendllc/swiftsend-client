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

export const SocketContextWrapper = ({
  children,
  serverURL,
}: {
  children: React.ReactNode;
  serverURL: string;
}) => {
  const [user] = useContext(UserContext);
  const userId = user?.userId || null;
  const socket = io(serverURL, { query: { userId } });
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected successfully:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    socket.on("getOnlineUsers", (users: string[]) => {
      setOnlineUsers(users);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []); //eslint-disable-line

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const { socket, onlineUsers } = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket is not in context");
  }

  return { socket, onlineUsers };
};
