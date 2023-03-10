import { Op } from "sequelize";
import { connect } from "../config/db.config";
import { Message } from "../models/MessageModel";
import { User, UserInformation } from "../models/UserModel";
import { winstonLogger } from "../logger/winston.logger";

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
      winstonLogger.log("error", { error });
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
      return Message;
    } catch (error) {
      winstonLogger.log("error", { error });
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
      console.log("Messages:::", Messages);
      return Messages;
    } catch (error) {
      winstonLogger.log("error", { error });
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
            data = await this.messageRepository.create(Message);
          }
        }
      }
    } catch (error) {
      winstonLogger.log("error", { error });
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
      winstonLogger.log("error", { error });
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
      winstonLogger.log("error", { error });
    }
    return data;
  }
}
