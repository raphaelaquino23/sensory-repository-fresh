import { Message } from "../models/MessageModel";
import { MessageService } from "../service/MessageService";
import { winstonLogger } from "../logger/winston.logger";

export class MessageController {
  private messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  async getMessage() {
    winstonLogger.info("Controller: getMessage", null);
    return await this.messageService.getMessage();
  }

  async getAllMessageFromUserId(id: number) {
    winstonLogger.info("", null);
    return await this.messageService.getAllMessageFromUserId(id);
  }

  async createMessage(
    message: Message,
    SenderName: String,
    ReceiverName: String
  ) {
    winstonLogger.info("Controller: createMessage", message);
    return await this.messageService.createMessage(
      message,
      SenderName,
      ReceiverName
    );
  }
  async updateMessage(message: Message) {
    winstonLogger.info("Controller: updateMessage", message);
    return await this.messageService.updateMessage(message);
  }
  async deleteMessage(Message_Id: number) {
    winstonLogger.info("Controller: deleteMessage", Message_Id);
    return await this.messageService.deleteMessage(Message_Id);
  }
}
