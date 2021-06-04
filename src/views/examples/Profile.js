import React from 'react';

import {
  Card,
  CardBody,
  Badge,
  CardTitle,
  Container,
  Row,
  Col,
} from 'reactstrap';

import { connect } from 'react-redux';

import PlugOrders from '../../components/Orders';
import GeneralHeader from '../../components/Headers/GeneralHeader';
import PlugProfileCard from '../../components/PlugProfileCard';
import {
  getAllOrders,
  getStats,
  getAggregatedStats,
  getDailyStats,
  getWeeklyStats,
} from '../../actions/orders';
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
        <GeneralHeader />
        <Container className="mt--7 bg-secondary" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              {' '}
              <PlugOrders />
            </Col>{' '}
          </Row>
        </Container>
      </>
    );
  }
}

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
