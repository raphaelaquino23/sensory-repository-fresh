import { APILogger } from '../logger/api.logger';
import { AwarenessTest, AwarenessTestResult, AwarenessTestStats, AwarenessTestType } from '../models/AwarenessTestModel';
import { AwarenessTestService } from '../service/AwarenessTestService';

export class AwarenessTestController {

  private awarenessTestService: AwarenessTestService;
  private logger: APILogger;

  constructor() {
    this.awarenessTestService = new AwarenessTestService();
    this.logger = new APILogger();
  }

  async getAwarenessTest() {
    this.logger.info('Controller: getAwarenessTest', null)
    return await this.awarenessTestService.getAwarenessTest();
  }
  async createAwarenessTest(awarenessTest: AwarenessTest, awarenessTestStats: AwarenessTestStats) {
    this.logger.info('Controller: createAwarenessTest', awarenessTest + " " + awarenessTestStats);
    return await this.awarenessTestService.createAwarenessTest(awarenessTest, awarenessTestStats);
  }
  async updateAwarenessTest(awarenessTest: AwarenessTest, awarenessTestStats: AwarenessTestStats) {
    this.logger.info('Controller: updateAwarenessTest', awarenessTest);
    return await this.awarenessTestService.updateAwarenessTest(awarenessTest, awarenessTestStats);
  }
  async deleteAwarenessTest(AwarenessTest_Id: number) {
    this.logger.info('Controller: deleteAwarenessTest', AwarenessTest_Id);
    return await this.awarenessTestService.deleteAwarenessTest(AwarenessTest_Id);
  }
  async getAwarenessTestResult() {
    this.logger.info('Controller: getAwarenessTestResult', null)
    return await this.awarenessTestService.getAwarenessTestResult();
  }
  async createAwarenessTestResult(awarenessTestResult: AwarenessTestResult) {
    this.logger.info('Controller: createAwarenessTestResult', awarenessTestResult);
    return await this.awarenessTestService.createAwarenessTestResult(awarenessTestResult);
  }
  async updateAwarenessTestResult(awarenessTestResult: AwarenessTestResult) {
    this.logger.info('Controller: updateAwarenessTestResult', awarenessTestResult);
    return await this.awarenessTestService.updateAwarenessTestResult(awarenessTestResult);
  }
  async deleteAwarenessTestResult(AwarenessTestResult_Id: number) {
    this.logger.info('Controller: deleteAwarenessTestResult', AwarenessTestResult_Id);
    return await this.awarenessTestService.deleteAwarenessTestResult(AwarenessTestResult_Id);
  }
  async getAwarenessTestStats() {
    this.logger.info('Controller: getAwarenessTestStats', null)
    return await this.awarenessTestService.getAwarenessTestStats();
  }
  async createAwarenessTestStats(awarenessTestStats: AwarenessTestStats) {
    this.logger.info('Controller: createAwarenessTestStats', awarenessTestStats);
    return await this.awarenessTestService.createAwarenessTestStats(awarenessTestStats);
  }
  async updateAwarenessTestStats(awarenessTestStats: AwarenessTestStats) {
    this.logger.info('Controller: updateAwarenessTestStats', awarenessTestStats);
    return await this.awarenessTestService.updateAwarenessTestStats(awarenessTestStats);
  }
  async deleteAwarenessTestStats(AwarenessTestStats_Id: number) {
    this.logger.info('Controller: deleteAwarenessTestStats', AwarenessTestStats_Id);
    return await this.awarenessTestService.deleteAwarenessTestStats(AwarenessTestStats_Id);
  }
  async getAwarenessTestType() {
    this.logger.info('Controller: getAwarenessTestType', null)
    return await this.awarenessTestService.getAwarenessTestType();
  }
  async createAwarenessTestType(awarenessTestType: AwarenessTestType) {
    this.logger.info('Controller: createAwarenessTestType', awarenessTestType);
    return await this.awarenessTestService.createAwarenessTestType(awarenessTestType);
  }
  async updateAwarenessTestType(awarenessTestType: AwarenessTestType) {
    this.logger.info('Controller: updateAwarenessTestType', awarenessTestType);
    return await this.awarenessTestService.updateAwarenessTestType(awarenessTestType);
  }
  async deleteAwarenessTestType(AwarenessTestType_Id: number) {
    this.logger.info('Controller: deleteAwarenessTestType', AwarenessTestType_Id);
    return await this.awarenessTestService.deleteAwarenessTestType(AwarenessTestType_Id);
  }
}