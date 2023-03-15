import { APILogger } from "../logger/api.logger";
import { Application, User, UserInformation, UserType } from "../models/UserModel";
import { UserService } from "../service/UserService";

export class UserController {

  private userService: UserService;
  private logger: APILogger;

  constructor() {
    this.userService = new UserService();
    this.logger = new APILogger();
  }

  async getUser(){
    this.logger.info('Controller: getUser', null)
    return await this.userService.getUser();
  }

  async getUserById(User_Id: number){
    this.logger.info('Controller: getUserById', null)
    return await this.userService.getUserById(User_Id);
  }

  async getUserId(username: string){
    this.logger.info('Controller: getUserId', null)
    return await this.userService.getUserId(username);
  }

  async getUserInformation(){
    this.logger.info('Controller: getUserInformation', null)
    return await this.userService.getUserInformation();
  }
  
  async getUserInformationById(id: number){
    this.logger.info('Controller: getUserInformation', null)
    return await this.userService.getUserInformationById(id);
  }


  async getUserType(){
    this.logger.info('Controller: getUserType', null)
    return await this.userService.getUserType();
  }

  async getUserTypeById(UserType_Id: number){
    this.logger.info('Controller: getUserTypeById', null)
    return await this.userService.getUserTypeById(UserType_Id);
  }

  async createUser(user: User){
    this.logger.info('Controller: createUser', null)
    return await this.userService.createUser(user);
  }

  async createUserInformation(userinformation: UserInformation){
    this.logger.info('Controller: createUserInformation', null)
    return await this.userService.createUserInformation(userinformation);
  }

  async createUserType(usertype: UserType){
    this.logger.info('Controller: createUserType', null)
    return await this.userService.createUserType(usertype);
  }

  async createApplication(application: Application){
    this.logger.info('Controller: createApplication', null)
    return await this.userService.createApplication(application);
  }

  async updateUser(user: User){
    this.logger.info('Controller: updateUser', null)
    return await this.userService.updateUser(user);
  }

  async updateUserInformation(userinformation: UserInformation){
    this.logger.info('Controller: updateUserInformation', null)
    return await this.userService.updateUserInformation(userinformation);
  }

  async updateUserType(usertype: UserType){
    this.logger.info('Controller: updateUserType', null)
    return await this.userService.updateUserType(usertype);
  }

  async updateApplication(application: Application){
    this.logger.info('Controller: updateApplication', null)
    return await this.userService.updateApplication(application);
  }

  async deleteUser(User_Id: number){
    this.logger.info('Controller: deleteUser', null)
    return await this.userService.deleteUser(User_Id);
  }

  async deleteUserInformation(UserInformation_Id: number){
    this.logger.info('Controller: deleteUserInformation', null)
    return await this.userService.deleteUserInformation(UserInformation_Id);
  }

  async deleteUserType(UserType_Id: number){
    this.logger.info('Controller: deleteUserType', null)
    return await this.userService.deleteUserType(UserType_Id);
  }

  async deleteApplication(Application_Id: number){
    this.logger.info('Controller: deleteApplication', null)
    return await this.userService.deleteApplication(Application_Id);
  }

  
	async register(user: User, userinformation: UserInformation){
		return await this.userService.register(user, userinformation)
	}

}