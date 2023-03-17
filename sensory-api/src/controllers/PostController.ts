import {
  Post,
  PostInformation,
  PostCategory,
  PostStats,
} from "../models/PostModel";
import { PostService } from "../service/PostService";
import { winstonLogger } from "../logger/winston.logger";

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  async getPosts() {
    winstonLogger.info("Controller: getPosts", null);
    return await this.postService.getPosts();
  }
  async getPostById(Post_Id: number) {
    winstonLogger.info("Controller: getPostById", null);
    return await this.postService.getPostById(Post_Id);
  }

  async getPostInformation() {
    winstonLogger.info("Controller: getPostInformation", null);
    return await this.postService.getPostInformation();
  }

  async getPostInformationById(PostInformation_Id: number) {
    winstonLogger.info("Controller: getPostInformationById", null);
    return await this.postService.getPostInformationById(PostInformation_Id);
  }

  async getPostInformationByUserId(User_Id: number) {
    winstonLogger.info("Controller: getPostInformationByUserId", null);
    return await this.postService.getPostInformationByUserId(User_Id);
  }

  async getPostCategory() {
    winstonLogger.info("Controller: getPostInformation", null);
    return await this.postService.getPostCategory();
  }

  async getPostStats() {
    winstonLogger.info("Controller: getPostInformation", null);
    return await this.postService.getPostStats();
  }

  async getPostStatsById(PostStats_Id: number) {
    winstonLogger.info("Controller: getPostStats", null);
    return await this.postService.getPostStatsById(PostStats_Id);
  }

  async createPost(
    post: Post,
    postInformation: PostInformation,
    postStats: PostStats,
    postCat: PostCategory
  ) {
    winstonLogger.info(
      "Controller: createPost",
      post,
      postInformation,
      postStats,
      postCat
    );
    return await this.postService.createPost(
      post,
      postInformation,
      postStats,
      postCat
    );
  }

  async createPostInformation(
    postinformation: PostInformation,
    poststats: PostStats
  ) {
    winstonLogger.info("Controller: createPostInformation", postinformation);
    return await this.postService.createPostInformation(
      postinformation,
      poststats
    );
  }

  async createPostCategory(postcategory: PostCategory) {
    winstonLogger.info("Controller: createPostCategory", postcategory);
    return await this.postService.createPostCategory(postcategory);
  }

  async createPostStats(poststats: PostStats) {
    winstonLogger.info("Controller: createPostStats", poststats);
    return await this.postService.createPostStats(poststats);
  }

  async updatePost(
    post: Post,
    postInformation: PostInformation,
    postStats: PostStats
  ) {
    winstonLogger.info("Controller: updatePost", post);
    return await this.postService.updatePost(post, postInformation, postStats);
  }

  async updatePostInformation(postinformation: PostInformation) {
    winstonLogger.info("Controller: updatePostInformation", postinformation);
    return await this.postService.updatePostInformation(postinformation);
  }

  async updatePostCategory(postcategory: PostCategory) {
    winstonLogger.info("Controller: updatePostCategory", postcategory);
    return await this.postService.updatePostCategory(postcategory);
  }

  async updatePostStats(poststats: PostStats) {
    winstonLogger.info("Controller: updatePostStats", poststats);
    return await this.postService.updatePostStats(poststats);
  }

  async deletePost(Post_Id: number) {
    winstonLogger.info("Controller: deletePost", Post_Id);
    return await this.postService.deletePost(Post_Id);
  }
  async deletePostInformation(PostInformation_Id: number) {
    winstonLogger.info("Controller: deletePostInformation", PostInformation_Id);
    return await this.postService.deletePostInformation(PostInformation_Id);
  }
  async deletePostCategory(PostCategory_Id: number) {
    winstonLogger.info("Controller: deletePostCategory", PostCategory_Id);
    return await this.postService.deletePostCategory(PostCategory_Id);
  }
  async deletePostStats(PostStats_Id: number) {
    winstonLogger.info("Controller: deletePostStats", PostStats_Id);
    return await this.postService.deletePostStats(PostStats_Id);
  }
  async postUpvoteTracker(Post: Post, User_Id: number) {
    return await this.postService.postUpvoteTracker(Post, User_Id);
  }
}
