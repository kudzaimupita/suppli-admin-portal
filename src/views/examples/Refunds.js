/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';

// reactstrap components
import { Container, Row, Col } from 'reactstrap';
import GeneralHeader from '../../components/Headers/GeneralHeader';

// core components

import Refunds from '../../components/Refunds';

class Tables extends React.Component {
  render() {
    return (
      <>
        <GeneralHeader />
        <Container className="mt--7  bg-secondary" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="12">
              {' '}
              <Refunds />
            </Col>
            {/* <Col className="mb-5 mb-xl-0" xl="5">
              <Refund />
            </Col> */}
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
