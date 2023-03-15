import { APILogger } from '../logger/api.logger';
import { Comment, CommentInformation, CommentStats } from '../models/CommentModel';
import { CommentService } from '../service/CommentService';

export class CommentController {

  private commentService: CommentService;
  private logger: APILogger;

  constructor() {
    this.commentService = new CommentService();
    this.logger = new APILogger();
  }

  async getComment() {
    this.logger.info('Controller: getComment', null)
    return await this.commentService.getComment();
  }

  async getCommentById(id:number) {
    this.logger.info('Controller: getComment', null)
    return await this.commentService.getCommentById(id);
  }

  async getCommentByPostId(id:number) {
    this.logger.info('Controller: getComment', null)
    return await this.commentService.getCommentByPostId(id);
  }

  async getCommentInformation() {
    this.logger.info('Controller: getCommentInformation', null)
    return await this.commentService.getCommentInformation();
  }

  async getCommentInformationById(id:number) {
    this.logger.info('Controller: getCommentInformation', null)
    return await this.commentService.getCommentInformationById(id);
  }
  
  async getCommentStats() {
    this.logger.info('Controller: getCommentInformation', null)
    return await this.commentService.getCommentStats();
  }

  async createComment(comment: Comment, commentInformation: CommentInformation, commentStats: CommentStats) {
    this.logger.info('Controller: createComment', comment);
    return await this.commentService.createComment(comment, commentInformation, commentStats);
  }

  async createCommentInformation(commentinformation: CommentInformation) {
    this.logger.info('Controller: createCommentInformation', commentinformation);
    return await this.commentService.createCommentInformation(commentinformation);
  }

  async createCommentStats(commentstats: CommentStats) {
    this.logger.info('Controller: createCommentStats', commentstats);
    return await this.commentService.createCommentStats(commentstats);
  }

  async updateComment(comment: Comment, commentInformation: CommentInformation, commentStats: CommentStats) {
    this.logger.info('Controller: updateComment', comment);
    return await this.commentService.updateComment(comment, commentInformation, commentStats);
  }

  async updateCommentInformation(commentinformation: CommentInformation) {
    this.logger.info('Controller: updateCommentInformation', commentinformation);
    return await this.commentService.updateCommentInformation(commentinformation);
  }

  async updateCommentStats(commentstats: CommentStats) {
    this.logger.info('Controller: updateCommentStats', commentstats);
    return await this.commentService.updateCommentStats(commentstats);
  }

  async deleteComment(Comment_Id: number) {
    this.logger.info('Controller: deleteComment', Comment_Id);
    return await this.commentService.deleteComment(Comment_Id);
  }
  async deleteCommentInformation(CommentInformation_Id: number) {
    this.logger.info('Controller: deleteCommentInformation', CommentInformation_Id);
    return await this.commentService.deleteCommentInformation(CommentInformation_Id);
  }
  async deleteCommentStats(CommentStats_Id: number) {
    this.logger.info('Controller: deleteCommentStats', CommentStats_Id);
    return await this.commentService.deleteCommentStats(CommentStats_Id);
  }
}