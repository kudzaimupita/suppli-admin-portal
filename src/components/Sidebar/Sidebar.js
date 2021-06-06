import React from 'react';
import { NavLink as NavLinkRRD, Link } from 'react-router-dom';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import NavUserDropdown from '../../components/NavUserDropdown';
import { getCatergories } from '../../actions/catergories';
import { loadMyPlug } from '../../actions/auth';
import logoo from '../../assets/images/suppli2.jpg';
// reactstrap components
import {
  Collapse,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';

class Sidebar extends React.Component {
  componentDidMount() {
    this.props.loadMyPlug();
  }
  state = {
    collapseOpen: false,
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  }

  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false,
    });
  };

  createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };
  render() {
    const { routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link,
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: '_blank',
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="pt-0 pr-40">
            {' '}
            <img style={{ height: '80px' }} alt="..." src={logoo} />
          </div>

          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav></UncontrolledDropdown>
            <NavUserDropdown />
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>

            <Nav navbar>{this.createLinks(routes)}</Nav>

            <hr className="my-3" />

            {/* <h6 className="navbar-heading text-muted">Help</h6> */}
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,

    outterLink: PropTypes.string,

    imgSrc: PropTypes.string.isRequired,

    imgAlt: PropTypes.string.isRequired,
  }),
};

Sidebar.defaultProps = {
  catergories: [],
  myPlug: {},
};

const mapStateToProps = (state) => ({
  auth: state.auth,

  isAuthenticated: state.auth,
  cartItems: state.cart.cartItems,
  myPlug: state.myPlug.plug,
});

export default connect(mapStateToProps, {
  logout,
  loadMyPlug,
  getCatergories,
})(Sidebar);
