import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import Plugs from '../../components/Plugs';
import PlugProfile from '../../components/Plug';
import GeneralHeader from '../../components/Headers/GeneralHeader';

class Tables extends React.Component {
  render() {
    return (
      <>
        <GeneralHeader />
        <Container className="mt--7  bg-secondary" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="6">
              {' '}
              <Plugs />
            </Col>
            <Col className="mb-5 mb-xl-0" xl="6">
              <PlugProfile />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
