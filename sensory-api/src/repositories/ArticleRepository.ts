import { connect } from "../config/db.config";
import {
  Article,
  ArticleInformation,
  ArticleStats,
  ArticleTopic,
  ArticleUpvoteTracker,
} from "../models/ArticleModel";
import express from "express";
import { winstonLogger } from "../logger/winston.logger";
import fileUpload, { UploadedFile } from "express-fileupload";

export class ArticleRepository {
  private db: any = {};
  private articleRepository: any;
  private articleInformationRepository: any;
  private articleStatsRepository: any;
  private articleTopicRepository: any;
  private articleUpvoteTrackerRepository: any;
  private express: express.Application;

  constructor() {
    this.db = connect();
    this.express = express();
    this.articleRepository = this.db.sequelize.getRepository(Article);
    this.articleInformationRepository =
      this.db.sequelize.getRepository(ArticleInformation);
    this.articleStatsRepository = this.db.sequelize.getRepository(ArticleStats);
    this.articleTopicRepository = this.db.sequelize.getRepository(ArticleTopic);
    this.articleUpvoteTrackerRepository =
      this.db.sequelize.getRepository(ArticleUpvoteTracker);

    this.express.use(fileUpload());
  }

  //GET ARTICLE
  async getArticles() {
    try {
      const articles = await this.articleRepository.findAll();
      return articles;
    } catch (error) {
      winstonLogger.error("Error:: ", error);
      return [];
    }
  }
  //GET BY ID ARTICLE
  async getArticleById(ArticleId: number) {
    try {
      const article = await this.articleRepository.findOne({
        where: { Article_Id: ArticleId },
      });
      return article;
    } catch (error) {
      winstonLogger.error("Error:: ", error);
      return [];
    }
  }

  async getFile(id: number) {
    try {
      const aInfo = await this.articleInformationRepository.findOne({
        where: { ArticleInformation_Id: id },
      });
      let fileUrl = aInfo.getDataValue("ArticleInformation_Url");
      return fileUrl;
    } catch (error) {
      winstonLogger.error("Error:: ", error);
      return [];
    }
  }

