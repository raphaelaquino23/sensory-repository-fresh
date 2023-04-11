import { AuditTrail } from "../models/AuditModel";
import { AuditTrailRepository } from "../repositories/AuditTrailRepository";

export class AuditTrailService {
  private auditTrailRepository: AuditTrailRepository;

  constructor() {
    this.auditTrailRepository = new AuditTrailRepository();
  }

  async getAudits() {
    return await this.auditTrailRepository.getAudits();
  }

  async deleteAudit(id: number) {
    return await this.auditTrailRepository.deleteAudit(id);
  }
}
