import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import NavUserDropdown from '../../components/NavUserDropdown';
import { getCatergories } from '../../actions/catergories';
import { loadMyPlug } from '../../actions/auth';
// reactstrap components
import { DatePicker, Space, Button } from 'antd';

import { Navbar, Badge, Nav, Container, NavItem } from 'reactstrap';

class AdminNavbar extends React.Component {
  // componentDidMount() {
  //   this.props.loadMyPlug();
  // }
  onChange(value, dateString) {
    // console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            {this.props.stats.orderStatusStats &&
              this.props.stats.orderStatusStats.map((status) => (
                <>
                  {' '}
                  <Button
                    className="btn-icon btn-3"
                    color="primary"
                    type="button"
                    size="sm"
                  >
                    {' '}
                    <span className="btn-inner--icon">
                      <span className="btn-inner--text">
                        {' '}
                        <Badge color="info" pill></Badge>
                      </span>
                    </span>
                    <span className="btn-inner--text">
                      {status.total} Orders {status._id}
                    </span>
                  </Button>
                </>
              ))}
            <NavItem>
              {/* <Link
                className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                to="/"
              >
                <Button
                  className="btn-icon btn-3"
                  color="primary"
                  type="button"
                  size="sm"
                >
                  <span className="btn-inner--icon">
                    <i className="ni ni-send text-info" />
                  </span>
                  <span className="btn-inner--text">Refresh</span>
                </Button>
              </Link> */}
            </NavItem>
            <NavItem>
              {' '}
              {/* <DatePicker
                format="MM-DD-YYYY HH:mm"
                showTime
                onChange={this.onChange}
              /> */}
            </NavItem>
            <NavItem>
              {' '}
              <Link
                className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                to="/"
              >
                {' '}
              </Link>
            </NavItem>

            <Nav className="align-items-center d-none d-md-flex" navbar>
              <NavItem style={{ marginLeft: 15, marginRight: 40 }} size="sm">
                <NavUserDropdown
                  user={
                    this.props.isAuthenticated.isAuthenticated &&
                    this.props.auth.user
                  }
                />
              </NavItem>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

AdminNavbar.defaultProps = {
  catergories: [],
  myPlug: {},
  stats: [],
  aggregatedStats: [],
  auth: [],
};

const mapStateToProps = (state) => ({
  auth: state.auth,

  isAuthenticated: state.auth,
  // cartItems: state.cart.cartItems,
  // myPlug: state.myPlug.plug,
  stats: state.stats.stats,
});

export default connect(mapStateToProps, {
  logout,
  loadMyPlug,
  getCatergories,
})(AdminNavbar);
