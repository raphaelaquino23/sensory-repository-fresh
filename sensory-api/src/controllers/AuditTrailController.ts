import { AuditTrailService } from "../service/AuditTrailService";

export class AuditTrailController {
  private auditTrailService: AuditTrailService;

  constructor() {
    this.auditTrailService = new AuditTrailService();
  }

  async getAudits() {
    return await this.auditTrailService.getAudits();
  }

  async deleteAudit(id: number) {
    return await this.auditTrailService.deleteAudit(id);
  }
}
