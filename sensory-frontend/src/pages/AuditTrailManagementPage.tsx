import AuditTrailListComponent from "../components/AuditTrail/AuditTrailList";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

function AuditTrailManagementPage() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <AuditTrailListComponent />
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default AuditTrailManagementPage;
