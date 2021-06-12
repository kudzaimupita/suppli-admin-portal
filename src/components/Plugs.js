import React from 'react';
import ReactToPrint from 'react-to-print';
// react component for creating dynamic tables
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import { connect } from 'react-redux';

import { updateProduct } from '../actions/products';
import { loadMyPlug } from '../actions/auth';
import { getOrder } from '../actions/orders';
import {
  getPlugStats,
  getDueAmount,
  getPlug,
  getAllPlugs,
} from '../actions/plugs';

import ReactBSAlert from 'react-bootstrap-sweetalert';
// reactstrap components

import {
  Badge,
  Container,
  ButtonGroup,
  Col,
  UncontrolledTooltip,
  Row,
  Button,
} from 'reactstrap';
import { Avatar, Card, Tabs, Spin } from 'antd';
import { setAlert } from '../actions/alert';
// import { dataTable } from "variables/general";
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
      style={{ marginLeft: '30px', marginTop: '20px' }}
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
    this.props.getAllPlugs();
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
    alert: null,
  };

  handleWasChange = (e) => {
    this.setState({ was: e.target.value });
  };

  dateFormatter = (cell, row) => (
    <>
      <small>{row.createdOn.slice(0, 10)}</small>
    </>
  );

  wePaidFormatter = (cell, row) => (
    <>
      {' '}
      {row.approved ? (
        <i class="fa fa-check-circle" style={{ padding: '0px' }}></i>
      ) : (
        <i class="fa fa-times" style={{ padding: '0px' }}></i>
      )}
    </>
  );
  activeFormatter = (cell, row) => (
    <div className="d-flex align-items-center">
      {row.approved ? (
        <Badge style={{ padding: '0' }} color="" className="badge-dot m2-4 ">
          {' '}
          <i className="bg-success" />
          <small> Active</small>
        </Badge>
      ) : (
        <>
          {' '}
          Inactive <i class="fa fa-times" style={{ padding: '0' }}></i>
        </>
      )}
    </div>
  );

  actionsFormatter = (cell, row) => (
    <div className="d-flex align-items-center" style={{ padding: '0' }}>
      <Badge
        color="info"
        href="/"
        onClick={(e) => this.props.getPlug(row._id) & e.preventDefault()}
      >
        <i class="fa fa-eye"></i>View
      </Badge>
      {/* <Button
        size="sm"
        className=" btn-icon btn-simple"
        color="success"
        type="button"
      ></Button> */}
    </div>
  );

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

  // this function will copy to clipboard an entire table,
  // so you can paste it inside an excel or csv file
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
        >
          {/* Copied to clipboard! */}
        </ReactBSAlert>
      ),
    });
  };

  render() {
    console.log(this.state);
    const rowStyle = {
      // backgroundColor: '#c8e6c9',
      height: '10px',
      // padding: '5px 0',
    };
    return (
      <>
        {' '}
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
                  Disapproved{' '}
                  <Badge color="success">
                    {' '}
                    {(this.props.allPlugs.plugs &&
                      this.props.allPlugs.plugs.filter(
                        (plug) => plug.approved == false
                      ).length) ||
                      0}
                  </Badge>
                </>
              }
              key="1"
            >
              {' '}
              <ToolkitProvider
                data={
                  (this.props.allPlugs.plugs &&
                    this.props.allPlugs.plugs.filter(
                      (plug) => plug.approved == false
                    )) ||
                  []
                }
                keyField="_id"
                columns={[
                  // {
                  //   dataField: 'actions',
                  //   text: '',
                  //   isDummyField: true,
                  //   csvExport: false,
                  //   formatter: this.imageFormatter,
                  // },
                  {
                    dataField: 'name',
                    text: 'shop Name',
                    sort: true,
                  },
                  // {
                  //   dataField: "createdOn",
                  //   text: "Position",
                  //   sort: true
                  // },
                  {
                    dataField: 'approved',
                    text: 'Approved?',
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

                  // {
                  //   dataField: 'actions',
                  //   text: 'Date',
                  //   // sort: true,
                  //   isDummyField: true,
                  //   csvExport: false,
                  //   formatter: this.dateFormatter,

                  // },

                  {
                    dataField: 'actions',
                    text: '',
                    isDummyField: true,
                    csvExport: false,
                    formatter: this.actionsFormatter,
                  },
                  // {
                  //   dataField: "shippingAddress.city",
                  //   text: "City",
                  //   sort: true
                  // },
                ]}
                search
              >
                {(props) => (
                  <div className="py-2">
                    <Container fluid>
                      <Row>
                        <Col xs={12} sm={12}>
                          <div id="datatable-basic_filter">
                            <label>
                              Search:{'  '}
                              <SearchBar
                                className="form-control-sm"
                                placeholder="Search stores"
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
                              This will open a print page with the visible rows
                              of the table.
                            </UncontrolledTooltip>
                            <UncontrolledTooltip
                              placement="top"
                              target="copy-tooltip"
                            >
                              This will copy to your clipboard the visible rows
                              of the table.
                            </UncontrolledTooltip>
                          </div>
                        </Col>
                      </Row>
                    </Container>{' '}
                    <BootstrapTable
                      rowStyle={rowStyle}
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
                  Approved{' '}
                  <Badge color="warning">
                    {' '}
                    {(this.props.allPlugs.plugs &&
                      this.props.allPlugs.plugs.filter(
                        (plug) => plug.approved == true
                      ).length) ||
                      0}
                  </Badge>
                </>
              }
              key="3"
            >
              <ToolkitProvider
                data={
                  (this.props.allPlugs.plugs &&
                    this.props.allPlugs.plugs.filter(
                      (plug) => plug.approved == true
                    )) ||
                  []
                }
                keyField="_id"
                columns={[
                  // {
                  //   dataField: 'actions',
                  //   text: '',
                  //   isDummyField: true,
                  //   csvExport: false,
                  //   formatter: this.imageFormatter,
                  // },
                  {
                    dataField: 'name',
                    text: 'shop Name',
                    sort: true,
                  },
                  // {
                  //   dataField: "createdOn",
                  //   text: "Position",
                  //   sort: true
                  // },
                  {
                    dataField: 'approved',
                    text: 'Approved?',
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

                  // {
                  //   dataField: 'actions',
                  //   text: 'Date',
                  //   // sort: true,
                  //   isDummyField: true,
                  //   csvExport: false,
                  //   formatter: this.dateFormatter,

                  // },

                  {
                    dataField: 'actions',
                    text: '',
                    isDummyField: true,
                    csvExport: false,
                    formatter: this.actionsFormatter,
                  },
                  // {
                  //   dataField: "shippingAddress.city",
                  //   text: "City",
                  //   sort: true
                  // },
                ]}
                search
              >
                {(props) => (
                  <div className="py-2">
                    <Container fluid>
                      <Row>
                        <Col xs={12} sm={12}>
                          <div id="datatable-basic_filter">
                            <label>
                              Search:{'  '}
                              <SearchBar
                                className="form-control-sm"
                                placeholder="Search stores"
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
                              This will open a print page with the visible rows
                              of the table.
                            </UncontrolledTooltip>
                            <UncontrolledTooltip
                              placement="top"
                              target="copy-tooltip"
                            >
                              This will copy to your clipboard the visible rows
                              of the table.
                            </UncontrolledTooltip>
                          </div>
                        </Col>
                      </Row>
                    </Container>{' '}
                    <BootstrapTable
                      rowStyle={rowStyle}
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
  auth: state.auth,
  loading: state.allPlugs.loading,
  product: state.product.product,
  isAuthenticated: state.auth,
  cartItems: state.cart.cartItems,
  myPlug: state.myPlug.plug,
  orders: state.allOrders.orders,
  amountDue: state.unBalancedSales.stats,
  products: state.allProducts.products,
  users: state.users.users,
  allPlugs: state.allPlugs,
});

export default connect(mapStateToProps, {
  getPlug,
  getOrder,
  loadMyPlug,
  setAlert,
  getPlugStats,
  updateProduct,
  getAllPlugs,
  getDueAmount,
})(OrderTable);
