import { Sequelize } from "sequelize-typescript";
import { Post, PostInformation, PostCategory, PostStats, PostUpvoteTracker } from '../models/PostModel'
import { Article, ArticleInformation, ArticleStats, ArticleTopic, ArticleUpvoteTracker } from "../models/ArticleModel";
import { Campaign, CampaignInformation, CampaignList, CampaignStats, CampaignTopic, Partner } from "../models/CampaignModel";
import { AwarenessTest, AwarenessTestResult, AwarenessTestStats, AwarenessTestType } from '../models/AwarenessTestModel';
import { Comment, CommentInformation, CommentStats } from "../models/CommentModel";
import { Message } from '../models/MessageModel'
import { Application, User, UserInformation, UserType } from "../models/UserModel";
//removed ArticleTopic ^
export const connect = () => {

  const hostName = process.env.HOST ?? '';
  const userName = process.env.USER ?? '';
  const password = process.env.PASSWORD ?? '';
  const database = process.env.DB ?? '';
  const dialect: any = process.env.DIALECT ?? '';

  const operatorsAliases: any = false;

  const sequelize = new Sequelize(database, userName, password, {
    host:hostName,
    dialect,
    operatorsAliases,
    repositoryMode: true,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000
    }
  });

  sequelize.addModels([Post, PostInformation, PostCategory, PostStats, PostUpvoteTracker, Article, ArticleInformation, ArticleStats, ArticleTopic, ArticleUpvoteTracker, Message,
    Campaign, CampaignInformation, CampaignList, CampaignStats, CampaignTopic, Partner, AwarenessTest, AwarenessTestResult, AwarenessTestStats, AwarenessTestType, 
    Comment, CommentInformation, CommentStats, User, UserInformation, UserType, Application]);

  const db: any = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize

  return db;
}