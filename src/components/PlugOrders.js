import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import NavUserDropdown from '../components/NavUserDropdown';
import { getCatergories } from '../actions/catergories';
import { loadMyPlug } from '../actions/auth';
import { getPlugStats, getDueAmount } from '../actions/plugs';
import { Avatar } from 'antd';
// reactstrap components
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Card,
  Media,
  Progress,
  Table,
  UncontrolledTooltip,
  Row,
} from 'reactstrap';

class OrderTable extends React.Component {
  render() {
    return (
      <>
        <Table className="align-items-center table-dark" responsive>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Project</th>
              <th scope="col">Budget</th>
              <th scope="col">Status</th>
              <th scope="col">Users</th>
              <th scope="col">Completion</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <a
                    className="avatar rounded-circle mr-3"
                    href="/"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      // src={require("assets/img/theme/bootstrap.jpg")}
                    />
                  </a>
                  <Media>
                    <span className="mb-0 text-sm">Argon Design System</span>
                  </Media>
                </Media>
              </th>
              <td>$2,500 USD</td>
              <td>
                <Badge color="" className="badge-dot mr-4">
                  <i className="bg-warning" />
                  pending
                </Badge>
              </td>
              <td>
                <div className="avatar-group">
                  <a
                    className="avatar avatar-sm rounded-circle"
                    href="/"
                    id="tooltip731399078"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      alt="..."

                      // src={require("assets/img/theme/team-1.jpg")}
                    />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip731399078">
                    Ryan Tompson
                  </UncontrolledTooltip>
                  <a
                    className="avatar avatar-sm rounded-circle"
                    href="/"
                    id="tooltip491083084"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      alt="..."

                      // src={require("assets/img/theme/team-2.jpg")}
                    />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip491083084">
                    Romina Hadid
                  </UncontrolledTooltip>
                  <a
                    className="avatar avatar-sm rounded-circle"
                    href="/"
                    id="tooltip528540780"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      alt="..."

                      // src={require("assets/img/theme/team-3.jpg")}
                    />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip528540780">
                    Alexander Smith
                  </UncontrolledTooltip>
                  <a
                    className="avatar avatar-sm rounded-circle"
                    href="/"
                    id="tooltip237898869"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      alt="..."

                      // src={require("assets/img/theme/team-4.jpg")}
                    />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip237898869">
                    Jessica Doe
                  </UncontrolledTooltip>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="mr-2">60%</span>
                  <div>
                    <Progress max="100" value="60" barClassName="bg-warning" />
                  </div>
                </div>
              </td>
              <td className="text-right">
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-icon-only text-light"
                    href="/"
                    role="button"
                    size="sm"
                    color=""
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Action
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Another action
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Something else here
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}

OrderTable.defaultProps = {
  catergories: [],
  myPlug: {},
  plugStats: {},
};

const mapStateToProps = (state) => ({
  auth: state.auth,

  isAuthenticated: state.auth,
  cartItems: state.cart.cartItems,
  myPlug: state.myPlug.plug,
  orders: state.plugSales.orders,
  amountDue: state.unBalancedSales.stats,
});

export default connect(mapStateToProps, {
  logout,
  loadMyPlug,
  getPlugStats,
  getCatergories,
  getDueAmount,
})(OrderTable);
