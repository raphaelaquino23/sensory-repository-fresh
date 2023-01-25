import { Table, Column, Model, PrimaryKey, HasOne, CreatedAt, UpdatedAt, NotNull, ForeignKey, BelongsTo, AutoIncrement, AllowNull, NotEmpty, Unique, HasMany } from 'sequelize-typescript';
import { Post } from './PostModel';
//COMPLETE 
//Model for User, UserInformation, UserType, and Application

//User
@Table({ createdAt: false, updatedAt: false})
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column 
  User_Id: number;

  @ForeignKey(() => UserInformation)
  @Column
  UserInformation_Id: number;

  @Column
  User_DateCreated: Date;

  @Column
  User_DateEdited: Date;

  @Column
  User_DeactivatedStatus: boolean;

  @Column
  User_DeactivatedBy: number;
}

//UserInformation
@Table({ createdAt: false, updatedAt: false})
export class UserInformation extends Model{
  @AutoIncrement
  @PrimaryKey
  @Column
  UserInformation_Id: number;

  @Column
  UserInformation_Name: string;

  @ForeignKey(() => UserType)
  @Column
  get UserType_Id(): number{
    return this.getDataValue('UserType_Id');
  }
  //UserType_Id: number;

  @Column
  UserInformation_Password: string;

  @Column
  UserInformation_Email: string;

  @Column
  UserInformation_Image: string;

  @Column
  UserInformation_Description: string;
}

//User Type
@Table({ createdAt: false, updatedAt: false})
export class UserType extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  UserType_Id: number;

  @Column
  UserType_Name: string;

  @Column
  UserType_Description: string;
}

//Application
@Table({ createdAt: false, updatedAt: false})
export class Application extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  Application_Id: number;

  @ForeignKey(() => User)
  @Column
  User_Id: number;

  @ForeignKey(() => UserType)
  @Column
  UserType_Id: number;

  @Column
  Appliction_Content: String;

  @Column
  Application_DateSubmitted: Date;
}