  async getImage(id: number) {
    try {
      const aInfo = await this.articleInformationRepository.findOne({
        where: { ArticleInformation_Id: id },
      });
      let fileUrl = aInfo.getDataValue("ArticleInformation_Image");
      console.log("-----------------------fileUrl" + fileUrl);
      return fileUrl;
    } catch (error) {
      console.log("error");
      return [];
    }
  }
  //CREATE ARTICLE
  //Creates an article entry which includes the creation of article Information and article Stats
  async createArticle(
    article: Article,
    articleInformation: ArticleInformation,
    articleStats: ArticleStats,
    fileUrl: string
  ) {
    let aInfo,
      aStats,
      data = {};
    try {
      article.Article_DateCreated = new Date();
      //Creates a new table for article information and article stats,
      //then saves that information into aInfo and aStats
      //aInfo and aStats are used to get the data value of their primary keys and pass it to the article
      articleInformation.ArticleInformation_Url = `${fileUrl}`;
      aInfo = await this.articleInformationRepository.create(
        articleInformation
      );
      article.ArticleInformation_Id = aInfo.getDataValue(
        "ArticleInformation_Id"
      );

      aStats = await this.articleStatsRepository.create(articleStats);
      article.ArticleStats_Id = aStats.getDataValue("ArticleStats_Id");
      data = await this.articleRepository.create(article);
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  //UPDATE ARTICLE
  //Updates an article entry with article information and article stats. Note that all of them need to pass their ID to function
  async updateArticle(
    article: Article,
    articleInformation: ArticleInformation,
    articleStats: ArticleStats
  ) {
    let data = {};
    try {
      article.Article_DateEdited = new Date();
      await this.articleInformationRepository.update(
        { ...articleInformation },
        {
          where: {
            ArticleInformation_Id: articleInformation.ArticleInformation_Id,
          },
        }
      );
      await this.articleStatsRepository.update(
        { ...articleStats },
        {
          where: {
            ArticleStats_Id: articleStats.ArticleStats_Id,
          },
        }
      );
      data = await this.articleRepository.update(
        { ...article },
        {
          where: {
            Article_Id: article.Article_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  //DELETE ARTICLE
  async deleteArticle(Article_Id: number) {
    let aRef,
      aInfo,
      aStats,
      data = {};
    try {
      aRef = await this.articleRepository.findOne({
        where: { Article_Id: Article_Id },
      });
      aInfo = await this.articleInformationRepository.findOne({
        where: {
          ArticleInformation_Id: aRef.getDataValue("ArticleInformation_Id"),
        },
      });
      aStats = await this.articleStatsRepository.findOne({
        where: { ArticleStats_Id: aRef.getDataValue("ArticleStats_Id") },
      });
      await this.articleInformationRepository.destroy({
        where: {
          ArticleInformation_Id: aInfo.getDataValue("ArticleInformation_Id"),
        },
      });
      await this.articleStatsRepository.destroy({
        where: {
          ArticleStats_Id: aStats.getDataValue("ArticleStats_Id"),
        },
      });
      data = await this.articleRepository.destroy({
        where: {
          Article_Id: Article_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  //GET ARTICLE INFORMATION
  async getArticleInformations() {
    try {
      const articleinformations =
        await this.articleInformationRepository.findAll();
      return articleinformations;
    } catch (error) {
      winstonLogger.error("Error:: ", error);
      return [];
    }
  }

  //GET BY ID ARTICLE INFORMATION
  async getArticleInformationById(ArticleInformationId: number) {
    try {
      const articleInfo = await this.articleInformationRepository.findOne({
        where: { ArticleInformation_Id: ArticleInformationId },
      });
      return articleInfo;
    } catch (error) {
      winstonLogger.error("Error:: ", error);
      return [];
    }
  }

  //CREATE ARTICLE INFORMATION
  async createArticleInformation(articleinformation: ArticleInformation) {
    let data = {};
    try {
      data = await this.articleInformationRepository.create({
        ArticleInformation_Name: articleinformation.ArticleInformation_Name,
        ArticleInformation_Description:
          articleinformation.ArticleInformation_Description,
        ArticleInformation_PublishedBy:
          articleinformation.ArticleInformation_PublishedBy,
      });
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  async uploadFile(file: string) {
    let data = {};
    try {
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  //UPDATE ARTICLE INFORMATION
  async updateArticleInformation(articleinformation: ArticleInformation) {
    let data = {};
    try {
      data = await this.articleInformationRepository.update(
        { ...articleinformation },
        {
          where: {
            ArticleInformation_Id: articleinformation.ArticleInformation_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  //DELETE ARTICLE INFORMATION
  async deleteArticleInformation(ArticleInformation_Id: number) {
    let data = {};
    try {
      data = await this.articleInformationRepository.destroy({
        where: {
          ArticleInformation_Id: ArticleInformation_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  //GET ARTICLE STATS
  async getArticleStats() {
    try {
      const articlestats = await this.articleStatsRepository.findAll();
      return articlestats;
    } catch (error) {
      winstonLogger.error("Error:: ", error);
      return [];
    }
  }

  //GET BY ID ARTICLE STATS
  async getArticleStatsById(ArticleStatsId: number) {
    try {
      const articleStats = await this.articleStatsRepository.findOne({
        where: { ArticleStats_Id: ArticleStatsId },
      });
      return articleStats;
    } catch (error) {
      winstonLogger.error("Error:: ", error);
      return [];
    }
  }

  //CREATE ARTILE STATS
  async createArticleStats(articlestats: ArticleStats) {
    let data = {};
    try {
      //article.Article_DateCreated = new Date();
      data = await this.articleStatsRepository.create(articlestats);
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  //UPDATE ARTICLE STATS
  async updateArticleStats(articlestats: ArticleStats) {
    let data = {};
    try {
      //articleinformation.Article_DateEdited = new Date();
      data = await this.articleStatsRepository.update(
        { ...articlestats },
        {
          where: {
            ArticleStats_Id: articlestats.ArticleStats_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  //DELETE ARTICLE STATS
  async deleteArticleStats(ArticleStats_Id: number) {
    let data = {};
    try {
      data = await this.articleStatsRepository.destroy({
        where: {
          ArticleStats_Id: ArticleStats_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  //GET ARTICLE TOPIC
  async getArticleTopic() {
    try {
      const articletopic = await this.articleTopicRepository.findAll();
      return articletopic;
    } catch (error) {
      winstonLogger.error("Error:: ", error);
      return [];
    }
  }
  //GET BY ID ARTICLE TOPIC
  async getArticleTopicById(ArticleTopicId: number) {
    try {
      const articleTopic = await this.articleTopicRepository.findOne({
        where: { ArticleTopic_Id: ArticleTopicId },
      });
      return articleTopic;
    } catch (error) {
      winstonLogger.error("Error:: ", error);
      return [];
    }
  }

  //CREATE ARTICLE TOPIC
  async createArticleTopic(articletopic: ArticleTopic) {
    let data = {};
    try {
      //article.Article_DateCreated = new Date();
      data = await this.articleTopicRepository.create(articletopic);
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  //UPDATE ARTICLE TOPIC
  async updateArticleTopic(articletopic: ArticleTopic) {
    let data = {};
    try {
      data = await this.articleTopicRepository.update(
        { ...articletopic },
        {
          where: {
            ArticleTopic_Id: articletopic.ArticleTopic_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  //DELETE ARTICLE TOPIC
  async deleteArticleTopic(ArticleTopic_Id: number) {
    let data = {};
    try {
      data = await this.articleTopicRepository.destroy({
        where: {
          ArticleTopic_Id: ArticleTopic_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  //UPVOTE TRACKER
  async articleUpvoteTracker(article: Article, user_Id: number) {
    let filteredList,
      found,
      articleStats,
      upvotePluser,
      data = {};

    try {
      filteredList = await this.articleUpvoteTrackerRepository.findAll({
        where: { Article_Id: article.Article_Id },
      });
      articleStats = await this.articleStatsRepository.findOne({
        where: { ArticleStats_Id: article.ArticleStats_Id },
      });

      articleStats = await this.articleStatsRepository.findOne({
        where: { ArticleStats_Id: article.ArticleStats_Id },
      });
      if (filteredList == false) {
        data = await this.articleUpvoteTrackerRepository.create({
          Article_Id: article.Article_Id,
          User_Id: user_Id,
        });
        upvotePluser = articleStats.getDataValue("ArticleStats_Upvotes");
        upvotePluser++;
        await this.articleStatsRepository.update(
          { ArticleStats_Upvotes: upvotePluser },
          {
            where: {
              ArticleStats_Id: article.ArticleStats_Id,
            },
          }
        );
        return data;
      } else {
        found = await this.articleUpvoteTrackerRepository.findAll({
          where: { Article_Id: article.Article_Id, User_Id: user_Id },
        });
      }
      if (found == false) {
        data = await this.articleUpvoteTrackerRepository.create({
          User_Id: user_Id,
          Article_Id: article.Article_Id,
        });
        upvotePluser = articleStats.getDataValue("ArticleStats_Upvotes");
        upvotePluser++;
        await this.articleStatsRepository.update(
          { ArticleStats_Upvotes: upvotePluser },
          {
            where: {
              ArticleStats_Id: article.ArticleStats_Id,
            },
          }
        );

        return data;
      } else {
      }
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }
}
