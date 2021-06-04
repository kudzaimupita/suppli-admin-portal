import React from 'react';

import { CardBody, Badge, CardTitle, Container, Row, Col } from 'reactstrap';

import { connect } from 'react-redux';

import PlugOrders from '../../components/Orders';
import PlugProfileCard from '../../components/PlugProfileCard';
import {
  getAllOrders,
  getStats,
  getAggregatedStats,
  getDailyStats,
  getWeeklyStats,
} from '../../actions/orders';
import { Card } from 'antd';
import { getAllProducts } from '../../actions/products';
class Profile extends React.Component {
  componentDidMount() {
    this.props.getAllOrders();
    this.props.getDailyStats();
    this.props.getStats();
    this.props.getAggregatedStats();
    this.props.getWeeklyStats();
  }
  render() {
    return (
      <>
        <div
          className="header  pb-8 pt-5 pt-md-6"
          style={{
            backgroundImage: `url(${require('../../assets/img/theme/back.png')})`,
          }}
        >
          <Container fluid>
            <div className="header-body">
              <Row>
                <Col lg="3" xl="3">
                  <Card
                    className="card-stats mb-4 mb-xl-0 bg-dark"
                    color="default"
                  >
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            orders
                          </CardTitle>
                          <span
                            className="h2 font-weight-bold mb-0"
                            style={{ color: 'white' }}
                          >
                            {this.props.stats && this.props.stats.totalOrders}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="ni ni-bag-17"></i>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-0 mb-0 text-muted text-sm">
                        <span
                          className="text-secondary mr-2"
                          style={{ fontSize: '10px' }}
                        >
                          {this.props.dailyStats &&
                          this.props.dailyStats.newOrders
                            ? this.props.dailyStats.newOrders.length
                            : 0}
                          {'  '}
                        </span>

                        <span
                          className="text-nowrap"
                          style={{ fontSize: '10px' }}
                        >
                          {'  '} Since 24hrs ago
                        </span>
                      </p>
                      <p
                        className="mt-0 mb-0 text-muted text-sm"
                        style={{ fontSize: '10px' }}
                      >
                        <span
                          className="text-secondary mr-0"
                          style={{ fontSize: '10px' }}
                        >
                          {this.props.weeklyStats &&
                          this.props.weeklyStats.newOrders
                            ? this.props.weeklyStats.newOrders.length
                            : 0}
                          {'  '}
                        </span>

                        <span
                          className="text-nowrap"
                          style={{ fontSize: '10px' }}
                        >
                          {'  '} Since 7 days ago
                        </span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="3" xl="3">
                  <Card
                    className="card-stats mb-4 mb-xl-0 bg-dark"
                    color="default"
                  >
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Shops
                          </CardTitle>
                          <span
                            className="h2 font-weight-bold mb-0"
                            style={{ color: 'white' }}
                          >
                            {this.props.plugs && this.props.plugs.length}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                            <i className="ni ni-bag-17"></i>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-0 mb-0 text-muted text-sm">
                        <span
                          className="text-success mr-2"
                          style={{ fontSize: '10px' }}
                        >
                          {this.props.dailyStats &&
                          this.props.dailyStats.newPlugs
                            ? this.props.dailyStats.newPlugs.length
                            : 0}
                          {'  '}
                        </span>{' '}
                        <span
                          className="text-nowrap"
                          style={{ fontSize: '10px' }}
                        >
                          Since 24hrs ago
                        </span>
                      </p>
                      <p className="mt-0 mb-0 text-muted text-sm">
                        <span
                          className="text-secondary mr-0"
                          style={{ fontSize: '10px' }}
                        >
                          {this.props.weeklyStats &&
                            this.props.weeklyStats.newPlugs &&
                            this.props.weeklyStats.newPlugs.length}
                          {'  '}
                        </span>

                        <span
                          className="text-nowrap"
                          style={{ fontSize: '11px' }}
                        >
                          {'  '} Since 7 days ago
                        </span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="3" xl="3">
                  <Card
                    className="card-stats mb-4 mb-xl-0 bg-dark"
                    color="default"
                  >
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Products
                          </CardTitle>
                          <span
                            className="h2 font-weight-bold mb-0"
                            style={{ color: 'white' }}
                          >
                            {this.props.stats && this.props.stats.totalOrders}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                            <i className="ni ni-bag-17"></i>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-0 mb-0 text-muted text-sm">
                        <span
                          className="text-secondary mr-2"
                          style={{ fontSize: '10px' }}
                        >
                          {this.props.dailyStats &&
                          this.props.dailyStats.newProducts
                            ? this.props.dailyStats.newProducts.length
                            : 0}{' '}
                        </span>

                        <span
                          className="text-nowrap"
                          style={{ fontSize: '10px' }}
                        >
                          Since 24hrs ago
                        </span>
                      </p>
                      <p
                        className="mt-0 mb-0 text-muted text-sm"
                        style={{ fontSize: '10px' }}
                      >
                        <span
                          className="text-secondary mr-0"
                          style={{ fontSize: '10px' }}
                        >
                          {this.props.weeklyStats &&
                          this.props.weeklyStats.newProducts
                            ? this.props.weeklyStats.newProducts.length
                            : 0}{' '}
                        </span>

                        <span
                          className="text-nowrap"
                          style={{ fontSize: '10px' }}
                        >
                          {'  '} Since 7 days ago
                        </span>
                      </p>
                      {/* <p className="mt-0 mb-0 text-muted text-sm">
                        <span
                          className="text-secondary mr-2"
                          style={{ fontSize: '11px' }}
                        >
                          {this.props.products &&
                            this.props.products.filter((product) => product.was)
                              .length}
                          {'  '} <small> on sale</small> ||{' '}
                          {this.props.products &&
                            this.props.products.filter(
                              (product) => product.clearance === true
                            ).length}
                          {'  '}
                          <small> on clearance</small> || {'  '}
                          {this.props.products &&
                            this.props.products.filter(
                              (product) => product.outOfStock === true
                            ).length}
                          <small>out of stock</small>
                        </span>

                        <span
                          className="text-nowrap"
                          style={{ fontSize: '10px' }}
                        ></span>
                      </p> */}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="3" xl="3">
                  <Card
                    className="card-stats mb-4 mb-xl-0 bg-dark"
                    color="default"
                  >
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Refunds
                          </CardTitle>
                          <span
                            className="h2 font-weight-bold mb-0"
                            style={{ color: 'white' }}
                          >
                            {this.props.refunds &&
                              this.props.refunds.doc &&
                              this.props.refunds.doc.length}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="ni ni-bag-17"></i>
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-0 mb-0 text-muted text-sm">
                        <span
                          className="text-success mr-2"
                          style={{ fontSize: '10px' }}
                        >
                          {this.props.dailyStats &&
                          this.props.dailyStats.newRefunds
                            ? this.props.dailyStats.newRefunds.length
                            : 0}
                          {'  '}
                        </span>

                        <span
                          className="text-nowrap"
                          style={{ fontSize: '10px' }}
                        >
                          {'  '} Since 24hrs ago
                        </span>
                      </p>
                      <p className="mt-0 mb-0 text-muted text-sm">
                        <span
                          className="text-secondary mr-0"
                          style={{ fontSize: '10px' }}
                        >
                          {this.props.weeklyStats &&
                          this.props.weeklyStats.newRefunds
                            ? this.props.weeklyStats.newRefunds.length
                            : 0}
                          {'  '}
                        </span>

                        <span
                          className="text-nowrap"
                          style={{ fontSize: '10px' }}
                        >
                          {'  '} Since 7 days ago
                        </span>
                      </p>
                      {/*   <p className="mt-0 mb-0 text-muted text-sm">
                        <span
                          className="text-secondary mr-2"
                          style={{ fontSize: '11px' }}
                        >
                          {this.props.refunds &&
                            this.props.refunds.doc &&
                            this.props.refunds.doc.filter(
                              (refund) => refund.resolved === true
                            ).length}
                          {'  '} <small> resolved</small> ||{' '}
                          {this.props.refunds &&
                            this.props.refunds.doc &&
                            this.props.refunds.doc.filter(
                              (refund) => refund.status === 'awaitingResponse'
                            ).length}
                          {'  '}
                          <small> awaiting response</small>
                        </span>

                        <span
                          className="text-nowrap"
                          style={{ fontSize: '10px' }}
                        ></span>
                      </p> */}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

Profile.defaultProps = {
  catergories: [],
  myPlug: [],
  plugStats: [],
  dailyStats: {},
  productStats: [],
  weekly: [],
  refunds: [],
};
const mapStateToProps = (state) => ({
  products: state.allProducts.products,
  user: state.auth.user,
  product: state.product.product,
  auth: state.auth.isAuthenticated,
  isAuthenticated: state.auth,
  plug: state.plug.plug,
  loading: state.auth.loading,
  createdPlugLoading: state.createdPlug.loading,
  catergories: state.catergories.catergories,
  plugs: state.allPlugs.plugs,
  order: state.order.order,
  orders: state.allOrders.orders,
  plugStats: state.plugSales.orders,
  productStats: state.productStats,
  stats: state.stats.stats,
  dailyStats: state.dailyStats.stats,
  weeklyStats: state.weeklyStats.stats,
  amountDue: state.unBalancedSales.stats,
  refunds: state.allRefunds.refunds,
});

export default connect(mapStateToProps, {
  getAllOrders,
  getStats,
  getAggregatedStats,
  getDailyStats,
  getWeeklyStats,
})(Profile);
