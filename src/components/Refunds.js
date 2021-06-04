import React from 'react';
import ReactToPrint from 'react-to-print';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {
  Drawer,
  Avatar,
  InputNumber,
  Card,
  Input,
  Tabs,
  Image,
  Checkbox,
  Descriptions,
  Popover,
  Spin,
} from 'antd';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import {
  Badge,
  FormGroup,
  Container,
  ButtonGroup,
  Col,
  Button,
  UncontrolledTooltip,
  Row,
  Media,
  Spinner,
} from 'reactstrap';
import { Menu, Dropdown } from 'antd';
import { approvePlug } from '../actions/plugs';
import { CalendarOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { updateRefund } from '../actions/refunds';
import { logout } from '../actions/auth';
import { getProduct, deleteProduct, updateProduct } from '../actions/products';
import { loadMyPlug } from '../actions/auth';
import { getRefund, getAllRefunds } from '../actions/refunds';
import { getPlugStats, getDueAmount } from '../actions/plugs';
import { setAlert } from '../actions/alert';
const { TabPane } = Tabs;
const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const { TextArea } = Input;
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
    this.props.getAllRefunds();
  }
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  state = {
    show: true,
    visible2: false,
    visible1: false,
    amountPayable: '',
    forfeitReason: '',
    rejectionMessage: '',
    comment: '',
    refund: '',
    visible: false,
    productId: '',
    was: '',
    price: '',
    originalPrice: '',
    emptyWas: '',
    onClearance: true,
    noClearance: false,
    alert: null,
  };
  handleHide = () => {
    this.setState({
      visible1: false,
    });
  };
  handleVisible1Change = (visible1) => {
    this.setState({ visible1 });
  };
  handleHide = () => {
    this.setState({
      visible2: false,
    });
  };
  handleVisible2Change = (visible2) => {
    this.setState({ visible2 });
  };
  handleWasChange = (e) => {
    this.setState({ was: e.target.value });
  };

  handleForfeitChange = (e) => {
    this.setState({ forfeitReason: e.target.value });
  };

  handleCommentChange = (e) => {
    this.setState({ comment: e.target.value });
  };

  handleAmountChange = (value) => {
    this.setState({ amountPayable: value });
  };
  handleRejectionChange = (e) => {
    this.setState({ rejectionMessage: e.target.value });
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onSubmit = async (id) => {
    this.props.updateRefund(id, {
      reasonForRejection: this.state.reason,
      status: this.state.singleSelect.value,
    });
  };

  onCommentSubmit = async (id) => {
    if (
      this.state.refund.order.boughtProducts.filter(
        (product) => product._id === this.state.refund.product._id
      )[0].price < this.state.amountPayable
    )
      return this.props.setAlert(
        'The amount payable cant have a value larger than the actual item price',
        'danger'
      );
    if (!this.state.comment || this.state.comment.length < 30)
      return this.props.setAlert(
        'Please type in a message for the customer, 10 words minimum',
        'danger'
      );
    if (!this.state.amountPayable)
      return this.props.setAlert(
        'Please provide the amount payable balance',
        'danger'
      );

    this.props.updateRefund(this.state.refund._id, {
      messageToCustomer: this.state.comment,
      awaitingCollection: true,
      status: 'approved',
      amountPayable: this.state.amountPayable,
    });

    this.setState((state) => ((state.refund.status = 'approved'), state));
    this.setState(
      (state) => ((state.refund.amountPayable = state.amountPayable), state)
    );
    this.setState(
      (state) => ((state.refund.messageToCustomer = state.comment), state)
    );
    this.setState((state) => ((state.refund.awaitingCollection = true), state));
    this.setState((state) => ((state.refund.awaitingCollection = true), state));
    this.setState((state) => ((state.messageToCustomer = ''), state));

    this.setState((state) => ((state.amountPayable = null), state));
  };

  onExchangeSubmit = async (id) => {
    if (!this.state.comment || this.state.comment.length < 30)
      return this.props.setAlert(
        'Please type in a message for the customer, 10 words minimum',
        'danger'
      );

    this.props.updateRefund(this.state.refund._id, {
      messageToCustomer: this.state.comment,
      // awaitingCollectionFromVendor: true,
      status: 'exchangeApproved',

      awaitingAlternateProductCollection: true,
    });
    this.setState(
      (state) => ((state.refund.status = 'exchangeApproved'), state)
    );
    this.setState(
      (state) => (
        (state.refund.awaitingAlternateProductCollection = true), state
      )
    );

    this.setState(
      (state) => ((state.refund.messageToCustomer = state.comment), state)
    );
    this.setState((state) => ((state.messageToCustomer = ''), state));
  };
  onForfeitSubmit = async (id) => {
    if (
      this.state.refund.order.boughtProducts.filter(
        (product) => product._id === this.state.refund.product._id
      )[0].price >= 150
    )
      return this.props.setAlert(
        'Not allowed to forfeit items with value larger than R150',
        'danger'
      );
    if (!this.state.forfeitReason || this.state.forfeitReason.length < 30)
      return this.props.setAlert(
        'Please type in viable reason for forfeiting this product, 10 words minimum',
        'danger'
      );
    if (!this.state.rejectionMessage || this.state.rejectionMessage.length < 30)
      return this.props.setAlert(
        'Please type in a message for the customer, 10 words minimum',
        'danger'
      );

    this.props.updateRefund(this.state.refund._id, {
      messageToCustomer: this.state.rejectionMessage,
      awaitingPaymentToCustomer: true,
      status: 'forfeited',
      reasonForForfeit: this.state.forfeitReason,
      forfeitProduct: true,
    });

    this.onUpdatePlugAccountSubmit();
    this.setState((state) => ((state.refund.status = 'forfeited'), state));
    this.setState(
      (state) => ((state.refund.reasonForForfeit = state.forfeitReason), state)
    );
    this.setState(
      (state) => ((state.refund.awaitingPaymentToCustomer = true), state)
    );
    this.setState(
      (state) => (
        (state.refund.messageToCustomer = state.rejectionMessage), state
      )
    );
    //  this.setState(
    //    (state) => (
    //      (state.refund.price = this.state.refund.order.boughtProducts.filter(
    //        (product) => product._id === this.state.refund.product._id
    //      )[0].price),
    //      state
    //    )
    //  );

    this.setState((state) => ((state.forfeitReason = ''), state));
    this.setState((state) => ((state.rejectionMessage = ''), state));
  };

  onRejectionSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.rejectionMessage || this.state.rejectionMessage.length < 30)
      return this.props.setAlert(
        'Please type in a message for the customer, 10 words minimum',
        'danger'
      );
    this.props.updateRefund(this.state.refund._id, {
      messageToCustomer: this.state.rejectionMessage,
      resolved: true,
      status: 'rejected',
    });
    this.setState(
      (state) => (
        (state.refund.messageToCustomer = state.rejectionMessage), state
      )
    );
    this.setState((state) => ((state.refund.resolved = true), state));
    this.setState((state) => ((state.refund.status = 'rejected'), state));
    this.setState({ rejectionMessage: '' });
  };

  onUpdatePlugAccountSubmit = async (id) => {
    this.props.approvePlug(this.state.refund.product.plug, {
      owing: this.state.refund.order.boughtProducts
        .filter((product) => product._id === this.state.refund.product._id)
        .map((product) => product.price)[0],
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

  imageFormatter = (cell, row) => (
    <Avatar
      shape="square"
      size={32}
      //   src={`https://suppli-images.s3.af-south-1.amazonaws.com/${
      //     row.product.imageCover && row.product.imageCover
      //   }`}
    />
  );

  wePaidFormatter = (cell, row) => (
    <>
      {' '}
      {row.resolved ? (
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
        outline
        color="default"
        size="sm"
        type="button"
        style={{ marginRight: '5px' }}
        onClick={() => this.setState({ visible: true, refund: row })}
      >
        <i class="fa fa-eye"></i>
      </Button>
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
  imageFormatter = (cell, row) =>
    row.product && (
      <Avatar
        shape="square"
        size={32}
        src={`https://suppli-images.s3.af-south-1.amazonaws.com/${row.product.imageCover}`}
      />
    );

  render() {
    console.log(this.state);
    const menu = (
      <Menu>
        <Menu.Item key="1" icon={<CalendarOutlined />}>
          Created on:{' '}
          {this.state.refund && this.state.refund.order.createdOn.slice(0, 10)}
          {' at '}{' '}
          {this.state.refund && this.state.refund.order.createdOn.slice(11, 16)}
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          Fullfilled on:{' '}
          {this.state.refund.order &&
            this.state.refund.order.fullfilledOn &&
            this.state.refund.order.fullfilledOn.slice(0, 10)}
          {' at '}{' '}
          {this.state.refund.order &&
            this.state.refund.order.fullfilledOn &&
            this.state.refund.order.fullfilledOn.slice(11, 16)}
        </Menu.Item>
        <Menu.Item key="3" icon={<CalendarOutlined />}>
          Collected on:{' '}
          {this.state.refund &&
            this.state.refund.collectedOn &&
            this.state.refund.collectedOn.slice(0, 10)}{' '}
          {' at '}{' '}
          {this.state.refund &&
            this.state.refund.collectedOn &&
            this.state.refund.collectedOn.slice(11, 16)}{' '}
        </Menu.Item>
        <Menu.Item key="4" icon={<CalendarOutlined />}>
          Received on:{' '}
          {this.state.refund &&
            this.state.refund.productReceivedOn &&
            this.state.refund.productReceivedOn.slice(0, 10)}{' '}
          {' at '}{' '}
          {this.state.refund &&
            this.state.refund.productReceivedOn &&
            this.state.refund.productReceivedOn.slice(11, 16)}{' '}
        </Menu.Item>{' '}
        <Menu.Item key="4" icon={<CalendarOutlined />}>
          We paid on:{' '}
          {this.state.refund &&
            this.state.refund.wePaidOn &&
            this.state.refund.wePaidOn.slice(0, 10)}{' '}
          {' at '}{' '}
          {this.state.refund &&
            this.state.refund.wePaidOn &&
            this.state.refund.wePaidOn.slice(11, 16)}{' '}
        </Menu.Item>
        <Menu.Item key="4" icon={<CalendarOutlined />}>
          Resolved on:{' '}
          {this.state.refund &&
            this.state.refund.resolvedOn &&
            this.state.refund.resolvedOn.slice(0, 10)}{' '}
          {' at '}{' '}
          {this.state.refund &&
            this.state.refund.resolvedOn &&
            this.state.refund.resolvedOn.slice(11, 16)}{' '}
        </Menu.Item>
      </Menu>
    );
    return (
      <>
        {this.props.loading && this.props.loading ? (
          <div className="example">
            <Spin size="large" />
          </div>
        ) : (
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <>
                    Awaiting response{'  '}
                    <Badge color="warning">
                      {
                        (
                          (this.props.refunds.doc &&
                            this.props.refunds.doc.filter(
                              (refund) =>
                                refund.status === 'awaitingResponse' &&
                                refund.resolved === false
                            )) ||
                          []
                        ).length
                      }
                    </Badge>
                  </>
                }
                key="1"
              >
                <ToolkitProvider
                  data={
                    (this.props.refunds.doc &&
                      this.props.refunds.doc.filter(
                        (refund) =>
                          refund.status === 'awaitingResponse' &&
                          refund.resolved === false
                      )) ||
                    []
                  }
                  keyField="_id"
                  columns={[
                    {
                      dataField: 'refundId',
                      text: 'Refund #',
                      sort: true,
                    },
                    {
                      dataField: 'order.orderID',
                      text: 'Order #',
                      sort: true,
                    },
                    {
                      dataField: 'resolved',
                      text: 'Resolved',
                      isDummyField: true,
                      csvExport: false,
                      sort: true,
                      formatter: this.wePaidFormatter,
                    },
                    {
                      dataField: 'status',
                      text: 'Status',
                      sort: true,
                    },
                    {
                      dataField: '',
                      text: '',
                      isDummyField: true,
                      csvExport: false,
                      formatter: this.imageFormatter,
                    },
                    {
                      dataField: 'product.name',
                      text: 'Product',
                      sort: true,
                    },
                    {
                      dataField: 'order.shippingAddress.city',
                      text: 'City',
                      sort: true,
                    },
                    {
                      dataField: 'user.name',
                      text: 'Customer',
                      sort: true,
                    },

                    // {
                    //   dataField: 'status',
                    //   text: 'Status',
                    //   isDummyField: true,
                    //   csvExport: false,
                    //   sort: true,
                    //   formatter: this.activeFormatter,
                    // },

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
                    Awaiting collection{'  '}
                    <Badge color="info">
                      {
                        (
                          (this.props.refunds.doc &&
                            this.props.refunds.doc.filter(
                              (refund) =>
                                refund.awaitingCollection === true &&
                                refund.resolved === false
                            )) ||
                          []
                        ).length
                      }
                    </Badge>
                  </>
                }
                key="2"
              >
                <ToolkitProvider
                  data={
                    (this.props.refunds.doc &&
                      this.props.refunds.doc.filter(
                        (refund) =>
                          refund.awaitingCollection === true &&
                          refund.resolved === false
                      )) ||
                    []
                  }
                  keyField="_id"
                  columns={[
                    {
                      dataField: 'refundId',
                      text: 'Refund #',
                      sort: true,
                    },
                    {
                      dataField: 'refundId',
                      text: 'Refund #',
                      sort: true,
                    },

                    {
                      dataField: 'resolved',
                      text: 'Resolved',
                      isDummyField: true,
                      csvExport: false,
                      sort: true,
                      formatter: this.wePaidFormatter,
                    },
                    {
                      dataField: 'status',
                      text: 'Status',
                      sort: true,
                    },
                    {
                      dataField: '',
                      text: '',
                      isDummyField: true,
                      csvExport: false,
                      formatter: this.imageFormatter,
                    },
                    {
                      dataField: 'product.name',
                      text: 'Product',
                      sort: true,
                    },
                    {
                      dataField: 'order.shippingAddress.city',
                      text: 'City',
                      sort: true,
                    },
                    {
                      dataField: 'user.name',
                      text: 'Customer',
                      sort: true,
                    },

                    // {
                    //   dataField: 'status',
                    //   text: 'Status',
                    //   isDummyField: true,
                    //   csvExport: false,
                    //   sort: true,
                    //   formatter: this.activeFormatter,
                    // },

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
                        bordered={false}
                        id="react-bs-table"
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </TabPane>{' '}
              <TabPane
                tab={
                  <>
                    Awaiting exchange{'  '}{' '}
                    <Badge color="danger">
                      {
                        (
                          (this.props.refunds.doc &&
                            this.props.refunds.doc.filter(
                              (refund) => refund.status === 'exchangeApproved'
                            )) ||
                          []
                        ).length
                      }
                    </Badge>
                  </>
                }
                key="13"
              >
                <ToolkitProvider
                  data={
                    (this.props.refunds.doc &&
                      this.props.refunds.doc.filter(
                        (refund) =>
                          refund.status === 'exchangeApproved' &&
                          refund.resolved === false
                      )) ||
                    []
                  }
                  keyField="_id"
                  columns={[
                    {
                      dataField: 'refundId',
                      text: 'Refund #',
                      sort: true,
                    },
                    {
                      dataField: 'order.orderID',
                      text: 'Order #',
                      sort: true,
                    },
                    {
                      dataField: 'resolved',
                      text: 'Resolved',
                      isDummyField: true,
                      csvExport: false,
                      sort: true,
                      formatter: this.wePaidFormatter,
                    },
                    {
                      dataField: 'status',
                      text: 'Status',
                      sort: true,
                    },
                    {
                      dataField: '',
                      text: '',
                      isDummyField: true,
                      csvExport: false,
                      formatter: this.imageFormatter,
                    },
                    {
                      dataField: 'product.name',
                      text: 'Product',
                      sort: true,
                    },
                    {
                      dataField: 'product.price',
                      text: 'Price',
                      sort: true,
                    },
                    {
                      dataField: 'user.name',
                      text: 'Customer',
                      sort: true,
                    },

                    // {
                    //   dataField: 'status',
                    //   text: 'Status',
                    //   isDummyField: true,
                    //   csvExport: false,
                    //   sort: true,
                    //   formatter: this.activeFormatter,
                    // },

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
                        bordered={false}
                        id="react-bs-table"
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </TabPane>{' '}
              <TabPane
                tab={
                  <>
                    Awaiting product{'  '}{' '}
                    <Badge color="success">
                      {
                        (
                          (this.props.refunds.doc &&
                            this.props.refunds.doc.filter(
                              (refund) => refund.awaitingProductArrival === true
                            )) ||
                          []
                        ).length
                      }
                    </Badge>
                  </>
                }
                key="3"
              >
                <ToolkitProvider
                  data={
                    (this.props.refunds.doc &&
                      this.props.refunds.doc.filter(
                        (refund) =>
                          refund.awaitingProductArrival === true &&
                          refund.resolved === false
                      )) ||
                    []
                  }
                  keyField="_id"
                  columns={[
                    {
                      dataField: 'refundId',
                      text: 'Refund #',
                      sort: true,
                    },
                    {
                      dataField: 'order.orderID',
                      text: 'Order #',
                      sort: true,
                    },
                    {
                      dataField: 'resolved',
                      text: 'Resolved',
                      isDummyField: true,
                      csvExport: false,
                      sort: true,
                      formatter: this.wePaidFormatter,
                    },
                    {
                      dataField: 'status',
                      text: 'Status',
                      sort: true,
                    },
                    {
                      dataField: '',
                      text: '',
                      isDummyField: true,
                      csvExport: false,
                      formatter: this.imageFormatter,
                    },
                    {
                      dataField: 'product.name',
                      text: 'Product',
                      sort: true,
                    },
                    {
                      dataField: 'product.price',
                      text: 'Price',
                      sort: true,
                    },
                    {
                      dataField: 'user.name',
                      text: 'Customer',
                      sort: true,
                    },

                    // {
                    //   dataField: 'status',
                    //   text: 'Status',
                    //   isDummyField: true,
                    //   csvExport: false,
                    //   sort: true,
                    //   formatter: this.activeFormatter,
                    // },

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
                        bordered={false}
                        id="react-bs-table"
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </TabPane>{' '}
              <TabPane
                tab={
                  <>
                    Awaiting payment{'  '}{' '}
                    <Badge color="primary">
                      {
                        (
                          (this.props.refunds.doc &&
                            this.props.refunds.doc.filter(
                              (refund) =>
                                refund.awaitingPaymentToCustomer === true &&
                                //  &&
                                // refund.wePaid === false
                                refund.resolved === false
                            )) ||
                          []
                        ).length
                      }
                    </Badge>
                  </>
                }
                key="11"
              >
                <ToolkitProvider
                  data={
                    (this.props.refunds.doc &&
                      this.props.refunds.doc.filter(
                        (refund) =>
                          refund.awaitingPaymentToCustomer === true &&
                          //  &&
                          // refund.wePaid === false
                          refund.resolved === false
                      )) ||
                    []
                  }
                  keyField="_id"
                  columns={[
                    {
                      dataField: 'refundId',
                      text: 'Refund #',
                      sort: true,
                    },
                    {
                      dataField: 'order.orderID',
                      text: 'Order #',
                      sort: true,
                    },
                    {
                      dataField: 'resolved',
                      text: 'Resolved',
                      isDummyField: true,
                      csvExport: false,
                      sort: true,
                      formatter: this.wePaidFormatter,
                    },
                    {
                      dataField: 'status',
                      text: 'Status',
                      sort: true,
                    },
                    {
                      dataField: '',
                      text: '',
                      isDummyField: true,
                      csvExport: false,
                      formatter: this.imageFormatter,
                    },
                    {
                      dataField: 'product.name',
                      text: 'Product',
                      sort: true,
                    },
                    {
                      dataField: 'product.price',
                      text: 'Price',
                      sort: true,
                    },
                    {
                      dataField: 'user.name',
                      text: 'Customer',
                      sort: true,
                    },

                    // {
                    //   dataField: 'status',
                    //   text: 'Status',
                    //   isDummyField: true,
                    //   csvExport: false,
                    //   sort: true,
                    //   formatter: this.activeFormatter,
                    // },

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
                    Forfeited{'  '}
                    <Badge color="info">
                      {
                        (
                          (this.props.refunds.doc &&
                            this.props.refunds.doc.filter(
                              (refund) => refund.status === 'forfeited'
                            )) ||
                          []
                        ).length
                      }
                    </Badge>
                  </>
                }
                key="5"
              >
                <ToolkitProvider
                  data={
                    (this.props.refunds.doc &&
                      this.props.refunds.doc.filter(
                        (refund) => refund.status === 'forfeited'
                      )) ||
                    []
                  }
                  keyField="_id"
                  columns={[
                    {
                      dataField: 'refundId',
                      text: 'Refund #',
                      sort: true,
                    },
                    {
                      dataField: 'order.orderID',
                      text: 'Order #',
                      sort: true,
                    },
                    {
                      dataField: 'resolved',
                      text: 'Resolved',
                      isDummyField: true,
                      csvExport: false,
                      sort: true,
                      formatter: this.wePaidFormatter,
                    },
                    {
                      dataField: 'status',
                      text: 'Status',
                      sort: true,
                    },
                    {
                      dataField: '',
                      text: '',
                      isDummyField: true,
                      csvExport: false,
                      formatter: this.imageFormatter,
                    },
                    {
                      dataField: 'product.name',
                      text: 'Product',
                      sort: true,
                    },
                    {
                      dataField: 'product.price',
                      text: 'Loss',
                      sort: true,
                    },
                    {
                      dataField: 'user.name',
                      text: 'Customer',
                      sort: true,
                    },

                    // {
                    //   dataField: 'status',
                    //   text: 'Status',
                    //   isDummyField: true,
                    //   csvExport: false,
                    //   sort: true,
                    //   formatter: this.activeFormatter,
                    // },

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
                        bordered={false}
                        id="react-bs-table"
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </TabPane>{' '}
              <TabPane
                tab={
                  <>
                    Resolved{' '}
                    <Badge color="danger">
                      {
                        (
                          (this.props.refunds.doc &&
                            this.props.refunds.doc.filter(
                              (refund) => refund.resolved === true
                            )) ||
                          []
                        ).length
                      }
                    </Badge>
                  </>
                }
                key="10"
              >
                <ToolkitProvider
                  data={
                    (this.props.refunds.doc &&
                      this.props.refunds.doc.filter(
                        (refund) => refund.resolved === true
                      )) ||
                    []
                  }
                  keyField="_id"
                  columns={[
                    {
                      dataField: 'refundId',
                      text: 'Refund #',
                      sort: true,
                    },
                    {
                      dataField: 'order.orderID',
                      text: 'Order #',
                      sort: true,
                    },
                    {
                      dataField: 'resolved',
                      text: 'Resolved',
                      isDummyField: true,
                      csvExport: false,
                      sort: true,
                      formatter: this.wePaidFormatter,
                    },
                    {
                      dataField: 'status',
                      text: 'Status',
                      sort: true,
                    },
                    {
                      dataField: '',
                      text: '',
                      isDummyField: true,
                      csvExport: false,
                      formatter: this.imageFormatter,
                    },
                    {
                      dataField: 'product.name',
                      text: 'Product',
                      sort: true,
                    },
                    {
                      dataField: 'product.price',
                      text: 'Price',
                      sort: true,
                    },
                    {
                      dataField: 'user.name',
                      text: 'Customer',
                      sort: true,
                    },

                    // {
                    //   dataField: 'status',
                    //   text: 'Status',
                    //   isDummyField: true,
                    //   csvExport: false,
                    //   sort: true,
                    //   formatter: this.activeFormatter,
                    // },

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
                    Rejected{' '}
                    {/* <Badge count={5}>
                      <a href="#" className="head-example" />
                    </Badge> */}
                    <Badge className="badge-default">
                      {this.state.show
                        ? (
                            (this.props.refunds.doc &&
                              this.props.refunds.doc.filter(
                                (refund) => refund.status === 'rejected'
                              )) ||
                            []
                          ).length
                        : 0}
                    </Badge>
                  </>
                }
                key="7"
              >
                <ToolkitProvider
                  data={
                    (this.props.refunds.doc &&
                      this.props.refunds.doc.filter(
                        (refund) => refund.status === 'rejected'
                      )) ||
                    []
                  }
                  keyField="_id"
                  columns={[
                    {
                      dataField: 'refundId',
                      text: 'Refund #',
                      sort: true,
                    },
                    {
                      dataField: 'order.orderID',
                      text: 'Order #',
                      sort: true,
                    },
                    {
                      dataField: 'resolved',
                      text: 'Resolved',
                      isDummyField: true,
                      csvExport: false,
                      sort: true,
                      formatter: this.wePaidFormatter,
                    },
                    {
                      dataField: 'status',
                      text: 'Status',
                      sort: true,
                    },
                    {
                      dataField: '',
                      text: '',
                      isDummyField: true,
                      csvExport: false,
                      formatter: this.imageFormatter,
                    },
                    {
                      dataField: 'product.name',
                      text: 'Product',
                      sort: true,
                    },
                    {
                      dataField: 'product.price',
                      text: 'Price',
                      sort: true,
                    },
                    {
                      dataField: 'user.name',
                      text: 'Customer',
                      sort: true,
                    },

                    // {
                    //   dataField: 'status',
                    //   text: 'Status',
                    //   isDummyField: true,
                    //   csvExport: false,
                    //   sort: true,
                    //   formatter: this.activeFormatter,
                    // },

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
                        bordered={false}
                        id="react-bs-table"
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </TabPane>
            </Tabs>
          </Card>
        )}

        {this.state.alert}

        <>
          <Drawer
            width={600}
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <div>
              {' '}
              <div className="col text-left"></div>
              <Descriptions
                bordered
                column="2"
                title={
                  <>
                    {' '}
                    Refund #:{'  '}
                    {this.state.refund && this.state.refund.refundId}{' '}
                  </>
                }
                size={'small'}
                extra={
                  <>
                    {' '}
                    {/* <Button
                      // outline
                      color="default"
                      size="sm"
                      type="button"
                      style={{ marginRight: '5px' }}
                      // onClick={() => this.setState({ visible: true, refund: row })}
                    >
                      Cancel refund
                    </Button> */}{' '}
                    <>
                      {' '}
                      Order #:{'  '}
                      {this.state.refund &&
                        this.state.refund.order.orderID}{' '}
                    </>
                  </>
                }
              >
                <Descriptions.Item span={3} label="Customer details">
                  {this.state.refund && this.state.refund.user.name} <br />
                  {this.state.refund && this.state.refund.user.email} <br />
                  {this.state.refund && this.state.refund.order.phone}
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Reason">
                  <>
                    {this.state.refund && this.state.refund.reason} <br />
                  </>
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Status">
                  {this.state.refund && this.state.refund.status} <br />
                </Descriptions.Item>
                {this.state.refund.status == 'exchangeApproved' ||
                  this.state.refund.status == 'awaitingResponse' ||
                  (this.state.refund.status == 'approved' && (
                    <Descriptions.Item span={3} label="Product collected">
                      <>
                        {' '}
                        {this.state.refund &&
                        this.state.refund.productCollected ? (
                          <i class="fa fa-check-circle"></i>
                        ) : (
                          ' No'
                        )}
                      </>
                    </Descriptions.Item>
                  ))}
                {this.state.refund.status == 'exchangeApproved' ||
                  this.state.refund.status == 'awaitingResponse' ||
                  (this.state.refund.status == 'approved' && (
                    <Descriptions.Item span={3} label="Product received">
                      <>
                        {' '}
                        {this.state.refund &&
                        this.state.refund.weReceivedProduct ? (
                          <i class="fa fa-check-circle"></i>
                        ) : (
                          ' No'
                        )}
                      </>
                    </Descriptions.Item>
                  ))}
                {this.state.refund.status == 'exchangeApproved' ||
                  this.state.refund.status == 'awaitingResponse' ||
                  (this.state.refund.status == 'approved' && (
                    <Descriptions.Item span={3} label="Money returned?">
                      <>
                        {' '}
                        {this.state.refund && this.state.refund.wePaid ? (
                          <i class="fa fa-check-circle"></i>
                        ) : (
                          ' No'
                        )}
                      </>
                    </Descriptions.Item>
                  ))}
                {this.state.refund.status === 'exchangeApproved' && (
                  <Descriptions.Item span={3} label="Collected from vendor">
                    <>
                      {' '}
                      {this.state.refund &&
                      this.state.refund.productCollectedFromVendor ? (
                        <i class="fa fa-check-circle"></i>
                      ) : (
                        ' No'
                      )}
                    </>
                  </Descriptions.Item>
                )}
                {this.state.refund.status === 'exchangeApproved' && (
                  <Descriptions.Item span={3} label="Exchange successful">
                    <>
                      {' '}
                      {this.state.refund &&
                      this.state.refund.productCollectedFromVendor ? (
                        <i class="fa fa-check-circle"></i>
                      ) : (
                        ' No'
                      )}
                    </>
                  </Descriptions.Item>
                )}
                <Descriptions.Item span={3} label="Resolved">
                  <>
                    {' '}
                    {this.state.refund && this.state.refund.resolved ? (
                      <i class="fa fa-check-circle"></i>
                    ) : (
                      ' No'
                    )}
                  </>
                </Descriptions.Item>
                <Descriptions.Item span={3} label="Address">
                  <>
                    {this.state.refund &&
                      this.state.refund.order.shippingAddress.address}{' '}
                    <br />{' '}
                    {this.state.refund &&
                      this.state.refund.order.shippingAddress.city}{' '}
                    <br />{' '}
                    {this.state.refund &&
                      this.state.refund.order.shippingAddress.postalCode}{' '}
                    <br />{' '}
                    {this.state.refund &&
                      this.state.refund.order.shippingAddress.country}{' '}
                    <br />
                  </>
                </Descriptions.Item>
                {this.state.refund.messageToCustomer && (
                  <Descriptions.Item span={3} label="To customer">
                    <>{this.state.refund.messageToCustomer}</>
                  </Descriptions.Item>
                )}
                {this.state.refund.amountPayable && (
                  <Descriptions.Item span={3} label="Amount Payable">
                    <>R{this.state.refund.amountPayable}</>
                  </Descriptions.Item>
                )}
                {this.state.refund.reasonForForfeit && (
                  <Descriptions.Item span={3} label="Forfeit reason">
                    <>R{this.state.refund.reasonForForfeit}</>
                  </Descriptions.Item>
                )}
                <Descriptions.Item span={3} label="Days since fullfillment">
                  <>
                    {Math.round(
                      (Date.now() -
                        Date.parse(
                          this.state.refund && //
                            this.state.refund.order.fullfilledOn
                        )) /
                        (60 * 60 * 24 * 1000)
                    )}{' '}
                    days
                  </>
                </Descriptions.Item>
                {this.state.refund.customerWantsExchange && (
                  <Descriptions.Item span={3} label="Exchange request">
                    <>
                      {' '}
                      {this.state.refund &&
                      this.state.refund.customerWantsExchange ? (
                        <i class="fa fa-check-circle"></i>
                      ) : (
                        ' No'
                      )}
                    </>
                  </Descriptions.Item>
                )}
                {this.state.refund.status === 'forfeited' && (
                  <Descriptions.Item span={3} label="Loss">
                    <>
                      R{' '}
                      {this.state.refund &&
                        this.state.refund.order.boughtProducts.filter(
                          (product) =>
                            product._id === this.state.refund.product._id
                        )[0].price}
                    </>
                  </Descriptions.Item>
                )}
                <Descriptions.Item span={3} label="Payment method">
                  <>
                    {/* R{' '} */}
                    {this.state.refund && this.state.refund.order.paymentMethod}
                  </>
                </Descriptions.Item>
                {this.state.refund.quantity && (
                  <Descriptions.Item span={3} label="Quantity">
                    <>
                      {/* R{' '} */}
                      {this.state.refund && this.state.refund.quantity}
                    </>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>
            <Row>
              {' '}
              <Col>
                {' '}
                <Dropdown.Button
                  style={{ marginTop: '20px', marginBottom: '20px' }}
                  overlay={menu}
                >
                  View dates
                </Dropdown.Button>
              </Col>{' '}
              <Col>
                {' '}
                <Popover
                  // style={{ marginTop: '20px' }}
                  content={
                    this.state.refund &&
                    this.state.refund.order.boughtProducts
                      .filter(
                        (product) =>
                          product._id === this.state.refund.product._id
                      )
                      .map((product) => (
                        <Media className="align-items-center">
                          <Avatar
                            style={{ margin: '10px' }}
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
                                <strong>Color: </strong> {product.color}{' '}
                              </small>{' '}
                              <br color="default" className="bg-default"></br>
                              <small color="info">
                                {' '}
                                <strong>
                                  Refund 0/{product.quantity}{' '}
                                </strong>{' '}
                              </small>
                            </td>
                          </Media>
                        </Media>
                      ))
                  }
                  title="Product details"
                  trigger="click"
                  visible={this.state.visible1}
                  onVisibleChange={this.handleVisible1Change}
                >
                  <Button
                    size="sm"
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                    type="primary"
                  >
                    <i class="fa fa-eye"></i>View product
                  </Button>
                </Popover>
              </Col>{' '}
              <Col>
                {' '}
                {this.state.refund.resolvedBy && this.state.refund.resolved && (
                  <Popover
                    // style={{ marginTop: '20px' }}
                    content={
                      <Media className="align-items-center">
                        <Avatar
                          style={{ margin: '10px' }}
                          shape="square"
                          size={64}
                          src={`http://localhost:5000/img/users/${this.state.refund.resolvedBy.photo}`}
                        />

                        <Media>
                          <td className=" td-name">
                            {'    '} {this.state.refund.resolvedBy.name}
                            {'    '}
                            <br color="default" className="bg-default"></br>
                            <small color="info">
                              {this.state.refund.resolvedBy.email};{' '}
                            </small>
                            <br color="default" className="bg-default"></br>
                            <small color="info">
                              {' '}
                              <strong>Size:</strong>{' '}
                              {this.state.refund.resolvedBy.role}{' '}
                            </small>
                            {/* <br color="default" className="bg-default"></br>
                            <small color="info">
                              <strong>Quantity :</strong> {product.quantity} *{' '}
                              <small>R</small> {product.price}
                            </small>
                            <br color="default" className="bg-default"></br>
                            <small color="info"> Color: {product.color} </small> */}
                          </td>
                        </Media>
                      </Media>
                    }
                    title="Resolved By"
                    trigger="click"
                    visible={this.state.visible2}
                    onVisibleChange={this.handleVisible2Change}
                  >
                    <Button
                      size="sm"
                      style={{ marginTop: '20px', marginBottom: '20px' }}
                    >
                      <i class="fa fa-eye"></i>Resolved by..
                    </Button>
                  </Popover>
                )}
              </Col>
            </Row>
            <Tabs type="card">
              <TabPane tab="Images" key="1">
                {this.state.refund.images &&
                  this.state.refund.images.map((image) => (
                    <Image
                      style={{ margin: '10px' }}
                      width={90}
                      src={`http://localhost:5000/img/refunds/${image}`}
                    />
                  ))}
              </TabPane>
              {this.state.refund.status == 'awaitingResponse' ||
              this.state.refund.status == 'rejected' ? (
                <TabPane tab="Reject" key="2">
                  <Row>
                    {/* {!this.state.refund.messageToCustomer ? ( */}
                    <Col span={12}>
                      <FormGroup>
                        <label
                          className="labels"
                          htmlFor="input-country"
                          style={{
                            fontSize: '13px',
                          }}
                        >
                          Message to customer
                          <span className="text-danger"> *</span>
                        </label>
                        <TextArea
                          className="form-control"
                          id="input-username"
                          placeholder="Please state the reason for rejection this refund request "
                          type="text"
                          name="name"
                          value={this.state.rejectionMessage}
                          onChange={this.handleRejectionChange}
                        />
                      </FormGroup>
                      <Button
                        size="sm"
                        color="success"
                        onClick={(e) => this.onRejectionSubmit(e)}
                        // disabled={!this.state.refund.wePaid ? true : false}
                        block
                      >
                        {this.props.loadingUpdate &&
                          this.props.loadingUpdate && (
                            <Spinner
                              size="sm"
                              style={{ marginRight: 6 }}
                              color="white"
                            />
                          )}{' '}
                        Send rejection message
                      </Button>
                    </Col>
                    {/* ) : null} */}
                  </Row>
                </TabPane>
              ) : null}
              {this.state.refund.status == 'awaitingResponse' ||
              this.state.refund.status == 'approved' ? (
                <TabPane tab="Approve" key="3">
                  {' '}
                  {!this.state.refund.messageToCustomer ? (
                    <>
                      <FormGroup>
                        <label
                          className="labels"
                          htmlFor="input-country"
                          style={{
                            fontSize: '13px',
                          }}
                        >
                          Amount payable in Rands
                          <span className="text-danger"> *</span>
                        </label>
                        <InputNumber
                          min={1}
                          // defaultValue={3}
                          onChange={this.handleAmountChange}
                        />
                      </FormGroup>

                      <FormGroup>
                        <label
                          className="labels"
                          htmlFor="input-country"
                          style={{
                            fontSize: '13px',
                          }}
                        >
                          Message to customer
                          <span className="text-danger"> *</span>
                        </label>
                        <TextArea
                          onChange={this.handleCommentChange}
                          showCount
                          maxLength={300}
                        />
                      </FormGroup>
                    </>
                  ) : null}
                  {!this.state.refund.messageToCustomer ? (
                    <>
                      {' '}
                      <Button
                        onClick={() => this.onCommentSubmit()}
                        block
                        size="sm"
                        color="success"
                      >
                        {this.props.loadingUpdate &&
                          this.props.loadingUpdate && (
                            <Spinner
                              size="sm"
                              style={{ marginRight: 6 }}
                              color="white"
                            />
                          )}{' '}
                        Approve & send message{' '}
                      </Button>
                      <hr />
                    </>
                  ) : null}
                  <h3>
                    {this.state.refund.awaitingCollection == true
                      ? 'Awaiting collection'
                      : null}
                  </h3>{' '}
                  <h3>
                    {this.state.refund.awaitingProductArrival == true
                      ? 'Awaiting product arrival'
                      : null}
                  </h3>
                  <h3>
                    {this.state.refund.awaitingPaymentToCustomer == true
                      ? 'Awaiting payment to customer'
                      : null}
                  </h3>
                  <Row style={{ marginTop: '30px' }}>
                    <Col span={4}>
                      <FormGroup>
                        {this.state.refund.productCollected === true ? (
                          <Checkbox
                            disabled={
                              !this.state.refund.messageToCustomer ||
                              this.state.refund.productCollected === true
                                ? true
                                : false
                            }
                            checked={
                              true
                              // this.state.refund.productCollected ? true : false
                            }
                            onChange={() =>
                              this.props.updateRefund(this.state.refund._id, {
                                productCollected: false,
                                // awaitingCollection: true,
                              }) &
                              this.setState(
                                (state) => (
                                  (state.refund.productCollected = false), state
                                )
                              ) &
                              this.setState(
                                (state) => (
                                  (state.refund.awaitingCollection = true),
                                  state
                                )
                              ) &
                              this.setState(
                                (state) => (
                                  (state.refund.awaitingProductArrival = false),
                                  state
                                )
                              )
                            }
                          >
                            Item collected
                          </Checkbox>
                        ) : (
                          <Checkbox
                            disabled={
                              !this.state.refund.messageToCustomer
                                ? true
                                : false
                            }
                            checked={
                              false
                              // this.state.refund.productCollected ? true : false
                            }
                            onChange={() =>
                              this.props.updateRefund(this.state.refund._id, {
                                productCollected: true,
                                awaitingCollection: false,
                                awaitingProductArrival: true,
                              }) &
                              this.setState(
                                (state) => (
                                  (state.refund.productCollected = true), state
                                )
                              ) &
                              this.setState(
                                (state) => (
                                  (state.refund.awaitingCollection = false),
                                  state
                                )
                              ) &
                              this.setState(
                                (state) => (
                                  (state.refund.awaitingProductArrival = true),
                                  state
                                )
                              )
                            }
                          >
                            Item collected
                          </Checkbox>
                        )}
                      </FormGroup>
                    </Col>
                    <Col span={4}>
                      <FormGroup>
                        {this.state.refund.weReceivedProduct === true ? (
                          <Checkbox
                            disabled={
                              !this.state.refund.productCollected ||
                              this.state.refund.weReceivedProduct === true
                                ? true
                                : false
                            }
                            checked={
                              true
                              // this.state.refund.weReceivedProduct ? true : false
                            }
                            onChange={() =>
                              this.props.updateRefund(this.state.refund._id, {
                                weReceivedProduct: false,
                              }) &
                              this.setState(
                                (state) => (
                                  (state.refund.weReceivedProduct = false),
                                  state
                                )
                              ) &
                              this.setState(
                                (state) => (
                                  (state.refund.awaitingProductArrival = true),
                                  state
                                )
                              ) &
                              this.setState(
                                (state) => (
                                  (state.refund.awaitingPaymentToCustomer = false),
                                  state
                                )
                              )
                            }
                          >
                            Product received?
                          </Checkbox>
                        ) : (
                          <Checkbox
                            disabled={
                              !this.state.refund.productCollected ? true : false
                            }
                            checked={
                              false
                              // this.state.refund.weReceivedProduct ? true : false
                            }
                            onChange={() =>
                              this.props.updateRefund(this.state.refund._id, {
                                weReceivedProduct: true,
                                awaitingProductArrival: false,
                                awaitingPaymentToCustomer: true,
                              }) &
                              this.setState(
                                (state) => (
                                  (state.refund.weReceivedProduct = true), state
                                )
                              ) &
                              this.setState(
                                (state) => (
                                  (state.refund.awaitingProductArrival = false),
                                  state
                                )
                              ) &
                              this.setState(
                                (state) => (
                                  (state.refund.awaitingPaymentToCustomer = true),
                                  state
                                )
                              )
                            }
                          >
                            Product received?
                          </Checkbox>
                        )}
                      </FormGroup>
                    </Col>{' '}
                    <Col span={4}>
                      <FormGroup>
                        {this.state.refund.wePaid === true ? (
                          <Checkbox
                            disabled={
                              !this.state.refund.weReceivedProduct ||
                              this.state.refund.wePaid
                                ? true
                                : false
                            }
                            checked={
                              true
                              // this.state.refund.wePaid ? true : false
                            }
                            onChange={() =>
                              this.props.updateRefund(this.state.refund._id, {
                                wePaid: false,
                              }) &
                              this.setState(
                                (state) => (
                                  (state.refund.wePaid = false), state
                                )
                              )
                            }
                          >
                            Money refunded?
                          </Checkbox>
                        ) : (
                          <Checkbox
                            disabled={
                              !this.state.refund.weReceivedProduct
                                ? true
                                : false
                            }
                            checked={
                              false
                              // this.state.refund.wePaid ? true : false
                            }
                            onChange={() =>
                              this.props.updateRefund(this.state.refund._id, {
                                wePaid: true,
                              }) &
                              this.setState(
                                (state) => ((state.refund.wePaid = true), state)
                              ) &
                              this.setState(
                                (state) => (
                                  (state.refund.awaitingPaymentToCustomer = false),
                                  state
                                )
                              )
                            }
                          >
                            Money refunded?
                          </Checkbox>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>{' '}
                  <Row>
                    <Col span={12}>
                      <Button
                        onClick={() =>
                          this.props.updateRefund(this.state.refund._id, {
                            resolved: true,
                          }) &
                          this.setState(
                            (state) => ((state.refund.resolved = true), state)
                          )
                        }
                        disabled={!this.state.refund.wePaid ? true : false}
                        block
                      >
                        Mark as resolved{' '}
                      </Button>
                    </Col>{' '}
                  </Row>{' '}
                  <Row></Row> <Row></Row>
                </TabPane>
              ) : null}{' '}
              {this.state.refund.status == 'awaitingResponse' ||
              this.state.refund.status == 'exchangeApproved' ? (
                <TabPane tab="Exchange" key="4">
                  {' '}
                  {!this.state.refund.messageToCustomer ? (
                    <>
                      <FormGroup>
                        <label
                          className="labels"
                          htmlFor="input-country"
                          style={{
                            fontSize: '13px',
                          }}
                        >
                          Message to customer
                          <span className="text-danger"> *</span>
                        </label>
                        <TextArea
                          onChange={this.handleCommentChange}
                          showCount
                          maxLength={300}
                        />
                      </FormGroup>
                    </>
                  ) : null}
                  {!this.state.refund.messageToCustomer ? (
                    <>
                      {' '}
                      <Button
                        onClick={() => this.onExchangeSubmit()}
                        block
                        size="sm"
                        color="success"
                      >
                        {this.props.loadingUpdate &&
                          this.props.loadingUpdate && (
                            <Spinner
                              size="sm"
                              style={{ marginRight: 6 }}
                              color="white"
                            />
                          )}{' '}
                        Approve exchange & send message{' '}
                      </Button>
                      <hr />
                    </>
                  ) : null}
                  <h3>
                    {this.state.refund.awaitingAlternateProductCollection ==
                    true
                      ? 'Awaiting collection of product from vendor'
                      : null}
                  </h3>{' '}
                  <h3>
                    {this.state.refund.awaitingProductExchange == true
                      ? 'Awaiting exchange'
                      : null}
                  </h3>
                  <Row style={{ marginTop: '30px' }}>
                    <Col span={6}>
                      <FormGroup>
                        <Checkbox
                          disabled={
                            !this.state.refund.messageToCustomer ||
                            this.state.refund.productCollectedFromVendor
                              ? true
                              : false
                          }
                          checked={
                            // false
                            this.state.refund.productCollectedFromVendor
                              ? true
                              : false
                          }
                          onChange={() =>
                            this.props.updateRefund(this.state.refund._id, {
                              productCollectedFromVendor: true,
                              awaitingProductExchange: true,
                              awaitingAlternateProductCollection: false,
                            }) &
                            this.setState(
                              (state) => (
                                (state.refund.productCollectedFromVendor = true),
                                state
                              )
                            ) &
                            this.setState(
                              (state) => (
                                (state.refund.awaitingProductExchange = true),
                                state
                              )
                            ) &
                            this.setState(
                              (state) => (
                                (state.refund.awaitingAlternateProductCollection = false),
                                state
                              )
                            )
                          }
                        >
                          Collected from vendor
                        </Checkbox>
                      </FormGroup>
                    </Col>
                    <Col span={6}>
                      <FormGroup>
                        {this.state.refund.weReceivedProduct === true ? (
                          <Checkbox
                            disabled={
                              !this.state.refund.productCollected ||
                              this.state.refund.weReceivedProduct === true
                                ? true
                                : false
                            }
                            checked={
                              true
                              // this.state.refund.weReceivedProduct ? true : false
                            }
                            onChange={() =>
                              this.props.updateRefund(this.state.refund._id, {
                                weReceivedProduct: false,
                              }) &
                              this.setState(
                                (state) => (
                                  (state.refund.weReceivedProduct = false),
                                  state
                                )
                              ) &
                              this.setState(
                                (state) => (
                                  (state.refund.awaitingProductArrival = true),
                                  state
                                )
                              ) &
                              this.setState(
                                (state) => (
                                  (state.refund.awaitingPaymentToCustomer = false),
                                  state
                                )
                              )
                            }
                          >
                            Product received?
                          </Checkbox>
                        ) : (
                          <Checkbox
                            disabled={
                              this.state.refund.exchangeSuccessful ||
                              !this.state.refund.productCollectedFromVendor
                                ? true
                                : false
                            }
                            checked={
                              // false
                              this.state.refund.exchangeSuccessful
                                ? true
                                : false
                            }
                            onChange={() =>
                              this.props.updateRefund(this.state.refund._id, {
                                exchangeSuccessful: true,
                                awaitingProductExchange: false,
                                // awaitingPaymentToCustomer: true,
                              }) &
                              this.setState(
                                (state) => (
                                  (state.refund.exchangeSuccessful = true),
                                  state
                                )
                              ) &
                              this.setState(
                                (state) => (
                                  (state.refund.awaitingProductExchange = false),
                                  state
                                )
                              )
                            }
                          >
                            Exchange successfull?
                          </Checkbox>
                        )}
                      </FormGroup>
                    </Col>{' '}
                  </Row>{' '}
                  <Row>
                    <Col span={12}>
                      {this.state.refund.status !== 'resolved' ? (
                        <Button
                          size="sm"
                          color="warning"
                          onClick={() =>
                            this.props.updateRefund(this.state.refund._id, {
                              resolved: true,
                            }) &
                            this.setState(
                              (state) => ((state.refund.resolved = true), state)
                            )
                          }
                          disabled={
                            !this.state.refund.exchangeSuccessful ||
                            this.state.refund.status == 'resolved'
                              ? true
                              : false
                          }
                          block
                        >
                          Mark as resolved{' '}
                        </Button>
                      ) : (
                        <Button size="sm" color="success" disabled={true} block>
                          <i class="fa fa-check-circle"></i> Resolved{' '}
                        </Button>
                      )}{' '}
                    </Col>{' '}
                  </Row>{' '}
                  <Row></Row> <Row></Row>
                </TabPane>
              ) : null}{' '}
              {this.state.refund.status == 'awaitingResponse' ||
              this.state.refund.status == 'forfeited' ? (
                <TabPane tab="Foifeit item" key="5">
                  <Row>
                    <Col span={12}>
                      {!this.state.refund.messageToCustomer && (
                        <>
                          <FormGroup>
                            <label
                              className="labels"
                              htmlFor="input-country"
                              style={{
                                fontSize: '13px',
                              }}
                            >
                              Reason for forfeit
                              <span className="text-danger"> *</span>
                            </label>
                            <TextArea
                              rows={2}
                              className="form-control"
                              id="input-username"
                              placeholder="Please state a proper reason for forfeiting this product "
                              type="text"
                              name="name"
                              onChange={this.handleForfeitChange}
                            />
                          </FormGroup>{' '}
                          <FormGroup>
                            <label
                              className="labels"
                              htmlFor="input-country"
                              style={{
                                fontSize: '13px',
                              }}
                            >
                              Message to customer
                              <span className="text-danger"> *</span>
                            </label>
                            <TextArea
                              rows={2}
                              className="form-control"
                              id="input-username"
                              placeholder="Please provide a message to the customer "
                              type="text"
                              name="name"
                              // defaultValue={
                              //   this.state.subCatergory && this.state.subCatergory.name
                              // }
                              onChange={this.handleRejectionChange}
                            />
                          </FormGroup>
                          <Button
                            size="sm"
                            color="success"
                            onClick={() => this.onForfeitSubmit()}
                            // disabled={!this.state.refund.wePaid ? true : false}
                            block
                          >
                            {this.props.loadingUpdate &&
                              this.props.loadingUpdate && (
                                <Spinner
                                  size="sm"
                                  style={{ marginRight: 6 }}
                                  color="white"
                                />
                              )}{' '}
                            Confirm as forfeited
                          </Button>
                        </>
                      )}
                      <h3>
                        {this.state.refund.awaitingPaymentToCustomer == true
                          ? 'Awaiting payment to customer'
                          : null}
                      </h3>
                      <hr />
                      <Row style={{ marginTop: '30px' }}>
                        <Col span={4}>
                          <FormGroup>
                            {this.state.refund.wePaid ? (
                              <Checkbox
                                // disabled={
                                //   !this.state.refund.awaitingCustomerPayment
                                //     ? true
                                //     : false
                                // }
                                checked={
                                  true
                                  // this.state.refund.wePaid ? true : false
                                }
                                onChange={() =>
                                  this.props.updateRefund(
                                    this.state.refund._id,
                                    {
                                      wePaid: true,
                                    }
                                  ) &
                                  this.setState(
                                    (state) => (
                                      (state.refund.wePaid = false), state
                                    )
                                  )
                                }
                              >
                                Money refunded?
                              </Checkbox>
                            ) : (
                              <Checkbox
                                disabled={
                                  !this.state.refund.messageToCustomer ||
                                  this.state.refund.wePaid === true
                                    ? true
                                    : false
                                }
                                checked={
                                  false
                                  // this.state.refund.wePaid ? true : false
                                }
                                onChange={() =>
                                  this.props.updateRefund(
                                    this.state.refund._id,
                                    {
                                      wePaid: true,
                                      awaitingPaymentToCustomer: false,
                                    }
                                  ) &
                                  this.setState(
                                    (state) => (
                                      (state.refund.wePaid = true), state
                                    )
                                  ) &
                                  this.setState(
                                    (state) => (
                                      (state.refund.awaitingPaymentToCustomer = false),
                                      state
                                    )
                                  )
                                }
                              >
                                Money refunded?
                              </Checkbox>
                            )}
                          </FormGroup>
                        </Col>{' '}
                      </Row>{' '}
                      <Row>
                        <Col span={12}>
                          <Button
                            size="sm"
                            color="warning"
                            onClick={() =>
                              this.props.updateRefund(this.state.refund._id, {
                                resolved: true,
                              }) &
                              this.setState(
                                (state) => (
                                  (state.refund.resolved = true), state
                                )
                              )
                            }
                            disabled={!this.state.refund.wePaid ? true : false}
                            block
                          >
                            {this.props.loadingUpdate &&
                              this.props.loadingUpdate && (
                                <Spinner
                                  size="sm"
                                  style={{ marginRight: 6 }}
                                  color="white"
                                />
                              )}{' '}
                            Mark as resolved{' '}
                          </Button>
                        </Col>{' '}
                      </Row>{' '}
                    </Col>
                    {/* ) : null} */}
                  </Row>
                </TabPane>
              ) : null}
            </Tabs>
            ,
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
};

const mapStateToProps = (state) => ({
  loadingUpdate: state.updatedRefund.loading,
  loading: state.allRefunds.loading,
  auth: state.auth,
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
  refunds: state.allRefunds.refunds,
});

export default connect(mapStateToProps, {
  getProduct,
  logout,
  getAllRefunds,
  getRefund,
  loadMyPlug,
  updateRefund,
  setAlert,
  approvePlug,
  getPlugStats,
  updateProduct,
  deleteProduct,
  getDueAmount,
})(OrderTable);
