import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import Products from '../../components/Products';
import GeneralHeader from '../../components/Headers/GeneralHeader';

class Profile extends React.Component {
  render() {
    return (
      <>
        <GeneralHeader />

        <Container className="mt--7  bg-secondary" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              {' '}
              <Products />
            </Col>{' '}
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="6"></Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
