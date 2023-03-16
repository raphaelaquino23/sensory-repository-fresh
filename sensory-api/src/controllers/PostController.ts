import { APILogger } from '../logger/api.logger';
import { Post, PostInformation, PostCategory, PostStats } from '../models/PostModel';
import { PostService } from '../service/PostService';

export class PostController {

  private postService: PostService;
  private logger: APILogger;

  constructor() {
    this.postService = new PostService();
    this.logger = new APILogger();
  }

  async getPosts() {
    this.logger.info('Controller: getPosts', null)
    return await this.postService.getPosts();
  }
  async getPostById(Post_Id: number) {
    this.logger.info('Controller: getPostById', null)
    return await this.postService.getPostById(Post_Id);
  }

  async getPostInformation() {
    this.logger.info('Controller: getPostInformation', null)
    return await this.postService.getPostInformation();
  }

  async getPostInformationById(PostInformation_Id: number) {
    this.logger.info('Controller: getPostInformationById', null)
    return await this.postService.getPostInformationById(PostInformation_Id);
  }

  async getPostInformationByUserId(User_Id: number) {
    this.logger.info('Controller: getPostInformationByUserId', null)
    return await this.postService.getPostInformationByUserId(User_Id);
  }

  async getPostCategory() {
    this.logger.info('Controller: getPostInformation', null)
    return await this.postService.getPostCategory();
  }
  
  async getPostStats() {
    this.logger.info('Controller: getPostInformation', null)
    return await this.postService.getPostStats();
  }

  async getPostStatsById(PostStats_Id: number) {
    this.logger.info('Controller: getPostStats', null)
    return await this.postService.getPostStatsById(PostStats_Id);
  }

  async createPost(post: Post, postInformation: PostInformation, postStats: PostStats) {
    this.logger.info('Controller: createPost', post);
    return await this.postService.createPost(post, postInformation, postStats);
  }

  async createPostInformation(postinformation: PostInformation, poststats: PostStats) {
    this.logger.info('Controller: createPostInformation', postinformation);
    return await this.postService.createPostInformation(postinformation, poststats);
  }

  async createPostCategory(postcategory: PostCategory) {
    this.logger.info('Controller: createPostCategory', postcategory);
    return await this.postService.createPostCategory(postcategory);
  }

  async createPostStats(poststats: PostStats) {
    this.logger.info('Controller: createPostStats', poststats);
    return await this.postService.createPostStats(poststats);
  }

  async updatePost(post: Post, postInformation: PostInformation, postStats: PostStats) {
    this.logger.info('Controller: updatePost', post);
    return await this.postService.updatePost(post, postInformation, postStats);
  }

  async updatePostInformation(postinformation: PostInformation) {
    this.logger.info('Controller: updatePostInformation', postinformation);
    return await this.postService.updatePostInformation(postinformation);
  }

  async updatePostCategory(postcategory: PostCategory) {
    this.logger.info('Controller: updatePostCategory', postcategory);
    return await this.postService.updatePostCategory(postcategory);
  }

  async updatePostStats(poststats: PostStats) {
    this.logger.info('Controller: updatePostStats', poststats);
    return await this.postService.updatePostStats(poststats);
  }

  async deletePost(Post_Id: number) {
    this.logger.info('Controller: deletePost', Post_Id);
    return await this.postService.deletePost(Post_Id);
  }
  async deletePostInformation(PostInformation_Id: number) {
    this.logger.info('Controller: deletePostInformation', PostInformation_Id);
    return await this.postService.deletePostInformation(PostInformation_Id);
  }
  async deletePostCategory(PostCategory_Id: number) {
    this.logger.info('Controller: deletePostCategory', PostCategory_Id);
    return await this.postService.deletePostCategory(PostCategory_Id);
  }
  async deletePostStats(PostStats_Id: number) {
    this.logger.info('Controller: deletePostStats', PostStats_Id);
    return await this.postService.deletePostStats(PostStats_Id);
  }
  async postUpvoteTracker(Post: Post, User_Id: number) {
		return await this.postService.postUpvoteTracker(Post, User_Id);
	}
}