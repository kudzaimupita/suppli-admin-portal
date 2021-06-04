import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import NavUserDropdown from './NavUserDropdown';
import { getProduct } from '../actions/products';
import { loadMyPlug } from '../actions/auth';
import { getPlugStats, getDueAmount } from '../actions/plugs';
// reactstrap components
import { Card, Media, Table } from 'reactstrap';

class OrderTable extends React.Component {
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  state = {};
  render() {
    return (
      <>
        <Card className="bg-default shadow">
          <Table className="align-items-center table-dark" responsive>
            <thead className="thead-dark">
              <tr>
                <th scope="col">
                  Name ({' '}
                  {this.props.myPlug.followers &&
                    this.props.myPlug.followers.length}{' '}
                  followers ){' '}
                </th>
                {/* <th scope="col">Email</th> */}
              </tr>
            </thead>
            <tbody>
              {' '}
              {this.props.myPlug.followers &&
                this.props.myPlug.followers.map((follower) => (
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
                            src={`http://localhost:5000/img/users/${follower.photo}`}
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">{follower.name}</span>
                        </Media>
                      </Media>
                    </th>
                    {/* <td>{follower.email}</td> */}
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card>
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
  product: state.product.product,
  isAuthenticated: state.auth,
  cartItems: state.cart.cartItems,
  myPlug: state.myPlug.plug,
  orders: state.plugSales.orders,
  amountDue: state.unBalancedSales.stats,
});

export default connect(mapStateToProps, {
  getProduct,
  logout,
  loadMyPlug,
  getPlugStats,

  getDueAmount,
})(OrderTable);
