import { AwarenessTest, AwarenessTestResult, AwarenessTestStats, AwarenessTestType } from "../models/AwarenessTestModel";
import { AwarenessTestRepository } from "../repositories/AwarenessTestRepository";

export class AwarenessTestService {
	private awarenessTestRepository: AwarenessTestRepository;

	constructor() {
		this.awarenessTestRepository = new AwarenessTestRepository;
	}

	async getAwarenessTest() {
		return await this.awarenessTestRepository.getAwarenessTest();
	}

	async getAwarenessTestResult() {
		return await this.awarenessTestRepository.getAwarenessTestResult();
	}

	async getAwarenessTestStats() {
		return await this.awarenessTestRepository.getAwarenessTestStats();
	}

	async getAwarenessTestType() {
		return await this.awarenessTestRepository.getAwarenessTestType();
	}

	async createAwarenessTest(awarenesstest: AwarenessTest, awarenessteststats: AwarenessTestStats) {
		return await this.awarenessTestRepository.createAwarenessTest(awarenesstest, awarenessteststats);
	}

	async createAwarenessTestResult(awarenesstestresult: AwarenessTestResult) {
		return await this.awarenessTestRepository.createAwarenessTestResult(awarenesstestresult);
	}

	async createAwarenessTestStats(awarenessteststats: AwarenessTestStats) {
		return await this.awarenessTestRepository.createAwarenessTestStats(awarenessteststats);
	}

	async createAwarenessTestType(awarenesstesttype: AwarenessTestType) {
		return await this.awarenessTestRepository.createAwarenessTestType(awarenesstesttype);
	}

	async updateAwarenessTest(awarenesstest: AwarenessTest, awarenessteststats: AwarenessTestStats) {
		return await this.awarenessTestRepository.updateAwarenessTest(awarenesstest, awarenessteststats);
	}

	async updateAwarenessTestResult(awarenesstestresult: AwarenessTestResult) {
		return await this.awarenessTestRepository.updateAwarenessTestResult(awarenesstestresult);
	}

	async updateAwarenessTestStats(awarenessteststats: AwarenessTestStats) {
		return await this.awarenessTestRepository.updateAwarenessTestStats(awarenessteststats);
	}

	async updateAwarenessTestType(awarenesstesttype: AwarenessTestType) {
		return await this.awarenessTestRepository.updateAwarenessTestType(awarenesstesttype);
	}

	async deleteAwarenessTest(AwarenessTest_Id: number) {
		return await this.awarenessTestRepository.deleteAwarenessTest(AwarenessTest_Id);
	}

	async deleteAwarenessTestResult(AwarenessTestResult_Id: number) {
		return await this.awarenessTestRepository.deleteAwarenessTestResult(AwarenessTestResult_Id);
	}
	
	async deleteAwarenessTestStats(AwarenessTestStats_Id: number) {
		return await this.awarenessTestRepository.deleteAwarenessTestStats(AwarenessTestStats_Id);
	}

	async deleteAwarenessTestType(AwarenessTestType_Id: number) {
		return await this.awarenessTestRepository.deleteAwarenessTestType(AwarenessTestType_Id);
	}
}