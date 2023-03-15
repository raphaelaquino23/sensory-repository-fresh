import {
  User,
  UserInformation,
  UserType,
  Application,
} from "../models/UserModel";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async listAllUserInfo() {
    return await this.userRepository.listAllUserInfo();
  }

  async login(userinformation: UserInformation) {
    return await this.userRepository.login(userinformation);
  }

  async loggedUser(UserInformation_Id: number) {
    return await this.userRepository.loggedUser(UserInformation_Id);
  }

  async register(user: User, userinformation: UserInformation) {
    return await this.userRepository.register(user, userinformation);
  }

  async registerAdmin(user: User, userinformation: UserInformation) {
    return await this.userRepository.registerAdmin(user, userinformation);
  }

  async getUser() {
    return await this.userRepository.getUser();
  }

  async getUserById(User_Id: number) {
    return await this.userRepository.getUserById(User_Id);
  }

  async getUserId(username: string) {
    return await this.userRepository.getUserId(username);
  }

  async getUserInformation() {
    return await this.userRepository.getUserInformation();
  }

  async getUserInformationById(id: number) {
    return await this.userRepository.getUserInformationById(id);
  }

  async getUserType() {
    return await this.userRepository.getUserType();
  }

  async getUserTypeById(UserType_Id: number) {
    return await this.userRepository.getUserTypeById(UserType_Id);
  }

  async getApplication() {
    return await this.userRepository.getApplication();
  }

  async createUser(user: User) {
    return await this.userRepository.createUser(user);
  }

  async createUserInformation(userinformation: UserInformation) {
    return await this.userRepository.createUserInformation(userinformation);
  }

  async createUserType(usertype: UserType) {
    return await this.userRepository.createUserType(usertype);
  }

  async createApplication(application: Application) {
    return await this.userRepository.createApplication(application);
  }

  async updateUser(user: User, userInformation: UserInformation) {
    return await this.userRepository.updateUser(user, userInformation);
  }

  async updateUserInformation(userinformation: UserInformation) {
    return await this.userRepository.updateUserInformation(userinformation);
  }

  async updateUserType(usertype: UserType) {
    return await this.userRepository.updateUserType(usertype);
  }

  async updateApplication(application: Application) {
    return await this.userRepository.updateApplication(application);
  }

  async deleteUser(User_Id: number) {
    return await this.userRepository.deleteUser(User_Id);
  }

  async deleteUserInformation(UserInformation_Id: number) {
    return await this.userRepository.deleteUserInformation(UserInformation_Id);
  }

  async deleteUserType(UserType_Id: number) {
    return await this.userRepository.deleteUserType(UserType_Id);
  }

  async deleteApplication(Application_Id: number) {
    return await this.userRepository.deleteApplication(Application_Id);
  }
}
