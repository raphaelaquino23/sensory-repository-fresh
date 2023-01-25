import { Table, Column, Model, PrimaryKey, HasOne, CreatedAt, UpdatedAt, NotNull, ForeignKey, BelongsTo, AutoIncrement, AllowNull, NotEmpty, Unique } from 'sequelize-typescript';
import { User } from './UserModel';
//COMPLETE
//Model for Campaign, CampaignInformation, CampaignList, CampaignStats, CampaignTopic, and Partner

//Campaign
@Table({ createdAt: false, updatedAt: false})
export class Campaign extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  Campaign_Id: number;

  
  @ForeignKey(() => CampaignInformation)
  @Column
  CampaignInformation_Id: number;

  @ForeignKey(() => CampaignStats)
  @Column
  CampaignStats_Id: number;

  @Column
  Campaign_DateCreated: Date;

  @Column
  Campaign_DateEdited: Date;

  @ForeignKey(() => User)
  @Column
  User_Id: number;

}

//CampaignInformation
@Table({ createdAt: false, updatedAt: false})
export class CampaignInformation extends Model{
  @AutoIncrement
  @PrimaryKey
  @Column
  CampaignInformation_Id: number

  @Column
  CampaignInformation_Name: string

  @Column
  CampaignTopic_Id: number

  @Column
  CampaignInformation_Description: string

  @Column
  CampaignInformation_Url: string
  
  @Column
  CampaignInformation_Image: string

  @Column
  Partner_Id: number

  @HasOne(() => Campaign)
  campaign!: ReturnType<() => Campaign>;
}

//Campaign List
@Table({ createdAt: false, updatedAt: false})
export class CampaignList extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  CampaignList_Id: number

  @Column
  Campaign_Id: number

  @Column
  User_Id: number

}

//Campaign Stats
@Table({ createdAt: false, updatedAt: false})
export class CampaignStats extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  CampaignStats_Id: number

  @Column
  CampaignStats_Clicks: number
}


//Campaign Topic
@Table({ createdAt: false, updatedAt: false})
export class CampaignTopic extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  CampaignTopic_Id: number;

  @Column
  CampaignTopic_Name: string;

  @Column
  CampaignTopic_Description: string;
}

//Partner
@Table({ createdAt: false, updatedAt: false})
export class Partner extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  Partner_Id: number;

  @Column
  Partner_Name: string;

  @Column
  Partner_Description: string;
}
