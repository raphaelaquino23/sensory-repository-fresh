import { connect } from "../config/db.config";
import { APILogger } from "../logger/api.logger";
import { User, UserInformation, UserType, Application } from "../models/UserModel";
import bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import config from '../middleware/config';

export class UserRepository {

  private logger: APILogger;
  private db: any = {};
  private userRepository: any;
  private userInformationRepository: any;
  private userTypeRepository: any;
  private applicationRepository: any;

  constructor() {
    this.db = connect();
    this.userRepository = this.db.sequelize.getRepository(User);
    this.userInformationRepository = this.db.sequelize.getRepository(UserInformation);    
    this.userTypeRepository = this.db.sequelize.getRepository(UserType);
    this.applicationRepository = this.db.sequelize.getRepository(Application);
  }

  async login(userinformation: UserInformation){
    let foundUser, isPass, accessToken, thisUser = {}
    try {
      //Get user from database
      console.log("======START=======")
      console.log("userinformation " + userinformation.UserInformation_Name)
      foundUser = await this.userInformationRepository.findOne({ 
        where: {
          UserInformation_Name: userinformation.UserInformation_Name
        }})
        console.log("======Found User=======" + foundUser.getDataValue("UserInformation_Name"))
        if (foundUser) {
          if (isPass = await bcrypt.compare(userinformation.UserInformation_Password, foundUser.getDataValue("UserInformation_Password"))){
            isPass === true;
            console.log("======Password Passed=======")
            const token = jwt.sign({username: userinformation.UserInformation_Name}, config.jwtSecret, {
              expiresIn: "1h"
            })
            console.log("======Token Signed=======")
            thisUser = foundUser.UserInformation_Name
            console.log("this is the foundUser ======= " + thisUser)
            return token
            //return {token, thisUser}
          } else { isPass === false}
          if (isPass === false){
            console.log("======Password Failed=======")
          }
        } else if (!foundUser){
          console.log("======User not found=======")
        }
    } catch (error) {
      console.log("Error")
    }
  }

  async register(user: User, userinformation: UserInformation) {
    let foundUser, foundEmail, uInfo, data = {};
    const saltRound = 8;
    foundUser = await this.userInformationRepository.findOne({ 
      where: {
        UserInformation_Name: userinformation.UserInformation_Name
      }})

    foundEmail = await this.userInformationRepository.findOne({ 
      where: {
        UserInformation_Email: userinformation.UserInformation_Email
      }})

    if(!foundUser){
      if(!foundEmail){
        try {
          uInfo = await this.userInformationRepository.create({
            UserInformation_Name: userinformation.UserInformation_Name,
            UserType_Id: 4,
            UserInformation_Email: userinformation.UserInformation_Email,
            UserInformation_Description: userinformation.UserInformation_Description,
            UserInformation_Image: "default.png",
            UserInformation_Password: await bcrypt.hash(userinformation.UserInformation_Password, saltRound)
          });
          user.User_DateCreated = new Date();
          user.UserInformation_Id = uInfo.getDataValue("UserInformation_Id");
          user.User_DeactivatedStatus = false;
          await this.userRepository.create(user);

          data = uInfo;

        } catch (error) {
          console.log('Error:: ');
        }
    }
  }
    return data;
  }

  async registerAdmin(user: User, userinformation: UserInformation) {
    let uInfo, data = {};
    const saltRound = 8;
    try {
      uInfo = await this.userInformationRepository.create({
        UserInformation_Name: userinformation.UserInformation_Name,
        UserType_Id: 2,
        UserInformation_Email: userinformation.UserInformation_Email,
        UserInformation_Description: userinformation.UserInformation_Description,
        UserInformation_Image: "default.png",
        UserInformation_Password: await bcrypt.hash(userinformation.UserInformation_Password, saltRound)
      });
      user.User_DateCreated = new Date();
      user.UserInformation_Id = uInfo.getDataValue("UserInformation_Id");
      user.User_DeactivatedStatus = false;
      await this.userRepository.create(user);

      data = uInfo;

    } catch (error) {
      console.log('Error:: ');
    }
    return data;
  }

