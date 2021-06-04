import React from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import { Link } from 'react-router-dom';
// import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from 'reactstrap';

class DemoNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById('navbar-main'));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: '',
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: 'collapsing-out',
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: '',
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-dark bg-default headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              {/* <NavbarBrand to="/" xs="6">
                <img alt="..." src={require("./assets/img/brand/uun.png")} />
              </NavbarBrand> */}
              {/* <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button> */}

              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    {/* <img
                        alt="..."
                        src={require("./assets/img/brand/argon-react.png")}
                      /> */}
                  </Col>
                  {/* <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col> */}
                </Row>
              </div>
              <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                {/* <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://github.com/creativetimofficial/argon-design-system-react"
                      id="tooltip112445449"
                      target="_blank"
                    >
                      <i className="fa fa-github" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Github
                      </span>
                    </NavLink>
                  </NavItem> */}
                {/* <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">baboon.</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-xl">
                      <div className="dropdown-menu-inner">
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/overview?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                            <i className="ni ni-spaceship" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              Getting started
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Learn how to use Argon compiling Scss, change
                              brand colors and more.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            <i className="ni ni-palette" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              Foundation
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Learn more about colors, typography, icons and the
                              grid system we used for Argon.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                            <i className="ni ni-ui-04" />
                          </div>
                          <Media body className="ml-3">
                            <h5 className="heading text-warning mb-md-1">
                              Components
                            </h5>
                            <p className="description d-none d-md-inline-block mb-0">
                              Browse our 50 beautiful handcrafted components
                              offered in the Free version.
                            </p>
                          </Media>
                        </Media>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown> */}
                {/* <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Help</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/landing-page">Landing</DropdownItem>
                      <DropdownItem to="/profile-page">Profile</DropdownItem>
                      <DropdownItem to="/login-page">Login</DropdownItem>
                      <DropdownItem to="/register-page">Register</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown> */}
              </Nav>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                {/* <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://www.facebook.com/creativetim"
                      id="tooltip333589074"
                      target="_blank"
                    >
                      <i className="fa fa-facebook-square" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Facebook
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip333589074">
                      Like us on Facebook
                    </UncontrolledTooltip>
                  </NavItem> */}
                {/* <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://twitter.com/creativetim"
                      id="tooltip184698705"
                      target="_blank"
                    >
                      <i className="fa fa-twitter-square" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Twitter
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip184698705">
                      Follow us on Twitter
                    </UncontrolledTooltip>
                  </NavItem> */}
                {/* <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://github.com/creativetimofficial/argon-design-system-react"
                      id="tooltip112445449"
                      target="_blank"
                    >
                      <i className="fa fa-github" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Github
                      </span>
                    </NavLink>
                  </NavItem>{' '} */}
                <Link to="/">
                  {' '}
                  {/* <NavItem
                      className="d-none d-lg-block ml-lg-4"
                      style={{ marginLeft: 10 }}
                    >
                      <Button
                        className="btn-1"
                        color="primary"
                        outline
                        type="button"
                      >
                        <span className="btn-inner--icon">
                          <i className="fa fa-cloud-download mr-2" />
                        </span>
                        <span className="nav-link-inner--text ml-1">
                          Setup shop
                        </span>
                      </Button>
                    </NavItem> */}
                </Link>
                {/* {this.props.authLink} */}
              </Nav>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { setAlert, register })(DemoNavbar);
