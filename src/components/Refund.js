import React from 'react';
import Review from './RatingStars';
import Rating from '@material-ui/lab/Rating';
// reactstrap components
import Select from 'react-select';
import { Avatar } from 'antd';

import { connect } from 'react-redux';
import { createPlug } from '../actions/plugs';
import { createProduct, getProduct, updateProduct } from '../actions/products';
import { setAlert } from '../actions/alert';
import { updateRefund } from '../actions/refunds';
// import { updateRefund } from '../actions/productReviews';
import RefundGallery from '../components/RefundGallery';

import { useHistory, withRouter, Link } from 'react-router-dom';
// import RatingStars from './RatingStars1';

import {
  selectCartItemsCount,
  selectCartTotal,
} from '../selectors/cartSelector';
import {
  clearCart,
  clearItemFromCart,
  addItem,
  removeItem,
} from '../actions/cart';

import {
  Badge,
  Button,
  CardHeader,
  ListGroupItem,
  Form,
  Input,
  FormGroup,
  ListGroup,
  Progress,
  Row,
  Media,
  Card,
  CardBody,
  Col,
} from 'reactstrap';

class ListGroups extends React.Component {
  state = { review: '', rating: null, singleSelect: '', reason: '' };

  handleReviewChange = (e) => {
    this.setState({ review: e.target.value });
  };

  handleStatusChange = (singleSelect) => {
    this.setState({ singleSelect });
    // this.setState({ orderId: this.props.order[0] && this.props.order[0]._id });
  };

  handleReasonChange = (e) => {
    this.setState({ reason: e.target.value });
  };

  onSubmit = async (id) => {
    this.props.updateRefund(id, {
      reasonForRejection: this.state.reason,
      status: this.state.singleSelect.value,
    });
  };

  render() {
    console.log(this.state);
    return (
      <>
        <Card className="card-frame">
          <CardHeader>
            {' '}
            <Row className="align-items-center">
              <Col className="col-auto">
                <a
                  className="avatar rounded-circle"
                  href="/"
                  onClick={(e) => e.preventDefault()}
                >
                  <img
                    alt="..."
                    src={require('../assets/img/theme/team-1.jpg')}
                  />
                </a>
              </Col>

              <div className="col ml--2">
                <h4 className="mb-0">
                  <a href="/" onClick={(e) => e.preventDefault()}>
                    {this.props.refund.doc && this.props.refund.doc.user.name}
                  </a>
                </h4>

                <small>
                  {this.props.refund.doc && this.props.refund.doc.user.email}
                </small>
                <br color="default" className="bg-default"></br>
                <small>
                  {this.props.refund.doc && this.props.refund.doc.phone}
                </small>
              </div>
            </Row>
          </CardHeader>
          <CardBody className="text-center">
            <small color="info">
              <strong>
                <i className="ni ni-mobile-button text-black" /> Status:
              </strong>{' '}
              {this.props.refund.doc && this.props.refund.doc.status}
            </small>
            <br color="default" className="bg-default"></br>
            <small color="info">
              <strong>
                <i className="ni ni-mobile-button text-black" /> Resolved ?:
              </strong>{' '}
              {this.props.refund.doc && this.props.refund.doc.resolved ? (
                <i class="fa fa-check-circle"></i>
              ) : (
                <i class="fa fa-times"></i>
              )}
            </small>
            <br color="default" className="bg-default"></br>
            <small color="info">
              <strong>
                <i className="ni ni-mobile-button text-black" /> Date:
              </strong>{' '}
              {this.props.refund.doc &&
                this.props.refund.doc.createdOn.slice(0, 10)}
            </small>
            <br color="default" className="bg-default"></br>
            <small color="info">
              <strong>
                <i className="ni ni-mobile-button text-black" /> Email:
              </strong>{' '}
              {this.props.refund.doc && this.props.refund.doc.status}
            </small>
            <br color="default" className="bg-default"></br>
            <small color="info">
              <strong>
                <i className="ni ni-mobile-button text-black" /> Product
                returned?:
              </strong>{' '}
              {this.props.refund.doc && this.props.refund.doc.status}
            </small>{' '}
            <br color="default" className="bg-default"></br>
            <small color="info">
              <strong>
                <i className="ni ni-mobile-button text-black" /> Customer
                reason:
              </strong>{' '}
              {this.props.refund.doc && this.props.refund.doc.reason}
            </small>
          </CardBody>
        </Card>
        <CardHeader>
          <td>
            {' '}
            {/* {this.props.refund.doc.product
              ? this.props.refund.doc.product.name
              : null} */}
            <Media className="align-items-center">
              {/* {this.props.order[0] && ( */}
              <Avatar
                shape="square"
                size={64}
                // src={`http://localhost:5000/img/users/${
                //   this.props.order[0] &&
                //   this.props.order[0].userDetails[0].photo
                // }`}
              />
              {/* )} */}

              {/* {this.props.order[0] &&
                        this.props.order[0].userDetails[0].name} */}
            </Media>{' '}
            <RefundGallery
              images={this.props.refund.doc && this.props.refund.doc.images}
            />
          </td>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="px-0">
            <Col xl="12">
              {' '}
              <CardHeader>
                <Button
                  block
                  color="info"
                  size="sm"
                  onClick={() =>
                    this.onSubmit(
                      this.props.refund.doc && this.props.refund.doc._id
                    )
                  }
                >
                  Approve
                </Button>
                <Button block color="success" size="sm">
                  Disapprove
                </Button>
                <Input
                  placeholder="reason or comments to customer"
                  type="text"
                  value={this.state.reason}
                  onChange={this.handleReasonChange}
                />
                <Select
                  style={{ width: '600px' }}
                  // size="sm"
                  className="react-select react-select-primary"
                  classNamePrefix="react-select"
                  name="singleSelect"
                  value={this.state.singleSelect}
                  onChange={this.handleStatusChange}
                  options={[
                    // { value: 'processing', label: 'Processing' },
                    { value: 'approved', label: 'Approved' },
                    { value: 'rejected', label: 'Rejected' },
                  ]}
                  // placeholder="Choose gender"
                />
              </CardHeader>
            </Col>
          </ListGroupItem>
        </ListGroup>
      </>
    );
  }
}

ListGroups.defaultProps = {
  catergories: [],
  product: {},
  refund: {},
};

const mapStateToProps = (state) => ({
  cart: selectCartItemsCount(state),
  cartTotalPrice: selectCartTotal(state),

  cartItems: state.cart.cartItems,
  user: state.auth.user,
  auth: state.auth.isAuthenticated,
  product: state.product.product,
  isAuthenticated: state.auth,
  loading: state.auth.loading,
  createdPlugLoading: state.createdPlug.loading,
  catergories: state.catergories.catergories,
  createdReview: state.createdProductReview,
  refund: state.refund.refund,
});

export default connect(mapStateToProps, {
  createProduct,
  setAlert,
  createPlug,
  updateRefund,
  getProduct,
  updateProduct,
  clearCart,
  clearItemFromCart,
  addItem,
  removeItem,
})(withRouter(ListGroups));
