import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import GeneralHeader from '../../components/Headers/GeneralHeader';

import Plugproducts from '../../components/Users';

class Tables extends React.Component {
  render() {
    return (
      <>
        <GeneralHeader />
        <Container className="mt--7  bg-secondary" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="12">
              {' '}
              <Plugproducts />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
