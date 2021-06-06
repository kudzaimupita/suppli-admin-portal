import React from 'react';
import ReactToPrint from 'react-to-print';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Select from 'react-select';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import {
  Badge,
  Container,
  ButtonGroup,
  Table,
  Media,
  Col,
  UncontrolledTooltip,
  Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Avatar, Button, Card, Drawer, Descriptions } from 'antd';
import { logout } from '../actions/auth';
import { getProduct, deleteProduct, updateProduct } from '../actions/products';
import { loadMyPlug } from '../actions/auth';
import { getOrder, updateOrder } from '../actions/orders';
import { getPlugStats, getDueAmount } from '../actions/plugs';
import { setAlert } from '../actions/alert';

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div
      className="dataTables_length"
      id="datatable-basic_length"
      style={{ marginLeft: '20px' }}
    >
      <label>
        Show{' '}
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={(e) => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }
      </label>
    </div>
  ),
});

const { SearchBar } = Search;

class OrderTable extends React.Component {
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  state = {
    singleSelect: this.props.order[0] && {
      value: this.props.order[0].status,
      label: this.props.order[0].status,
    },
    size: 'small',
    visible: false,
    productId: '',
    was: '',
    price: '',
    originalPrice: '',
    emptyWas: '',
    onClearance: true,
    noClearance: false,
    alert: null,
    plugsBalanced: true,
    plugsNotBalanced: false,
    orderId: '',
  };

  handleWasChange = (e) => {
    this.setState({ was: e.target.value });
  };

  handleWasChange = (e) => {
    this.setState({ was: e.target.value });
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  dateFormatter = (cell, row) => (
    <>
      <small> {row.createdOn.slice(0, 10)}</small>
    </>
  );
  amountFormatter = (cell, row) => (
    <>
      <small>
        {' '}
        R {row.totalPrice && row.totalPrice - row.totalPrice * 0.15}
      </small>
    </>
  );

  profitFormatter = (cell, row) => (
    <>
      <small>
        {' '}
        R {Math.round(row.totalPrice && row.totalPrice - row.totalPrice * 0.85)}
      </small>
    </>
  );

  fullfilledDateFormatter = (cell, row) => (
    <>
      <small> {row.fullfilledOn && row.fullfilledOn.slice(0, 10)}</small>
    </>
  );

  paidDateFormatter = (cell, row) => (
    <>
      <small> {row.plugsBalancedOn && row.plugsBalancedOn.slice(0, 10)}</small>
    </>
  );

  wePaidFormatter = (cell, row) => (
    <>
      {' '}
      {row.plugsBalanced ? (
        <i class="fa fa-check-circle"></i>
      ) : (
        <i class="fa fa-times"></i>
      )}
    </>
  );
  activeFormatter = (cell, row) => (
    <Badge color="" className="badge-dot m2-4 ">
      {row && row.status === 'processing' ? (
        <>
          <i className="bg-danger" />
          <i className="ni ni-shop"></i>
          <small> {row.status}</small>
        </>
      ) : null}
      {row.status === 'fullfilled' ? (
        <>
          <i className="bg-success" /> <i className="ni ni-satisfied"></i>{' '}
          <small> {row.status}</small>
        </>
      ) : null}
      {row.status === 'enroute' ? (
        <>
          <i className="bg-warning" />
          <i className="ni ni-delivery-fast"></i>
          <small> {row.status}</small>
        </>
      ) : null}
      {row.status === 'cancelled' ? <i className="bg-danger" /> : null}
    </Badge>
  );

  actionsFormatter = (cell, row) => (
    <div className="d-flex align-items-center">
      <Button
        className=" btn-icon"
        color="success"
        size="sm"
        type="button"
        style={{ marginRight: '5px' }}
        onClick={() =>
          this.props.getOrder(row._id) & this.setState({ visible: true })
        }
      >
        <i class="fa fa-eye"></i>
      </Button>
    </div>
  );
  handleStatusChange = (singleSelect) => {
    this.setState({ singleSelect });
    this.setState({ orderId: this.props.order[0] && this.props.order[0]._id });
  };

  onPaidSubmit = async (id) => {
    if (this.props.order[0] && this.props.order[0].status !== 'fullfilled') {
      setAlert('Orders have to b fullfilled before any payments', 'danger');
    }

    this.props.updateOrder(id, { plugsBalanced: this.state.plugsBalanced });
  };

  onNotPaidSubmit = async (id) => {
    this.props.updateOrder(id, { plugsBalanced: this.state.plugsNotBalanced });
  };
  onStatusSubmit = async (id) => {
    if (!this.state.singleSelect) {
      return setAlert('Please select a status to update', 'danger');
    }
    this.props.updateOrder(this.state.orderId, {
      status: this.state.singleSelect && this.state.singleSelect.value,
    });
  };

  onClearanceSubmit = async (id) => {
    const data = new FormData();

    data.append('clearance', this.state.onClearance);

    this.props.updateProduct(id, data);
  };

  onNoClearanceSubmit = async (id) => {
    const data = new FormData();

    data.append('clearance', this.state.noClearance);

    this.props.updateProduct(id, data);
  };

  onCancelSubmit = async (e) => {
    const data = new FormData();

    data.append('was', this.state.emptyWas);

    this.props.updateProduct(this.state.productId, data);
  };

  copyToClipboardAsTable = (el) => {
    var body = document.body,
      range,
      sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
      document.execCommand('copy');
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
      range.execCommand('Copy');
    }
    this.setState({
      alert: (
        <ReactBSAlert
          success
          style={{ display: 'block' }}
          title="Copied to clipboard!"
          onConfirm={() => this.setState({ alert: null })}
          onCancel={() => this.setState({ alert: null })}
          confirmBtnBsStyle="info"
          btnSize=""
        ></ReactBSAlert>
      ),
    });
  };

