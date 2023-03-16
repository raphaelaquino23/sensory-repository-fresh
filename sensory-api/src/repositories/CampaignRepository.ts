import { connect } from "../config/db.config";
import { winstonLogger } from "../logger/winston.logger";
import {
  Campaign,
  CampaignInformation,
  CampaignList,
  CampaignStats,
  CampaignTopic,
  Partner,
} from "../models/CampaignModel";
import { User, UserInformation } from "../models/UserModel";

export class CampaignRepository {
  private db: any = {};
  private campaignRepository: any;
  private campaignInformationRepository: any;
  private campaignListRepository: any;
  private campaignStatsRepository: any;
  private campaignTopicRepository: any;
  private partnerRepository: any;
  private userRepository: any;
  private userInformationRepository: any;

  constructor() {
    this.db = connect();
    this.campaignRepository = this.db.sequelize.getRepository(Campaign);
    this.campaignInformationRepository =
      this.db.sequelize.getRepository(CampaignInformation);
    this.campaignListRepository = this.db.sequelize.getRepository(CampaignList);
    this.campaignStatsRepository =
      this.db.sequelize.getRepository(CampaignStats);
    this.campaignTopicRepository =
      this.db.sequelize.getRepository(CampaignTopic);
    this.partnerRepository = this.db.sequelize.getRepository(Partner);
    this.userRepository = this.db.sequelize.getRepository(User);
    this.userInformationRepository =
      this.db.sequelize.getRepository(UserInformation);
  }

