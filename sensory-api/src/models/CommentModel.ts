import { Table, Column, Model, PrimaryKey, HasOne, CreatedAt, UpdatedAt, NotNull, ForeignKey, BelongsTo, AutoIncrement, AllowNull, NotEmpty, Unique } from 'sequelize-typescript';
import { User } from './UserModel';
//COMPLETE
//Model for Comment, CommentInformation, and CommentStats

//Comments
@Table({ createdAt: false, updatedAt: false})
export class Comment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  Comment_Id: number;

  @Column
  Comment_DateCreated: Date;

  @Column
  Comment_DateEdited: Date;

  @Column
  User_Id: number;

  @Column
  Post_Id: number;

  @Column
  CommentInformation_Id: number;
  
  @Column
  CommentStats_Id: number;

  @Column
  Comment_DeactivatedStatus: boolean;

  @Column
  Comment_DeactivatedBy: number;

}

//CommentInformation
@Table({ createdAt: false, updatedAt: false})
export class CommentInformation extends Model{
  @AutoIncrement
  @PrimaryKey
  @Column
  CommentInformation_Id: number

  @Column
  CommentInformation_Content: string
}

// Comment Stats
@Table({ createdAt: false, updatedAt: false})
export class CommentStats extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  CommentStats_Id: number;

  @Column
  CommentStats_Upvotes: number;

}
