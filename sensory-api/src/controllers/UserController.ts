import {
  Application,
  User,
  UserInformation,
  UserType,
} from "../models/UserModel";
import { UserService } from "../service/UserService";
import { winstonLogger } from "../logger/winston.logger";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUser() {
    winstonLogger.info("Controller: getUser", null);
    return await this.userService.getUser();
  }

  async getUserById(User_Id: number) {
    winstonLogger.info("Controller: getUserById", null);
    return await this.userService.getUserById(User_Id);
  }

  async getUserId(username: string) {
    winstonLogger.info("Controller: getUserId", null);
    return await this.userService.getUserId(username);
  }

  async getUserInformation() {
    winstonLogger.info("Controller: getUserInformation", null);
    return await this.userService.getUserInformation();
  }

  async getUserInformationById(id: number) {
    winstonLogger.info("Controller: getUserInformation", null);
    return await this.userService.getUserInformationById(id);
  }

  async getUserType() {
    winstonLogger.info("Controller: getUserType", null);
    return await this.userService.getUserType();
  }

  async getUserTypeById(UserType_Id: number) {
    winstonLogger.info("Controller: getUserTypeById", null);
    return await this.userService.getUserTypeById(UserType_Id);
  }

  async createUser(user: User) {
    winstonLogger.info("Controller: createUser", null);
    return await this.userService.createUser(user);
  }

  async createUserInformation(userinformation: UserInformation) {
    winstonLogger.info("Controller: createUserInformation", null);
    return await this.userService.createUserInformation(userinformation);
  }

  async createUserType(usertype: UserType) {
    winstonLogger.info("Controller: createUserType", null);
    return await this.userService.createUserType(usertype);
  }

  async createApplication(application: Application) {
    winstonLogger.info("Controller: createApplication", null);
    return await this.userService.createApplication(application);
  }

  async updateUser(user: User, userInformation: UserInformation) {
    winstonLogger.info("Controller: updateUser", null);
    return await this.userService.updateUser(user, userInformation);
  }

  async updateUserInformation(userinformation: UserInformation) {
    winstonLogger.info("Controller: updateUserInformation", null);
    return await this.userService.updateUserInformation(userinformation);
  }

  async updateUserType(usertype: UserType) {
    winstonLogger.info("Controller: updateUserType", null);
    return await this.userService.updateUserType(usertype);
  }

  async updateApplication(application: Application) {
    winstonLogger.info("Controller: updateApplication", null);
    return await this.userService.updateApplication(application);
  }

  async deleteUser(User_Id: number) {
    winstonLogger.info("Controller: deleteUser", null);
    return await this.userService.deleteUser(User_Id);
  }

  async deleteUserInformation(UserInformation_Id: number) {
    winstonLogger.info("Controller: deleteUserInformation", null);
    return await this.userService.deleteUserInformation(UserInformation_Id);
  }

  async deleteUserType(UserType_Id: number) {
    winstonLogger.info("Controller: deleteUserType", null);
    return await this.userService.deleteUserType(UserType_Id);
  }

  async deleteApplication(Application_Id: number) {
    winstonLogger.info("Controller: deleteApplication", null);
    return await this.userService.deleteApplication(Application_Id);
  }

  async register(user: User, userinformation: UserInformation) {
    return await this.userService.register(user, userinformation);
  }
}
