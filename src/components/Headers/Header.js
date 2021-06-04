import React from 'react';

import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

import { getCatergories } from '../../actions/catergories';
import { loadMyPlug } from '../../actions/auth';
import { getProductStats } from '../../actions/products';
import {
  getPlugStats,
  getDueAmount,
  getPlugDailyStats,
} from '../../actions/plugs';
// reactstrap components
import { CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import { Card } from 'antd';
class Header extends React.Component {
  componentWillMount() {
    this.props.getPlugStats();
    this.props.getDueAmount();
    this.props.getPlugDailyStats();
    this.props.getProductStats();
  }
  render() {
    console.log(
      this.props.productStats.productStats &&
        this.props.productStats.productStats.toString()
    );
    return (
      <>
        <div
          className="header  pb-8 pt-5 pt-md-6"
          style={{
            backgroundImage: `url(${require('../../assets/img/theme/back.png')})`,
          }}
        >
          <Container fluid lg="9" xl="9">
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0 bg-dark">
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
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="ni ni-bag-17"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span
                        className="text-secondary mr-2"
                        style={{ fontSize: '12px' }}
                      >
                        {this.props.dailyStats &&
                        this.props.dailyStats.newOrders
                          ? this.props.dailyStats.newOrders.length
                          : 0}
                        {'  '}orders
                      </span>

                      <span
                        className="text-nowrap"
                        style={{ fontSize: '11px' }}
                      >
                        {'  '} Since 24hrs
                      </span>
                    </p>
                    <p
                      className="mt-0 mb-0 text-muted text-sm"
                      style={{ fontSize: '11px' }}
                    >
                      <span
                        className="text-secondary mr-0"
                        style={{ fontSize: '12px' }}
                      >
                        {this.props.weeklyStats &&
                        this.props.weeklyStats.newOrders
                          ? this.props.weeklyStats.newOrders.length
                          : 0}
                        {'  '} orders
                      </span>

                      <span
                        className="text-nowrap"
                        style={{ fontSize: '11px' }}
                      >
                        {'  '} Since 7 days
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0 bg-dark">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Maillist
                        </CardTitle>
                        <span
                          className="h2 font-weight-bold mb-0"
                          style={{ color: 'white' }}
                        >
                          {' '}
                          {this.props.stats && this.props.stats.maillist}{' '}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          {' '}
                          <i className="ni ni-collection"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span
                        className="text-info mr-2"
                        style={{ fontSize: '12px' }}
                      >
                        {this.props.dailyStats &&
                        this.props.dailyStats.newSubscribers
                          ? this.props.dailyStats.newSubscribers.length
                          : 0}{' '}
                        subs
                      </span>{' '}
                      <span
                        className="text-nowrap"
                        style={{ fontSize: '11px' }}
                      >
                        Since 24hrs
                      </span>
                    </p>
                    <p className="mt-0 mb-0 text-muted text-sm">
                      <span
                        className="text-secondary mr-0"
                        style={{ fontSize: '12px' }}
                      >
                        {this.props.weeklyStats &&
                        this.props.weeklyStats.newSubscribers
                          ? this.props.weeklyStats.newSubscribers.length
                          : 0}
                        {'  '} subs
                      </span>

                      <span
                        className="text-nowrap"
                        style={{ fontSize: '11px' }}
                      >
                        {'  '} Since 7 days
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
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
                          // style={{ fontSize: '0px' }}
                        >
                          Gross
                        </CardTitle>
                        <span
                          className="h5 font-weight-bold mb-0"
                          style={{ color: 'white', fontSize: '12px' }}
                        >
                          {' '}
                          {/* {this.props.stats &&
                              this.props.stats.gro} */}
                          R{this.props.stats && this.props.stats.grossRevenue}
                          {/* {this.props.stats && this.props.stats.grossRevenue
                            ? new Intl.NumberFormat('de-ZA', {
                                style: 'currency',
                                currency: 'ZAR',
                              }).format(this.props.stats.grossRevenue)
                            : 0} */}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="ni ni-money-coins"></i>
                        </div>
                      </Col>
                    </Row>
                    <p
                      className="mt-3 mb-0 text-muted text-sm"
                      style={{ fontSize: '10px' }}
                    >
                      <span
                        className="text-success mr-2"
                        style={{ fontSize: '10px' }}
                      >
                        {this.props.dailyStats &&
                        this.props.dailyStats.newGrossRevenue
                          ? new Intl.NumberFormat('de-ZA', {
                              style: 'currency',
                              currency: 'ZAR',
                            }).format(this.props.dailyStats.newGrossRevenue)
                          : 0}
                      </span>{' '}
                      <span
                        className="text-nowrap"
                        style={{ fontSize: '11px' }}
                      >
                        24hrs
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
                        this.props.weeklyStats.newGrossRevenue
                          ? new Intl.NumberFormat('de-ZA', {
                              style: 'currency',
                              currency: 'ZAR',
                            }).format(this.props.weeklyStats.newGrossRevenue)
                          : 0}
                      </span>

                      <span
                        className="text-nowrap"
                        style={{ fontSize: '10px' }}
                      >
                        {'  '} 7 days
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="3">
                <Card
                  className="card-stats mb-4 mb-xl-0  bg-dark"
                  color="default"
                >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase  text-muted mb-0"
                        >
                          Net
                        </CardTitle>
                        <span
                          className="h5 font-weight-bold mb-0"
                          color="white"
                          style={{ color: 'white' }}
                        >
                          {' '}
                          R{this.props.stats && this.props.stats.ourRevenue}
                          {/* {this.props.stats && this.props.stats.ourRevenue
                            ? new Intl.NumberFormat('de-ZA', {
                                style: 'currency',
                                currency: 'ZAR',
                              }).format(this.props.stats.ourRevenue)
                            : 0} */}
                        </span>
                      </div>
                      <Col className="col-auto">
                        {' '}
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          {' '}
                          <i className="ni ni-credit-card"></i>
                        </div>
                      </Col>{' '}
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span
                        className="text-success mr-2"
                        style={{ fontSize: '10px' }}
                      >
                        {this.props.dailyStats &&
                        this.props.dailyStats.newNetRevenue
                          ? new Intl.NumberFormat('de-ZA', {
                              style: 'currency',
                              currency: 'ZAR',
                            }).format(this.props.dailyStats.newNetRevenue)
                          : 0}
                        {/* {this.props.dailyStats &&
                              this.props.dailyStats.newNetRevenue}
                    
                     */}
                      </span>

                      <span className="text-nowrap" style={{ fontSize: '8px' }}>
                        {'  '} Since 24h
                      </span>
                    </p>
                    <p className="mt-0 mb-0 text-muted text-sm">
                      <span
                        className="text-secondary mr-0"
                        style={{ fontSize: '10px' }}
                      >
                        {this.props.weeklyStats &&
                        this.props.weeklyStats.newNetRevenue
                          ? new Intl.NumberFormat('de-ZA', {
                              style: 'currency',
                              currency: 'ZAR',
                            }).format(this.props.weeklyStats.newNetRevenue)
                          : 0}
                      </span>

                      <span className="text-nowrap" style={{ fontSize: '8px' }}>
                        {'  '} Since 7 days
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row style={{ marginTop: '30px' }}>
              <Col lg="6" xl="3">
                <Card
                  className="card-stats mb-4 mb-xl-0  bg-dark"
                  color="default"
                >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Users
                        </CardTitle>
                        <span
                          className="h2 font-weight-bold mb-0"
                          style={{ color: 'white' }}
                        >
                          {this.props.stats &&
                            this.props.stats.activeUsers &&
                            this.props.stats.activeUsers}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="ni ni-single-02"></i>
                        </div>
                      </Col>
                    </Row>
                    <p
                      className="mt-3 mb-0 text-muted text-sm"
                      style={{ fontSize: '12px' }}
                    >
                      <span
                        className="text-secondary mr-2"
                        style={{ fontSize: '12px' }}
                      >
                        {this.props.dailyStats && this.props.dailyStats.newUsers
                          ? this.props.dailyStats.newUsers.length
                          : 0}{' '}
                        users
                      </span>

                      <span
                        className="text-nowrap"
                        style={{ fontSize: '11px' }}
                      >
                        Since 24hrs
                      </span>
                    </p>
                    <p
                      className="mt-0 mb-0 text-muted text-sm"
                      style={{ fontSize: '12px' }}
                    >
                      <span className="text-secondary mr-0">
                        {this.props.weeklyStats &&
                          this.props.weeklyStats.newUser &&
                          this.props.weeklyStats.newUsers.length}
                        {'  '} users
                      </span>

                      <span
                        className="text-nowrap"
                        style={{ fontSize: '11px' }}
                      >
                        {'  '} Since 7 days
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card
                  className="card-stats mb-4 mb-xl-0  bg-dark"
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
                          {' '}
                          {this.props.stats &&
                            this.props.stats.totalProducts &&
                            this.props.stats.totalProducts}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          {' '}
                          <i className="ni ni-collection"></i>
                        </div>
                      </Col>
                    </Row>
                    <p
                      className="mt-3 mb-0 text-muted text-sm"
                      style={{ fontSize: '12px' }}
                    >
                      <span
                        className="text-info mr-2"
                        style={{ fontSize: '12px' }}
                      >
                        {this.props.dailyStats &&
                        this.props.dailyStats.newProducts
                          ? this.props.dailyStats.newProducts.length
                          : 0}
                        {'  '} products
                      </span>{' '}
                      <span
                        className="text-nowrap"
                        style={{ fontSize: '11px' }}
                      >
                        Since 24hrs
                      </span>
                    </p>
                    <p className="mt-0 mb-0 text-muted text-sm">
                      <span
                        className="text-secondary mr-0"
                        style={{ fontSize: '12px' }}
                      >
                        {this.props.weeklyStats &&
                          this.props.weeklyStats.newProducts &&
                          this.props.weeklyStats.newProducts.length}
                        {'  '} products
                      </span>

                      <span
                        className="text-nowrap"
                        style={{ fontSize: '11px' }}
                      >
                        {'  '} Since 7 days
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card
                  className="card-stats mb-4 mb-xl-0  bg-dark"
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
                          className="h5 font-weight-bold mb-0"
                          style={{ color: 'white' }}
                        >
                          {' '}
                          {this.props.stats &&
                            this.props.stats.totalPlugs &&
                            this.props.stats.totalPlugs}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                          <i className="ni ni-shop"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span
                        className="text-success mr-2"
                        style={{ fontSize: '12px' }}
                      >
                        {this.props.dailyStats && this.props.dailyStats.newPlugs
                          ? this.props.dailyStats.newPlugs.length
                          : 0}
                        {'  '}
                        shops
                      </span>{' '}
                      <span
                        className="text-nowrap"
                        style={{ fontSize: '11px' }}
                      >
                        Since 24hrs
                      </span>
                    </p>
                    <p className="mt-0 mb-0 text-muted text-sm">
                      <span
                        className="text-secondary mr-0"
                        style={{ fontSize: '12px' }}
                      >
                        {this.props.weeklyStats &&
                          this.props.weeklyStats.newPlugs &&
                          this.props.weeklyStats.newPlugs.length}
                        {'  '} shops
                      </span>

                      <span
                        className="text-nowrap"
                        style={{ fontSize: '11px' }}
                      >
                        {'  '} Since 7 days
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="3">
                <Card
                  className="card-stats mb-4 mb-xl-0 bg-dark"
                  color="default"
                >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase  text-muted mb-0"
                        >
                          Refunds
                        </CardTitle>
                        <span
                          className="h5 font-weight-bold mb-0"
                          color="white"
                          style={{ color: 'white' }}
                        >
                          R{' '}
                          {this.props.amountDue &&
                            this.props.amountDue.amountDue}
                          {/* {this.props.amountDue
                            ? new Intl.NumberFormat('de-ZA', {
                                style: 'currency',
                                currency: 'ZAR',
                              }).format(this.props.amountDue.amountDue)
                            : 0} */}
                        </span>
                      </div>
                      <Col className="col-auto">
                        {' '}
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          {' '}
                          <i className="ni ni-credit-card"></i>
                        </div>
                      </Col>{' '}
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span
                        className="text-success mr-2"
                        style={{ fontSize: '10px' }}
                      >
                        {this.props.dailyStats &&
                        this.props.dailyStats.newRefunds
                          ? this.props.dailyStats.newRefunds.length
                          : 0}
                        {'  '} refunds
                      </span>

                      <span
                        className="text-nowrap"
                        style={{ fontSize: '10px' }}
                      >
                        {'  '} Since 24hrs
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
                        {'  '} refunds
                      </span>

                      <span
                        className="text-nowrap"
                        style={{ fontSize: '10px' }}
                      >
                        {'  '} Since 7 days
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
Header.defaultProps = {
  catergories: [],
  myPlug: [],
  plugStats: [],
  dailyStats: {},
  productStats: [],
  weekly: [],
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  dailyStats: state.plugDailyStats,
  isAuthenticated: state.auth,
  cartItems: state.cart.cartItems,
  myPlug: state.myPlug.plug,
  plugStats: state.plugSales.orders,
  productStats: state.productStats,
  stats: state.stats.stats,
  weeklyStats: state.weeklyStats.stats,
  amountDue: state.unBalancedSales.stats,
});

export default connect(mapStateToProps, {
  logout,
  loadMyPlug,
  getPlugStats,
  getCatergories,
  getDueAmount,
  getPlugDailyStats,
  getProductStats,
})(Header);
