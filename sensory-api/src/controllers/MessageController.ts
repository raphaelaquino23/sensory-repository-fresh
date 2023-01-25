import { APILogger } from '../logger/api.logger';
import { Message } from '../models/MessageModel';
import { MessageService } from '../service/MessageService';

export class MessageController {

  private messageService: MessageService;
  private logger: APILogger;

  constructor() {
    this.messageService = new MessageService();
    this.logger = new APILogger();
  }

  async getMessage() {
    this.logger.info('Controller: getMessage', null)
    return await this.messageService.getMessage();
  }

  async getAllMessageFromUserId(id: number){
    this.logger.info('', null)
    return await this.messageService.getAllMessageFromUserId(id);
  }


  async createMessage(message: Message, SenderName: String, ReceiverName: String) {
    this.logger.info('Controller: createMessage', message);
    return await this.messageService.createMessage(message, SenderName, ReceiverName);
  }
  async updateMessage(message: Message) {
    this.logger.info('Controller: updateMessage', message);
    return await this.messageService.updateMessage(message);
  }
  async deleteMessage(Message_Id: number) {
    this.logger.info('Controller: deleteMessage', Message_Id);
    return await this.messageService.deleteMessage(Message_Id);
  }
}