  render() {
    console.log(this.state);
    return (
      <>
        {this.state.alert}
        <ToolkitProvider
          data={
            (this.props.orders &&
              this.props.orders.filter(
                (order) => order.status == 'fullfilled'
              )) ||
            []
          }
          keyField="_id"
          columns={[
            {
              dataField: 'orderID',
              text: '#',
              sort: true,
            },

            {
              dataField: 'status',
              text: 'Status',
              isDummyField: true,
              csvExport: false,
              sort: true,
              formatter: this.activeFormatter,
            },

            {
              dataField: 'plugsBalanced',
              text: 'Paid',
              isDummyField: true,
              csvExport: false,
              sort: true,
              formatter: this.wePaidFormatter,
            },

            {
              dataField: 'createdOn',
              text: 'Created On',
              isDummyField: true,
              csvExport: false,
              sort: true,
              formatter: this.dateFormatter,
            },
            {
              dataField: 'fullfilledOn',
              text: 'Fullfilled On',
              isDummyField: true,
              csvExport: false,
              sort: true,
              formatter: this.fullfilledDateFormatter,
            },
            {
              dataField: 'plugsBalancedOn',
              text: 'Paid On',
              isDummyField: true,
              csvExport: false,
              sort: true,
              formatter: this.paidDateFormatter,
            },

            {
              dataField: 'totalPrice',
              text: 'Amount Due',
              isDummyField: true,
              csvExport: false,
              sort: true,
              formatter: this.amountFormatter,
            },
            {
              dataField: 'totalPrice',
              text: 'Profit',
              isDummyField: true,
              csvExport: false,
              sort: true,
              formatter: this.profitFormatter,
            },
            // {
            //   dataField: 'shippingAddress.city',
            //   text: 'Customer',
            //   sort: true,
            // },

            {
              dataField: 'boughtProducts.length',
              text: 'Variance',
              sort: true,
            },
            {
              dataField: 'actions',
              text: '',
              isDummyField: true,
              csvExport: false,
              formatter: this.actionsFormatter,
            },
          ]}
          search
        >
          {(props) => (
            <Card>
              {' '}
              <div className="py-2">
                <Container fluid>
                  <Row>
                    <Col xs={12} sm={12}>
                      <div id="datatable-basic_filter">
                        <label>
                          Search:{'  '}
                          <SearchBar
                            className="form-control-sm"
                            placeholder="Search orders"
                            {...props.searchProps}
                          />
                        </label>
                        <ButtonGroup className=" px-4 pb-1 float-right">
                          <Button
                            className="buttons-copy buttons-html5"
                            color="info"
                            size="sm"
                            outline
                            id="copy-tooltip"
                            onClick={() =>
                              this.copyToClipboardAsTable(
                                document.getElementById('react-bs-table')
                              )
                            }
                          >
                            <span>Copy</span>
                          </Button>
                          <ReactToPrint
                            trigger={() => (
                              <Button
                                href="#"
                                color="info"
                                size="sm"
                                className="buttons-copy buttons-html5"
                                id="print-tooltip"
                              >
                                Print
                              </Button>
                            )}
                            content={() => this.componentRef}
                          />
                        </ButtonGroup>
                        <UncontrolledTooltip
                          placement="top"
                          target="print-tooltip"
                        >
                          This will open a print page with the visible rows of
                          the table.
                        </UncontrolledTooltip>
                        <UncontrolledTooltip
                          placement="top"
                          target="copy-tooltip"
                        >
                          This will copy to your clipboard the visible rows of
                          the table.
                        </UncontrolledTooltip>
                      </div>
                    </Col>
                  </Row>
                </Container>{' '}
                <BootstrapTable
                  responsive
                  striped
                  hover
                  variant="dark"
                  ref={(el) => (this.componentRef = el)}
                  {...props.baseProps}
                  bootstrap4={true}
                  pagination={pagination}
                  bordered={true}
                  id="react-bs-table"
                />
              </div>
            </Card>
          )}
        </ToolkitProvider>

        <>
          <Drawer
            width={640}
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            {/* <p
              className="site-description-item-profile-p"
              style={{ marginBottom: 24 }}
            >
              <strong>Order #</strong>:{' '}
            </p> */}
            {/* <p className="site-description-item-profile-p">
              {' '}
              {this.props.order[0] &&
              this.props.order[0].status === 'fullfilled' ? (
                <>
                  <i className="bg-success" />
                  <i className="ni ni-satisfied"></i>
                  {'  '}
                  <small>Fullfilled</small>
                </>
              ) : null}
              {this.props.order[0] &&
              this.props.order[0].status === 'enroute' ? (
                <>
                  <i className="bg-info" />
                  <i className="ni ni-delivery-fast"></i> {'  '}
                  <small>Dipatched</small>
                </>
              ) : null}
              {this.props.order[0] &&
              this.props.order[0].status === 'processing' ? (
                <i className="bg-danger" />
              ) : null}
            </p> */}
            <div>
              {' '}
              <div className="col text-left"></div>
              <Descriptions
                bordered
                column="2"
                title={
                  <>
                    {' '}
                    Order:{'  '}
                    {this.props.order[0] && this.props.order[0].orderID}{' '}
                  </>
                }
                size={this.state.size}
                extra={
                  <>
                    {' '}
                    <Row>
                      {' '}
                      <div>
                        {this.props.order[0] && (
                          <Select
                            style={{ width: '600px' }}
                            // size="sm"
                            className="react-select react-select-primary"
                            classNamePrefix="react-select"
                            name="singleSelect"
                            value={this.state.singleSelect}
                            onChange={this.handleStatusChange}
                            options={[
                              { value: 'processing', label: 'Processing' },
                              { value: 'enroute', label: 'Enroute' },
                              { value: 'fullfilled', label: 'Fullfilled' },
                            ]}
                          />
                        )}{' '}
                      </div>{' '}
                      {this.props.order[0] && (
                        <Button
                          style={{ marginLeft: '6px' }}
                          color="default"
                          size="sm"
                          onClick={() =>
                            this.onStatusSubmit(
                              this.props.order[0] && this.props.order[0]._id
                            )
                          }
                        >
                          {' '}
                          Update
                        </Button>
                      )}{' '}
                      {this.props.order[0] && !this.props.order[0].plugsBalanced
                        ? this.props.order[0] && (
                            <Button
                              style={{
                                marginLeft: '15px',
                                marginRight: '20px',
                              }}
                              color="success"
                              size="sm"
                              onClick={() =>
                                this.onPaidSubmit(
                                  this.props.order[0] && this.props.order[0]._id
                                )
                              }
                            >
                              {' '}
                              Pay
                            </Button>
                          )
                        : this.props.order[0] && (
                            <Button
                              style={{
                                marginLeft: '15px',
                                marginRight: '20px',
                              }}
                              danger
                              type="primary"
                              size="sm"
                              onClick={() =>
                                this.onNotPaidSubmit(
                                  this.props.order[0] && this.props.order[0]._id
                                )
                              }
                            >
                              {' '}
                              Unpay
                            </Button>
                          )}{' '}
                      <Button
                        style={{
                          marginLeft: '15px',
                          marginRight: '20px',
                        }}
                        danger
                        type="primary"
                        size="sm"
                        onClick={() => this.setState({ visible: false })}
                      >
                        {' '}
                        Close
                      </Button>
                    </Row>
                  </>
                }
              >
                <Descriptions.Item span={1.5} label="STATUS">
                  {this.props.order[0] && this.props.order[0].status}
                </Descriptions.Item>

                <Descriptions.Item span={1.5} label="AMOUNT">
                  {this.props.order[0] && this.props.order[0].totalPrice
                    ? new Intl.NumberFormat('de-ZA', {
                        style: 'currency',
                        currency: 'ZAR',
                      }).format(this.props.order[0].totalPrice)
                    : 0}
                </Descriptions.Item>
                <Descriptions.Item span={1.5} label="CUSTOMER">
                  {this.props.order[0] &&
                    this.props.order[0].userDetails[0].name}
                </Descriptions.Item>
                <Descriptions.Item span={1.5} label="EMAIL">
                  {this.props.order[0] &&
                    this.props.order[0].userDetails[0].email}{' '}
                </Descriptions.Item>
                <Descriptions.Item span={1.5} label="PHONE">
                  {this.props.order[0] && this.props.order[0].phone}
                </Descriptions.Item>
                <Descriptions.Item span={1.5} label="ALTERNATIVE">
                  {' '}
                  {this.props.order[0] && this.props.order[0].alternativePhone}
                </Descriptions.Item>
                <Descriptions.Item span={1.5} label="ADDRESS">
                  <>
                    {this.props.order[0] &&
                      this.props.order[0].shippingAddress.address}{' '}
                    <br />
                    {this.props.order[0] && ':'}
                    {this.props.order[0] &&
                      this.props.order[0].shippingAddress.city}{' '}
                    <br />
                    {this.props.order[0] && ':'}
                    {this.props.order[0] &&
                      this.props.order[0].shippingAddress.postalCode}{' '}
                    <br />
                    {this.props.order[0] &&
                      this.props.order[0].shippingAddress.country}
                  </>
                </Descriptions.Item>
                <Descriptions.Item span={1.5} label="INSTRUCTIONS">
                  <>
                    {this.props.order[0] &&
                      this.props.order[0].specialInstruction}{' '}
                  </>
                </Descriptions.Item>
              </Descriptions>
            </div>
            <Table responsive className="align-items-center table-flush">
              <thead className="thead-light">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <i className="ni ni-calendar-grid-58 text-black" /> Created
                    On{' '}
                  </th>
                  <td>
                    {' '}
                    <strong>
                      {this.props.order[0] &&
                        this.props.order[0].createdOn.slice(0, 10)}{' '}
                    </strong>{' '}
                  </td>
                </tr>
                {this.props.order[0] && this.props.order[0].enrouteOn && (
                  <tr>
                    <th scope="row">
                      <i className="ni ni-calendar-grid-58 text-black" />{' '}
                      Dispatched On{' '}
                    </th>
                    <td>
                      {' '}
                      <strong>
                        {this.props.order[0] &&
                          this.props.order[0].enrouteOn &&
                          this.props.order[0].enrouteOn.slice(0, 10)}
                        {' -- '}
                        {this.props.order[0] &&
                          this.props.order[0].enrouteOn &&
                          this.props.order[0].enrouteOn.slice(11, 16)}
                      </strong>
                    </td>
                  </tr>
                )}
                {this.props.order[0] && this.props.order[0].fullfilledOn && (
                  <tr>
                    <th scope="row">
                      <i className="ni ni-calendar-grid-58 text-black" />{' '}
                      Fullfilled On{' '}
                    </th>
                    <td>
                      {' '}
                      <strong>
                        {this.props.order[0] &&
                          this.props.order[0].fullfilledOn &&
                          this.props.order[0].fullfilledOn.slice(0, 10)}
                        {'-- '}
                        {this.props.order[0] &&
                          this.props.order[0].fullfilledOn &&
                          this.props.order[0].fullfilledOn.slice(11, 16)}
                      </strong>
                    </td>
                  </tr>
                )}
                {this.props.order[0] && this.props.order[0].plugsBalancedOn && (
                  <tr>
                    <th scope="row">
                      <i className="ni ni-calendar-grid-58 text-black" /> Stores
                      paid On{' '}
                    </th>
                    <td>
                      {' '}
                      <strong>
                        {this.props.order[0] &&
                          this.props.order[0].plugsBalancedOn &&
                          this.props.order[0].plugsBalancedOn.slice(0, 10)}
                        {' --'}
                        {this.props.order[0] &&
                          this.props.order[0].plugsBalancedOn &&
                          this.props.order[0].plugsBalancedOn.slice(11, 16)}
                      </strong>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>{' '}
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">
                    Products(
                    {this.props.order[0] &&
                      this.props.order[0].boughtProducts.length}
                    )
                  </th>
                  <th scope="col">Shop details</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.order[0] &&
                  this.props.order[0].boughtProducts.map((product) => (
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Avatar
                            shape="square"
                            size={64}
                            src={`https://suppli-images.s3.af-south-1.amazonaws.com/${product.imageCover}`}
                          />

                          <Media>
                            <td className=" td-name">
                              {'    '} {product.name}
                              {'    '}
                              <br color="default" className="bg-default"></br>
                              <small color="info">{product.brandName}; </small>
                              <br color="default" className="bg-default"></br>
                              <small color="info">
                                {' '}
                                <strong>Size:</strong> {product.size}{' '}
                              </small>
                              <br color="default" className="bg-default"></br>
                              <small color="info">
                                <strong>Quantity :</strong> {product.quantity} *{' '}
                                <small>R</small> {product.price}
                              </small>
                              <br color="default" className="bg-default"></br>
                              <small color="info">
                                {' '}
                                by {product.plug.name}{' '}
                              </small>
                            </td>
                          </Media>
                        </Media>
                      </th>
                      <td className=" td-name">
                        <small color="info">
                          <strong>
                            {' '}
                            <i className="ni ni-pin-3 text-black" /> Address:
                          </strong>{' '}
                          {product.plug.name}{' '}
                        </small>

                        <br color="default" className="bg-default"></br>

                        <small color="info">
                          <strong>
                            <i className="ni ni-mobile-button text-black" />{' '}
                            Phone:
                          </strong>{' '}
                          {product.plug.phone}{' '}
                        </small>

                        <br color="default" className="bg-default"></br>

                        <small color="info">
                          <strong>
                            <i className="ni ni-credit-card text-black" />{' '}
                            Account no:
                          </strong>{' '}
                          {product.brandName}; <strong>:</strong>{' '}
                        </small>
                        <br color="default" className="bg-default"></br>
                        <small color="info">
                          <strong>
                            {' '}
                            <i className="ni ni-circle-08 text-black" /> Holder
                            name:{' '}
                          </strong>{' '}
                          <small>R</small> {product.price} * {product.quantity}{' '}
                        </small>
                        <br color="default" className="bg-default"></br>
                        <small color="info">
                          {' '}
                          <strong>
                            <i className="ni ni-shop text-black" /> Bank name:{' '}
                          </strong>{' '}
                          {product.plug.name}{' '}
                        </small>

                        <br color="default" className="bg-default"></br>
                        <small color="info">
                          {' '}
                          <strong>
                            {' '}
                            <i className="ni ni-money-coins text-black" />{' '}
                            Amount due:{' '}
                          </strong>
                          R{' '}
                          {product.price * product.quantity -
                            product.price * product.quantity * 0.15}{' '}
                        </small>
                      </td>
                      <td>
                        <div className="custom-control custom-checkbox custom-checkbox-success">
                          <input
                            className="custom-control-input"
                            // defaultChecked
                            // id="chk-todo-task-1"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="chk-todo-task-1"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Drawer>
        </>
      </>
    );
  }
}
OrderTable.defaultProps = {
  catergories: [],
  myPlug: {},
  plugStats: {},
  order: [],
};

const mapStateToProps = (state) => ({
  aggregatedStats: state.aggregatedStats.stats,
  auth: state.auth,
  order: state.order.order,
  product: state.product.product,
  isAuthenticated: state.auth,
  cartItems: state.cart.cartItems,
  myPlug: state.myPlug.plug,
  orders: state.allOrders.orders,
  amountDue: state.unBalancedSales.stats,
  products: state.allProducts.products,
  users: state.users.users,
  plugStats: state.plugSales.orders,
  productStats: state.productStats,
  stats: state.stats.stats,
  dailyStats: state.dailyStats.stats,
  weeklyStats: state.weeklyStats.stats,
});

export default connect(mapStateToProps, {
  getProduct,
  logout,
  getOrder,
  updateOrder,
  loadMyPlug,
  setAlert,
  getPlugStats,
  updateProduct,
  deleteProduct,
  getDueAmount,
})(OrderTable);
