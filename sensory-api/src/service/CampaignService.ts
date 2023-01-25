import { Campaign, CampaignInformation, CampaignList, CampaignStats, CampaignTopic, Partner } from "../models/CampaignModel"
import { CampaignRepository } from "../repositories/CampaignRepository";

export class CampaignService {
	private campaignRepository: CampaignRepository;

	constructor() {
		this.campaignRepository = new CampaignRepository;
	}

	async getCampaign() {
		return await this.campaignRepository.getCampaign();
	}

	async getCampaignInformation() {
		return await this.campaignRepository.getCampaignInformation();
	}

	async getCampaignList() {
		return await this.campaignRepository.getCampaignList();
	}

	async getFile(id: number) {
		return await this.campaignRepository.getFile(id);
	}

	async getCampaignStats() {
		return await this.campaignRepository.getCampaignStats();
	}

	async getCampaignTopic() {
		return await this.campaignRepository.getCampaignTopic();
	}

	async getPartner() {
		return await this.campaignRepository.getPartner();
	}

	async createCampaign(campaign: Campaign, campaigninformation: CampaignInformation, campaignstats: CampaignStats) {
		return await this.campaignRepository.createCampaign(campaign, campaigninformation, campaignstats);
	}

	async campaignSignUp(Campaign: Campaign, UserId: number) {
		console.log(" ====== CAMPAIGN SERVICE ==== " + Campaign)
		return await this.campaignRepository.campaignSignUp(Campaign, UserId);
	}

	async createCampaignInformation(campaigninformation: CampaignInformation) {
		return await this.campaignRepository.createCampaignInformation(campaigninformation);
	}

	async createCampaignList(user_Id: number, campaign_Id: number) {
		return await this.campaignRepository.createCampaignList(user_Id, campaign_Id);
	}

	async createCampaignStats(campaignstats: CampaignStats) {
		return await this.campaignRepository.createCampaignStats(campaignstats);
	}

	async createCampaignTopic(campaigntopic: CampaignTopic) {
		return await this.campaignRepository.createCampaignTopic(campaigntopic);
	}

	async createPartner(partner: Partner) {
		return await this.campaignRepository.createPartner(partner);
	}

	async updateCampaign(campaign: Campaign, campaigninformation: CampaignInformation, campaignstats: CampaignStats) {
		return await this.campaignRepository.updateCampaign(campaign, campaigninformation, campaignstats);
	}

	async updateCampaignInformation(campaigninformation: CampaignInformation) {
		return await this.campaignRepository.updateCampaignInformation(campaigninformation);
	}

	async updateCampaignList(campaignlist: CampaignList) {
		return await this.campaignRepository.updateCampaignList(campaignlist);
	}

	async updateCampaignStats(campaignstats: CampaignStats) {
		return await this.campaignRepository.updateCampaignStats(campaignstats);
	}

	async updateCampaignTopic(campaigntopic: CampaignTopic) {
		return await this.campaignRepository.updateCampaignTopic(campaigntopic);
	}

	async updatePartner(partner: Partner) {
		return await this.campaignRepository.updatePartner(partner);
	}

	async deleteCampaign(Campaign_Id: number) {
		return await this.campaignRepository.deleteCampaign(Campaign_Id);
	}

	async deleteCampaignInformation(CampaignInformation_Id: number) {
		return await this.campaignRepository.deleteCampaignInformation(CampaignInformation_Id);
	}

	async deleteCampaignList(CampaignList_Id: number) {
		return await this.campaignRepository.deleteCampaignList(CampaignList_Id);
	}

	async deleteCampaignStats(CampaignStats_Id: number) {
		return await this.campaignRepository.deleteCampaignStats(CampaignStats_Id);
	}

	async deleteCampaignTopic(CampaignTopic_Id: number) {
		return await this.campaignRepository.deleteCampaignTopic(CampaignTopic_Id);
	}

	async deletePartner(Partner_Id: number) {
		return await this.campaignRepository.deletePartner(Partner_Id);
	}
}