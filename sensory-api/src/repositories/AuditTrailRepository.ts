import { connect } from "../config/db.config";
import { winstonLogger } from "../logger/winston.logger";
import { AuditTrail } from "../models/AuditModel";

export class AuditTrailRepository {
  private db: any = {};
  private auditTrailRepository: any;

  constructor() {
    this.db = connect();
    this.auditTrailRepository = this.db.sequelize.getRepository(AuditTrail);
  }

  async getAudits() {
    try {
      const audits = await this.auditTrailRepository.findAll();
      return audits;
    } catch (error) {
      winstonLogger.error("Error retrieving audits", error);
      return [];
    }
  }

  async deleteAudit(id: number) {
    let data = {};
    try {
      data = await this.auditTrailRepository.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      winstonLogger.error("Error deleting this audit. ", error);
    }
  }
}
