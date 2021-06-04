import React from 'react';

import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import GeneralHeader from '../../components/Headers/GeneralHeader';

// core components

import PlugReviews from '../../components/PlugReviews';
class Profile extends React.Component {
  render() {
    return (
      <>
        <GeneralHeader />
        {/* Page content */}
        <Container className="mt--7  bg-secondary" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              {' '}
              <PlugReviews />
            </Col>{' '}
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="6"></Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
