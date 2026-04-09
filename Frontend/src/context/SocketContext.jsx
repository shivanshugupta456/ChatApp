import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const socketContext = createContext();
const socketUrl =
  import.meta.env.VITE_SOCKET_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:4002";

// it is a hook.
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      const nextSocket = io(socketUrl, {
        withCredentials: true,
        query: {
          userId: authUser.user._id,
        },
      });

      setSocket(nextSocket);
      nextSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        nextSocket.close();
        setSocket(null);
        setOnlineUsers([]);
      };
    }

    setSocket(null);
    setOnlineUsers([]);
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
