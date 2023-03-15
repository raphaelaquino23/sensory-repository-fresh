import { Post, PostCategory, PostInformation, PostStats } from "../models/PostModel";
import { PostRepository } from "../repositories/PostRepository";

export class PostService {

  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  async getPosts() {
    return await this.postRepository.getPosts();
  }

  async getPostById(Post_Id: number) {
    return await this.postRepository.getPostById(Post_Id);
  }
  async getPostInformation() {
    return await this.postRepository.getPostInformation();
  }
  async getPostInformationById(PostInformation_Id: number) {
    return await this.postRepository.getPostInformationById(PostInformation_Id);
  }
  async getPostCategory() {
    return await this.postRepository.getPostCategory();
  }
  async getPostStats() {
    return await this.postRepository.getPostStats();
  }
  async getPostStatsById(PostStats_Id: number) {
    return await this.postRepository.getPostStatsById(PostStats_Id);
  }

  async createPost(post: Post, postInformation: PostInformation, postStats: PostStats) {
    return await this.postRepository.createPost(post, postInformation, postStats);
  }
  async createPostInformation(postinformation: PostInformation, poststats: PostStats) {
    return await this.postRepository.createPostInformation(postinformation, poststats);
  }
  async createPostCategory(postCategory: PostCategory) {
    return await this.postRepository.createPostCategory(postCategory);
  }
  async createPostStats(postStats: PostStats) {
    return await this.postRepository.createPostStats(postStats);
  }

  async updatePost(post: Post, postInformation: PostInformation, postStats: PostStats) {
    return await this.postRepository.updatePost(post, postInformation, postStats);
  }

  async updatePostInformation(postinformation: PostInformation) {
    return await this.postRepository.updatePostInformation(postinformation);
  }

  async updatePostCategory(postcategory: PostCategory) {
    return await this.postRepository.updatePostCategory(postcategory);
  }

  async updatePostStats(poststats: PostStats) {
    return await this.postRepository.updatePostStats(poststats);
  }

  async deletePost(Post_Id: number) {
    return await this.postRepository.deletePost(Post_Id);
  }
  async deletePostInformation(PostInformation_Id: number) {
    return await this.postRepository.deletePostInformation(PostInformation_Id);
  }
  async deletePostCategory(PostCategory_Id: number) {
    return await this.postRepository.deletePostCategory(PostCategory_Id);
  }
  async deletePostStats(PostStats_Id: number) {
    return await this.postRepository.deletePostStats(PostStats_Id);
  }

  async postUpvoteTracker(Post: Post, User_Id: number) {
		return await this.postRepository.postUpvoteTracker(Post, User_Id);
	}
}