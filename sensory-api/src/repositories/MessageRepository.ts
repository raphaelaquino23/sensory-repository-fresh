import { Op } from "sequelize";
import { connect } from "../config/db.config";
import { winstonLogger } from "../logger/winston.logger";
import { Message } from "../models/MessageModel";
import { User, UserInformation } from "../models/UserModel";

import CryptoJS from "crypto-js";

export class MessageRepository {
  private db: any = {};
  private messageRepository: any;
  private userRepository: any;
  private userInformationRepository: any;

  constructor() {
    this.db = connect();
    this.messageRepository = this.db.sequelize.getRepository(Message);
    this.userRepository = this.db.sequelize.getRepository(User);
    this.userInformationRepository =
      this.db.sequelize.getRepository(UserInformation);
  }

  async getMessage() {
    try {
      const Message = await this.messageRepository.findAll();
      console.log("Messages::: ", Message);
      return Message;
    } catch (error) {
      return [];
    }
  }

  //GET BY ID MESSAGE
  async getMessageById(MessageId: number) {
    try {
      const Message = await this.messageRepository.findOne({
        where: { Message_Id: MessageId },
      });
      console.log("Messages:::", Message);
      //decrypt message content
      let decryptedData = Message.Message_Content;
      const secretPass = "XkhZG4fW2t2W";

      const decryptData = () => {
        const bytes = CryptoJS.AES.decrypt(Message.Message_Content, secretPass);
        const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        decryptedData = decrypted;
      };
      decryptData();
      Message.Message_Content = decryptedData;

      return Message;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  async getAllMessageFromUserId(UserId: number) {
    try {
      const Messages = await this.messageRepository.findAll({
        where: {
          [Op.or]: [{ Sender_Id: UserId }, { Receiver_Id: UserId }],
        },
      });

      Messages.forEach(function (Message: any) {
        //decrypt message content
        let decryptedData = Message.Message_Content;
        const secretPass = "XkhZG4fW2t2W";

        const decryptData = () => {
          const bytes = CryptoJS.AES.decrypt(
            Message.Message_Content,
            secretPass
          );
          const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          decryptedData = decrypted;
        };
        decryptData();
        Message.Message_Content = decryptedData;
      });

      console.log("Messages:::", Messages);
      return Messages;
    } catch (error) {
      return [];
    }
  }

  
  async getAllSentMessagesFromUserId(UserId: number) {
    try {
      const Messages = await this.messageRepository.findAll({
        where: {Sender_Id: UserId},
      });

      Messages.forEach(function (Message: any) {
        //decrypt message content
        let decryptedData = Message.Message_Content;
        const secretPass = "XkhZG4fW2t2W";

        const decryptData = () => {
          const bytes = CryptoJS.AES.decrypt(
            Message.Message_Content,
            secretPass
          );
          const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          decryptedData = decrypted;
        };
        decryptData();
        Message.Message_Content = decryptedData;
      });

      console.log("Messages:::", Messages);
      return Messages;
    } catch (error) {
      return [];
    }
  }

  async createMessage(
    Message: Message,
    SenderName: String,
    ReceiverName: String
  ) {
    let userSearch,
      userId,
      senderId,
      receiverId,
      receiverSearch,
      receivedId,
      data = {};
    let encryptedData: string;

    const secretPass = "XkhZG4fW2t2W";

    try {
      console.log("---------------USER SEARCH");
      userSearch = await this.userInformationRepository.findOne({
        where: { UserInformation_Name: SenderName },
      });
      console.log("---------------USER SEARCH " + userSearch);
      if (userSearch) {
        console.log("---------------USER SEARCH SUCESS " + userSearch);
        console.log("---------------USER ID");
        userId = await this.userRepository.findOne({
          where: {
            UserInformation_Id: userSearch.getDataValue("UserInformation_Id"),
          },
        });
        console.log("---------------USER ID " + userId);
        if (userId) {
          console.log("---------------USER ID SUCCESS " + userId);
          senderId = userId.getDataValue("User_Id");
          Message.Sender_Id = senderId;
          console.log("---------------RECEVIER SEARCH --");
          receiverSearch = await this.userInformationRepository.findOne({
            where: { UserInformation_Name: ReceiverName },
          });
          if (receiverSearch) {
            // console.log("---------------RECIEVER ID " + receiverId);
            // console.log("---------------RECIEVER CHECK " + Message.Receiver_Id);
            // console.log("---------------RECIEVER ID SUCCESS" + receivedId);
            receiverId = await this.userRepository.findOne({
              where: {
                UserInformation_Id:
                  receiverSearch.getDataValue("UserInformation_Id"),
              },
            });
            if (receiverId) {
              receivedId = receiverId.getDataValue("User_Id");
              Message.Receiver_Id = receivedId;
            }
            Message.Message_DateCreated = new Date();
            encryptedData = Message.Message_Content;
            //Encrypt message content
            const encryptData = () => {
              const encrypted = CryptoJS.AES.encrypt(
                JSON.stringify(Message.Message_Content),
                secretPass
              ).toString();
              encryptedData = encrypted;
            };
            encryptData();
            Message.Message_Content = encryptedData;
            data = await this.messageRepository.create(Message);
          }
        }
      }
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async updateMessage(Message: Message) {
    let data = {};
    try {
      data = await this.messageRepository.update(
        { ...Message },
        {
          where: {
            Message_Id: Message.Message_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async deleteMessage(Message_Id: number) {
    let data = {};
    try {
      data = await this.messageRepository.destroy({
        where: {
          Message_Id: Message_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }
}
