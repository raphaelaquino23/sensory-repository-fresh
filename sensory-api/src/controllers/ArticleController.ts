import { winstonLogger } from "../logger/winston.logger";
import {
  Article,
  ArticleInformation,
  ArticleStats,
  ArticleTopic,
} from "../models/ArticleModel";
import { ArticleService } from "../service/ArticleService";

export class ArticleController {
  private articleService: ArticleService;
  constructor() {
    this.articleService = new ArticleService();
  }

  //get method
  async getArticles() {
    winstonLogger.info("Controller: getArticles", null);
    return await this.articleService.getArticles();
  }
  async getArticleById(Article_Id: number) {
    winstonLogger.info("Controller: getArticleById", null);
    return await this.articleService.getArticleById(Article_Id);
  }

  async getArticleInformations() {
    winstonLogger.info("Controller: getArticleInformations", null);
    return await this.articleService.getArticleInformations();
  }

  async getArticleStats() {
    winstonLogger.info("Controller: getArticleStats", null);
    return await this.articleService.getArticleStats();
  }

  async getArticleStatsById(ArticleStats_Id: number) {
    winstonLogger.info("Controller: getArticleStats", null);
    return await this.articleService.getArticleStatsById(ArticleStats_Id);
  }

  async getArticleTopic() {
    winstonLogger.info("Controller: getArticleTopic", null);
    return await this.articleService.getArticleTopic();
  }

  async getFile(id: number) {
    winstonLogger.info("Controller: GET FILES", null);
    return await this.articleService.getFile(id);
  }
  async getImage(id: number) {
    winstonLogger.info("Controller: GET FILES", null);
    return await this.articleService.getImage(id);
  }

  async createArticle(
    article: Article,
    articleInformation: ArticleInformation,
    articleStats: ArticleStats,
    fileUrl: string
  ) {
    winstonLogger.info("Controller: createArticle", article);
    return await this.articleService.createArticle(
      article,
      articleInformation,
      articleStats,
      fileUrl
    );
  }

  async createArticleInformation(articleinformation: ArticleInformation) {
    winstonLogger.info(
      "Controller: createArticleInformation",
      articleinformation
    );
    return await this.articleService.createArticleInformation(
      articleinformation
    );
  }

  async createArticleStats(articlestats: ArticleStats) {
    winstonLogger.info("Controller: createArticleStats", articlestats);
    return await this.articleService.createArticleStats(articlestats);
  }

  async createArticleTopic(articletopic: ArticleTopic) {
    winstonLogger.info("Controller: createArticleTopic", articletopic);
    return await this.articleService.createArticleTopic(articletopic);
  }

  async uploadFile(file: string) {
    return await this.articleService.uploadFile(file);
  }

  async updateArticle(
    article: Article,
    articleInformation: ArticleInformation,
    articleStats: ArticleStats
  ) {
    winstonLogger.info("Controller: updateArticle", article);
    return await this.articleService.updateArticle(
      article,
      articleInformation,
      articleStats
    );
  }

  async updateArticleInformation(articleinformation: ArticleInformation) {
    winstonLogger.info(
      "Controller: updateArticleInformation",
      articleinformation
    );
    return await this.articleService.updateArticleInformation(
      articleinformation
    );
  }

  async updateArticleStats(articlestats: ArticleStats) {
    winstonLogger.info("Controller: updateArticleStats", articlestats);
    return await this.articleService.updateArticleStats(articlestats);
  }

  async updateArticleTopic(articletopic: ArticleTopic) {
    winstonLogger.info("Controller: updateArticleTopic", articletopic);
    return await this.articleService.updateArticleTopic(articletopic);
  }

  async deleteArticle(Article_Id: number) {
    winstonLogger.info("Controller: deleteArticle", Article_Id);
    return await this.articleService.deleteArticle(Article_Id);
  }

  async deleteArticleInformation(ArticleInformation_Id: number) {
    winstonLogger.info(
      "Controller: deleteArticleInformation",
      ArticleInformation_Id
    );
    return await this.articleService.deleteArticleInformation(
      ArticleInformation_Id
    );
  }

  async deleteArticleStats(ArticleStats_Id: number) {
    winstonLogger.info("Controller: deleteArticleStats", ArticleStats_Id);
    return await this.articleService.deleteArticleStats(ArticleStats_Id);
  }

  async deleteArticleTopic(ArticleTopic_Id: number) {
    winstonLogger.info("Controller: deleteArticleTopic", ArticleTopic_Id);
    return await this.articleService.deleteArticleTopic(ArticleTopic_Id);
  }

  async articleUpvoteTracker(Article: Article, User_Id: number) {
    // winstonLogger.info('Controller: upvoteTracker', Article);
    return await this.articleService.articleUpvoteTracker(Article, User_Id);
  }
}
