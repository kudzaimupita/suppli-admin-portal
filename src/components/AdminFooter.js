import React from 'react';

import { NavItem, NavLink, Nav, Container, Row, Col } from 'reactstrap';

class AdminFooter extends React.Component {
  render() {
    return (
      <>
        <footer
          className="py-5"
          style={{ backgroundColor: '#172b4d', backgroundSize: 'full' }}
        >
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © 2021{' '}
                  <a
                    className="font-weight-bold ml-1"
                    // href="https://www.creative-tim.com?ref=adr-admin-footer"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Suppl-i Online Shopping Mall
                  </a>
                </div>
              </Col>
              {/* <Col xl="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>
                    <NavLink
                      href="https://www.creative-tim.com?ref=adr-auth-footer"
                      target="_blank"
                    >
                      Suppl-i
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://www.creative-tim.com/presentation?ref=adr-auth-footer"
                      target="_blank"
                    >
                      About Us
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="http://blog.creative-tim.com?ref=adr-auth-footer"
                      target="_blank"
                    >
                      Help
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-auth-footer"
                      target="_blank"
                    >
                      MIT License
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col> */}
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default AdminFooter;
