import * as bodyParser from "body-parser";
import { APILogger } from "./logger/api.logger";
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import 'dotenv/config'
import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import fileUpload, { UploadedFile } from 'express-fileupload'
import path from 'path'

import { ArticleController } from "./controllers/ArticleController";
import { PostController } from "./controllers/PostController";
import { MessageController } from "./controllers/MessageController";
import { CampaignController } from "./controllers/CampaignController";
import { AwarenessTestController } from "./controllers/AwarenessTestController";
import { CommentController } from "./controllers/CommentController"
import { AuthController } from "./controllers/AuthController";
import { UserController } from "./controllers/UserController";
import { Message } from "./models/MessageModel";
import { checkJwt } from "./middleware/checkJwt";
///import { ArticleInformationController } from "./controllers/ArticleInformationController";

class App {
  public express: express.Application;
  public logger: APILogger;
  public postController: PostController;
	public articleController: ArticleController;
  public campaignController: CampaignController;
  public awarenessTestController: AwarenessTestController;
  public commentController: CommentController;
  public messageController: MessageController;
	public authController: AuthController;
	public userController: UserController;
	//public articleinformationController: ArticleInformationController

  /* Swagger files start */
  private swaggerFile: any = (process.cwd()+"/swagger/swagger.json");
  private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
  private customCss: any = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
  private swaggerDocument = JSON.parse(this.swaggerData);
  /* Swagger files end */

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
		// this.multer = multer();


