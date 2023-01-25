import { Comment, CommentInformation, CommentStats } from "../models/CommentModel";
import { CommentRepository } from "../repositories/CommentRepository";


export class CommentService {
	private commentRepository: CommentRepository;

	constructor() {
		this.commentRepository = new CommentRepository;
	}

  async getComment() {
		return await this.commentRepository.getComment();
	}

  async getCommentById(id:number) {
		return await this.commentRepository.getCommentById(id);
	}

	async getCommentByPostId(id:number) {
		return await this.commentRepository.getCommentByPostId(id);
	}

  async createComment(comment: Comment, commentInformation: CommentInformation, commentStats: CommentStats) {
		return await this.commentRepository.createComment(comment, commentInformation, commentStats);
	}

	async updateComment(comment: Comment, commentInformation: CommentInformation, commentStats: CommentStats) {
		return await this.commentRepository.updateComment(comment, commentInformation, commentStats);
	}
  
	async deleteComment(Comment_Id: number) {
		return await this.commentRepository.deleteComment(Comment_Id);
	}

  async getCommentInformation() {
		return await this.commentRepository.getCommentInformation();
	}

  async getCommentInformationById(id:number) {
		return await this.commentRepository.getCommentInformationById(id);
	}


  async createCommentInformation(commentinformation: CommentInformation) {
		return await this.commentRepository.createCommentInformation(commentinformation);
	}

	async updateCommentInformation(commentInformation: CommentInformation) {
		return await this.commentRepository.updateCommentInformation(commentInformation);
	}
  
	async deleteCommentInformation(CommentInformation_Id: number) {
		return await this.commentRepository.deleteCommentInformation(CommentInformation_Id);
	}
  async getCommentStats() {
		return await this.commentRepository.getCommentStats();
	}

  async createCommentStats(commentStats: CommentStats) {
		return await this.commentRepository.createCommentStats(commentStats);
	}

	async updateCommentStats(commentStats: CommentStats) {
		return await this.commentRepository.updateCommentStats(commentStats);
	}
  
	async deleteCommentStats(CommentStats_Id: number) {
		return await this.commentRepository.deleteCommentStats(CommentStats_Id);
	}
}