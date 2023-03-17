import { connect } from "../config/db.config";
import { winstonLogger } from "../logger/winston.logger";
import {
  Comment,
  CommentInformation,
  CommentStats,
} from "../models/CommentModel";

export class CommentRepository {
  private db: any = {};
  private commentRepository: any;
  private commentInformationRepository: any;
  private commentStatsRepository: any;

  constructor() {
    this.db = connect();
    this.commentRepository = this.db.sequelize.getRepository(Comment);
    this.commentInformationRepository =
      this.db.sequelize.getRepository(CommentInformation);
    this.commentStatsRepository = this.db.sequelize.getRepository(CommentStats);
  }

  async getComment() {
    try {
      const comment = await this.commentRepository.findAll();
      console.log("Comment::: ", comment);
      return comment;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  //GET BY ID COMMENT
  async getCommentById(CommentId: number) {
    try {
      const comment = await this.commentRepository.findOne({
        where: { Comment_Id: CommentId },
      });
      console.log("comments:::", comment);
      return comment;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  //GET BY ID COMMENT
  async getCommentByPostId(PostId: number) {
    try {
      const comments = await this.commentRepository.findAll({
        where: { Post_Id: PostId },
      });
      console.log("comments:::", comments);
      return comments;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  //CREATE COMMENT
  async createComment(
    comment: Comment,
    commentInformation: CommentInformation,
    commentStats: CommentStats
  ) {
    let comInfo,
      comStats,
      data = {};
    try {
      comment.Comment_DateCreated = new Date();
      comInfo = await this.commentInformationRepository.create(
        commentInformation
      );
      comment.CommentInformation_Id = comInfo.getDataValue(
        "CommentInformation_Id"
      );
      comStats = await this.commentStatsRepository.create(commentStats);
      comment.CommentStats_Id = comStats.getDataValue("CommentStats_Id");
      data = await this.commentRepository.create(comment);
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  //UPDATE COMMENT
  async updateComment(
    comment: Comment,
    commentInformation: CommentInformation,
    commentStats: CommentStats
  ) {
    let data = {};
    try {
      comment.Comment_DateEdited = new Date();
      await this.commentInformationRepository.update(
        { ...commentInformation },
        {
          where: {
            CommentInformation_Id: commentInformation.CommentInformation_Id,
          },
        }
      );

      await this.commentStatsRepository.update(
        { ...commentStats },
        {
          where: {
            CommentStats_Id: commentStats.CommentStats_Id,
          },
        }
      );

      data = await this.commentRepository.update(
        { ...Comment },
        {
          where: {
            Comment_Id: comment.Comment_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  //DELETE COMMENT
  async deleteComment(Comment_Id: number) {
    let comRef,
      comInfo,
      comStats,
      data = {};
    try {
      comRef = await this.commentRepository.findOne({
        where: { Comment_Id: Comment_Id },
      });
      comInfo = await this.commentInformationRepository.findOne({
        where: {
          CommentInformation_Id: comRef.getDataValue("CommentInformation_Id"),
        },
      });
      comStats = await this.commentStatsRepository.findOne({
        where: { CommentStats_Id: comRef.getDataValue("CommentStats_Id") },
      });
      await this.commentInformationRepository.destroy({
        where: {
          CommentInformation_Id: comInfo.getDataValue("CommentInformation_Id"),
        },
      });
      await this.commentStatsRepository.destroy({
        where: {
          CommentStats_Id: comStats.getDataValue("CommentStats_Id"),
        },
      });
      data = await this.commentRepository.destroy({
        where: {
          Comment_Id: Comment_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async getCommentInformation() {
    try {
      const commentInformation =
        await this.commentInformationRepository.findAll();
      console.log("CommentInformation::: ", commentInformation);
      return commentInformation;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }
  async getCommentInformationById(CommentInformation_Id: number) {
    try {
      const comment = await this.commentInformationRepository.findOne({
        where: { CommentInformation_Id: CommentInformation_Id },
      });
      console.log("comments:::", comment);
      return comment;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  async createCommentInformation(commentinformation: CommentInformation) {
    let data = {};
    try {
      data = await this.commentInformationRepository.create(commentinformation);
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async updateCommentInformation(commentInformation: CommentInformation) {
    let data = {};
    try {
      data = await this.commentInformationRepository.update(
        { ...CommentInformation },
        {
          where: {
            CommentInformation_Id: commentInformation.CommentInformation_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async deleteCommentInformation(CommentInformation_Id: number) {
    let data = {};
    try {
      data = await this.commentInformationRepository.destroy({
        where: {
          CommentInformation_Id: CommentInformation_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async getCommentStats() {
    try {
      const commentStats = await this.commentStatsRepository.findAll();
      console.log("CommentStats::: ", commentStats);
      return commentStats;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  async createCommentStats(commentStats: CommentStats) {
    let data = {};
    try {
      data = await this.commentStatsRepository.create(commentStats);
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async updateCommentStats(commentStats: CommentStats) {
    let data = {};
    try {
      data = await this.commentStatsRepository.update(
        { ...CommentStats },
        {
          where: {
            CommentStats_Id: commentStats.CommentStats_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async deleteCommentStats(CommentStats_Id: number) {
    let data = {};
    try {
      data = await this.commentStatsRepository.destroy({
        where: {
          CommentStats_Id: CommentStats_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }
}
