import { connect } from "../config/db.config";
import { winstonLogger } from "../logger/winston.logger";
import {
  Post,
  PostInformation,
  PostCategory,
  PostStats,
  PostUpvoteTracker,
} from "../models/PostModel";
import { User } from "../models/UserModel";

export class PostRepository {
  private db: any = {};
  private postRepository: any;
  private postInformationRepository: any;
  private postCategoryRepository: any;
  private postStatsRepository: any;
  private postUpvoteTrackerRepository: any;

  constructor() {
    this.db = connect();
    this.db.sequelize.sync({ force: true }).then(() => {
      console.log("Drop and re-sync db.");
    }); // purpose of sequelize.sync reflects into postgres (it deletes the data). In order to retain the data. set to false the force: false
    this.postRepository = this.db.sequelize.getRepository(Post);
    this.postInformationRepository =
      this.db.sequelize.getRepository(PostInformation);
    this.postCategoryRepository = this.db.sequelize.getRepository(PostCategory);
    this.postStatsRepository = this.db.sequelize.getRepository(PostStats);
    this.postUpvoteTrackerRepository =
      this.db.sequelize.getRepository(PostUpvoteTracker);
  }

  async getPosts() {
    try {
      const posts = await this.postRepository.findAll();
      console.log("posts::: ", posts);
      return posts;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  async getPostCategoryToMap() {
    let data;
    try {
      const postInfoId = await this.postRepository.findOne({
        where: {},
      });
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async getPostById(Post_Id: number) {
    try {
      const posts = await this.postRepository.findOne({
        where: { Post_Id: Post_Id },
      });
      console.log("posts::: ", posts);
      return posts;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  async createPost(
    post: Post,
    postInformation: PostInformation,
    postStats: PostStats,
    postCat: PostCategory
  ) {
    let pInfo,
      pStats,
      pCat,
      data = {};
    try {
      post.Post_DateCreated = new Date();
      pInfo = await this.postInformationRepository.create(postInformation);
      post.PostInformation_Id = pInfo.getDataValue("PostInformation_Id");
      pStats = await this.postStatsRepository.create(postStats);
      post.PostStats_Id = pStats.getDataValue("PostStats_Id");
      pCat = await this.postCategoryRepository.create(postCat);
      postInformation.PostCategory_Id = pCat.getDataValue("PostCategory_Id");
      data = await this.postRepository.create(post);
      //       INSERT INTO "Posts" ("Post_Id","PostInformation_Id","PostStats_Id","Post_DateCreated","User_Id","Post_DeactivatedStatus",
      //        "Post_DeactivatedBy") VALUES (DEFAULT,$1,$2,$3,$4,$5,$6) RETURNING "Post_Id","PostInformation_Id","PostStats_Id","Post_DateCreated",
      //        "Post_DateEdited","User_Id","Post_DeactivatedStatus","Post_DeactivatedBy";
      //          error
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async updatePost(
    post: Post,
    postInformation: PostInformation,
    postStats: PostStats
  ) {
    let data = {};
    try {
      post.Post_DateEdited = new Date();
      await this.postInformationRepository.update(
        { ...postInformation },
        {
          where: {
            PostInformation_Id: postInformation.PostInformation_Id,
          },
        }
      );
      await this.postStatsRepository.update(
        { ...postStats },
        {
          where: {
            PostStats_Id: postStats.PostStats_Id,
          },
        }
      );
      data = await this.postRepository.update(
        { ...post },
        {
          where: {
            Post_Id: post.Post_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async deletePost(Post_Id: number) {
    let pRef,
      pInfo,
      pStats,
      data = {};
    try {
      pRef = await this.postRepository.findOne({ where: { Post_Id: Post_Id } });
      pInfo = await this.postInformationRepository.findOne({
        where: { PostInformation_Id: pRef.getDataValue("PostInformation_Id") },
      });
      pStats = await this.postStatsRepository.findOne({
        where: { PostStats_Id: pRef.getDataValue("PostStats_Id") },
      });
      await this.postInformationRepository.destroy({
        where: {
          PostInformation_Id: pInfo.getDataValue("PostInformation_Id"),
        },
      });
      await this.postStatsRepository.destroy({
        where: {
          PostStats_Id: pStats.getDataValue("PostStats_Id"),
        },
      });
      data = await this.postRepository.destroy({
        where: {
          Post_Id: Post_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async getPostInformation() {
    try {
      const postinformation = await this.postInformationRepository.findAll();
      console.log("postinformation::: ", postinformation);
      return postinformation;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  async getPostInformationById(PostInformation_Id: number) {
    try {
      const posts = await this.postInformationRepository.findOne({
        where: { PostInformation_Id: PostInformation_Id },
      });
      console.log("posts::: ", posts);
      return posts;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  async createPostInformation(
    postinformation: PostInformation,
    poststats: PostStats
  ) {
    let data = {};
    let poststat = {};
    try {
      poststat = await this.postStatsRepository.create(poststats);
      data = await this.postInformationRepository.create(postinformation);
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async updatePostInformation(postinformation: PostInformation) {
    let data = {};
    try {
      data = await this.postInformationRepository.update(
        { ...postinformation },
        {
          where: {
            PostInformation_Id: postinformation.PostInformation_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async deletePostInformation(PostInformation_Id: number) {
    let data = {};
    try {
      data = await this.postInformationRepository.destroy({
        where: {
          PostInformation_Id: PostInformation_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async getPostCategory() {
    try {
      const postCategory = await this.postCategoryRepository.findAll();
      console.log("postCategory::: ", postCategory);
      return postCategory;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  async createPostCategory(postCategory: PostCategory) {
    let data = {};
    try {
      data = await this.postCategoryRepository.create(postCategory);
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async updatePostCategory(postCategory: PostCategory) {
    let data = {};
    try {
      data = await this.postCategoryRepository.update(
        { ...postCategory },
        {
          where: {
            PostCategory_Id: postCategory.PostCategory_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async deletePostCategory(PostCategory_Id: number) {
    let data = {};
    try {
      data = await this.postCategoryRepository.destroy({
        where: {
          PostCategory_Id: PostCategory_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async getPostStats() {
    try {
      const postStats = await this.postStatsRepository.findAll();
      console.log("postStats::: ", postStats);
      return postStats;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  async getPostStatsById(PostStats_Id: number) {
    try {
      const postStats = await this.postStatsRepository.findOne({
        where: { PostStats_Id: PostStats_Id },
      });
      console.log("postStatsId::: ", postStats);
      return postStats;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  async createPostStats(postStats: PostStats) {
    let data = {};
    try {
      data = await this.postStatsRepository.create(postStats);
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async updatePostStats(postStats: PostStats) {
    let data = {};
    try {
      data = await this.postStatsRepository.update(
        { ...postStats },
        {
          where: {
            PostStats_Id: postStats.PostStats_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async deletePostStats(PostStats_Id: number) {
    let data = {};
    try {
      data = await this.postStatsRepository.destroy({
        where: {
          PostStats_Id: PostStats_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  //UPVOTE TRACKER
  async postUpvoteTracker(post: Post, user_Id: number) {
    let filteredList,
      found,
      postStats,
      upvotePluser,
      data = {};
    try {
      //We want to access the upvote tracker table. Once we access it, we want to compare all of the values in that table to see
      //if post_Id exists in that table.
      //const postTopic = await this.postTopicRepository.findOne({where: {postTopic_Id: postTopicId}});
      //post.post_DateCreated = new Date();
      //data = await this.postStatsRepository.create(poststats);
      console.log("START POSTUPVOTEEEEEEEEEEEEEEE" + post.Post_Id);
      filteredList = await this.postUpvoteTrackerRepository.findAll({
        where: { Post_Id: post.Post_Id },
      });
      postStats = await this.postStatsRepository.findOne({
        where: { PostStats_Id: post.PostStats_Id },
      });

      console.log("------------------------Filtered List: " + filteredList);
      console.log("------------------------Post ID IS: " + post.Post_Id);
      console.log("------------------------USER ID IS: " + user_Id);

      if (filteredList == false) {
        console.log(
          "-------------------------------THE USER HAS NOT UPVOTED ON THIS YET"
        );
        data = await this.postUpvoteTrackerRepository.create({
          Post_Id: post.Post_Id,
          User_Id: user_Id,
        });

        upvotePluser = postStats.getDataValue("PostStats_Upvotes");
        upvotePluser++;
        await this.postStatsRepository.update(
          { PostStats_Upvotes: upvotePluser },
          {
            where: {
              PostStats_Id: post.PostStats_Id,
            },
          }
        );

        console.log("-------------------------------THE post has been upvoted");
        return data;
      } else {
        console.log("This post EXISTS IN UPVOTES");
        found = await this.postUpvoteTrackerRepository.findAll({
          where: { Post_Id: post.Post_Id, User_Id: user_Id },
        });
        console.log("-----------------------------Found" + found);
      }
      if (found == false) {
        console.log(
          "-------------------------------THE USER HAS NOT UPVOTED ON THIS YET"
        );
        data = await this.postUpvoteTrackerRepository.create({
          User_Id: user_Id,
          Post_Id: post.Post_Id,
        });
        upvotePluser = postStats.getDataValue("PostStats_Upvotes");
        upvotePluser++;
        await this.postStatsRepository.update(
          { PostStats_Upvotes: upvotePluser },
          {
            where: {
              PostStats_Id: post.PostStats_Id,
            },
          }
        );

        return data;
      } else {
        console.log(
          "---------------------------------THE USER HAS UPVOTED ON THIS"
        );
      }
    } catch (error) {
      console.log(error);
    }
    return data;
  }

  async getPostInformationByUserId(User_Id: number) {
    try {
      const post = await this.postRepository.findAll({
        where: {
          User_Id: User_Id,
        },
      });
      console.log("postStatsId::: ", post);
      return post;
    } catch (error) {
      console.log("error");
      return [];
    }
  }
}
