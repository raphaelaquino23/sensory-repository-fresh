import { connect } from "../config/db.config";
import {
  AwarenessTest,
  AwarenessTestResult,
  AwarenessTestStats,
  AwarenessTestType,
} from "../models/AwarenessTestModel";
//AwarenessTest, AwarenessTestResult, AwarenessTestStats,and AwarenessTestType
import { winstonLogger } from "../logger/winston.logger";

export class AwarenessTestRepository {
  private db: any = {};
  private awarenessTestRepository: any;
  private awarenessTestResultRepository: any;
  private awarenessTestStatsRepository: any;
  private awarenessTestTypeRepository: any;

  constructor() {
    this.db = connect();
    this.awarenessTestRepository =
      this.db.sequelize.getRepository(AwarenessTest);
    this.awarenessTestResultRepository =
      this.db.sequelize.getRepository(AwarenessTestResult);
    this.awarenessTestStatsRepository =
      this.db.sequelize.getRepository(AwarenessTestStats);
    this.awarenessTestTypeRepository =
      this.db.sequelize.getRepository(AwarenessTestType);
  }

  //GET AWARENESSTEST
  async getAwarenessTest() {
    try {
      const AwarenessTest = await this.awarenessTestRepository.findAll();
      return AwarenessTest;
    } catch (error) {
      winstonLogger.log("error", { error });
      return [];
    }
  }

  //GET BY ID AWARENESSTEST
  async getAwarenessTestById(AwarenessTestId: number) {
    try {
      const awarenessTest = await this.awarenessTestRepository.findOne({
        where: { AwarenessTest_Id: AwarenessTestId },
      });
      return awarenessTest;
    } catch (error) {
      winstonLogger.log("error", { error });
      return [];
    }
  }

  //CREATE AWARENESSTEST
  async createAwarenessTest(
    AwarenessTest: AwarenessTest,
    AwarenessTestStats: AwarenessTestStats
  ) {
    let testStats,
      data = {};
    try {
      testStats = await this.awarenessTestStatsRepository.create(
        AwarenessTestStats
      );
      AwarenessTest.TestStats_Id = testStats.getDataValue("TestStats_Id");
      data = await this.awarenessTestRepository.create(AwarenessTest);
    } catch (error) {
      winstonLogger.log("error", { error });
    }
    return data;
  }

