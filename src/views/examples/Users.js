import React from 'react';

import { Container, Row } from 'reactstrap';

import Users from '../../components/Users';

class Tables extends React.Component {
  render() {
    return (
      <>
        <GeneralHeader />
        <Container className="mt--7  bg-secondary" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="12">
              {' '}
              <Users />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
