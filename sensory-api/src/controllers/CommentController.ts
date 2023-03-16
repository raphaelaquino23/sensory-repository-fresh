import {
  Comment,
  CommentInformation,
  CommentStats,
} from "../models/CommentModel";
import { CommentService } from "../service/CommentService";
import { winstonLogger } from "../logger/winston.logger";

export class CommentController {
  private commentService: CommentService;

  constructor() {
    this.commentService = new CommentService();
  }

  async getComment() {
    winstonLogger.info("Controller: getComment", null);
    return await this.commentService.getComment();
  }

  async getCommentById(id: number) {
    winstonLogger.info("Controller: getComment", null);
    return await this.commentService.getCommentById(id);
  }

  async getCommentByPostId(id: number) {
    winstonLogger.info("Controller: getComment", null);
    return await this.commentService.getCommentByPostId(id);
  }

  async getCommentInformation() {
    winstonLogger.info("Controller: getCommentInformation", null);
    return await this.commentService.getCommentInformation();
  }

  async getCommentInformationById(id: number) {
    winstonLogger.info("Controller: getCommentInformation", null);
    return await this.commentService.getCommentInformationById(id);
  }

  async getCommentStats() {
    winstonLogger.info("Controller: getCommentInformation", null);
    return await this.commentService.getCommentStats();
  }

  async createComment(
    comment: Comment,
    commentInformation: CommentInformation,
    commentStats: CommentStats
  ) {
    winstonLogger.info("Controller: createComment", comment);
    return await this.commentService.createComment(
      comment,
      commentInformation,
      commentStats
    );
  }

  async createCommentInformation(commentinformation: CommentInformation) {
    winstonLogger.info(
      "Controller: createCommentInformation",
      commentinformation
    );
    return await this.commentService.createCommentInformation(
      commentinformation
    );
  }

  async createCommentStats(commentstats: CommentStats) {
    winstonLogger.info("Controller: createCommentStats", commentstats);
    return await this.commentService.createCommentStats(commentstats);
  }

  async updateComment(
    comment: Comment,
    commentInformation: CommentInformation,
    commentStats: CommentStats
  ) {
    winstonLogger.info("Controller: updateComment", comment);
    return await this.commentService.updateComment(
      comment,
      commentInformation,
      commentStats
    );
  }

  async updateCommentInformation(commentinformation: CommentInformation) {
    winstonLogger.info(
      "Controller: updateCommentInformation",
      commentinformation
    );
    return await this.commentService.updateCommentInformation(
      commentinformation
    );
  }

  async updateCommentStats(commentstats: CommentStats) {
    winstonLogger.info("Controller: updateCommentStats", commentstats);
    return await this.commentService.updateCommentStats(commentstats);
  }

  async deleteComment(Comment_Id: number) {
    winstonLogger.info("Controller: deleteComment", Comment_Id);
    return await this.commentService.deleteComment(Comment_Id);
  }
  async deleteCommentInformation(CommentInformation_Id: number) {
    winstonLogger.info(
      "Controller: deleteCommentInformation",
      CommentInformation_Id
    );
    return await this.commentService.deleteCommentInformation(
      CommentInformation_Id
    );
  }
  async deleteCommentStats(CommentStats_Id: number) {
    winstonLogger.info("Controller: deleteCommentStats", CommentStats_Id);
    return await this.commentService.deleteCommentStats(CommentStats_Id);
  }
}
