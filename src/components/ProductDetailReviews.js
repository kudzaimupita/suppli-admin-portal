import React from 'react';
import Review from './RatingStars';
import Rating from '@material-ui/lab/Rating';
// reactstrap components
import { connect } from 'react-redux';
import { createPlug } from '../actions/plugs';
import { createProduct, getProduct, updateProduct } from '../actions/products';
import { setAlert } from '../actions/alert';
import { createProductReview } from '../actions/productReviews';

import { useHistory, withRouter, Link } from 'react-router-dom';
import RatingStars from './RatingStars1';
import ReactQuill from 'react-quill';
import RegisterModal from '../components/RegisterModal';
import Images from './Gallery';
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
  ListGroupItem,
  Form,
  Input,
  FormGroup,
  ListGroup,
  Progress,
  Row,
  Card,
  CardBody,
  Col,
} from 'reactstrap';

class ListGroups extends React.Component {
  state = { review: '', rating: null };

  handleReviewChange = (e) => {
    this.setState({ review: e.target.value });
  };

  handleRatingChange = (e) => {
    this.setState({ rating: e.target.value });
  };

  onSubmit = async (e) => {
    this.props.createProductReview(
      {
        review: this.state.review,
        rating: this.state.rating,
      },
      this.props.product.product._id
    );
  };

  render() {
    console.log(this.state.rating);
    return (
      <>
        <Card className="card-frame">
          <CardBody className="text-center">
            <h4 className="mb-0 text-sm">What customers are saying</h4>{' '}
          </CardBody>
        </Card>
        <ListGroup flush>
          {this.props.product.product &&
            this.props.product.product.reviews.splice(0, 2).map((review) => (
              <ListGroupItem
                className="list-group-item-action"
                href="/"
                onClick={(e) => e.preventDefault()}
                tag="a"
              >
                <Row className="align-items-center">
                  <Col className="col-auto">
                    <img
                      alt="..."
                      className="avatar rounded-circle"
                      src={require('../assets/img/theme/team-1.jpg')}
                    />
                  </Col>
                  <div className="col ml--2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Row style={{ paddingLeft: '16px' }}>
                          {' '}
                          <h4 className="mb-0 text-sm">
                            {review.user.name}
                          </h4>{' '}
                          <Review
                            rating={review.rating}
                            style={{ marginLeft: '10px' }}
                          />
                        </Row>
                      </div>
                      <div className="text-right text-muted">
                        <small>{review.createdAt.slice(0, 10)}</small>
                      </div>
                    </div>
                    <p className="text-sm mb-0">{review.review}</p>
                  </div>
                </Row>
              </ListGroupItem>
            ))}
        </ListGroup>
        <Card className="card-frame">
          <CardBody className="text-center">
            <Button color="info" size="sm" block>
              Write review
            </Button>
          </CardBody>
        </Card>
        {this.props.product.product &&
          this.props.product.product.reviews.splice(0, 2).map((review) => (
            <Card>
              <CardBody>
                <Row className="align-items-center">
                  <Col className="col-auto">
                    <a
                      className="avatar avatar-xl rounded-circle"
                      href="/"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="..."
                        src={require('../assets/img/theme/team-2.jpg')}
                      />
                    </a>
                  </Col>
                  <div className="col ml--2">
                    <h4 className="mb-0">
                      <a href="/" onClick={(e) => e.preventDefault()}>
                        John Snow
                      </a>
                    </h4>
                    <p className="text-sm text-muted mb-0">Working remoteley</p>
                    <span className="text-success">●</span>
                    <small>Active</small>
                  </div>
                  <Col className="col-auto">
                    <Button color="primary" size="sm" type="button">
                      Add
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          ))}
      </>
    );
  }
}

ListGroups.defaultProps = {
  catergories: [],
  product: {},
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
});

export default connect(mapStateToProps, {
  createProduct,
  setAlert,
  createPlug,
  createProductReview,
  getProduct,
  updateProduct,
  clearCart,
  clearItemFromCart,
  addItem,
  removeItem,
})(withRouter(ListGroups));
