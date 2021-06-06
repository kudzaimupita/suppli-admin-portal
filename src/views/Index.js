import React from 'react';

import { Pie, Polar } from 'react-chartjs-2';
import { Line, Bar } from 'react-chartjs-2';
import classnames from 'classnames';
import Chart from 'chart.js';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, List, Card } from 'antd';

import {
  Button,
  CardHeader,
  ListGroup,
  ListGroupItem,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Table,
  Container,
  Row,
  Badge,
  Col,
} from 'reactstrap';

import { loadMyPlug } from '../actions/auth';
import {
  getPlugStats,
  getDueAmount,
  getPlugDailyStats,
  getPlugWeeklyStats,
} from '../actions/plugs';
import { getAggregatedStats } from '../actions/orders';

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from '../variables/charts';

import Header from '../components/Headers/Header';

class Index extends React.Component {
  componentDidMount() {
    this.props.getPlugWeeklyStats();
    this.props.getAggregatedStats();
  }
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: 'data1',
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === 'data1' ? 'data2' : 'data1',
    });
  };
  city = {
    title: {
      display: true,
      text: 'Sales by city',
    },
    legend: {
      display: true,
    },
    indexLabelPlacement: 'outside',
  };
  country = {
    title: {
      display: true,
      text: 'Sales by country',
    },
    legend: {
      display: true,
    },
    indexLabelPlacement: 'outside',
  };
  catergory = {
    title: {
      display: true,
      text: 'Sales by catergory',
    },
  };
  data = {
    labels:
      this.props.aggregatedStats.orders &&
      this.props.aggregatedStats.orders.map((city) => JSON.stringify(city._id)),
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data:
          (this.props.aggregatedStats.orders &&
            this.props.aggregatedStats.orders.map((city) =>
              JSON.stringify(city.total)
            )) ||
          [],
      },
    ],
  };

  colors = {
    gray: {
      100: '#f6f9fc',
      200: '#e9ecef',
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#8898aa',
      700: '#525f7f',
      800: '#32325d',
      900: '#212529',
    },
    theme: {
      default: '#172b4d',
      primary: '#5e72e4',
      secondary: '#f4f5f7',
      info: '#11cdef',
      success: '#2dce89',
      danger: '#f5365c',
      warning: '#fb6340',
    },
    black: '#12263F',
    white: '#FFFFFF',
    transparent: 'transparent',
  };

  chartExample1 = {
    options: {
      scales: {
        yAxes: [
          {
            gridLines: {
              color: this.colors.gray[900],
              zeroLineColor: this.colors.gray[900],
            },
            ticks: {
              callback: function (value) {
                if (!(value % 10)) {
                  return '' + value + '';
                }
              },
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: function (item, data) {
            var label = data.datasets[item.datasetIndex].label || '';
            var yLabel = item.yLabel;
            var content = '';

            if (data.datasets.length > 1) {
              content += label;
            }

            content += 'R' + yLabel + '';
            return content;
          },
        },
      },
    },
    data1: (canvas) => {
      return {
        labels: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        datasets: [
          {
            label: 'Performance',
            data: [
              this.props.plugWeeklyStats.groupedByRevenueSales &&
                this.props.plugWeeklyStats.groupedByRevenueSales
                  .filter((sale) => sale.day === 0)
                  .map((sale) => sale.price)
                  .toString(),
              this.props.plugWeeklyStats.groupedByRevenueSales &&
                this.props.plugWeeklyStats.groupedByRevenueSales
                  .filter((sale) => sale.day === 1)
                  .map((sale) => sale.price)
                  .toString(),
              this.props.plugWeeklyStats.groupedByRevenueSales &&
                this.props.plugWeeklyStats.groupedByRevenueSales
                  .filter((sale) => sale.day === 2)
                  .map((sale) => sale.price)
                  .toString(),
              this.props.plugWeeklyStats.groupedByRevenueSales &&
                this.props.plugWeeklyStats.groupedByRevenueSales
                  .filter((sale) => sale.day === 3)
                  .map((sale) => sale.price)
                  .toString(),
              this.props.plugWeeklyStats.groupedByRevenueSales &&
                this.props.plugWeeklyStats.groupedByRevenueSales
                  .filter((sale) => sale.day === 4)
                  .map((sale) => sale.price)
                  .toString(),
              this.props.plugWeeklyStats.groupedByRevenueSales &&
                this.props.plugWeeklyStats.groupedByRevenueSales
                  .filter((sale) => sale.day === 5)
                  .map((sale) => sale.price)
                  .toString(),
              this.props.plugWeeklyStats.groupedByRevenueSales &&
                this.props.plugWeeklyStats.groupedByRevenueSales
                  .filter((sale) => sale.day === 6)
                  .map((sale) => sale.price)
                  .toString(),
            ],
          },
        ],
      };
    },
    data4: (canvas) => {
      return {
        labels:
          this.props.aggregatedStats.ordersByCountry &&
          this.props.aggregatedStats.ordersByCountry.map((country) =>
            JSON.stringify(country._id)
          ),

        datasets: [
          {
            label: 'Performance',
            backgroundColor: [
              '#3e95cd',
              '#8e5ea2',
              '#3cba9f',
              '#e8c3b9',
              '#c45850',
              '#3e95cd',
              '#8e5ea2',
              '#fb6340',
              '#11cdef',
              '#2dce89',
              '#f5365c',
            ],
            data:
              (this.props.aggregatedStats.ordersByCountry &&
                this.props.aggregatedStats.ordersByCountry.map((country) =>
                  JSON.stringify(country.total)
                )) ||
              [],
          },
        ],
      };
    },
    data5: (canvas) => {
      return {
        labels:
          this.props.aggregatedStats.ordersByStatus &&
          this.props.aggregatedStats.ordersByStatus.map((status) =>
            JSON.stringify(status._id)
          ),

        datasets: [
          {
            label: 'Performance',
            backgroundColor: ['#fb6340', '#11cdef', '#2dce89', '#f5365c', ,],
            data:
              (this.props.aggregatedStats.ordersByStatus &&
                this.props.aggregatedStats.ordersByStatus.map((status) =>
                  JSON.stringify(status.total)
                )) ||
              [],
          },
        ],
      };
    },
    data3: (canvas) => {
      return {
        labels:
          this.props.aggregatedStats.orders &&
          this.props.aggregatedStats.orders
            .slice(0.5)
            .map((city) => JSON.stringify(city._id)),

        datasets: [
          {
            label: 'orders',
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#c45850',
              '#3e95cd',
              '#8e5ea2',
              '#3cba9f',
              '#fb6340',
              '#11cdef',
              '#2dce89',
              '#f5365c',
            ],
            data:
              (this.props.aggregatedStats.orders &&
                this.props.aggregatedStats.orders
                  .slice(0.5)
                  .map((city) => JSON.stringify(city.total))) ||
              [],
          },
        ],
      };
    },
    data2: (canvas) => {
      return {
        labels: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        datasets: [
          {
            label: 'Sales',
            data: [
              this.props.plugWeeklyStats.roupedByQuantitySales &&
                this.props.plugWeeklyStats.groupedByQuantitySales
                  .filter((sale) => sale.day === 0)
                  .map((sale) => sale.quantity)
                  .toString(),
              this.props.plugWeeklyStats.groupedByQuantitySales &&
                this.props.plugWeeklyStats.groupedByQuantitySales
                  .filter((sale) => sale.day === 1)
                  .map((sale) => sale.quantity)
                  .toString(),
              this.props.plugWeeklyStats.groupedByQuantitySales &&
                this.props.plugWeeklyStats.groupedByQuantitySales
                  .filter((sale) => sale.day === 2)
                  .map((sale) => sale.quantity)
                  .toString(),
              this.props.plugWeeklyStats.groupedByQuantitySales &&
                this.props.plugWeeklyStats.groupedByQuantitySales
                  .filter((sale) => sale.day === 3)
                  .map((sale) => sale.quantity)
                  .toString(),
              this.props.plugWeeklyStats.groupedByQuantitySales &&
                this.props.plugWeeklyStats.groupedByQuantitySales
                  .filter((sale) => sale.day === 4)
                  .map((sale) => sale.quantity)
                  .toString(),
              this.props.plugWeeklyStats.groupedByQuantitySales &&
                this.props.plugWeeklyStats.groupedByQuantitySales
                  .filter((sale) => sale.day === 5)
                  .map((sale) => sale.quantity)
                  .toString(),
              this.props.plugWeeklyStats.groupedByQuantitySales &&
                this.props.plugWeeklyStats.groupedByQuantitySales
                  .filter((sale) => sale.day === 6)
                  .map((sale) => sale.quantity)
                  .toString(),
            ],
            maxBarThickness: 15,
          },
        ],
      };
    },
  };
  render() {
    console.log(new Date().getDay());
    return (
      <>
        <Header />

        {/* <AdminStats/> */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-dark shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Weekly revenue</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames('py-2 px-3', {
                              active: this.state.activeNav === 1,
                            })}
                            href="/"
                            onClick={(e) => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames('py-2 px-3', {
                              active: this.state.activeNav === 2,
                            })}
                            data-toggle="tab"
                            href="/"
                            onClick={(e) => this.toggleNavs(e, 2)}
                            disabled
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Line
                      data={this.chartExample1.data1}
                      options={chartExample1.options}
                      getDatasetAtEvent={(e) => console.log(e)}
                      className="chart-canvas"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow bg-dark">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance by quantity
                      </h6>
                      <h2 className="mb-0" style={{ color: 'white' }}>
                        Weekly sales
                      </h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Bar
                      data={this.chartExample1.data2}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>{' '}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Row>
                <Col md="6" xl="6">
                  {' '}
                  <ListGroup>
                    <ListGroupItem className="d-flex bg-secondary justify-content-between align-items-center">
                      <h4 className="text-muted text-uppercase">
                        <i className="ni ni-bag-17"></i>
                        {'  '}Top products
                      </h4>
                    </ListGroupItem>
                    {this.props.productsBySales.productsBySales &&
                      this.props.productsBySales.productsBySales
                        .slice(0, 5)
                        .map((status) => (
                          <ListGroupItem className="d-flex justify-content-between align-items-center">
                            <small>{status._id}</small>
                            <Badge color="primary" pill>
                              {status.total}
                            </Badge>
                          </ListGroupItem>
                        ))}
                  </ListGroup>
                </Col>
                <Col md="6" xl="6">
                  {' '}
                  <ListGroup>
                    <ListGroupItem className="d-flex bg-secondary justify-content-between align-items-center">
                      <h4 className="text-muted text-uppercase">
                        <i className="ni ni-archive-2"></i>
                        {'  '}Top brands
                      </h4>
                    </ListGroupItem>
                    {this.props.productsBySales.salesByBrand &&
                      this.props.productsBySales.salesByBrand
                        .slice(0, 5)
                        .map((status) => (
                          <ListGroupItem className="d-flex justify-content-between align-items-center">
                            <small>{status._id}</small>
                            <Badge color="danger" pill>
                              {status.total} sales
                            </Badge>
                          </ListGroupItem>
                        ))}
                  </ListGroup>
                </Col>
              </Row>

              <Row style={{ marginTop: '20px' }}>
                <Col md="6" xl="6">
                  {' '}
                  <ListGroup>
                    <ListGroupItem className="d-flex bg-secondary justify-content-between align-items-center">
                      <h4 className="text-muted text-uppercase">
                        <i className="ni ni-circle-08"></i>
                        {'  '}Top customers
                      </h4>
                    </ListGroupItem>
                    {this.props.productsBySales.customers &&
                      this.props.productsBySales.customers
                        .slice(0, 5)
                        .map((status) => (
                          <ListGroupItem className="d-flex justify-content-between align-items-center">
                            <small> {status.customer[0].name} </small>{' '}
                            <small> {status.customer[0].email}</small>
                            <Badge color="info" pill>
                              {status.total}
                            </Badge>
                          </ListGroupItem>
                        ))}
                  </ListGroup>
                </Col>
                <Col md="6" xl="6">
                  {' '}
                  <ListGroup>
                    <ListGroupItem className="d-flex bg-secondary justify-content-between align-items-center">
                      <h4 className="text-muted text-uppercase">
                        <i className="ni ni-shop"></i>
                        {'  '}Top stores
                      </h4>
                    </ListGroupItem>
                    {this.props.productsBySales.salesByPlug &&
                      this.props.productsBySales.salesByPlug
                        .slice(0, 5)
                        .map((status) => (
                          <ListGroupItem className="d-flex justify-content-between align-items-center">
                            <small>{status._id} </small>
                            <Badge color="success" pill>
                              {status.total} sales
                            </Badge>
                          </ListGroupItem>
                        ))}
                  </ListGroup>
                </Col>
              </Row>

              <Card className="shadow" style={{ marginTop: '20px' }}>
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Weekly stats</h3>
                    </div>
                    <div className="col text-right">
                      <Link to="/admin/orders">
                        {' '}
                        <Button color="primary" href="/" size="sm">
                          See order summary
                        </Button>
                      </Link>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Day</th>
                      <th scope="col">Daily sales</th>
                      <th scope="col">Daily gross revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Sunday</th>
                      <td>
                        {this.props.plugWeeklyStats.groupedByQuantitySales &&
                          this.props.plugWeeklyStats.groupedByQuantitySales
                            .filter((sale) => sale.day === 0)
                            .map((sale) => sale.quantity)
                            .toString()}
                      </td>

                      <td>
                        {this.props.plugWeeklyStats.groupedByRevenueSales &&
                          this.props.plugWeeklyStats.groupedByRevenueSales
                            .filter((sale) => sale.day === 0)
                            .map((sale) =>
                              new Intl.NumberFormat('de-ZA', {
                                style: 'currency',
                                currency: 'ZAR',
                              }).format(sale.price)
                            )
                            .toString()}
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">Monday</th>
                      <td>
                        {this.props.plugWeeklyStats.groupedByQuantitySales &&
                          this.props.plugWeeklyStats.groupedByQuantitySales
                            .filter((sale) => sale.day === 1)
                            .map((sale) => sale.quantity)
                            .toString()}
                      </td>

                      <td>
                        {this.props.plugWeeklyStats.groupedByRevenueSales &&
                          this.props.plugWeeklyStats.groupedByRevenueSales
                            .filter((sale) => sale.day === 1)
                            .map((sale) =>
                              new Intl.NumberFormat('de-ZA', {
                                style: 'currency',
                                currency: 'ZAR',
                              }).format(sale.price)
                            )
                            .toString()}
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">Tuesday</th>
                      <td>
                        {' '}
                        {this.props.plugWeeklyStats.groupedByQuantitySales &&
                          this.props.plugWeeklyStats.groupedByQuantitySales
                            .filter((sale) => sale.day === 2)
                            .map((sale) => sale.quantity)
                            .toString()}
                      </td>

                      <td>
                        {this.props.plugWeeklyStats.groupedByRevenueSales &&
                          this.props.plugWeeklyStats.groupedByRevenueSales
                            .filter((sale) => sale.day === 2)
                            .map((sale) =>
                              new Intl.NumberFormat('de-ZA', {
                                style: 'currency',
                                currency: 'ZAR',
                              }).format(sale.price)
                            )
                            .toString()}
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">Wednesday</th>
                      <td>
                        {this.props.plugWeeklyStats.groupedByQuantitySales &&
                          this.props.plugWeeklyStats.groupedByQuantitySales
                            .filter((sale) => sale.day === 3)
                            .map((sale) => sale.quantity)
                            .toString()}
                      </td>

                      <td>
                        {this.props.plugWeeklyStats.groupedByRevenueSales &&
                          this.props.plugWeeklyStats.groupedByRevenueSales
                            .filter((sale) => sale.day === 3)
                            .map((sale) =>
                              new Intl.NumberFormat('de-ZA', {
                                style: 'currency',
                                currency: 'ZAR',
                              }).format(sale.price)
                            )
                            .toString()}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Thursday</th>
                      <td>
                        {' '}
                        {this.props.plugWeeklyStats.groupedByQuantitySales &&
                          this.props.plugWeeklyStats.groupedByQuantitySales
                            .filter((sale) => sale.day === 4)
                            .map((sale) => sale.quantity)
                            .toString()}
                      </td>

                      <td>
                        {this.props.plugWeeklyStats.groupedByRevenueSales &&
                          this.props.plugWeeklyStats.groupedByRevenueSales
                            .filter((sale) => sale.day === 4)
                            .map((sale) =>
                              new Intl.NumberFormat('de-ZA', {
                                style: 'currency',
                                currency: 'ZAR',
                              }).format(sale.price)
                            )
                            .toString()}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Friday</th>
                      <td>
                        {' '}
                        {this.props.plugWeeklyStats.groupedByQuantitySales &&
                          this.props.plugWeeklyStats.groupedByQuantitySales
                            .filter((sale) => sale.day === 5)
                            .map((sale) => sale.quantity)
                            .toString()}
                      </td>

                      <td>
                        {this.props.plugWeeklyStats.groupedByRevenueSales &&
                          this.props.plugWeeklyStats.groupedByRevenueSales
                            .filter((sale) => sale.day === 5)
                            .map((sale) =>
                              new Intl.NumberFormat('de-ZA', {
                                style: 'currency',
                                currency: 'ZAR',
                              }).format(sale.price)
                            )
                            .toString()}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Saturday</th>
                      <td>
                        {this.props.plugWeeklyStats.groupedByQuantitySales &&
                          this.props.plugWeeklyStats.groupedByQuantitySales
                            .filter((sale) => sale.day === 6)
                            .map((sale) => sale.quantity)
                            .toString()}
                      </td>

                      <td>
                        {this.props.plugWeeklyStats.groupedByRevenueSales &&
                          this.props.plugWeeklyStats.groupedByRevenueSales
                            .filter((sale) => sale.day === 6)
                            .map((sale) =>
                              new Intl.NumberFormat('de-ZA', {
                                style: 'currency',
                                currency: 'ZAR',
                              }).format(sale.price)
                            )
                            .toString()}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>

            <Col xl="4">
              <Card className="card-stats mb-4 mb-xl-0">
                {/* <Map /> */}
                {this.chartExample1.data3.data && (
                  <div className="chart">
                    <Pie
                      options={this.city}
                      data={this.chartExample1.data3}
                      // options={chartExample2.options}
                      className="chart-canvas"
                      id="chart-pie"
                    />
                  </div>
                )}{' '}
                {this.chartExample1.data4.data && (
                  <>
                    {' '}
                    <hr />
                    <div className="chart">
                      {' '}
                      <Polar
                        options={this.country}
                        data={this.chartExample1.data4}
                        // options={chartExample2.options}
                        className="chart-canvas"
                        id="chart-pie"
                      />
                    </div>
                  </>
                )}
                <br />
              </Card>
              {/* <Card>
                {' '}
                <CardHeader className="d-flex bg-secondary">
                  {' '}
                  <h4 className="text-muted text-uppercase">
                    <i className="ni ni-single-02"></i>
                    {'  '}system Admins(
                    {this.props.admins.admins &&
                      this.props.admins.admins.length}
                    )
                  </h4>
                </CardHeader>{' '}
                <ListGroup className="list my--3" flush>
                  {this.props.admins.admins &&
                    this.props.admins.admins.map((admin) => (
                      <ListGroupItem className="px-0">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <a
                              className="avatar rounded-circle"
                              href="/"
                              onClick={(e) => e.preventDefault()}
                            >
                              <Avatar
                                shape="square"
                                size={32}
                                src={`http://localhost:5000/img/users/${admin.photo}`}
                              />
                            </a>
                          </Col>
                          <div className="col ml--2">
                            <h4 className="mb-0">
                              <small> {admin.name}</small>
                            </h4>
                            <Badge color="" className="badge-dot m2-4 ">
                              {' '}
                              <i className="bg-success" />
                              <small> </small>
                            </Badge>
                            <small>
                              {' '}
                              <small>Active</small>
                            </small>
                            <br></br>
                            <small>
                              {' '}
                              <i className="ni ni-email-83"></i>{' '}
                              <small>{admin.email}</small>
                            </small>
                          </div>
                        
                        </Row>
                      </ListGroupItem>
                    ))}
                </ListGroup>{' '}
              </Card> */}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

Index.defaultProps = {
  auth: [],
  plugWeeklyStats: [],
  isAuthenticated: [],
  cartItems: [],
  myPlug: [],
  plugStats: {},
  stats: [],
  aggregatedStats: [],
  productsBySales: [],
  salesByBrand: [],
  admins: [],
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  orders: state.allOrders.orders,
  isAuthenticated: state.auth,
  cartItems: state.cart.cartItems,
  myPlug: state.myPlug.plug,
  plugStats: state.plugStats,
  plugWeeklyStats: state.plugStats.plugWeeklyStats,
  stats: state.stats.stats,
  aggregatedStats: state.aggregatedStats.stats,
  productsBySales: state.aggregatedStats.stats,
  salesByBrand: state.aggregatedStats.stats,
  admins: state.aggregatedStats.stats,
});

export default connect(mapStateToProps, {
  loadMyPlug,
  getPlugStats,
  getPlugWeeklyStats,
  getDueAmount,
  getPlugDailyStats,
  getAggregatedStats,
})(Index);
