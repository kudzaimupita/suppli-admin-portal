import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import GeneralHeader from '../../components/Headers/GeneralHeader';

import ProductReviews from '../../components/ProductReviews';

class Profile extends React.Component {
  render() {
    return (
      <>
        <GeneralHeader />
        <Container className="mt--7  bg-secondary" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              {' '}
              <ProductReviews />
            </Col>{' '}
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="6"></Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
