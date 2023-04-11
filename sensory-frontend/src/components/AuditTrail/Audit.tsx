import { useState } from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import AuditTrailService from "../../services/AuditTrailService";

const Audit = ({ audit }: { audit: any }) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDel = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleClickDelete = async (id: number) => {
    AuditTrailService.deleteAudit(id);
    setShowDelete(false);
  };

  return (
    <>
      <td>{audit.actor}</td>
      <td>{audit.action}</td>
      <td>{audit.type}</td>
      <td>{audit.time_performed}</td>
      <td style={{ textAlign: "right" }}>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}>
          <button
            onClick={handleShowDelete}
            style={{ display: "inline-block", alignItems: "right" }}
            className="btn text-danger btn-act"
            data-toggle="modal"
          >
            <i className="material-icons">&#xE872;</i>
          </button>
        </OverlayTrigger>
      </td>

      <Modal show={showDelete} onHide={handleCloseDel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Audit</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this audit?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClickDelete(audit.id);
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Audit;
