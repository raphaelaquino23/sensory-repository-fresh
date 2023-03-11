import {
  Campaign,
  CampaignInformation,
  CampaignList,
  CampaignStats,
  CampaignTopic,
} from "../models/CampaignModel";
import { CampaignService } from "../service/CampaignService";
import { winstonLogger } from "../logger/winston.logger";

export class CampaignController {
  private campaignService: CampaignService;

  constructor() {
    this.campaignService = new CampaignService();
  }

  //get method
  async getCampaign() {
    winstonLogger.info("Controller: getCampaign", null);
    return await this.campaignService.getCampaign();
  }

  async getCampaignInformation() {
    winstonLogger.info("Controller: getCampaignInformation", null);
    return await this.campaignService.getCampaignInformation();
  }

  async getFile(id: number) {
    winstonLogger.info("Controller: GET FILES", null);
    return await this.campaignService.getFile(id);
  }

  async getCampaignList() {
    winstonLogger.info("Controller: getCampaignList", null);
    return await this.campaignService.getCampaignList();
  }

  async getCampaignStats() {
    winstonLogger.info("Controller: getCampaignStats", null);
    return await this.campaignService.getCampaignStats();
  }

  async getCampaignTopic() {
    winstonLogger.info("Controller: getCampaignTopic", null);
    return await this.campaignService.getCampaignTopic();
  }

  //create methods
  async createCampaign(
    campaign: Campaign,
    campaigninformation: CampaignInformation,
    campaignstats: CampaignStats
  ) {
    winstonLogger.info("Controller: createCampaign", campaign);
    return await this.campaignService.createCampaign(
      campaign,
      campaigninformation,
      campaignstats
    );
  }

  async createCampaignInformation(campaigninformation: CampaignInformation) {
    winstonLogger.info(
      "Controller: createCampaignInformation",
      campaigninformation
    );
    return await this.campaignService.createCampaignInformation(
      campaigninformation
    );
  }

  async createCampaignList(user_Id: number, campaign_Id: number) {
    winstonLogger.info("Controller: createCampaignList", user_Id);
    return await this.campaignService.createCampaignList(user_Id, campaign_Id);
  }

  async createCampaignStats(campaignstats: CampaignStats) {
    winstonLogger.info("Controller: createCampaignStats", campaignstats);
    return await this.campaignService.createCampaignStats(campaignstats);
  }

  async createCampaignTopic(campaigntopic: CampaignTopic) {
    winstonLogger.info("Controller: createCampaignTopic", campaigntopic);
    return await this.campaignService.createCampaignTopic(campaigntopic);
  }

  async campaignSignUp(Campaign: Campaign, UserId: number) {
    winstonLogger.info("Controller: campaignSignUp", Campaign);
    return await this.campaignService.campaignSignUp(Campaign, UserId);
  }

  //update methods
  async updateCampaign(
    campaign: Campaign,
    campaigninformation: CampaignInformation,
    campaignstats: CampaignStats
  ) {
    winstonLogger.info("Controller: updateCampaign", campaign);
    return await this.campaignService.updateCampaign(
      campaign,
      campaigninformation,
      campaignstats
    );
  }

  async updateCampaignInformation(campaigninformation: CampaignInformation) {
    winstonLogger.info(
      "Controller: updateCampaignInformation",
      campaigninformation
    );
    return await this.campaignService.updateCampaignInformation(
      campaigninformation
    );
  }

  async updateCampaignList(campaignlist: CampaignList) {
    winstonLogger.info("Controller: updateCampaignList", campaignlist);
    return await this.campaignService.updateCampaignList(campaignlist);
  }

  async updateCampaignStats(campaignstats: CampaignStats) {
    winstonLogger.info("Controller: updateCampaignStats", campaignstats);
    return await this.campaignService.updateCampaignStats(campaignstats);
  }

  async updateCampaignTopic(campaigntopic: CampaignTopic) {
    winstonLogger.info("Controller: updateCampaignTopic", campaigntopic);
    return await this.campaignService.updateCampaignTopic(campaigntopic);
  }

  //delete methods
  async deleteCampaign(Campaign_Id: number) {
    winstonLogger.info("Controller: deleteCampaign", Campaign_Id);
    return await this.campaignService.deleteCampaign(Campaign_Id);
  }

  async deleteCampaignInformation(Campaign_Id: number) {
    winstonLogger.info("Controller: deleteCampaignInformation", Campaign_Id);
    return await this.campaignService.deleteCampaignInformation(Campaign_Id);
  }

  async deleteCampaignList(Campaign_Id: number) {
    winstonLogger.info("Controller: deleteCampaignList", Campaign_Id);
    return await this.campaignService.deleteCampaignList(Campaign_Id);
  }

  async deleteCampaignStats(Campaign_Id: number) {
    winstonLogger.info("Controller: deleteCampaignStats", Campaign_Id);
    return await this.campaignService.deleteCampaignStats(Campaign_Id);
  }

  async deleteCampaignTopic(Campaign_Id: number) {
    winstonLogger.info("Controller: deleteCampaignTopic", Campaign_Id);
    return await this.campaignService.deleteCampaignTopic(Campaign_Id);
  }
}