  async loggedUser(UserId: number) {
    let userInfo, thisUserType = {}
    try {

      userInfo = await this.userRepository.findOne({ where: {
        User_Id: UserId
      }})

      const Users = await this.userInformationRepository.findOne({ where: {
        UserInformation_Id: userInfo.getDataValue("UserInformation_Id")
      }});
      if(!Users || Users === null){
        return []
      } else
      thisUserType = Users.getDataValue("UserType_Id")
      //console.log('Logged User::: ', Users);
      console.log('UserType::: ', thisUserType);
      return Users;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async listAllUserInfo() {
    try {
      const Userinformation = await this.userInformationRepository.findAll();
      console.log('Userinformation::: ', Userinformation);
      return Userinformation;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getUser() {
    try {
      const Users = await this.userRepository.findAll();
      console.log('Users::: ', Users);
      return Users;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getUserById(User_Id: number) {
    try {
      const User = await this.userRepository.findOne({ where: {User_Id: User_Id}});
      console.log('User by ID:: ', User);
      return User;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getUserId(username: string) {
    try {
      let userId, data, data2, data3 = {}
      data = await this.userInformationRepository.findOne({ where: {UserInformation_Name: username}})
      data2 = await this.userRepository.findOne({ where: {UserInformation_Id: data.getDataValue("UserInformation_Id")}})
      userId = data2.getDataValue("User_Id")
      console.log("USERID HERE ==== " + userId)
      return userId; 
    } catch (error) {
      console.log(error + " WALAAAAAAAAAA ")
      return []
    }
  }

  async createUser(User: User) {
    let data = {};
    try {
      User.User_DateCreated = new Date();
      data = await this.userRepository.create(User);
    } catch (error) {
      console.log('Error:: ');
    }
    return data;
  }

  async updateUser(User: User) {
    let data = {};
    try {
      User.User_DateEdited = new Date();
      data = await this.userRepository.update({...User}, {
        where: {
          User_Id: User.id
        }
      });
    } catch (error) {
      this.logger.error('Error::' + error);
    }
    return data;
  }

  async deleteUser(User_Id: number){
    let data = {};
    try {
      data = await this.userRepository.destroy({
        where: {
          id: User_Id
        }
      })
    } catch (error) {
      this.logger.error('Error:: ' + error);
    }
    return data;
  }
  
  async getUserInformation() {
    try {
      const Userinformation = await this.userInformationRepository.findAll();
      console.log('Userinformation::: ', Userinformation);
      return Userinformation;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getUserInformationById(id:number) {
    try {
      const Userinformation = await this.userInformationRepository.findOne({ where: {UserInformation_Id: id}});
      console.log('User by ID:: ', Userinformation);
      return Userinformation;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async createUserInformation(userinformation: UserInformation) {
    let data = {};
    try {
      data = await this.userInformationRepository.create(userinformation);
    } catch (error) {
      this.logger.error('Error:: ' + error);
    }
    return data;
  }

  async updateUserInformation(userinformation: UserInformation) {
    let data = {};
    try {
      data = await this.userInformationRepository.update({...UserInformation}, {
        where: {
          UserInformation_Id: userinformation.UserInformation_Id
        }
      });
    } catch (error) {
      this.logger.error('Error::' + error);
    }
    return data;
  }

  async deleteUserInformation(UserInformation_Id: number){
    let data = {};
    try {
      data = await this.userInformationRepository.destroy({
        where: {
          id: UserInformation_Id
        }
      })
    } catch (error) {
      this.logger.error('Error:: ' + error);
    }
    return data;
  }
  async getUserType() {
    try {
      const UserType = await this.userTypeRepository.findAll();
      console.log('User Type::: ', UserType);
      return UserType;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getUserTypeById(UserType_Id: number) {
    try {
      const UserType = await this.userTypeRepository.findOne({ where: {UserType_Id: UserType_Id}});
      console.log('User by ID:: ', UserType);
      return UserType;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async createUserType(usertype: UserType) {
    let data = {};
    try {
      data = await this.userTypeRepository.create({
        UserType_Name: usertype.UserType_Name,
        UserType_Description: usertype.UserType_Description
      });
    } catch (error) {
      this.logger.error('Error:: ' + error);
    }
    return data;
  }

  async updateUserType(UserType: UserType) {
    let data = {};
    try {
      data = await this.userTypeRepository.update({...UserType}, {
        where: {
          UserType_Id: UserType.id
        }
      });
    } catch (error) {
      this.logger.error('Error::' + error);
    }
    return data;
  }

  async deleteUserType(UserType_Id: number){
    let data = {};
    try {
      data = await this.userTypeRepository.destroy({
        where: {
          id: UserType_Id
        }
      })
    } catch (error) {
      this.logger.error('Error:: ' + error);
    }
    return data;
  }

  async getApplication() {
    try {
      const Application = await this.applicationRepository.findAll();
      console.log('Applications::: ', Application);
      return Application;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async createApplication(Application: Application) {
    let data = {};
    try {
      Application.Application_DateSubmitted = new Date();
      data = await this.applicationRepository.create(Application);
    } catch (error) {
      this.logger.error('Error:: ' + error);
    }
    return data;
  }

  async updateApplication(Application: Application) {
    let data = {};
    try {
      data = await this.applicationRepository.update({...Application}, {
        where: {
          Application_Id: Application.id
        }
      });
    } catch (error) {
      this.logger.error('Error::' + error);
    }
    return data;
  }

  async deleteApplication(Application_Id: number){
    let data = {};
    try {
      data = await this.applicationRepository.destroy({
        where: {
          id: Application_Id
        }
      })
    } catch (error) {
      this.logger.error('Error:: ' + error);
    }
    return data;
  }

}