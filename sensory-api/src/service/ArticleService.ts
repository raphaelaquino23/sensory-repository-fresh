import { Article, ArticleInformation, ArticleStats, ArticleTopic } from "../models/ArticleModel";
import { ArticleRepository } from "../repositories/ArticleRepository";

export class ArticleService {
	private articleRepository: ArticleRepository;

	constructor() {
		this.articleRepository = new ArticleRepository;
	}

	async getArticles() {
		return await this.articleRepository.getArticles();
	}
	async getArticleById(Article_Id: number) {
		return await this.articleRepository.getArticleById(Article_Id);
	}

	async getArticleInformations() {
		return await this.articleRepository.getArticleInformations();
	}

	async getArticleStats() {
		return await this.articleRepository.getArticleStats();
	}

	async getArticleStatsById(ArticleStats_Id: number) {
		return await this.articleRepository.getArticleStatsById(ArticleStats_Id);
	}

	async getArticleTopic() {
		return await this.articleRepository.getArticleTopic();
	}

	async getFile(id: number) {
		return await this.articleRepository.getFile(id);
	}

	async getImage(id: number) {
		return await this.articleRepository.getImage(id);
	}

	async createArticle(article: Article, articleInformation: ArticleInformation, articleStats: ArticleStats, fileUrl: string) {
		return await this.articleRepository.createArticle(article, articleInformation, articleStats, fileUrl);
	}

	async createArticleInformation(articleinformation: ArticleInformation) {
		return await this.articleRepository.createArticleInformation(articleinformation);
	}

	async createArticleStats(articlestats: ArticleStats) {
		return await this.articleRepository.createArticleStats(articlestats);
	}

	async createArticleTopic(articletopic: ArticleTopic) {
		return await this.articleRepository.createArticleTopic(articletopic);
	}

	async uploadFile(file: string) {
		return await this.articleRepository.uploadFile(file);
	}

	async updateArticle(article: Article, articleInformation: ArticleInformation, articleStats: ArticleStats) {
		return await this.articleRepository.updateArticle(article, articleInformation, articleStats);
	}

	async updateArticleInformation(articleinformation: ArticleInformation) {
		return await this.articleRepository.updateArticleInformation(articleinformation);
	}

	async updateArticleStats(articlestats: ArticleStats) {
		return await this.articleRepository.updateArticleStats(articlestats);
	}

	async updateArticleTopic(articletopic: ArticleTopic) {
		return await this.articleRepository.updateArticleTopic(articletopic);
	}

	async deleteArticle(Article_Id: number) {
		return await this.articleRepository.deleteArticle(Article_Id);
	}

	async deleteArticleInformation(ArticleInformation_Id: number) {
		return await this.articleRepository.deleteArticleInformation(ArticleInformation_Id);
	}
	
	async deleteArticleStats(ArticleStats_Id: number) {
		return await this.articleRepository.deleteArticleStats(ArticleStats_Id);
	}

	async deleteArticleTopic(ArticleTopic_Id: number) {
		return await this.articleRepository.deleteArticleTopic(ArticleTopic_Id);
	}	
	
	async articleUpvoteTracker(Article: Article, User_Id: number) {
		return await this.articleRepository.articleUpvoteTracker(Article, User_Id);
	}
}