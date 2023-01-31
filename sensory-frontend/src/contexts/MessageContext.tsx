import { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type MessageContextType = {
  addMessage?: any;
  deleteMessage?: any;
  sortedMessages?: any;
};

export const MessageContext = createContext<MessageContextType>({}); //https://stackoverflow.com/questions/72316650/reactjs-with-typescript-template-usecontext-property-does-not-exists-on-type

const MessageContextProvider = (props: any) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setMessages(JSON.parse(localStorage.getItem('messages')!));
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  });

  const sortedMessages = messages.sort((a, b) =>
    a.message_sender < b.message_sender ? -1 : 1
  ); //https://stackoverflow.com/questions/44147937/property-does-not-exist-on-type-never

  const addMessage = (
    message_sender: string,
    message_receiver: string,
    message_subject: string,
    message_content: string
  ) => {
    setMessages([
      ...messages,
      {
        id: uuidv4(),
        message_sender,
        message_receiver,
        message_subject,
        message_content,
      },
    ]);
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  // const updatePost = (id: number, updatedPost: string) => {
  // 	setPosts(posts.map((post) => post.id === id ? updatedPost : post))
  // }

  return (
    <MessageContext.Provider
      value={{ sortedMessages, addMessage, deleteMessage }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