  //UPDATE AWARENESSTEST
  async updateAwarenessTest(
    AwarenessTest: AwarenessTest,
    AwarenessTestStats: AwarenessTestStats
  ) {
    let data = {};
    try {
      await this.awarenessTestStatsRepository.update(
        { ...AwarenessTestStats },
        {
          where: {
            TestStats_Id: AwarenessTestStats.TestStats_Id,
          },
        }
      );
      data = await this.awarenessTestRepository.update(
        { ...AwarenessTest },
        {
          where: {
            Test_Id: AwarenessTest.Test_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.log("error", { error });
    }
    return data;
  }

  //DELETE AWARENESSTEST
  async deleteAwarenessTest(AwarenessTest_Id: number) {
    let atRef,
      atStats,
      data = {};
    try {
      atRef = await this.awarenessTestRepository.findOne({
        where: { Test_Id: AwarenessTest_Id },
      });
      atStats = await this.awarenessTestStatsRepository.findOne({
        where: { TestStats_Id: atRef.getDataValue("TestStats_Id") },
      });
      await this.awarenessTestStatsRepository.destroy({
        where: {
          TestStats_Id: atStats.getDataValue("TestStats_Id"),
        },
      });
      data = await this.awarenessTestRepository.destroy({
        where: {
          Test_Id: AwarenessTest_Id,
        },
      });
    } catch (error) {
      winstonLogger.log("error", { error });
    }
    return data;
  }

  //GET AWARENESSTESTRESULTS
  async getAwarenessTestResult() {
    try {
      const AwarenessTestResult =
        await this.awarenessTestResultRepository.findAll();
      return AwarenessTestResult;
    } catch (error) {
      winstonLogger.log("error", { error });
      return [];
    }
  }
  //GET BY ID AWARENESSTESTRESULTS
  async getAwarenessTestResultById(AwarenessTestResultId: number) {
    try {
      const awarenessTestResult =
        await this.awarenessTestResultRepository.findOne({
          where: { AwarenessTestResult_Id: AwarenessTestResultId },
        });
      return awarenessTestResult;
    } catch (error) {
      winstonLogger.log("error", { error });
      return [];
    }
  }

  //CREATE AWARENESSTESTRESULTS
  async createAwarenessTestResult(AwarenessTestResult: AwarenessTestResult) {
    let data = {};
    try {
      data = await this.awarenessTestResultRepository.create(
        AwarenessTestResult
      );
    } catch (error) {
      winstonLogger.log("error", { error });
    }
    return data;
  }

  //UPDATE AWARENESSTESTRESULTS
  async updateAwarenessTestResult(AwarenessTestResult: AwarenessTestResult) {
    let data = {};
    try {
      data = await this.awarenessTestResultRepository.update(
        { ...AwarenessTestResult },
        {
          where: {
            TestResult_Id: AwarenessTestResult.TestResult_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.log("error", { error });
    }
    return data;
  }

  //DELETE AWARENESSTESTRESULTS
  async deleteAwarenessTestResult(AwarenessTestResult_Id: number) {
    let data = {};
    try {
      data = await this.awarenessTestResultRepository.destroy({
        where: {
          TestResult_Id: AwarenessTestResult_Id,
        },
      });
    } catch (error) {
      winstonLogger.log("error", { error });
    }
    return data;
  }

  //GET AWARENESSTESTSTATS
  async getAwarenessTestStats() {
    try {
      const AwarenessTestStats =
        await this.awarenessTestStatsRepository.findAll();
      return AwarenessTestStats;
    } catch (error) {
      winstonLogger.log("error", { error });
      return [];
    }
  }

  //GET BY ID AWARENESSTESTSTATS
  async getAwarenessTestStatsById(AwarenessTestStatsId: number) {
    try {
      const awarenessTestStats =
        await this.awarenessTestStatsRepository.findOne({
          where: { AwarenessTestStats_Id: AwarenessTestStatsId },
        });
      return awarenessTestStats;
    } catch (error) {
      winstonLogger.log("error", { error });
      return [];
    }
  }

  //CREATE AWARENESSTESTSTATS
  async createAwarenessTestStats(AwarenessTestStats: AwarenessTestStats) {
    let data = {};
    try {
      data = await this.awarenessTestStatsRepository.create(AwarenessTestStats);
    } catch (error) {
      winstonLogger.log("error", { error });
    }
    return data;
  }

  //UPDATE AWARENESSTESTSTATS
  async updateAwarenessTestStats(AwarenessTestStats: AwarenessTestStats) {
    let data = {};
    try {
      data = await this.awarenessTestStatsRepository.update(
        { ...AwarenessTestStats },
        {
          where: {
            TestStats_Id: AwarenessTestStats.TestStats_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.log("error", { error });
    }
    return data;
  }

  //DELETE AWARENESSTESTSTATS
  async deleteAwarenessTestStats(AwarenessTestStats_Id: number) {
    let data = {};
    try {
      data = await this.awarenessTestStatsRepository.destroy({
        where: {
          TestStats_Id: AwarenessTestStats_Id,
        },
      });
    } catch (error) {
      winstonLogger.log("error", { error });
    }
    return data;
  }

  //GET AWARENESSTESTTYPE
  async getAwarenessTestType() {
    try {
      const AwarenessTestType =
        await this.awarenessTestTypeRepository.findAll();
      return AwarenessTestType;
    } catch (error) {
      winstonLogger.log("error", { error });
      return [];
    }
  }

  //GET BY ID AWARENESSTESTTYPE
  async getAwarenessTestTypeById(AwarenessTestTypeId: number) {
    try {
      const awarenessTestType = await this.awarenessTestTypeRepository.findOne({
        where: { AwarenessTestType_Id: AwarenessTestTypeId },
      });
      return awarenessTestType;
    } catch (error) {
      winstonLogger.log("error", { error });
      return [];
    }
  }

  //CREATE AWARENESSTESTTYPE
  async createAwarenessTestType(AwarenessTestType: AwarenessTestType) {
    let data = {};
    try {
      data = await this.awarenessTestTypeRepository.create(AwarenessTestType);
    } catch (error) {
      winstonLogger.log("error", { error });
    }
    return data;
  }

  //UPDATE AWARENESSTESTTYPE
  async updateAwarenessTestType(AwarenessTestType: AwarenessTestType) {
    let data = {};
    try {
      data = await this.awarenessTestTypeRepository.update(
        { ...AwarenessTestType },
        {
          where: {
            TestType_Id: AwarenessTestType.TestType_Id,
          },
        }
      );
    } catch (error) {
      winstonLogger.log("error", { error });
    }
    return data;
  }

  //DELETE AWARENESSTESTTYPE
  async deleteAwarenessTestType(AwarenessTestType_Id: number) {
    let data = {};
    try {
      data = await this.awarenessTestTypeRepository.destroy({
        where: {
          TestType_Id: AwarenessTestType_Id,
        },
      });
    } catch (error) {
      winstonLogger.log("error", { error });
    }
    return data;
  }
}
