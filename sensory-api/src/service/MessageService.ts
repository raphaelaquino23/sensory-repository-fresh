import { Message } from "../models/MessageModel";
import { MessageRepository } from "../repositories/MessageRepository";


export class MessageService {
	private messageRepository: MessageRepository;

	constructor() {
		this.messageRepository = new MessageRepository;
	}

  async getMessage() {
		return await this.messageRepository.getMessage();
	}

	async getAllMessageFromUserId(id: number){
    return await this.messageRepository.getAllMessageFromUserId(id);
  }

  async createMessage(message: Message, SenderName: String, ReceiverName: String) {
		return await this.messageRepository.createMessage(message, SenderName, ReceiverName);
	}

	async updateMessage(message: Message) {
		return await this.messageRepository.updateMessage(message);
	}
  
	async deleteMessage(Message_Id: number) {
		return await this.messageRepository.deleteMessage(Message_Id);
	}
}