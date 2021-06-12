import React from 'react';
import ReactToPrint from 'react-to-print';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import { connect } from 'react-redux';

import { logout, updateUser } from '../actions/auth';

import {
  getProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
} from '../actions/products';
import { loadMyPlug, getAllUsers } from '../actions/auth';
import { getPlugStats, getDueAmount } from '../actions/plugs';
import { Avatar, Button, Card, Spin, Tabs } from 'antd';
import ReactBSAlert from 'react-bootstrap-sweetalert';

import { Badge, ButtonGroup, Col, UncontrolledTooltip, Row } from 'reactstrap';

import { setAlert } from '../actions/alert';
const { TabPane } = Tabs;
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
  componentDidMount() {
    this.props.getAllProducts();
    this.props.getAllUsers();
  }
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  state = {
    productId: '',
    was: '',
    price: '',
    originalPrice: '',
    emptyWas: '',
    onClearance: true,
    noClearance: false,
  };

  handleWasChange = (e) => {
    this.props.setState({ was: e.target.value });
  };
  onAdminSubmit = (e, id) => {
    e.preventDefault();
    this.props.updateUser(id, { role: 'admin' });
    e.stopPropagation();
  };

  onUserSubmit = (e, id) => {
    e.preventDefault();
    this.props.updateUser(id, { role: 'user' });
  };

  imageFormatter = (cell, row) => (
    <Avatar
      shape="square"
      size={24}
      src={`https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`}
    />
  );
  activeFormatter = (cell, row) => (
    <div className="d-flex align-items-center">
      {row.active ? (
        <Badge color="" className="badge-dot m2-4 ">
          {' '}
          <i className="bg-success" />
          <small> Active</small>
        </Badge>
      ) : (
        <>
          {' '}
          Inactive <i class="fa fa-times"></i>
        </>
      )}
    </div>
  );

  dateFormatter = (cell, row) => <>{row.createdOn.slice(0, 10)}</>;

  actionsFormatter = (cell, row) => (
    <div className="d-flex align-items-center">
      {row.role === 'user' ? (
        <>
          {this.props.auth.user && this.props.auth.user.id !== row._id ? (
            <Badge
              style={{ marginRight: '5px' }}
              onClick={(e) =>
                this.onAdminSubmit(e, row._id) & e.preventDefault()
              }
              color="info"
              href="/"
            >
              <i class="ni ni-circle-08"></i>Make admin
            </Badge>
          ) : null}
        </>
      ) : (
        <Badge
          danger
          className=" btn-icon"
          color="danger"
          size="sm"
          type="info"
          href="/"
          style={{ marginRight: '5px' }}
          onClick={(e) => this.onUserSubmit(e, row._id)}
        >
          <i class="ni ni-circle-08"></i>Make user
        </Badge>
      )}
    </div>
  );

  onClearanceSubmit = async (e, id) => {
    e.preventDefault();
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
        {' '}
        {this.props.loadingUpdate && this.props.loadingUpdate && (
          <div className="example">
            <Spin size="large" />
          </div>
        )}
        {this.props.loading && this.props.loading && (
          <div className="example">
            <Spin size="large" />
          </div>
        )}
        {this.state.alert}{' '}
        <Card>
          {' '}
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <>
                  {' '}
                  Users{' '}
                  <Badge color="default">
                    {' '}
                    {(this.props.users &&
                      this.props.users.doc &&
                      this.props.users.doc.filter(
                        (user) => user.role === 'user'
                      ).length) ||
                      []}
                  </Badge>
                </>
              }
              key="1"
            >
              <ToolkitProvider
                data={
                  (this.props.users &&
                    this.props.users.doc &&
                    this.props.users.doc.filter(
                      (user) => user.role === 'user'
                    )) ||
                  []
                }
                keyField="_id"
                columns={[
                  {
                    dataField: 'actions',
                    text: '',
                    isDummyField: true,
                    csvExport: false,
                    formatter: this.imageFormatter,
                  },
                  {
                    dataField: 'name',
                    text: 'Name',
                    sort: true,
                  },

                  {
                    dataField: 'orders.length',
                    text: 'Orders',
                    sort: true,
                  },

                  {
                    dataField: 'actions',
                    text: 'Active',
                    isDummyField: true,
                    csvExport: false,
                    formatter: this.activeFormatter,
                  },
                  {
                    dataField: 'email',
                    text: 'Email',
                    sort: true,
                  },
                  {
                    dataField: 'role',
                    text: 'Role',
                    sort: true,
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
                  <div className="py-2">
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

                    <BootstrapTable
                      responsive
                      striped
                      hover
                      variant="dark"
                      ref={(el) => (this.componentRef = el)}
                      {...props.baseProps}
                      bootstrap4={true}
                      pagination={pagination}
                      bordered={false}
                      id="react-bs-table"
                    />
                  </div>
                )}
              </ToolkitProvider>
            </TabPane>
            <TabPane
              tab={
                <>
                  {' '}
                  Admins{' '}
                  <Badge color="success">
                    {' '}
                    {(this.props.users &&
                      this.props.users.doc &&
                      this.props.users.doc.filter(
                        (user) => user.role === 'admin'
                      ).length) ||
                      []}
                  </Badge>
                </>
              }
              key="2"
            >
              <ToolkitProvider
                data={
                  (this.props.users &&
                    this.props.users.doc &&
                    this.props.users.doc.filter(
                      (user) => user.role === 'admin'
                    )) ||
                  []
                }
                keyField="_id"
                columns={[
                  {
                    dataField: 'actions',
                    text: '',
                    isDummyField: true,
                    csvExport: false,
                    formatter: this.imageFormatter,
                  },
                  {
                    dataField: 'name',
                    text: 'Name',
                    sort: true,
                  },

                  {
                    dataField: 'orders.length',
                    text: 'Orders',
                    sort: true,
                  },

                  {
                    dataField: 'actions',
                    text: 'Active',
                    isDummyField: true,
                    csvExport: false,
                    formatter: this.activeFormatter,
                  },
                  {
                    dataField: 'email',
                    text: 'Email',
                    sort: true,
                  },
                  {
                    dataField: 'role',
                    text: 'Role',
                    sort: true,
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
                  <div className="py-2">
                    <Row>
                      <Col xs={12} sm={12}>
                        <div id="datatable-basic_filter">
                          <label>
                            Search:{'  '}
                            <SearchBar
                              className="form-control-sm"
                              placeholder="Search users"
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

                    <BootstrapTable
                      responsive
                      striped
                      hover
                      variant="dark"
                      ref={(el) => (this.componentRef = el)}
                      {...props.baseProps}
                      bootstrap4={true}
                      pagination={pagination}
                      bordered={false}
                      id="react-bs-table"
                    />
                  </div>
                )}
              </ToolkitProvider>
            </TabPane>
          </Tabs>
        </Card>
      </>
    );
  }
}
OrderTable.defaultProps = {
  catergories: [],
  myPlug: {},
  plugStats: {},
};

const mapStateToProps = (state) => ({
  loadingUpdate: state.updatedUser.loading,
  loading: state.allProducts.loading,
  auth: state.auth,
  product: state.product.product,
  isAuthenticated: state.auth,
  cartItems: state.cart.cartItems,
  myPlug: state.myPlug.plug,
  orders: state.plugSales.orders,
  amountDue: state.unBalancedSales.stats,
  products: state.allProducts.products,
  users: state.users.users,
});

export default connect(mapStateToProps, {
  getProduct,
  logout,
  loadMyPlug,
  setAlert,
  getAllProducts,
  updateUser,
  getPlugStats,
  updateProduct,
  deleteProduct,
  getDueAmount,
  getAllUsers,
})(OrderTable);
