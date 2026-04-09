import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    if (!selectedConversation?._id) {
      setMessage([]);
      return;
    }

    const getMessages = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`/api/message/get/${selectedConversation._id}`);
        setMessage(res.data);
      } catch (error) {
        console.log("Error in getting messages", error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessage]);

  return { loading, messages };
};

export default useGetMessage;
