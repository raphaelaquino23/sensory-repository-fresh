import { useEffect, useState } from "react";
import AuditTrailService from "../../services/AuditTrailService";
import Audit from "./Audit";
import { Alert } from "react-bootstrap";
import AuditPagination from "./AuditPagination";

interface Audit {
  id: number;
  actor: string;
  action: string;
  type: string;
  time_performed: Date;
}

const AuditTrailListComponent = () => {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [auditsPerPage] = useState(5);

  const handleClose = () => setShow(false);

  const handleSearchAudit = (event: React.ChangeEvent<any>) => {
    setSearch(event.target.value);
  };

  const sortedAudits = audits.sort((a, b) => (a.action < b.action ? -a : 1));
  const indexOfLastAudit = currentPage * auditsPerPage;
  const indexOfFirstAudit = indexOfLastAudit - auditsPerPage;
  const currentAudits = sortedAudits.slice(indexOfFirstAudit, indexOfLastAudit);
  const totalPagesNum = Math.ceil(sortedAudits.length / auditsPerPage);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await AuditTrailService.getAudits();
        setAudits(res.data);
      } catch (error) {
        console.log("Error fetching data.", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    handleClose();
    return () => {
      handleShowAlert();
    };
  }, [sortedAudits]);

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2 style={{ fontSize: "25px" }}>
              Audit <b>Trail</b>
            </h2>
          </div>
        </div>
      </div>

      <Alert show={showAlert} variant="success">
        Audit Trail Loaded Successfully!
      </Alert>

      <input
        className="input"
        placeholder="Search"
        style={{ border: "2px solid black" }}
        onChange={handleSearchAudit}
      />

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Actor ID</th>
            <th>Action</th>
            <th>Type</th>
            <th>Timestamp</th>
            <th className="th" style={{ textAlign: "right" }}>
              Delete
            </th>
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {audits
              .filter(
                (audit: { action: string; actor: string; type: string }) => {
                  if (search === "") {
                    return audit;
                  } else if (
                    audit.action
                      .toLocaleLowerCase()
                      .includes(search.toLowerCase()) ||
                    audit.actor
                      .toLocaleLowerCase()
                      .includes(search.toLowerCase()) ||
                    audit.type
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
                  ) {
                    return audit;
                  }
                }
              )
              .map((audit) => (
                <tr key={audit.id}>
                  <Audit audit={audit} />
                </tr>
              ))}
          </tbody>
        )}
      </table>

      <AuditPagination
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentAudits={currentAudits}
        sortedAudits={sortedAudits}
      />
    </>
  );
};

export default AuditTrailListComponent;
