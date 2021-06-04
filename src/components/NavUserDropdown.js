import React from 'react';

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
} from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

class UserNavDropdown extends React.Component {
  render() {
    return (
      <>
        <UncontrolledDropdown nav>
          <DropdownToggle className="pr-0" nav>
            <Media className="align-items-center">
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="..."
                  src={`http://localhost:5000/img/users/${
                    this.props.auth.user && this.props.auth.user.imageCover
                  }`}
                />
              </span>
              <Media className="ml-2 d-none d-lg-block">
                <span className="mb-0 text-sm font-weight-bold">
                  {this.props.auth.user ? this.props.auth.user.name : null}
                </span>
              </Media>
            </Media>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem href="/" onClick={() => this.props.logout()}>
              <i className="ni ni-user-run" />

              <span>Sign out</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,

  isAuthenticated: state.auth,
});

export default connect(mapStateToProps, { logout })(UserNavDropdown);
