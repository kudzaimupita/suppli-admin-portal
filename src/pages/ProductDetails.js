import React from 'react';

import { Row, Col, Container } from 'reactstrap';
import { selectCartTotal } from '../selectors/cartSelector';

import { connect } from 'react-redux';

import ProductDetail from '../components/ProductDetails';

import {
  clearItemFromCart,
  clearCart,
  addItem,
  removeItem,
} from '../actions/cart';
import { getPlug } from '../actions/plugs';

import Header from '../components/Headers/UserHeader';

class Profile extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Container className="mt--7 bg-secondary" fluid>
          {' '}
          <Row>
            <Col style={{ marginRight: '50px', marginLeft: '50px' }}>
              {' '}
              <ProductDetail />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  plug: state.plug,
  cartTotalPrice: selectCartTotal(state),
  cart: state.cart,
  auth: state.auth.isAuthenticated,
  product: state.product.product,
});

export default connect(mapStateToProps, {
  getPlug,
  addItem,
  removeItem,
  clearItemFromCart,
  clearCart,
})(Profile);
