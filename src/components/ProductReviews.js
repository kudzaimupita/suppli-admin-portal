import React from 'react';
import ReactToPrint from 'react-to-print';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import { connect } from 'react-redux';

import { logout } from '../actions/auth';

import { getProduct, deleteProduct, updateProduct } from '../actions/products';
import { loadMyPlug } from '../actions/auth';

import { getPlugStats, getDueAmount } from '../actions/plugs';
import { Result, Card, Table, Spin } from 'antd';
import ReactBSAlert from 'react-bootstrap-sweetalert';

import {
  Container,
  ButtonGroup,
  Button,
  Col,
  UncontrolledTooltip,
  Row,
} from 'reactstrap';

import { setAlert } from '../actions/alert';

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
        }{' '}
        entries.
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
  dateFormatter = (cell, row) => <>{row.createdAt.slice(0, 10)}</>;

  onSubmit = async (e) => {
    if (this.state.was < 1 || this.state.was < this.state.originalPrice)
      return this.props.setAlert(
        'Please enter a sale price larger than the current price',
        'danger'
      );
    const data = new FormData();

    data.append('was', this.state.was);

    this.props.updateProduct(this.state.productId, data);
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
          style={{ display: 'block', marginTop: '-100px' }}
          title="Good job!"
          onConfirm={() => this.setState({ alert: null })}
          onCancel={() => this.setState({ alert: null })}
          confirmBtnBsStyle="info"
          btnSize=""
        >
          Copied to clipboard!
        </ReactBSAlert>
      ),
    });
  };
  render() {
    console.log(this.state);
    const columns = [
      { title: 'Author name', dataIndex: 'user.name', key: 'name' },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
      { title: 'Rating', dataIndex: 'rating', key: 'rating' },
      { title: 'Address', dataIndex: 'address', key: '_id' },
      {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
        render: (user) => <a>{user.name}</a>,
      },
    ];

    const data = this.props.productReviews && this.props.productReviews;

    return (
      <>
        {this.props.loading && this.props.loading && (
          <div className="example">
            <Spin size="large" />
          </div>
        )}
        {this.props.productReviews && this.props.productReviews.length === 0 && (
          <Card>
            {' '}
            <Result
              status="404"
              // title="404"
              subTitle="Oops, seems like theres no shop reviews yet."
              extra={<Button type="primary">Back Home</Button>}
            />
          </Card>
        )}

        {this.state.alert}
        {this.props.productReviews && this.props.productReviews.length !== 0 && (
          <ToolkitProvider
            data={
              (this.props.productReviews && this.props.productReviews) || []
            }
            keyField="_id"
            columns={[
              {
                dataField: 'product.name',
                text: 'Product',
                sort: true,
              },
              {
                dataField: 'actions',
                text: 'Created On',
                isDummyField: true,
                csvExport: false,
                formatter: this.dateFormatter,
              },
              {
                dataField: 'user.name',
                text: 'User',
                sort: true,
              },
              {
                dataField: 'rating',
                text: 'Rating',
                sort: true,
              },

              {
                dataField: 'review',
                text: 'Review',
                sort: true,
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
        )}
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
  loading: state.allProductReviews.loading,
  product: state.product.product,
  isAuthenticated: state.auth,
  cartItems: state.cart.cartItems,
  myPlug: state.myPlug.plug,
  orders: state.plugSales.orders,
  amountDue: state.unBalancedSales.stats,
  productReviews: state.allProductReviews.productReviews,
  subCatergories: state.allSubCatergories.subCatergories,
});

export default connect(mapStateToProps, {
  getProduct,
  logout,
  loadMyPlug,
  setAlert,
  getPlugStats,
  updateProduct,
  deleteProduct,
  getDueAmount,
})(OrderTable);
