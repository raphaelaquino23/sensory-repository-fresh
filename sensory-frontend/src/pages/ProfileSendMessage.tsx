import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageService from "../services/MessageService";

type MessageFormProps = {
  currentUsername: string;
  onClose: () => void;
};

type MessageObject = {
  ReceiverName: string | undefined;
  SenderName: string | undefined;
  message: Message;
};

type Message = {
  Message_Content: string;
}

interface UserInformation {
  UserInformation_Id: number;
  UserInformation_Name: string;
  UserType_Id: number;
  UserInformation_Password: string;
  UserInformation_Email: string;
  UserInformation_Description: string;
}

const MessageForm = ({ currentUsername, onClose }: MessageFormProps) => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [currentUserInformation, setCurrentUserInformation] = useState<UserInformation | null>(null);


  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      axios
        .get(`http://localhost:3081/api/getuserid/${username}`)
        .then((response) => {
          const userId = response.data;
          return axios.get(`http://localhost:3081/api/userinformation/${userId}`);
        })
        .then((response) => {
          setCurrentUserInformation(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const messageObject: MessageObject = {
      message: {
        Message_Content: message
      },
      SenderName: currentUserInformation?.UserInformation_Name,
      ReceiverName: currentUsername,
    };
    MessageService.create(messageObject).then((returnedMessage: any) => returnedMessage);
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Subject:
          <input type="text" value={subject} onChange={handleSubjectChange} />
        </label>
        <label>
          Message:
          <input type="text" value={message} onChange={handleContentChange} />
        </label>
        <button type="submit">Send Message</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
