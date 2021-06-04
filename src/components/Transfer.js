import React from 'react';
import { Transfer, Button } from 'antd';
import { connect } from 'react-redux';

import { logout } from '../actions/auth';
import NavUserDropdown from '../components/NavUserDropdown';
import { getProduct, deleteProduct, updateProduct } from '../actions/products';
import { loadMyPlug } from '../actions/auth';
import { getPlugStats, getDueAmount } from '../actions/plugs';
import { Avatar, Checkbox } from 'antd';
import classnames from 'classnames';

class App extends React.Component {
  state = {
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];

    this.props.myPlug.products &&
      this.props.myPlug.products.map((product) => {
        const data = {
          key: product._id,
          title: product.name,
        };
        if (data.chosen) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      });

    this.setState({ mockData, targetKeys });
    this.props.onProductsChange(targetKeys);
  };

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
    this.props.onProductsChange(targetKeys);
  };

  render() {
    // console.log(this.state)
    return (
      <Transfer
        dataSource={this.state.mockData}
        showSearch
        listStyle={{
          width: 320,
          height: 290,
        }}
        operations={['to right', 'to left']}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={(item) => `${item.title}`}
        footer={this.renderFooter}
      />
    );
  }
}
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
  loadMyPlug,

  updateProduct,
})(App);