    this.logger = new APILogger();
    this.postController = new PostController();
		this.articleController = new ArticleController();
    this.messageController = new MessageController();
    this.campaignController = new CampaignController();
		this.awarenessTestController = new AwarenessTestController();
    this.commentController = new CommentController();
		this.authController= new AuthController();
		this.userController= new UserController();
		//this.articleinformationController = new ArticleInformationController();
  }

    // Configure Express middleware.
  private middleware(): void {

		this.express.use(fileUpload({
			createParentPath: true
	}));


		const corsOptions = {
			origin:'http://localhost:3000',
			credentials: true,
			optionSuccessStatus:200
		}
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(cors(corsOptions))
		this.express.use(helmet())
  }

  private routes(): void {
    // ROOT
    this.express.get("/", (req, res, next) => {
      res.send("Typescript App works!!");
    });

    // Posts
    this.express.get('/api/post', (req, res) => {
      this.postController.getPosts().then((data: any) => res.json(data));
    });
    this.express.get('/api/post/:id', (req, res) => {
      this.postController.getPostById(parseInt(req.params.id)).then((data: any) => res.json(data));
    });
    this.express.post('/api/post', (req, res) => {
      this.postController.createPost(req.body.post, req.body.postInformation, req.body.postStats).then((data: any) => res.json(data));
    });
    this.express.put('/api/post', (req, res) => {
      this.postController.updatePost(req.body.post, req.body.postInformation, req.body.postStats).then((data: any) => res.json(data));
    });
    this.express.delete('/api/post/:id', (req, res) => {
      this.postController.deletePost(parseInt(req.params.id)).then((data: any) => res.json(data));
    });
    
    // Post Information
    this.express.get('/api/postinformation' ,(req: any, res: any) => {
      this.postController.getPostInformation().then((data: any) => res.json(data));
    });
    this.express.get('/api/postinformation/:id', (req, res) => {
      this.postController.getPostInformationById(parseInt(req.params.id)).then((data: any) => res.json(data));
    });
    this.express.put('/api/postinformation', (req, res) => {
      this.postController.updatePostInformation(req.body.postinformation).then((data: any) => res.json(data));
    })
    this.express.post('/api/postinformation', (req, res) => {
      this.postController.createPostInformation(req.body.postinformation,req.body.poststats).then((data: any) => res.json(data));
    });
    this.express.delete('/api/postinformation/:id', (req, res) => {
      this.postController.deletePostInformation(parseInt(req.params.id)).then((data: any) => res.json(data));
    });

    // Post Category
    this.express.get('/api/postcategory', (req, res) => {
      this.postController.getPostCategory().then((data: any) => res.json(data));
    });
    this.express.put('/api/postcategory', (req, res) => {
      this.postController.createPostCategory(req.body.postcategory).then((data: any) => res.json(data));
    })
    this.express.post('/api/postcategory', (req, res) => {
      this.postController.createPostCategory(req.body.postcategory).then((data: any) => res.json(data));
    });
    this.express.delete('/api/postcategory/:id', (req, res) => {
      this.postController.deletePostCategory(parseInt(req.params.id)).then((data: any) => res.json(data));
    });    
		
		// Post Stats
    this.express.get('/api/poststats', (req, res) => {
      this.postController.getPostStats().then((data: any) => res.json(data));
    });
		this.express.get('/api/poststats/:id', (req, res) => {
      this.postController.getPostStatsById(parseInt(req.params.id)).then((data: any) => res.json(data));
    });
    this.express.put('/api/poststats', (req, res) => {
      this.postController.createPostStats(req.body.poststats).then((data: any) => res.json(data));
    })
    this.express.post('/api/poststats', (req, res) => {
      this.postController.createPostStats(req.body.poststats).then((data: any) => res.json(data));
    });
    this.express.delete('/api/poststats/:id', (req, res) => {
      this.postController.deletePostStats(parseInt(req.params.id)).then((data: any) => res.json(data));
    });

		//POST UPVOTE TRACKER ROUTE
		this.express.post('/api/postUpvoteTracker', (req, res) => {
      this.postController.postUpvoteTracker(req.body.post, req.body.user_Id).then((data: any) => res.json(data));
    });

    // Articles
		this.express.get('/api/article', (req, res) => {
			this.articleController.getArticles().then(data => res.json(data));
		});

		this.express.post('/api/article', (req, res) => {
				this.articleController.createArticle(req.body.article, req.body.articleInformation, 
					req.body.articleStats, req.body.fileName).then(data => res.json(data));
	});

		this.express.put('/api/article', (req, res) => {
			this.articleController.updateArticle(req.body.article, req.body.articleInformation, req.body.articleStats).then(data => res.json(data));
		});
		this.express.delete('/api/article/:id', (req, res) => {
			this.articleController.deleteArticle(parseInt(req.params.id)).then(data => res.json(data));
		});

		const fs = require('fs');

		this.express.get('/api/getFile/:id', (req, res) => {
			this.articleController.getFile(parseInt(req.params.id)).then((data: { fileUrl: any; }) => {

				try{
				let url = data
				let file = fs.createReadStream(`../Uploads/${url}`);
				res.setHeader('Content-disposition', `attachment; filename=${url}`);
				file.pipe(res);
				}catch(err){
					res.status(500).send(err);
				}
				});
		})

		this.express.get('/api/getFileActivity/:id', (req, res) => {
			this.campaignController.getFile(parseInt(req.params.id)).then((data: { fileUrl: any; }) => {

				try{
				let url = data

				console.log("+++++++++++++++++++++++++++URL" + url);

				let file = fs.createReadStream(`../Uploads/${url}`);

				
				console.log("******************************FILE" + file);

				res.setHeader('Content-disposition', `attachment; filename=${url}`);
				file.pipe(res);

				}catch(err){
					res.status(500).send(err);
				}
				});
		})

		this.express.get('/api/getImage/:id', (req, res) => {
			this.articleController.getImage(parseInt(req.params.id)).then((data: { fileUrl: any; }) => {

				try{
				let url = data

				console.log("+++++++++++++++++++++++++++URL" + url);

				let file = fs.createReadStream(`../Uploads/${url}`);

				
				console.log("******************************FILE" + file);

				res.setHeader('Content-disposition', `attachment; filename=${url}`);
				file.pipe(res);

				}catch(err){
					res.status(500).send(err);
				}
				});
		})

		//FILE UPLOAD HERE
		this.express.post('/api/upload', async (req, res) => {
			try{
				if(!req.files){
					res.send({
						status: false,
						message: 'No files uploaded'
					});	
				}else {
					let file = req.files.file as UploadedFile;
					file.mv(`../Uploads/${file.name}`);

					res.send({
						status: true,
						message: 'File is uploaded',
						data: {
								name: file.name,
								mimetype: file.mimetype,
								size: file.size
						}
				});
				}
			} catch(err){
				res.status(500).send(err);
			}
		})


    // Article Information
		this.express.get('/api/articleinformation', (req: any, res: any) => {
			this.articleController.getArticleInformations().then(data => res.json(data));
		});
			this.express.post('/api/articleinformation', (req, res) => {
			this.articleController.createArticleInformation(req.body.articleinformation).then(data => res.json(data));
		});

		this.express.put('/api/articleinformation', (req, res) => {
			this.articleController.updateArticleInformation(req.body.articleinformation).then(data => res.json(data));
		});
		this.express.delete('/api/articleinformation/:id', (req, res) => {
			this.articleController.deleteArticleInformation(parseInt(req.params.id)).then(data => res.json(data));
		});

		// Article Stats
		this.express.get('/api/articlestats', (req, res) => {
			this.articleController.getArticleStats().then(data => res.json(data));
		});
		this.express.post('/api/articlestats', (req, res) => {
			this.articleController.createArticleStats(req.body.articlestats).then(data => res.json(data));
		});
		this.express.put('/api/articlestats', (req, res) => {
			this.articleController.updateArticleStats(req.body.articlestats).then(data => res.json(data));
		});
		this.express.delete('/api/articlestats/:id', (req, res) => {
			this.articleController.deleteArticleStats(parseInt(req.params.id)).then(data => res.json(data));
		});

		// Article Topic
		this.express.get('/api/articletopic', (req, res) => {
			this.articleController.getArticleTopic().then(data => res.json(data));
		});
		this.express.post('/api/articletopic', (req, res) => {
			this.articleController.createArticleTopic(req.body.articletopic).then(data => res.json(data));
		});
		this.express.put('/api/articletopic', (req, res) => {
			this.articleController.updateArticleTopic(req.body.articletopic).then(data => res.json(data));
		});
		this.express.delete('/api/articletopic/:id', (req, res) => {
			this.articleController.deleteArticleTopic(parseInt(req.params.id)).then(data => res.json(data));
		});

		// Article Upvote Tracker
		this.express.post('/api/articleUpvoteTracker', (req, res) => {
			this.articleController.articleUpvoteTracker(req.body.article, req.body.user_Id).then((data: any) => res.json(data));
		});

		// this.express.post('/api/postUpvoteTracker', (req, res) => {
		// 	this.postController.postUpvoteTracker(req.body.post, req.body.user_Id).then((data: any) => res.json(data));
		//   });

    // Messages
		this.express.get('/api/message', (req, res) => {
			this.messageController.getMessage().then(data => res.json(data));
		});
		this.express.get('/api/messages/:id', (req, res) => {
			this.messageController.getAllMessageFromUserId(parseInt(req.params.id)).then(data => res.json(data));
		});
		this.express.post('/api/message', (req, res) => {
			this.messageController.createMessage(req.body.message, req.body.SenderName, req.body.ReceiverName).then(data => res.json(data));
		});
		this.express.put('/api/message', (req, res) => {
			this.messageController.updateMessage(req.body.message).then(data => res.json(data));
		});
		this.express.delete('/api/message/:id', (req, res) => {
			this.messageController.deleteMessage(parseInt(req.params.id)).then(data => res.json(data));
		});

    // Campaign
		this.express.get('/api/campaign', (req, res) => {
			this.campaignController.getCampaign().then(data => res.json(data));
		});
		this.express.post('/api/campaign', (req, res) => {
			this.campaignController.createCampaign(req.body.campaign,req.body.campaignInformation,req.body.campaignStats).then(data => res.json(data));
		});
		this.express.put('/api/campaign', (req, res) => {
			this.campaignController.updateCampaign(req.body.campaign,req.body.campaignInformation,req.body.campaignStats).then(data => res.json(data));
		});
		this.express.delete('/api/campaign/:id', (req, res) => {
			this.campaignController.deleteCampaign(parseInt(req.params.id)).then(data => res.json(data));
		});

		this.express.post('/api/campaignsignup', (req, res) => {
			this.campaignController.campaignSignUp(req.body.campaign, req.body.userid).then(data => res.json(data))
		});

    // Campaign Information
		this.express.get('/api/campaigninformation', (req, res) => {
			this.campaignController.getCampaignInformation().then(data => res.json(data));
		});
		this.express.post('/api/campaigninformation', (req, res) => {
			this.campaignController.createCampaignInformation(req.body.campaigninformation).then(data => res.json(data));
		});
		this.express.put('/api/campaigninformation', (req, res) => {
			this.campaignController.updateCampaignInformation(req.body.campaigninformation).then(data => res.json(data));
		});
		this.express.delete('/api/campaigninformation/:id', (req, res) => {
			this.campaignController.deleteCampaign(parseInt(req.params.id)).then(data => res.json(data));
		});

    // Campaign List
		this.express.get('/api/campaignlist', (req, res) => {
			this.campaignController.getCampaignList().then(data => res.json(data));
		});
		this.express.post('/api/campaignlist', (req, res) => {
			this.campaignController.createCampaignList(req.body.user_Id, req.body.campaign_Id).then(data => res.json(data));
		});
		this.express.put('/api/campaignlist', (req, res) => {
			this.campaignController.updateCampaignList(req.body.campaignlist).then(data => res.json(data));
		});
		this.express.delete('/api/campaignlist/:id', (req, res) => {
			this.campaignController.deleteCampaignList(parseInt(req.params.id)).then(data => res.json(data));
		});

    // Campaign Stats 
		this.express.get('/api/campaignstats', (req, res) => {
			this.campaignController.getCampaignStats().then(data => res.json(data));
		});
		this.express.post('/api/campaignstats', (req, res) => {
			this.campaignController.createCampaignStats(req.body.campaignstats).then(data => res.json(data));
		});
		this.express.put('/api/campaignstats', (req, res) => {
			this.campaignController.updateCampaignStats(req.body.campaignstats).then(data => res.json(data));
		});
		this.express.delete('/api/campaignstats/:id', (req, res) => {
			this.campaignController.deleteCampaignStats(parseInt(req.params.id)).then(data => res.json(data));
		});

    // Campaign Topic
		this.express.get('/api/campaigntopic', (req, res) => {
			this.campaignController.getCampaignTopic().then(data => res.json(data));
		});
		this.express.post('/api/campaigntopic', (req, res) => {
			this.campaignController.createCampaignTopic(req.body.campaigntopic).then(data => res.json(data));
		});
		this.express.put('/api/campaigntopic', (req, res) => {
			this.campaignController.updateCampaignTopic(req.body.campaigntopic).then(data => res.json(data));
		});
		this.express.delete('/api/campaigntopic/:id', (req, res) => {
			this.campaignController.deleteCampaignTopic(parseInt(req.params.id)).then(data => res.json(data));
		});
		
		// AwarenessTest
		this.express.get('/api/awarenesstest', (req, res) => {
			this.awarenessTestController.getAwarenessTest().then(data => res.json(data));
		});
		this.express.post('/api/awarenesstest', (req, res) => {
			this.awarenessTestController.createAwarenessTest(req.body.awarenesstest, req.body.awarenessteststats).then(data => res.json(data));
		});
		this.express.put('/api/awarenesstest', (req, res) => {
			this.awarenessTestController.updateAwarenessTest(req.body.awarenesstest, req.body.awarenessteststats).then(data => res.json(data));
		});
		this.express.delete('/api/awarenesstest/:id', (req, res) => {
			this.awarenessTestController.deleteAwarenessTest(parseInt(req.params.id)).then(data => res.json(data));
		});

		//AwarenessTestResults		
		this.express.get('/api/awarenesstestresult', (req, res) => {
			this.awarenessTestController.getAwarenessTestResult().then(data => res.json(data));
		});
		this.express.post('/api/awarenesstestresult', (req, res) => {
			this.awarenessTestController.createAwarenessTestResult(req.body.awarenesstestresult).then(data => res.json(data));
		});
		this.express.put('/api/awarenesstestresult', (req, res) => {
			this.awarenessTestController.updateAwarenessTestResult(req.body.awarenesstestresult).then(data => res.json(data));
		});
		this.express.delete('/api/awarenesstestresult/:id', (req, res) => {
			this.awarenessTestController.deleteAwarenessTestResult(parseInt(req.params.id)).then(data => res.json(data));
		});

		//AwarenessTestType		
		this.express.get('/api/awarenesstesttype', (req, res) => {
			this.awarenessTestController.getAwarenessTestType().then(data => res.json(data));
		});
		this.express.post('/api/awarenesstesttype', (req, res) => {
			this.awarenessTestController.createAwarenessTestType(req.body.awarenesstesttype).then(data => res.json(data));
		});
		this.express.put('/api/awarenesstesttype', (req, res) => {
			this.awarenessTestController.updateAwarenessTestType(req.body.awarenesstesttype).then(data => res.json(data));
		});
		this.express.delete('/api/awarenesstesttype/:id', (req, res) => {
			this.awarenessTestController.deleteAwarenessTestType(parseInt(req.params.id)).then(data => res.json(data));
		});

    // Comment
		this.express.get('/api/comment', (req, res) => {
			this.commentController.getComment().then(data => res.json(data));
		});
		this.express.get('/api/comment/:id', (req, res) => {
			this.commentController.getCommentById(parseInt(req.params.id)).then(data => res.json(data));
		});

		this.express.get('/api/commentbypost/:id', (req, res) => {
			this.commentController.getCommentByPostId(parseInt(req.params.id)).then(data => res.json(data));
		});

		this.express.post('/api/comment', (req, res) => {
			this.commentController.createComment(req.body.comment, req.body.commentInformation, req.body.commentStats).then(data => res.json(data));
		});
		this.express.put('/api/comment', (req, res) => {
			this.commentController.updateComment(req.body.comment, req.body.commentInformation, req.body.commentStats).then(data => res.json(data));
		});
		this.express.delete('/api/comment/:id', (req, res) => {
			this.commentController.deleteComment(parseInt(req.params.id)).then(data => res.json(data));
		});

    // Comment Information
		this.express.get('/api/commentinformation', (req, res) => {
			this.commentController.getCommentInformation().then(data => res.json(data));
		});
		
		this.express.get('/api/commentinformation/:id', (req, res) => {
			this.commentController.getCommentInformationById(parseInt(req.params.id)).then(data => res.json(data));
		});
		this.express.post('/api/commentinformation', (req, res) => {
			this.commentController.createCommentInformation(req.body.commentinformation).then(data => res.json(data));
		});
		this.express.put('/api/commentinformation', (req, res) => {
			this.commentController.updateCommentInformation(req.body.commentinformation).then(data => res.json(data));
		});
		this.express.delete('/api/commentinformation/:id', (req, res) => {
			this.commentController.deleteCommentInformation(parseInt(req.params.id)).then(data => res.json(data));
		});

    // Comment Stats
		this.express.get('/api/commentstats', (req, res) => {
			this.commentController.getCommentStats().then(data => res.json(data));
		});
		this.express.post('/api/commentstats', (req, res) => {
			this.commentController.createCommentStats(req.body.commentstats).then(data => res.json(data));
		});
		this.express.put('/api/commentstats', (req, res) => {
			this.commentController.updateCommentStats(req.body.commentstats).then(data => res.json(data));
		});
		this.express.delete('/api/commentstats/:id', (req, res) => {
			this.commentController.deleteCommentStats(parseInt(req.params.id)).then(data => res.json(data));
		});

		// User Information
		this.express.get('/api/userinformation', (req: any, res: any) => {
			this.userController.getUserInformation().then(data => res.json(data));
		});
		
		this.express.get('/api/userinformation/:id', (req: any, res: any) => {
			this.userController.getUserInformationById(parseInt(req.params.id)).then(data => res.json(data));
		});

		this.express.get('/api/userinfo', (req: any, res: any) => {
			this.authController.listAllUserInfo().then(data => res.json(data));
		});

		this.express.post('/api/register', (req, res) => {
			this.authController.register(req.body.user, req.body.userinformation).then(data => res.json(data));
		});

		this.express.post('/api/registeradmin', (req, res) => {
			this.authController.registerAdmin(req.body.user, req.body.userinformation).then(data => res.json(data));
		});

		this.express.post('/api/login', (req, res) => {
			this.authController.login(req.body.userinformation).then(data => {
				res.json(data)});
		});

		this.express.get('/api/logged-user/:id', (req: any, res: any) => {
			this.authController.loggedUser(parseInt(req.params.id)).then(data => {
				res.json(data)
			});
		});

		// User Type
		this.express.post('/api/createusertype', (req, res) => {
			this.userController.createUserType(req.body.usertype).then(data => res.json(data));
		});

		this.express.get('/api/usertype/:id', (req: any, res: any) => {
			this.userController.getUserTypeById(parseInt(req.params.id)).then(data => {
				res.json(data)
			});
		});

		this.express.get('/api/getuserid/:username', (req: any, res: any) => {
			this.userController.getUserId((req.params.username)).then((data =>  {
				res.json(data)
			}))
		});

    // swagger docs
    this.express.use('/api/docs', swaggerUi.serve,
    swaggerUi.setup(this.swaggerDocument, undefined, this.customCss));
    
    // handle undefined routes
    this.express.use("*", (req, res, next) => {
      res.send("Make sure url is correct!!!");
    });
  }
}

export default new App().express;