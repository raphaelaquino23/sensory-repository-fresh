import { Request, Response } from "express";
import { User, UserInformation } from "../models/UserModel";
import { UserService } from "../service/UserService";
import { connect } from "../config/db.config";

export class AuthController {
  private db: any = {};
  private userService: UserService;
  private userInformationRepository: any;

  constructor() {
    this.db = connect()
    this.userService = new UserService();
    this.userInformationRepository = this.db.sequelize.getRepository(UserInformation); 
  }

  async login(userinformation: UserInformation){
    return await this.userService.login(userinformation);
  }

  async loggedUser(UserInformation_Id: number){
    return await this.userService.loggedUser(UserInformation_Id);
  }


	async register(user: User, userinformation: UserInformation){
		return await this.userService.register(user, userinformation)
	}

	async registerAdmin(user: User, userinformation: UserInformation){
		return await this.userService.registerAdmin(user, userinformation)
	}

  async listAllUserInfo(){
    return await this.userService.listAllUserInfo();
  }
  
}