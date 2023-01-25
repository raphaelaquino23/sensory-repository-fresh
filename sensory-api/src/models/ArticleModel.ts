import { Table, Column, Model, PrimaryKey, HasOne, CreatedAt, UpdatedAt, NotNull, ForeignKey, BelongsTo, AutoIncrement, AllowNull, NotEmpty, Unique } from 'sequelize-typescript';
import { User } from './UserModel';
//COMPLETE
//Model for Article, ArticleInformation, ArticleStats, ArticleTopic

//Article
@Table({ createdAt: false, updatedAt: false})
export class Article extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  get Article_Id(): number{
    return this.getDataValue('Article_Id');
  }
  //Article_Id: number;

  @ForeignKey(() => ArticleInformation)
  @Column
  set ArticleInformation_Id(value: number) {
    this.setDataValue('ArticleInformation_Id', value);
  }
  //ArticleInformation_Id: number;

  @ForeignKey(() => ArticleStats)
  @Column
  set ArticleStats_Id(value: number) {
    this.setDataValue('ArticleStats_Id', value);
  }
  //ArticleStats_Id: number;

  @Column
  Article_DateCreated: Date;

  @Column
  Article_DateEdited: Date;

  @ForeignKey(() => User)
  @Column
  User_Id: number;
  
}

//ArticleInformation
@Table({ createdAt: false, updatedAt: false})
export class ArticleInformation extends Model{
  @AutoIncrement
  @PrimaryKey
  @Column
  get ArticleInformation_Id(): number{
    return this.getDataValue('ArticleInformation_Id');
  }
  //ArticleInformation_Id: number

  @Column
  ArticleInformation_Name: string

  @Column
  ArticleTopic_Id: number

  @Column
  ArticleInformation_Description: string
  
  @Column
  ArticleInformation_Url: string
  
  @Column
  ArticleInformation_Image: string

  @Column
  ArticleInformation_PublishedBy: string
  
  @HasOne(() => Article)
  article!: ReturnType<() => Article>;
}

//ArticleStats
@Table({ createdAt: false, updatedAt: false})
export class ArticleStats extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  get ArticleStats_Id(): number{
    return this.getDataValue('ArticleStats_Id');
  }
  //ArticleStats_Id: number;

  @Column
  ArticleStats_Upvotes: number;

  @Column
  ArticleStats_Clicks: number;
  
  @Column
  ArticleStats_Downloads: number;

  @HasOne(() => Article)
  article!: ReturnType<() => Article>;
}

//ArticleTopic
@Table({ createdAt: false, updatedAt: false})
export class ArticleTopic extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  ArticleTopic_Id: number;

  @Column
  ArticleTopic_Name: string;

  @Column
  ArticleTopic_Description: string;
}


@Table({createdAt: false, updatedAt: false})
export class ArticleUpvoteTracker extends Model {

  @ForeignKey(() => Article)
  @Column  
  set Article_Id(value: number) {
    this.setDataValue('Article_Id', value);
  }
  //Article_Id: number;

  @ForeignKey(() => User)
  @Column
  set User_Id(value: number) {
    this.setDataValue('User_Id', value);
  }
  //User_Id: number;

}
