import React from 'react';
import ReactToPrint from 'react-to-print';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  SmileOutlined,
  CarryOutOutlined,
  CarOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { ClockCircleOutlined } from '@ant-design/icons';

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
  FormGroup,
  UncontrolledTooltip,
  Row,
  Spinner,
  CardBody,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  Avatar,
  Button,
  Card,
  Drawer,
  Descriptions,
  Tabs,
  Timeline,
  Image,
  Spin,
  Menu,
  Radio,
  Popover,
  Checkbox,
} from 'antd';
import { logout } from '../actions/auth';
import { getProduct, deleteProduct, updateProduct } from '../actions/products';
import { loadMyPlug } from '../actions/auth';
import { getOrder, updateOrder, getAllOrders } from '../actions/orders';
// import { getCatergories} from '../actions/catergories';
import { getPlugStats, getDueAmount } from '../actions/plugs';
import { setAlert } from '../actions/alert';
const { TabPane } = Tabs;
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
const { SubMenu } = Menu;

const { SearchBar } = Search;

class OrderTable extends React.Component {
  componentDidMount() {
    this.props.getAllOrders();
  }
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
    collapsed: false,
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
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
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
          <i className="bg-danger" style={{ padding: '0px' }} />
          <i className="ni ni-shop style={{ padding: '0px' }}"></i>
          <small style={{ padding: '0px' }}> {row.status}</small>
        </>
      ) : null}
      {row.status === 'fullfilled' ? (
        <>
          <i className="bg-success" style={{ padding: '0px' }} />{' '}
          <i className="ni ni-satisfied" style={{ padding: '0px' }}></i>{' '}
          <small style={{ padding: '0px' }}> {row.status}</small>
        </>
      ) : null}
      {row.status === 'enroute' ? (
        <>
          <i className="bg-warning" style={{ padding: '0px' }} />
          <i className="ni ni-delivery-fast " style={{ padding: '0px' }}></i>
          <small style={{ padding: '0px' }}> {row.status}</small>
        </>
      ) : null}
      {row.status === 'awaitingConfirmation' ? (
        <>
          <i className="bg-info" style={{ padding: '0px' }} />
          <i className="ni ni-delivery-fast " style={{ padding: '0px' }}></i>
          <small style={{ padding: '0px' }}> {row.status}</small>
        </>
      ) : null}
    </Badge>
  );

  actionsFormatter = (cell, row) => (
    <div className="d-flex align-items-center">
      {/* <Button
        className=" btn-icon"
        color="success"
        size="sm"
        type="button"
        style={{ marginRight: '5px' }}
        onClick={() =>
          this.props.getOrder(row._id) & this.setState({ visible: true })
        }
      >
       
      </Button> */}
      <Badge
        color="info"
        href="/"
        onClick={() =>
          this.props.getOrder(row._id) & this.setState({ visible: true })
        }
      >
        <i class="fa fa-eye" style={{ paddingRight: '0px' }}></i> View
      </Badge>
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
    const rowStyle = {
      // backgroundColor: '#c8e6c9',
      height: '10px',
      // padding: '5px 0',
    };
    const content = (
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    );

    const invoiceDetail = {
      customer: 'Greeva Navadiya',
      notes:
        'All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above',
      invoice_date: 'Jul 17, 2019',
      due_date: 'Jul 27, 2019',
      invoice_id: '#sh1001',
      address: {
        line_1: '795 Folsom Ave, Suite 600',
        city: 'San Francisco',
        state: 'CA',
        zip: 94107,
        phone: '(123) 456-7890',
      },
      billing_address: {
        line_1: '795 Folsom Ave, Suite 600',
        city: 'San Francisco',
        state: 'CA',
        zip: 94107,
        phone: '(123) 456-7890',
      },
      items: [
        {
          id: 1,
          name: 'Web Design',
          description: '2 Pages static website - my website',
          qty: 22,
          unit_cost: '$30.00',
          total: '$660.00',
        },
        {
          id: 2,
          name: 'Software Development',
          description: "Invoice editor software - AB'c Software",
          qty: 112.5,
          unit_cost: '$35.00',
          total: '$3937.50',
        },
      ],
      sub_total: '$4597.50',
      discount: '$459.75',
      total: '$4137.75',
    };

    return (
      <>
        {this.props.loading && this.props.loading && (
          <div className="example">
            <Spin size="large" />
          </div>
        )}{' '}
        <Row>
          {/* <Col xl="3">
            {' '}
            <div style={{ width: 256 }}>
              <Button
                type="primary"
                onClick={this.toggleCollapsed}
                style={{ marginBottom: 16 }}
              >
                {React.createElement(
                  this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
                )}
              </Button>
              <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
              >
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                  Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                  Option 2
                </Menu.Item>
                <Menu.Item key="3" icon={<ContainerOutlined />}>
                  Option 3
                </Menu.Item>
                <SubMenu
                  key="sub1"
                  icon={<MailOutlined />}
                  title="Navigation One"
                >
                  <Menu.Item key="5">Option 5</Menu.Item>
                  <Menu.Item key="6">Option 6</Menu.Item>
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  icon={<AppstoreOutlined />}
                  title="Navigation Two"
                >
                  <Menu.Item key="9">Option 9</Menu.Item>
                  <Menu.Item key="10">Option 10</Menu.Item>
                  <SubMenu key="sub3" title="Submenu">
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                  </SubMenu>
                </SubMenu>
              </Menu>
            </div>
          </Col> */}
          <Col xl="12">
            {' '}
            <Card>
              {this.state.alert}
              <Tabs>
                <TabPane
                  tab={
                    <>
                      {' '}
                      Awaiting confirmation{' '}
                      <Badge className="badge-default">
                        {this.props.orders.otherOrders &&
                          this.props.orders.otherOrders.filter(
                            (order) =>
                              order.awaitingConfirmation &&
                              order.status !== 'fullfilled'
                          ).length}
                      </Badge>
                    </>
                  }
                  key="1"
                >
                  <ToolkitProvider
                    data={
                      (this.props.orders.otherOrders &&
                        this.props.orders.otherOrders.filter(
                          (order) =>
                            order.awaitingConfirmation &&
                            order.status !== 'fullfilled'
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
                        text: 'Stores paid?',
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
                        dataField: 'shippingAddress.country',
                        text: 'Country',
                        sort: true,
                      },
                      {
                        dataField: 'shippingAddress.city',
                        text: 'City',
                        sort: true,
                      },
                      // {
                      //   dataField: 'shippingAddress.city',
                      //   text: 'Customer',
                      //   sort: true,
                      // },
                      {
                        dataField: 'paymentMethod',
                        text: 'Method',
                        sort: true,
                      },
                      {
                        dataField: 'totalPrice',
                        text: 'Amount',
                        sort: true,
                      },
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
                                        document.getElementById(
                                          'react-bs-table'
                                        )
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
                                  This will open a print page with the visible
                                  rows of the table.
                                </UncontrolledTooltip>
                                <UncontrolledTooltip
                                  placement="top"
                                  target="copy-tooltip"
                                >
                                  This will copy to your clipboard the visible
                                  rows of the table.
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
                          // variant="dark"
                          ref={(el) => (this.componentRef = el)}
                          {...props.baseProps}
                          // bootstrap4={true}
                          pagination={pagination}
                          bordered={false}
                          id="react-bs-table"
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                </TabPane>
                {/* <TabPane tab="Cash on delivery" key="2">
                  <Row>
                    <Col span={12}></Col>
                  </Row>
                </TabPane> */}
                {/* <TabPane tab="E-Wallet" key="3">
                  {' '}
                  <Row>
                    <Col span={4}>
                      <FormGroup>
                        <Checkbox>Item collected</Checkbox>
                      </FormGroup>
                    </Col>
                    <Col span={4}>
                      <FormGroup>
                        <Checkbox>Item received</Checkbox>
                      </FormGroup>
                    </Col>{' '}
                    <Col span={4}>
                      <FormGroup>
                        <Checkbox>Money refunded</Checkbox>
                      </FormGroup>
                    </Col>
                  </Row>{' '}
                  <Row>
                    <Col span={12}>
                      <Button type="primary">Approve </Button>
                    </Col>
                  </Row>{' '}
                </TabPane>{' '} */}
                <TabPane tab="Awaiting dispatch" key="8">
                  <ToolkitProvider
                    data={
                      (this.props.orders.otherOrders &&
                        this.props.orders.otherOrders.filter(
                          (order) => order.awaitingCollection
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
                        text: 'Stores paid?',
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
                        dataField: 'shippingAddress.country',
                        text: 'Country',
                        sort: true,
                      },
                      {
                        dataField: 'shippingAddress.city',
                        text: 'City',
                        sort: true,
                      },
                      // {
                      //   dataField: 'shippingAddress.city',
                      //   text: 'Customer',
                      //   sort: true,
                      // },
                      {
                        dataField: 'paymentMethod',
                        text: 'Method',
                        sort: true,
                      },
                      {
                        dataField: 'totalPrice',
                        text: 'Amount',
                        sort: true,
                      },
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
                                        document.getElementById(
                                          'react-bs-table'
                                        )
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
                                  This will open a print page with the visible
                                  rows of the table.
                                </UncontrolledTooltip>
                                <UncontrolledTooltip
                                  placement="top"
                                  target="copy-tooltip"
                                >
                                  This will copy to your clipboard the visible
                                  rows of the table.
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
                          // variant="dark"
                          ref={(el) => (this.componentRef = el)}
                          {...props.baseProps}
                          // bootstrap4={true}
                          pagination={pagination}
                          bordered={false}
                          id="react-bs-table"
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                </TabPane>
                <TabPane tab="Awaiting fullfillment" key="987">
                  <ToolkitProvider
                    data={
                      (this.props.aggregatedStats &&
                        this.props.aggregatedStats.lateFullfillments) ||
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

                      // {
                      //   dataField: 'totalPrice',
                      //   text: 'Amount',
                      //   sort: true,
                      // },
                      // {
                      //   dataField: 'boughtProducts.length',
                      //   text: 'Variance',
                      //   sort: true,
                      // },
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
                                          document.getElementById(
                                            'react-bs-table'
                                          )
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
                                    This will open a print page with the visible
                                    rows of the table.
                                  </UncontrolledTooltip>
                                  <UncontrolledTooltip
                                    placement="top"
                                    target="copy-tooltip"
                                  >
                                    This will copy to your clipboard the visible
                                    rows of the table.
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
                </TabPane>
                <TabPane tab="Awaiting collection[Card]" key="99">
                  <ToolkitProvider
                    data={
                      (this.props.orders.otherOrders &&
                        this.props.orders.otherOrders.filter(
                          (order) => order.awaitingCollection
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
                        text: 'Stores paid?',
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
                        dataField: 'shippingAddress.country',
                        text: 'Country',
                        sort: true,
                      },
                      {
                        dataField: 'shippingAddress.city',
                        text: 'City',
                        sort: true,
                      },
                      // {
                      //   dataField: 'shippingAddress.city',
                      //   text: 'Customer',
                      //   sort: true,
                      // },
                      {
                        dataField: 'paymentMethod',
                        text: 'Method',
                        sort: true,
                      },
                      {
                        dataField: 'totalPrice',
                        text: 'Amount',
                        sort: true,
                      },
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
                                        document.getElementById(
                                          'react-bs-table'
                                        )
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
                                  This will open a print page with the visible
                                  rows of the table.
                                </UncontrolledTooltip>
                                <UncontrolledTooltip
                                  placement="top"
                                  target="copy-tooltip"
                                >
                                  This will copy to your clipboard the visible
                                  rows of the table.
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
                          // variant="dark"
                          ref={(el) => (this.componentRef = el)}
                          {...props.baseProps}
                          // bootstrap4={true}
                          pagination={pagination}
                          bordered={false}
                          id="react-bs-table"
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                </TabPane>
                <TabPane tab="Late dispatches" key="9">
                  <ToolkitProvider
                    data={
                      (this.props.aggregatedStats &&
                        this.props.aggregatedStats.lateFullfillments) ||
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

                      // {
                      //   dataField: 'totalPrice',
                      //   text: 'Amount',
                      //   sort: true,
                      // },
                      // {
                      //   dataField: 'boughtProducts.length',
                      //   text: 'Variance',
                      //   sort: true,
                      // },
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
                                          document.getElementById(
                                            'react-bs-table'
                                          )
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
                                    This will open a print page with the visible
                                    rows of the table.
                                  </UncontrolledTooltip>
                                  <UncontrolledTooltip
                                    placement="top"
                                    target="copy-tooltip"
                                  >
                                    This will copy to your clipboard the visible
                                    rows of the table.
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
                </TabPane>{' '}
                <TabPane tab="Late fullfillments" key="10">
                  <ToolkitProvider
                    data={
                      (this.props.aggregatedStats &&
                        this.props.aggregatedStats.lateDispatches) ||
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

                      // {
                      //   dataField: 'totalPrice',
                      //   text: 'Amount',
                      //   sort: true,
                      // },
                      // {
                      //   dataField: 'boughtProducts.length',
                      //   text: 'Variance',
                      //   sort: true,
                      // },
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
                                          document.getElementById(
                                            'react-bs-table'
                                          )
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
                                    This will open a print page with the visible
                                    rows of the table.
                                  </UncontrolledTooltip>
                                  <UncontrolledTooltip
                                    placement="top"
                                    target="copy-tooltip"
                                  >
                                    This will copy to your clipboard the visible
                                    rows of the table.
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
                </TabPane>{' '}
              </Tabs>
            </Card>
          </Col>
        </Row>
        <>
          <Row style={{ marginTop: '30px' }}>
            <Col xl="6"> </Col>
            <Col xl="6"> </Col>
          </Row>
        </>
        <>
          <Drawer
            width={580}
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <div>
              {' '}
              <div className="Info"></div>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Info" key="1">
                  <Descriptions
                    bordered
                    column="2"
                    title={
                      <>
                        {' '}
                        Order:{'  '}
                        {this.props.order[0] &&
                          this.props.order[0].orderID}{' '}
                      </>
                    }
                    size={'small'}
                    extra={
                      <>
                        {' '}
                        {this.props.order[0] &&
                          this.props.order[0].awaitingDispatch && (
                            <>
                              {' '}
                              <Spinner
                                size="sm"
                                style={{ marginRight: 6 }}
                                type="grow"
                                color="danger"
                              />{' '}
                              awaiting dispatch...
                            </>
                          )}
                        {this.props.order[0] &&
                          this.props.order[0].awaitingCollection && (
                            <>
                              {' '}
                              <Spinner
                                size="sm"
                                style={{ marginRight: 6 }}
                                type="grow"
                                color="warning"
                              />{' '}
                              awaiting collection...
                            </>
                          )}
                        {this.props.order[0] &&
                          this.props.order[0].awaitingFullfillment && (
                            <>
                              {' '}
                              <Spinner
                                size="sm"
                                style={{ marginRight: 6 }}
                                type="grow"
                                color="success"
                              />{' '}
                              awaiting fullfillment...
                            </>
                          )}
                        {this.props.order[0] &&
                          this.props.order[0].awaitingConfirmation && (
                            <>
                              {' '}
                              <Spinner
                                size="sm"
                                style={{ marginRight: 6 }}
                                type="grow"
                                color="info"
                              />{' '}
                              awaiting confirmation...
                            </>
                          )}
                      </>
                    }
                  >
                    <Descriptions.Item span={3} label="Status">
                      {this.props.order[0] && this.props.order[0].status}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Method">
                      {this.props.order[0] && this.props.order[0].paymentMethod}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Amount">
                      {this.props.order[0] && this.props.order[0].totalPrice
                        ? new Intl.NumberFormat('de-ZA', {
                            style: 'currency',
                            currency: 'ZAR',
                          }).format(this.props.order[0].totalPrice)
                        : 0}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Customer">
                      {this.props.order[0] &&
                        this.props.order[0].userDetails[0].name}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Email">
                      {this.props.order[0] &&
                        this.props.order[0].userDetails[0].email}{' '}
                    </Descriptions.Item>
                    <Descriptions.Item span={1.5} label="Phone">
                      <small>
                        {' '}
                        {this.props.order[0] && this.props.order[0].phone}
                      </small>
                    </Descriptions.Item>
                    <Descriptions.Item span={1.5} label="Alternative">
                      <small>
                        {' '}
                        {this.props.order[0] &&
                          this.props.order[0].alternativePhone}
                      </small>
                    </Descriptions.Item>
                    {/* <Descriptions.Item span={3} label="Address">
                     
                    </Descriptions.Item> */}
                    <Descriptions.Item span={3} label="Instructions">
                      <>
                        {this.props.order[0] &&
                          this.props.order[0].specialInstruction}{' '}
                      </>
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Products collected">
                      <>
                        {' '}
                        {this.props.order[0] &&
                        this.props.order[0].productsCollected ? (
                          <i class="fa fa-check-circle"></i>
                        ) : (
                          ' No'
                        )}
                      </>
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Dispatched">
                      <>
                        {' '}
                        {this.props.order[0] &&
                        this.props.order[0].dispatched ? (
                          <i class="fa fa-check-circle"></i>
                        ) : (
                          ' No'
                        )}
                      </>
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Fullfilled">
                      <>
                        {' '}
                        {this.props.order[0] &&
                        this.props.order[0].fullfilled ? (
                          <i class="fa fa-check-circle"></i>
                        ) : (
                          ' No'
                        )}
                      </>
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Delivery address">
                      <>
                        <Popover
                          content={
                            <>
                              {this.props.order[0] &&
                                this.props.order[0].shippingAddress
                                  .address}{' '}
                              <br />
                              {/* {this.props.order[0] && } */}
                              {this.props.order[0] &&
                                this.props.order[0].shippingAddress.city}{' '}
                              <br />
                              {/* {this.props.order[0] && } */}
                              {this.props.order[0] &&
                                this.props.order[0].shippingAddress
                                  .postalCode}{' '}
                              <br />
                              {this.props.order[0] &&
                                this.props.order[0].shippingAddress.country}
                            </>
                          }
                          title="Delivery address"
                        >
                          <Button type="primary">View address</Button>
                        </Popover>
                      </>
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Collected">
                      <>
                        0 of{' '}
                        {this.props.order[0] &&
                          this.props.order[0].boughtProducts.length}
                      </>
                    </Descriptions.Item>
                  </Descriptions>{' '}
                  <br />
                  {(this.props.order[0] &&
                    this.props.order[0].paymentMethod != 'card') ||
                  (this.props.order[0] &&
                    this.props.order[0].paymentMethod != 'cashOnDelivery') ? (
                    <Checkbox
                      checked={
                        this.props.order[0] &&
                        this.props.order[0].paymentStatus === 'confirmed'
                          ? true
                          : false
                      }
                      disabled={
                        this.props.order[0] &&
                        this.props.order[0].paymentStatus === 'confirmed'
                          ? true
                          : false
                      }
                      onChange={() =>
                        this.props.updateOrder(
                          this.props.order[0] && this.props.order[0]._id,
                          {
                            status: 'processing',
                            paymentStatus: 'confirmed',
                            awaitingConfirmation: false,
                            awaitingDispatch: false,
                            awaitingCollection: true,
                          }
                        )
                      }
                    >
                      Payment confirmed
                    </Checkbox>
                  ) : null}
                  {/* <br /> */}
                  <Checkbox
                    disabled={
                      (this.props.order[0] &&
                        this.props.order[0].productsCollected) ||
                      (this.props.order[0] &&
                        this.props.order[0].paymentStatus != 'confirmed')
                        ? true
                        : false
                    }
                    checked={
                      this.props.order[0] &&
                      this.props.order[0].productsCollected
                        ? true
                        : false
                    }
                    onChange={() =>
                      this.props.updateOrder(
                        this.props.order[0] && this.props.order[0]._id,
                        {
                          productsCollected: true,
                          awaitingCollection: false,
                          awaitingDispatch: true,
                        }
                      )
                    }
                  >
                    Products collected
                  </Checkbox>
                  <Checkbox
                    disabled={
                      (this.props.order[0] && this.props.order[0].dispatched) ||
                      (this.props.order[0] &&
                        !this.props.order[0].productsCollected)
                        ? true
                        : false
                    }
                    checked={
                      this.props.order[0] && this.props.order[0].dispatched
                        ? true
                        : false
                    }
                    onChange={() =>
                      this.props.updateOrder(
                        this.props.order[0] && this.props.order[0]._id,
                        {
                          dispatched: true,
                          awaitingFullfillment: true,
                          awaitingDispatch: false,
                          status: 'enroute',
                        }
                      )
                    }
                  >
                    Dispatched
                  </Checkbox>
                  <Checkbox
                    disabled={
                      (this.props.order[0] && this.props.order[0].fullfilled) ||
                      (this.props.order[0] && !this.props.order[0].dispatched)
                        ? true
                        : false
                    }
                    checked={
                      this.props.order[0] && this.props.order[0].fullfilled
                        ? true
                        : false
                    }
                    onChange={() =>
                      this.props.updateOrder(
                        this.props.order[0] && this.props.order[0]._id,
                        {
                          fullfilled: true,
                          awaitingFullfillment: false,
                          status: 'fullfilled',
                        }
                      )
                    }
                  >
                    Fullfilled
                  </Checkbox>
                  {/* <Radio.Group
                    defaultValue="a"
                    buttonStyle="solid"
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                  >
                    <Radio.Button value="a">Processing</Radio.Button>
                    <Radio.Button value="b">Shanghai</Radio.Button>
                    <Radio.Button value="c">Beijing</Radio.Button>
                    <Radio.Button value="d">Chengdu</Radio.Button>{' '}
                    <Radio.Button value="d">Chengdu</Radio.Button>
                  </Radio.Group> */}
                  <Timeline
                    style={{ marginTop: '20px' }}
                    mode="alternate"
                    //  {this.props.order[0] &&
                    //       this.props.order[0].status != 'fullfilled' && }
                    pending={
                      this.props.order[0] &&
                      this.props.order[0].status == 'fullfilled' ? (
                        false
                      ) : (
                        <>
                          {this.props.order[0] &&
                            this.props.order[0].status + '...'}
                        </>
                      )
                    }
                  >
                    <Timeline.Item color="green">
                      <small>
                        Ordered on{' '}
                        {this.props.order[0] &&
                          this.props.order[0].createdOn.slice(0, 10)}{' '}
                        at{' '}
                        {this.props.order[0] &&
                          this.props.order[0].createdOn.slice(11, 16)}
                      </small>
                    </Timeline.Item>
                    <Timeline.Item
                      dot={<CarryOutOutlined style={{ fontSize: '16px' }} />}
                      color="purple"
                    >
                      <small>
                        Confirmed on{' '}
                        {this.props.order[0] &&
                          this.props.order[0].paidOn &&
                          this.props.order[0].paidOn.slice(0, 10)}{' '}
                        at{' '}
                        {this.props.order[0] &&
                          this.props.order[0].paidOn &&
                          this.props.order[0].paidOn.slice(11, 16)}
                      </small>
                    </Timeline.Item>
                    {this.props.order[0] &&
                      this.props.order[0].productsCollectedOn && (
                        <Timeline.Item
                          dot={
                            <ShoppingOutlined style={{ fontSize: '16px' }} />
                          }
                          color="red"
                        >
                          {' '}
                          <small>
                            Products collected on{' '}
                            {this.props.order[0] &&
                              this.props.order[0].productsCollectedOn &&
                              this.props.order[0].productsCollectedOn.slice(
                                0,
                                10
                              )}{' '}
                            at{' '}
                            {this.props.order[0] &&
                              this.props.order[0].productsCollectedOn &&
                              this.props.order[0].productsCollectedOn.slice(
                                11,
                                16
                              )}
                          </small>
                        </Timeline.Item>
                      )}
                    {this.props.order[0] && this.props.order[0].dispatchedOn && (
                      <Timeline.Item
                        dot={<CarOutlined style={{ fontSize: '16px' }} />}
                      >
                        {' '}
                        <small>
                          Dispatched on{' '}
                          {this.props.order[0] &&
                            this.props.order[0].dispatchedOn &&
                            this.props.order[0].dispatchedOn.slice(0, 10)}{' '}
                          at{' '}
                          {this.props.order[0] &&
                            this.props.order[0].dispatchedOn &&
                            this.props.order[0].dispatchedOn.slice(11, 16)}
                        </small>
                      </Timeline.Item>
                    )}
                    {this.props.order[0] && this.props.order[0].fullfilledOn && (
                      <Timeline.Item
                        dot={<SmileOutlined style={{ fontSize: '16px' }} />}
                        color="yellow"
                      >
                        {' '}
                        <small>
                          Fullfilled on{' '}
                          {this.props.order[0] &&
                            this.props.order[0].fullfilledOn &&
                            this.props.order[0].fullfilledOn.slice(0, 10)}{' '}
                          at{' '}
                          {this.props.order[0] &&
                            this.props.order[0].fullfilledOn &&
                            this.props.order[0].fullfilledOn.slice(11, 16)}
                        </small>
                      </Timeline.Item>
                    )}
                    {/* <Timeline.Item color="gray">
                      <p>Technical testing 1</p>
                    </Timeline.Item> */}
                  </Timeline>
                </TabPane>
                {/* {this.props.order[0] &&
                  this.props.order[0].paymentMethod !== 'card' && ( */}
                <TabPane tab="Proof of payment" key="6">
                  {' '}
                  {this.props.order[0] &&
                    this.props.order[0].proofOfPayment &&
                    this.props.order[0].proofOfPayment.map((image) => (
                      <Image
                        style={{ margin: '10px' }}
                        width={90}
                        src={`http://localhost:5000/img/orders/${image}`}
                      />
                    ))}
                </TabPane>
                {/* )} */}
                <TabPane tab="Products" key="3">
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">
                          Variance(
                          {this.props.order[0] &&
                            this.props.order[0].boughtProducts.length}
                          )
                        </th>
                        {/* <th scope="col">Shop details</th> */}
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
                                  size={90}
                                  src={`https://suppli-images.s3.af-south-1.amazonaws.com/${product.imageCover}`}
                                />

                                <Media>
                                  <td className=" td-name">
                                    {'    '} {product.name}
                                    {'    '}
                                    <br
                                      color="default"
                                      className="bg-default"
                                    ></br>
                                    <small color="info">
                                      {product.brandName};{' '}
                                    </small>
                                    <br
                                      color="default"
                                      className="bg-default"
                                    ></br>
                                    <small color="info">
                                      {' '}
                                      <strong>Size:</strong> {product.size}{' '}
                                    </small>
                                    <br
                                      color="default"
                                      className="bg-default"
                                    ></br>
                                    <small color="info">
                                      <strong>Quantity :</strong>{' '}
                                      {product.quantity} * <small>R</small>{' '}
                                      {product.price}
                                    </small>
                                    <br
                                      color="default"
                                      className="bg-default"
                                    ></br>
                                    <small color="info">
                                      {' '}
                                      by {product.plug.name}{' '}
                                    </small>
                                  </td>
                                </Media>
                              </Media>
                            </th>
                            <td className=" td-name">
                              <Checkbox
                                onChange={() =>
                                  this.props.updateOrder(
                                    this.props.order[0] &&
                                      this.props.order[0]._id,
                                    {
                                      productCollectedId: product._id,
                                      order: this.props.order[0],
                                    }
                                  )
                                }
                              >
                                Collected
                              </Checkbox>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </TabPane>{' '}
                <TabPane tab="Invoice" key="2">
                  <React.Fragment>
                    <Row className="page-title d-print-none">
                      <Col md={12}></Col>
                    </Row>

                    <Row>
                      <Col>
                        <Card>
                          <CardBody>
                            <div className="clearfix">
                              <div className="float-sm-right">
                                <img
                                  src={require('../assets/images/logo-1.png')}
                                  alt=""
                                  height="48"
                                />
                                {/* <h4 className="m-0 d-inline align-middle">
                                  Suppl-i
                                </h4> */}
                                <address className="pl-2 mt-2">
                                  Kempton Park, 1619
                                  <br />
                                  Johannesburg
                                  <br />
                                  South Africa
                                  <br />
                                  <small>contact@baboon.shop</small>
                                </address>
                              </div>
                              <div className="float-sm-left">
                                <h4 className="m-0 d-print-none">
                                  {' '}
                                  Order #{' '}
                                  {this.props.order[0] &&
                                    this.props.order[0].orderID}
                                </h4>
                                <h6>
                                  {' '}
                                  Ordered on{' '}
                                  {this.props.order[0] &&
                                    this.props.order[0].createdOn.slice(0, 10)}
                                </h6>
                                <dl className="row mb-2 mt-3">
                                  {/* <dt className="col-sm-3 font-weight-normal">
                                    Order # :
                                  </dt> */}
                                  <dd className="col-sm-9 font-weight-normal">
                                    {' '}
                                    <h3> </h3>{' '}
                                  </dd>

                                  {/* <dt className="col-sm-3 font-weight-normal">
                                    Invoice Date :
                                  </dt>
                                  <dd className="col-sm-9 font-weight-normal">
                                    Jul 17, 2019
                                  </dd>

                                  <dt className="col-sm-3 font-weight-normal">
                                    Due Date :
                                  </dt>
                                  <dd className="col-sm-9 font-weight-normal">
                                    Jul 27, 2019
                                  </dd> */}
                                </dl>
                              </div>
                            </div>

                            <Row className="mt-4">
                              <Col md={6}>
                                <h6 className="font-weight-normal">
                                  Invoice For:
                                </h6>
                                <h6 className="font-size-16">
                                  {this.props.order[0] &&
                                    this.props.order[0].userDetails[0].name}
                                </h6>
                                <address>
                                  {this.props.order[0] &&
                                    this.props.order[0].shippingAddress.address}
                                  <br />
                                  {this.props.order[0] &&
                                    this.props.order[0].shippingAddress.city}
                                  {this.props.order[0] &&
                                    this.props.order[0].shippingAddress
                                      .postalCode}
                                  <br />
                                  {/* <abbr title="Phone">P:</abbr>{' '} */}
                                  {this.props.order[0] &&
                                    this.props.order[0].phone}
                                  <br />{' '}
                                  {this.props.order[0] &&
                                    this.props.order[0].userDetails[0].email}
                                </address>
                              </Col>

                              <Col md={6}>
                                {/* <div className="text-md-right">
                                  <h6 className="font-weight-normal">Total</h6>
                                  <h3>
                                    {' '}
                                  
                                  </h3>
                                </div> */}
                              </Col>
                            </Row>

                            <Row>
                              <Col>
                                <div className="table-responsive">
                                  <table className="table mt-4 table-centered">
                                    <thead>
                                      <tr>
                                        <th>#</th>
                                        <th>Item</th>
                                        <th>Qty * price</th>
                                        {/* <th>Hours Rate</th> */}
                                        <th className="text-right">Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {this.props.order[0] &&
                                        this.props.order[0].boughtProducts.map(
                                          (product) => (
                                            <tr key={product._id}>
                                              <td>
                                                {' '}
                                                <Avatar
                                                  shape="square"
                                                  size={24}
                                                  src={`https://suppli-images.s3.af-south-1.amazonaws.com/${product.imageCover}`}
                                                />
                                              </td>
                                              <td>
                                                <h5 className="font-size-16 mt-0 mb-2">
                                                  {product.name.slice(0, 15)}...
                                                </h5>
                                                <p className="text-muted mb-0">
                                                  {/* {product.description} */}
                                                </p>
                                              </td>
                                              <td>
                                                {product.quantity} * R
                                                {product.price}
                                              </td>
                                              {/* <td></td> */}
                                              <td className="text-right">
                                                R{' '}
                                                {product.quantity *
                                                  product.price}
                                                {/* {product.price} */}
                                              </td>
                                            </tr>
                                          )
                                        )}
                                    </tbody>
                                  </table>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={6}>
                                <div className="clearfix pt-5">
                                  <h6 className="text-muted">Notes:</h6>

                                  <small className="text-muted">
                                    {invoiceDetail.notes}
                                  </small>
                                </div>
                              </Col>

                              <Col sm={6}>
                                <div className="float-right mt-2">
                                  <p>
                                    <span className="font-weight-medium">
                                      Total:
                                    </span>
                                    <span className="float-right"></span>
                                  </p>
                                  {/* <p>
                                    <span className="font-weight-medium">
                                      Discount (10%):
                                    </span>{' '}
                                    <span className="float-right">
                                      {' '}
                                      &nbsp;&nbsp;&nbsp;{' '}
                                      {invoiceDetail.discount}
                                    </span>
                                  </p> */}
                                  <h3>
                                    R{' '}
                                    {this.props.order[0] &&
                                    this.props.order[0].totalPrice
                                      ? new Intl.NumberFormat('de-ZA', {
                                          style: 'currency',
                                          currency: 'ZAR',
                                        }).format(
                                          this.props.order[0].totalPrice
                                        )
                                      : 0}{' '}
                                  </h3>
                                </div>
                                <div className="clearfix"></div>
                              </Col>
                            </Row>

                            <div className="mt-5 mb-1">
                              <div className="text-right d-print-none">
                                <Button
                                  color="primary"
                                  onClick={(e) => {
                                    window.print();
                                  }}
                                >
                                  <i className="uil uil-print mr-1"></i> Print
                                </Button>
                                {/* <a href="/" className="btn btn-info ml-1">
                                  Submit
                                </a> */}
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </React.Fragment>
                </TabPane>
              </Tabs>
            </div>
            {/* <Table responsive className="align-items-center table-flush">
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
            </Table>{' '} */}
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
  orders: [],
};

const mapStateToProps = (state) => ({
  loading: state.allOrders.loading,
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
  getAllOrders,
  updateOrder,
  loadMyPlug,
  setAlert,
  getPlugStats,
  updateProduct,
  deleteProduct,
  getDueAmount,
})(OrderTable);
