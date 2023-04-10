import axios from "axios";
const AUDIT_TRAIL_API_URL = "http://localhost:3081/api/audit";

class AuditTrailService {
  getAudits() {
    return axios.get(AUDIT_TRAIL_API_URL);
  }

  deleteAudit(id: number) {
    return axios.delete(`${AUDIT_TRAIL_API_URL}/${id}`);
  }
}

export default new AuditTrailService();