  //GET CAMPAIGN
  async getCampaign() {
    try {
      const Campaign = await this.campaignRepository.findAll();
      console.log("Campaign::: ", Campaign);
      return Campaign;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  //GET BY ID CAMPAIGN
  async getCampaignById(CampaignId: number) {
    try {
      const campaign = await this.campaignRepository.findOne({
        where: { Campaign_Id: CampaignId },
      });
      console.log("campaign:::", campaign);
      return campaign;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  //CREATE CAMPAIGN
  async createCampaign(
    campaign: Campaign,
    campaignInformation: CampaignInformation,
    campaignStats: CampaignStats
  ) {
    let cInfo,
      cStats,
      data = {};
    try {
      campaign.Campaign_DateCreated = new Date();
      console.log("START");
      cInfo = await this.campaignInformationRepository.create(
        campaignInformation
      );
      console.log("CINFO CREATED");
      campaign.CampaignInformation_Id = cInfo.getDataValue(
        "CampaignInformation_Id"
      );

      console.log("INSERT CINFO VALUE FINISHED");
      cStats = await this.campaignStatsRepository.create(campaignStats);
      campaign.CampaignStats_Id = cStats.getDataValue("CampaignStats_Id");

      console.log("INSERT CSTATS VALUE FINISHED");
      data = await this.campaignRepository.create(campaign);
    } catch (error) {
      winstonLogger.error("Error", error);
    }
    return data;
  }

  async getFile(id: number) {
    try {
      const aInfo = await this.campaignInformationRepository.findOne({
        where: { CampaignInformation_Id: id },
      });
      let fileUrl = aInfo.getDataValue("CampaignInformation_Url");
      console.log("-----------------------fileUrl" + fileUrl);
      return fileUrl;
    } catch (error) {
      winstonLogger.error("Error", error);
      return [];
    }
  }

  //UPDATE CAMPAIGN
  async updateCampaign(
    Campaign: Campaign,
    CampaignInformation: CampaignInformation,
    CampaignStats: CampaignStats
  ) {
    let data = {};
    try {
      // data = await this.campaignRepository.update({...Campaign}, {
      //   where: {
      //     Campaign_Id: Campaign.id
      //   }
      // });
      Campaign.Campaign_DateEdited = new Date();
      console.log("//////////////////////////////////////STARTING THE UPDATE");

      await this.campaignInformationRepository.update(
        { ...CampaignInformation },
        {
          where: {
            CampaignInformation_Id: CampaignInformation.CampaignInformation_Id,
          },
        }
      );

      console.log(
        "//////////////////////////////////////FINISHED CAMPAIGN Information"
      );
      await this.campaignStatsRepository.update(
        { ...CampaignStats },
        {
          where: {
            CampaignStats_Id: CampaignStats.CampaignStats_Id,
          },
        }
      );

      console.log(
        "//////////////////////////////////////FINISHED CAMPAIGN STATS"
      );
      data = await this.campaignRepository.update(
        { ...Campaign },
        {
          where: {
            Campaign_Id: Campaign.Campaign_Id,
          },
        }
      );
    } catch (error) {
      console.log("Error::");
    }
    return data;
  }

  //DELETE CAMPAIGN
  async deleteCampaign(Campaign_Id: number) {
    let cRef,
      cInfo,
      cStats,
      data = {};
    try {
      cRef = await this.campaignRepository.findOne({
        where: { Campaign_Id: Campaign_Id },
      });
      cInfo = await this.campaignInformationRepository.findOne({
        where: {
          CampaignInformation_Id: cRef.getDataValue("CampaignInformation_Id"),
        },
      });
      cStats = await this.campaignStatsRepository.findOne({
        where: { CampaignStats_Id: cRef.getDataValue("CampaignStats_Id") },
      });
      await this.campaignInformationRepository.destroy({
        where: {
          CampaignInformation_Id: cInfo.getDataValue("CampaignInformation_Id"),
        },
      });
      await this.campaignStatsRepository.destroy({
        where: {
          CampaignStats_Id: cStats.getDataValue("CampaignStats_Id"),
        },
      });
      data = await this.campaignRepository.destroy({
        where: {
          Campaign_Id: Campaign_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  async getCampaignInformation() {
    try {
      const CampaignInformation =
        await this.campaignInformationRepository.findAll();
      console.log("Campaign Information::: ", CampaignInformation);
      return CampaignInformation;
    } catch (error) {
      winstonLogger.error("Error:: ", error);
      return [];
    }
  }

  async createCampaignInformation(Campaigninformation: CampaignInformation) {
    let data = {};
    try {
      data = await this.campaignInformationRepository.create(
        Campaigninformation
      );
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  async updateCampaignInformation(Campaigninformation: CampaignInformation) {
    let data = {};
    try {
      data = await this.campaignInformationRepository.update(
        { ...Campaigninformation },
        {
          where: {
            CampaignInformation_Id: Campaigninformation.id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  async deleteCampaignInformation(CampaignInformation_Id: number) {
    let data = {};
    try {
      data = await this.campaignInformationRepository.destroy({
        where: {
          CampaignInformation_Id: CampaignInformation_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  async getCampaignList() {
    try {
      const CampaignList = await this.campaignListRepository.findAll();
      console.log("Campaign List::: ", CampaignList);
      return CampaignList;
    } catch (error) {
      winstonLogger.error("Error:: ", error);
      return [];
    }
  }

  async createCampaignList(user_Id: number, campaign_Id: number) {
    let data = {};
    try {
      data = await this.campaignListRepository.create({
        Campaign_Id: campaign_Id,
        User_Id: user_Id,
      });
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  async updateCampaignList(Campaignlist: CampaignList) {
    let data = {};
    try {
      data = await this.campaignListRepository.update(
        { ...Campaignlist },
        {
          where: {
            CampaignList_Id: Campaignlist.CampaignList_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  async deleteCampaignList(CampaignList_Id: number) {
    let data = {};
    try {
      data = await this.campaignListRepository.destroy({
        where: {
          CampaignList_Id: CampaignList_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }
  async getCampaignStats() {
    try {
      const CampaignStats = await this.campaignStatsRepository.findAll();
      console.log("Campaign Stats::: ", CampaignStats);
      return CampaignStats;
    } catch (error) {
      winstonLogger.error("Error:: ", error);
      return [];
    }
  }

  async createCampaignStats(Campaignstats: CampaignStats) {
    let data = {};
    try {
      data = await this.campaignStatsRepository.create(Campaignstats);
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  async updateCampaignStats(Campaignstats: CampaignStats) {
    let data = {};
    try {
      data = await this.campaignStatsRepository.update(
        { ...Campaignstats },
        {
          where: {
            CampaignStats_Id: Campaignstats.id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  async deleteCampaignStats(CampaignStats_Id: number) {
    let data = {};
    try {
      data = await this.campaignStatsRepository.destroy({
        where: {
          CampaignStats_Id: CampaignStats_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }
  async getCampaignTopic() {
    try {
      const CampaignTopic = await this.campaignTopicRepository.findAll();
      console.log("Campaign Topic::: ", CampaignTopic);
      return CampaignTopic;
    } catch (error) {
      winstonLogger.error("Error:: ", error);
      return [];
    }
  }

  async createCampaignTopic(Campaigntopic: CampaignTopic) {
    let data = {};
    try {
      data = await this.campaignTopicRepository.create(Campaigntopic);
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  async updateCampaignTopic(Campaigntopic: CampaignTopic) {
    let data = {};
    try {
      data = await this.campaignTopicRepository.update(
        { ...Campaigntopic },
        {
          where: {
            CampaignTopic_Id: Campaigntopic.CampaignTopic_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  async deleteCampaignTopic(CampaignTopic_Id: number) {
    let data = {};
    try {
      data = await this.campaignTopicRepository.destroy({
        where: {
          CamaignTopic_Id: CampaignTopic_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }
  async getPartner() {
    try {
      const Partner = await this.partnerRepository.findAll();
      console.log("Partner::: ", Partner);
      return Partner;
    } catch (error) {
      winstonLogger.error("Error:: ", error);
      return [];
    }
  }

  async createPartner(partner: Partner) {
    let data = {};
    try {
      data = await this.partnerRepository.create(partner);
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  async updatePartner(partner: Partner) {
    let data = {};
    try {
      data = await this.partnerRepository.update(
        { ...partner },
        {
          where: {
            Partner_Id: partner.Partner_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  async deletePartner(Partner_Id: number) {
    let data = {};
    try {
      data = await this.partnerRepository.destroy({
        where: {
          Partner_Id: Partner_Id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }

  async campaignSignUp(campaign: Campaign, userid: number) {
    let campaignId,
      data = {};
    try {
      campaignId = campaign.Campaign_Id;

      data = await this.campaignListRepository.create({
        Campaign_Id: campaignId,
        User_Id: userid,
      });
    } catch (error) {
      winstonLogger.error("Error:: ", error);
    }
    return data;
  }
}
