import React from 'react';
import { Link } from 'react-router-dom';

import {
  createPlug,
  getPlug,
  followPlug,
  unfollowPlug,
  approvePlug,
} from '../actions/plugs';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';

import RatingStars from '../components/RatingStars';
import {
  Avatar,
  Image,
  Result,
  Card,
  Button,
  Descriptions,
  Spin,
  Tabs,
  Table,
  Tag,
  Tooltip,
  Popover,
  Collapse,
  InputNumber,
} from 'antd';
// reactstrap components
import {
  Badge,
  CardHeader,
  CardBody,
  Media,
  ListGroupItem,
  ListGroup,
  Row,
  Col,
  Spinner,
} from 'reactstrap';
const { TabPane } = Tabs;
const { Panel } = Collapse;
class Cards extends React.Component {
  state = {
    approvePlug: true,
    disapprovePlug: false,

    visible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      openedCollapses: ['collapseOne'],
    };
  }
  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };
  // with this function we create an array with the opened collapses
  // it is like a toggle function for all collapses from this page
  collapsesToggle = (collapse) => {
    let openedCollapses = this.state.openedCollapses;
    if (openedCollapses.includes(collapse)) {
      this.setState({
        openedCollapses: [],
      });
    } else {
      this.setState({
        openedCollapses: [collapse],
      });
    }
  };

  onApproveSubmit = async (id) => {
    this.props.approvePlug(id, { approved: true });
  };

  onDisapproveSubmit = async (id) => {
    this.props.approvePlug(id, { approved: false });
  };

  render() {
    const columns = [
      {
        title: '',
        key: 'imageCover',
        dataIndex: 'imageCover',
        render: (imageCover) => (
          <>
            <Avatar
              shape="square"
              size={16}
              src={`https://suppli-images.s3.af-south-1.amazonaws.com/${imageCover}`}
            />
          </>
        ),
      },
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        render: (name) => (
          <>
            <Tag
            // className="card-lift--hover"
            // color="processing"
            // icon={<i class="ni ni-single-02"></i>}
            >
              <a> {name.slice(0, 15)}...</a>
            </Tag>
          </>
        ),
      },
      {
        title: 'Price',
        dataIndex: 'price',
      },
      {
        title: 'View',
        key: '_id',
        dataIndex: '_id',
        render: (_id) => (
          <>
            <Link to={`/admin/product/${_id}`}>
              {' '}
              <Button
                onClick={(e) => e.preventDefault()}
                color="cyan"
                icon={<i class="fa fa-eye"></i>}
              >
                View
              </Button>
            </Link>
          </>
        ),
      },
    ];
    const data = this.props.plug.doc && this.props.plug.doc.products;
    const followerColumns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        render: (name) => (
          <>
            <Tag
            // className="card-lift--hover"
            // color="processing"
            // icon={<i class="ni ni-single-02"></i>}
            >
              <a> {name.slice(0, 15)}...</a>
            </Tag>
          </>
        ),
      },
      {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        render: (email) => (
          <>
            <Tag
            // classemail="card-lift--hover"
            // color="processing"
            // icon={<i class="ni ni-single-02"></i>}
            >
              <a> {email.slice(0, 15)}...</a>
            </Tag>
          </>
        ),
      },
      {
        title: 'Role',
        key: '_id',
        dataIndex: 'role',
        render: (role) => (
          <>
            <Tag color="volcano" icon={<i class="ni ni-single-02"></i>}>
              <a> {role}</a>
            </Tag>
          </>
        ),
      },
    ];

    const followerData = this.props.plug.doc && this.props.plug.doc.followers;

    const salesColumns = [
      {
        title: '#',
        dataIndex: 'orderID',
      },

      {
        title: 'Product',
        key: 'boughtProducts',
        dataIndex: 'boughtProducts',
        render: (product) => (
          <>
            <Tag
            // className="card-lift--hover"
            // color="processing"
            // icon={<i class="ni ni-single-02"></i>}
            >
              <a> {product.name.slice(0, 15)}...</a>
            </Tag>
          </>
        ),
      },
      {
        title: 'Product',
        key: 'boughtProducts',
        dataIndex: 'boughtProducts',
        render: (product) => (
          <>
            <small
              // className="card-lift--hover"
              color="volcano"
              // icon={<i class="ni ni-single-02"></i>}
            >
              <a>
                R {product.price}*{product.quantity}{' '}
              </a>
            </small>
          </>
        ),
      },
      {
        title: 'Date',
        key: 'createdOn',
        dataIndex: 'createdOn',
        render: (date) => (
          <>
            <small
              // className="card-lift--hover"
              color="volcano"
              // icon={<i class="ni ni-single-02"></i>}
            >
              <a>{date.slice(0, 10)} </a>
            </small>
          </>
        ),
      },
      {
        title: '',
        key: 'status',
        dataIndex: 'status',
        render: (status) => (
          <>
            {status === 'processing' ? (
              <>
                <i className="bg-danger" />
                <i className="ni ni-shop"></i>
                <small> {status}</small>
              </>
            ) : null}
            {status === 'fullfilled' ? (
              <>
                <i className="bg-success" /> <i className="ni ni-satisfied"></i>{' '}
                <small> {status}</small>
              </>
            ) : null}
            {status === 'enroute' ? (
              <>
                <i className="bg-warning" />
                <i className="ni ni-delivery-fast"></i>
                <small> {status}</small>
              </>
            ) : null}
            {status === 'cancelled' ? <i className="bg-danger" /> : null}
          </>
        ),
      },
    ];

    const salesData =
      this.props.plugStats.orders && this.props.plugStats.orders.plugSales;

    const paymentsColumns = [
      {
        title: '#',
        dataIndex: 'orderID',
      },

      {
        title: 'Product',
        key: 'boughtProducts',
        dataIndex: 'boughtProducts',
        render: (product) => (
          <Tag
            // className="card-lift--hover"
            color="processing"
            // icon={<i class="ni ni-single-02"></i>}
          >
            <a> {product.name.slice(0, 12)}...</a>
          </Tag>
        ),
      },
      {
        title: 'Date',
        key: 'createdOn',
        dataIndex: 'createdOn',
        render: (date) => (
          <>
            <small
              // className="card-lift--hover"
              color="volcano"
              // icon={<i class="ni ni-single-02"></i>}
            >
              <a>{date.slice(0, 10)} </a>
            </small>
          </>
        ),
      },
      {
        title: 'Due',
        key: 'boughtProducts',
        dataIndex: 'boughtProducts',
        render: (product) => (
          <>
            <small
              // className="card-lift--hover"
              color="volcano"
              // icon={<i class="ni ni-single-02"></i>}
            >
              <a>R {Math.round(product.price * product.quantity * 0.85)} </a>
            </small>
          </>
        ),
      },

      {
        title: 'Paid for?',
        key: 'plugsBalanced',
        dataIndex: 'plugsBalanced',
        render: (plugsBalanced) => (
          <>
            {plugsBalanced ? (
              <>
                <i class="fa fa-check-circle"></i>
                {'  '}
                <a> </a>{' '}
              </>
            ) : (
              'No'
            )}
          </>
        ),
      },
      {
        title: 'Paid On',
        key: 'plugsBalancedOn',
        dataIndex: 'plugsBalancedOn',
        render: (plugsBalancedOn) => (
          <>
            {plugsBalancedOn ? (
              <>
                {'  '}
                <a>
                  {' '}
                  <Tooltip
                    title={
                      <>
                        {plugsBalancedOn.slice(0, 10)} at{' '}
                        {plugsBalancedOn.slice(11, 16)}
                      </>
                    }
                  >
                    {' '}
                    <i className="ni ni-calendar-grid-58"></i>
                  </Tooltip>
                </a>{' '}
              </>
            ) : null}
          </>
        ),
      },
    ];

    const paymentsData =
      this.props.plugStats.orders && this.props.plugStats.orders.plugSales;

    const reviewsColumns = [
      {
        title: 'Rating',
        dataIndex: 'rating',
      },

      {
        title: 'Review',
        key: 'review',
        dataIndex: 'review',
        render: (review) => (
          <Tooltip title={review}>
            {' '}
            <Tag
            // className="card-lift--hover"

            // icon={<i class="ni ni-single-02"></i>}
            >
              <a> {review}...</a>
            </Tag>
          </Tooltip>
        ),
      },
      // {
      //   title: 'Product',
      //   key: 'boughtProducts',
      //   dataIndex: 'boughtProducts',
      //   render: (product) => (
      //     <>
      //       <small
      //         // className="card-lift--hover"
      //         color="volcano"
      //         // icon={<i class="ni ni-single-02"></i>}
      //       >
      //         <a>
      //           R {product.price}*{product.quantity}{' '}
      //         </a>
      //       </small>
      //     </>
      //   ),
      // },
      {
        title: 'Date',
        key: 'createdOn',
        dataIndex: 'createdOn',
        render: (date) => (
          <>
            <small
              // className="card-lift--hover"
              color="volcano"
              // icon={<i class="ni ni-single-02"></i>}
            >
              <a>{date.slice(0, 10)} </a>
            </small>
          </>
        ),
      },
      // {
      //   title: '',
      //   key: 'status',
      //   dataIndex: 'status',
      //   render: (status) => (
      //     <>
      //       {status === 'processing' ? (
      //         <>
      //           <i className="bg-danger" />
      //           <i className="ni ni-shop"></i>
      //           <small> {status}</small>
      //         </>
      //       ) : null}
      //       {status === 'fullfilled' ? (
      //         <>
      //           <i className="bg-success" /> <i className="ni ni-satisfied"></i>{' '}
      //           <small> {status}</small>
      //         </>
      //       ) : null}
      //       {status === 'enroute' ? (
      //         <>
      //           <i className="bg-warning" />
      //           <i className="ni ni-delivery-fast"></i>
      //           <small> {status}</small>
      //         </>
      //       ) : null}
      //       {status === 'cancelled' ? <i className="bg-danger" /> : null}
      //     </>
      //   ),
      // },
    ];

    const reviewsData = this.props.plug.doc && this.props.plug.doc.reviews;

    return (
      <>
        {this.props.loading && this.props.loading && (
          <div className="example">
            <Spin size="large" />
          </div>
        )}
        {!this.props.plug.doc && (
          <Card>
            {' '}
            <Result
              status="404"
              title="Select shop to view details"
              // subTit /le="Select shop to view the details."
              // extra={<Button type="primary">Back Home</Button>}
            />
          </Card>
        )}
        {this.props.plug.doc && (
          <Card className="card-profile" style={{ marginBottom: '30px' }}>
            <CardHeader>
              <Row className="align-items-center">
                <div className="row" style={{ marginLeft: '20px' }}>
                  <Avatar
                    style={{ marginRight: '10px' }}
                    shape="square"
                    size={32}
                    src={`https://suppli-images.s3.af-south-1.amazonaws.com/${
                      this.props.plug.doc && this.props.plug.doc.logo
                    }`}
                  />{' '}
                  <br />
                  <h4>{this.props.plug.doc && this.props.plug.doc.name}</h4>
                </div>{' '}
                <div className="col text-right">
                  {/* {this.props.order[0] && !this.props.order[0].plugsBalanced ? this.props.order[0] && <Button  color='success' size='sm' onClick={()=> this.onPaidSubmit(this.props.order[0] && this.props.order[0]._id)}  >  <i class="fa fa-minus"></i><small>We paid</small></Button>: this.props.order[0] && <Button  color='danger' size='sm' onClick={()=> this.onNotPaidSubmit(this.props.order[0] && this.props.order[0]._id)}  >  <i class="fa fa-minus"></i><small>We didn't pay</small></Button>    } */}
                  {this.props.plug.doc && this.props.plug.doc.approved ? (
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() =>
                        this.onDisapproveSubmit(
                          this.props.plug.doc && this.props.plug.doc._id
                        )
                      }
                    >
                      Disapprove
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        this.onApproveSubmit(
                          this.props.plug.doc && this.props.plug.doc._id
                        )
                      }
                      size="sm"
                      color="default"
                    >
                      {this.props.updateLoading ? (
                        <Spinner
                          size="sm"
                          style={{ marginRight: 6 }}
                          color="black"
                        />
                      ) : null}{' '}
                      Approve
                    </Button>
                  )}
                </div>{' '}
              </Row>
            </CardHeader>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Info" key="1">
                <Descriptions
                  bordered
                  column="2"
                  size={'small'}
                  extra={
                    <>
                      {' '}
                      <Row></Row>
                    </>
                  }
                >
                  <Descriptions.Item span={3} label="Email">
                    <>
                      {this.props.plug.doc && this.props.plug.doc.companyEmail}
                    </>
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Phone">
                    <> {this.props.plug.doc && this.props.plug.doc.phone}</>
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Rating">
                    <>
                      {' '}
                      {this.props.plug.doc &&
                        this.props.plug.doc.ratingsAverage}
                    </>
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Sales">
                    <>
                      {' '}
                      {this.props.plugStats.orders &&
                        this.props.plugStats.orders.plugSales &&
                        this.props.plugStats.orders.plugSales.length}
                    </>
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Sales quantity">
                    <>
                      {' '}
                      {this.props.plugStats.orders &&
                        this.props.plugStats.orders.totalSales}
                    </>
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Net revenue">
                    <>
                      R{' '}
                      {this.props.plugStats.orders &&
                        this.props.plugStats.orders.totalRevenue}
                    </>
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Owing">
                    <>
                      R{' '}
                      {(this.props.plug.doc && this.props.plug.doc.owing) || 0}{' '}
                      {/* <InputNumber
                        size="small"
                        min={1}
                        max={100000}
                        defaultValue={3}
                        // onChange={onChange}
                      /> */}
                    </>
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Pending payment">
                    <>
                      {' '}
                      R{' '}
                      {this.props.plugStats.orders &&
                        this.props.plugStats.orders.amountDue}
                    </>
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Catergories">
                    <>
                      {' '}
                      {this.props.plug.doc &&
                        this.props.plug.doc.catergory.map((cat) => (
                          <>
                            {' '}
                            {cat.name}
                            <br />
                          </>
                        ))}
                    </>
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Address">
                    <>
                      {' '}
                      {this.props.plug.doc && this.props.plug.doc.address}
                      <br /> {this.props.plug.doc && this.props.plug.doc.city}
                      <br />{' '}
                      {this.props.plug.doc &&
                        this.props.plug.doc.postalAddress}{' '}
                      <br />{' '}
                      {this.props.plug.doc && this.props.plug.doc.country}
                    </>
                  </Descriptions.Item>
                </Descriptions>{' '}
                <Collapse>
                  <Panel header="About us" key="1">
                    <small>
                      {' '}
                      {this.props.plug.doc && this.props.plug.doc.aboutUs}
                    </small>
                  </Panel>
                </Collapse>
                <CardBody className="pt-0" style={{ marginTop: '20px' }}>
                  <Row>
                    <Col>
                      <small color="info">
                        <strong>
                          {' '}
                          <i className="ni ni-circle-08 text-black" /> Holder
                          name:{' '}
                        </strong>{' '}
                        {this.props.plug.doc &&
                          this.props.plug.doc.accountHolderName}
                      </small>

                      <br color="default" className="bg-default"></br>
                      <small color="info">
                        <strong>
                          <i className="ni ni-credit-card text-black" /> Account
                          no:
                        </strong>
                        <strong></strong>{' '}
                        {this.props.plug.doc &&
                          this.props.plug.doc.accountNumber}{' '}
                      </small>
                      <br color="default" className="bg-default"></br>

                      <small color="info">
                        {' '}
                        <strong>
                          <i className="ni ni-shop text-black" /> Bank name:{' '}
                        </strong>{' '}
                        {this.props.plug.doc && this.props.plug.doc.bankName}{' '}
                      </small>

                      <br color="default" className="bg-default"></br>
                      <small color="info">
                        {' '}
                        <strong>
                          {' '}
                          <i className="ni ni-money-coins text-black" /> Branch
                          code:{' '}
                        </strong>
                        {this.props.plug.doc &&
                          this.props.plug.doc.accountBranchCode}{' '}
                      </small>
                    </Col>

                    <Col>
                      <Card>
                        {' '}
                        <Media className="align-items-center">
                          <Avatar
                            style={{ marginRight: '8px' }}
                            shape="square"
                            size={64}
                            src={`https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`}
                          />
                          {/* <small color='info'><strong>{this.props.plug.doc && this.props.plug.doc.plugAdmin.name}</strong>   <small>R</small>
                                </small> */}
                          <Media>
                            <td className=" td-name">
                              {/* {"    "} {product.name}   */}
                              {'    '}
                              <small color="info">
                                {' '}
                                {this.props.plug.doc &&
                                  this.props.plug.doc.plugAdmin.name}{' '}
                              </small>
                              <br color="default" className="bg-default"></br>
                              <small color="info">
                                {this.props.plug.doc &&
                                  this.props.plug.doc.plugAdmin.email}{' '}
                                <strong></strong>{' '}
                              </small>
                              {this.props.plug.doc &&
                                this.props.plug.doc.plugAdmin.phone && (
                                  <br
                                    color="default"
                                    className="bg-default"
                                  ></br>
                                )}
                              <small color="info">
                                {' '}
                                {this.props.plug.doc &&
                                  this.props.plug.doc.plugAdmin.phone}{' '}
                              </small>
                              <br color="default" className="bg-default"></br>

                              <small color="info">
                                {this.props.plug.doc &&
                                this.props.plug.doc.plugAdmin.active ? (
                                  <Badge color="" className="badge-dot m2-4 ">
                                    {' '}
                                    <i className="bg-success" />
                                    <small> Active</small>
                                  </Badge>
                                ) : (
                                  <>
                                    {' '}
                                    <i class="fa fa-times">Inactive</i>
                                  </>
                                )}{' '}
                              </small>

                              <br color="default" className="bg-default"></br>
                            </td>
                          </Media>
                        </Media>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </TabPane>
              <TabPane
                tab={
                  <>
                    {' '}
                    Products{' '}
                    <Badge color="success">
                      {' '}
                      {(this.props.plug.doc && this.props.plug.doc.products)
                        .length || 0}
                    </Badge>
                  </>
                }
                key="2"
              >
                <Table
                  columns={columns}
                  dataSource={data}
                  total={10}
                  size="small"
                  defaultPageSize={10}
                  total={10}
                />
              </TabPane>
              <TabPane
                tab={
                  <>
                    {' '}
                    Sales{' '}
                    <Badge color="danger">
                      {' '}
                      {
                        (
                          (this.props.plugStats.orders &&
                            this.props.plugStats.orders.plugSales) ||
                          []
                        ).length
                      }
                    </Badge>
                  </>
                }
                key="3"
              >
                <Table
                  columns={salesColumns}
                  dataSource={salesData}
                  size="small"
                />
              </TabPane>{' '}
              <TabPane
                tab={
                  <>
                    {' '}
                    Followers{' '}
                    <Badge color="default">
                      {' '}
                      {(this.props.plug.doc && this.props.plug.doc.followers)
                        .length || 0}
                    </Badge>
                  </>
                }
                key="6"
              >
                <Table
                  columns={followerColumns}
                  dataSource={followerData}
                  size="small"
                />
              </TabPane>
              <TabPane
                tab={
                  <>
                    {' '}
                    Payments{' '}
                    <Badge color="warning">
                      {' '}
                      {
                        (
                          (this.props.plugStats.orders &&
                            this.props.plugStats.orders.plugSales) ||
                          []
                        ).length
                      }
                    </Badge>
                  </>
                }
                key="7"
              >
                <Table
                  columns={paymentsColumns}
                  dataSource={paymentsData}
                  size="small"
                />
              </TabPane>{' '}
              <TabPane
                tab={
                  <>
                    {' '}
                    Reviews{' '}
                    <Badge color="info">
                      {' '}
                      {
                        (
                          (this.props.plug.doc &&
                            this.props.plug.doc.reviews) ||
                          []
                        ).length
                      }
                    </Badge>
                  </>
                }
                key="4"
              >
                <Table
                  columns={reviewsColumns}
                  dataSource={reviewsData}
                  size="small"
                />
              </TabPane>{' '}
              <TabPane tab="Sample images" key="35">
                {this.props.plug.doc &&
                  this.props.plug.doc.sampleProductImages.map((image) => (
                    <Image
                      style={{ margin: '10px' }}
                      width={90}
                      src={`https://suppli-images.s3.af-south-1.amazonaws.com/${image}`}
                    />
                  ))}
              </TabPane>
            </Tabs>

            {/* {this.props.plug.doc && this.props.plug.doc.aboutUs} */}

            {/* <Images images={this.props.plug.doc && this.props.plug.doc.sampleProductImages}/> */}
          </Card>
        )}
      </>
    );
  }
}

Cards.defaultProps = {
  catergories: [],
  product: {},
  plug: {},
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  updateLoading: state.approvedPlug.loading,
  product: state.product.product,
  auth: state.auth.isAuthenticated,
  isAuthenticated: state.auth,
  plug: state.plug.plug,
  plugStats: state.plugSales,
  loading: state.plug.loading,
  createdPlugLoading: state.createdPlug.loading,
  catergories: state.catergories.catergories,
});

export default connect(mapStateToProps, {
  followPlug,

  unfollowPlug,
  setAlert,
  approvePlug,
  createPlug,
  getPlug,
})(Cards);
