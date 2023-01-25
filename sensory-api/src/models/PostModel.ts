import { Table, Column, Model, PrimaryKey, HasOne, CreatedAt, UpdatedAt, NotNull, ForeignKey, BelongsTo, AutoIncrement, AllowNull, NotEmpty, Unique } from 'sequelize-typescript';
import { User } from './UserModel';

//Post Table
@Table({createdAt: false, updatedAt: false})
export class Post extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  Post_Id: number;

  @Column
  PostInformation_Id: number;

  @Column
  PostStats_Id: number;

  @Column
  Post_DateCreated: Date;

  @Column
  Post_DateEdited: Date;

  @Column
  User_Id: number;

  @Column
  Post_DeactivatedStatus: boolean;

  @Column
  Post_DeactivatedBy: number;
}

//Post Information Table
@Table({createdAt: false, updatedAt: false})
export class PostInformation extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  PostInformation_Id: number;

  @Column
  PostInformation_Title: string;

  @Column
  PostInformation_Content: string;

  @Column
  PostCategory_Id: number;
}

//Post Category Table
@Table({ createdAt: false, updatedAt: false})
export class PostCategory extends Model{
  @AutoIncrement
  @PrimaryKey
  @Column
  PostCategory_Id: number;

  @Column
  PostCategory_Title: string;

  @Column
  PostCategory_Description: string;
}

//Post Stats Table
@Table({createdAt: false, updatedAt: false})
export class PostStats extends Model{
  @AutoIncrement
  @PrimaryKey
  @Column
  PostStats_Id: number;

  @Column
  PostStats_Upvotes: number;

  @Column
  PostStats_Clicks: number;
}

//POST UPVOTE TRACKER
@Table({createdAt: false, updatedAt: false})
export class PostUpvoteTracker extends Model {

  @ForeignKey(() => Post)
  @Column  
  set Post_Id(value: number) {
    this.setDataValue('Post_Id', value);
  }

  @ForeignKey(() => User)
  @Column
  set User_Id(value: number) {
    this.setDataValue('User_Id', value);
  }

}