import {
  AwarenessTest,
  AwarenessTestResult,
  AwarenessTestStats,
  AwarenessTestType,
} from "../models/AwarenessTestModel";
import { AwarenessTestService } from "../service/AwarenessTestService";
import { winstonLogger } from "../logger/winston.logger";

export class AwarenessTestController {
  private awarenessTestService: AwarenessTestService;

  constructor() {
    this.awarenessTestService = new AwarenessTestService();
  }

  async getAwarenessTest() {
    winstonLogger.info("Controller: getAwarenessTest", null);
    return await this.awarenessTestService.getAwarenessTest();
  }
  async createAwarenessTest(
    awarenessTest: AwarenessTest,
    awarenessTestStats: AwarenessTestStats
  ) {
    winstonLogger.info(
      "Controller: createAwarenessTest",
      awarenessTest + " " + awarenessTestStats
    );
    return await this.awarenessTestService.createAwarenessTest(
      awarenessTest,
      awarenessTestStats
    );
  }
  async updateAwarenessTest(
    awarenessTest: AwarenessTest,
    awarenessTestStats: AwarenessTestStats
  ) {
    winstonLogger.info("Controller: updateAwarenessTest", awarenessTest);
    return await this.awarenessTestService.updateAwarenessTest(
      awarenessTest,
      awarenessTestStats
    );
  }
  async deleteAwarenessTest(AwarenessTest_Id: number) {
    winstonLogger.info("Controller: deleteAwarenessTest", AwarenessTest_Id);
    return await this.awarenessTestService.deleteAwarenessTest(
      AwarenessTest_Id
    );
  }
  async getAwarenessTestResult() {
    winstonLogger.info("Controller: getAwarenessTestResult", null);
    return await this.awarenessTestService.getAwarenessTestResult();
  }
  async createAwarenessTestResult(awarenessTestResult: AwarenessTestResult) {
    winstonLogger.info(
      "Controller: createAwarenessTestResult",
      awarenessTestResult
    );
    return await this.awarenessTestService.createAwarenessTestResult(
      awarenessTestResult
    );
  }
  async updateAwarenessTestResult(awarenessTestResult: AwarenessTestResult) {
    winstonLogger.info(
      "Controller: updateAwarenessTestResult",
      awarenessTestResult
    );
    return await this.awarenessTestService.updateAwarenessTestResult(
      awarenessTestResult
    );
  }
  async deleteAwarenessTestResult(AwarenessTestResult_Id: number) {
    winstonLogger.info(
      "Controller: deleteAwarenessTestResult",
      AwarenessTestResult_Id
    );
    return await this.awarenessTestService.deleteAwarenessTestResult(
      AwarenessTestResult_Id
    );
  }
  async getAwarenessTestStats() {
    winstonLogger.info("Controller: getAwarenessTestStats", null);
    return await this.awarenessTestService.getAwarenessTestStats();
  }
  async createAwarenessTestStats(awarenessTestStats: AwarenessTestStats) {
    winstonLogger.info(
      "Controller: createAwarenessTestStats",
      awarenessTestStats
    );
    return await this.awarenessTestService.createAwarenessTestStats(
      awarenessTestStats
    );
  }
  async updateAwarenessTestStats(awarenessTestStats: AwarenessTestStats) {
    winstonLogger.info(
      "Controller: updateAwarenessTestStats",
      awarenessTestStats
    );
    return await this.awarenessTestService.updateAwarenessTestStats(
      awarenessTestStats
    );
  }
  async deleteAwarenessTestStats(AwarenessTestStats_Id: number) {
    winstonLogger.info(
      "Controller: deleteAwarenessTestStats",
      AwarenessTestStats_Id
    );
    return await this.awarenessTestService.deleteAwarenessTestStats(
      AwarenessTestStats_Id
    );
  }
  async getAwarenessTestType() {
    winstonLogger.info("Controller: getAwarenessTestType", null);
    return await this.awarenessTestService.getAwarenessTestType();
  }
  async createAwarenessTestType(awarenessTestType: AwarenessTestType) {
    winstonLogger.info(
      "Controller: createAwarenessTestType",
      awarenessTestType
    );
    return await this.awarenessTestService.createAwarenessTestType(
      awarenessTestType
    );
  }
  async updateAwarenessTestType(awarenessTestType: AwarenessTestType) {
    winstonLogger.info(
      "Controller: updateAwarenessTestType",
      awarenessTestType
    );
    return await this.awarenessTestService.updateAwarenessTestType(
      awarenessTestType
    );
  }
  async deleteAwarenessTestType(AwarenessTestType_Id: number) {
    winstonLogger.info(
      "Controller: deleteAwarenessTestType",
      AwarenessTestType_Id
    );
    return await this.awarenessTestService.deleteAwarenessTestType(
      AwarenessTestType_Id
    );
  }
}
