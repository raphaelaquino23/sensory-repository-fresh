import { Container, Row, Col, Button } from "react-bootstrap";

function PageNotFound() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>404</h1>
          <h3>Oops! Page not found.</h3>
          <p>We can't seem to find the page you're looking for.</p>
          <Button variant="primary" href="/">Go Home</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PageNotFound;
