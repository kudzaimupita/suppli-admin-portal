import React from 'react';
import ReactToPrint from 'react-to-print';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Drawer, Card, Button, Input, Spin } from 'antd';
import { connect } from 'react-redux';

import Select from 'react-select';

import ReactBSAlert from 'react-bootstrap-sweetalert';

import {
  ButtonGroup,
  Col,
  UncontrolledTooltip,
  Row,
  FormGroup,
  Badge,
} from 'reactstrap';

import { setAlert } from '../actions/alert';
import { logout } from '../actions/auth';

import { getProduct, deleteProduct, updateProduct } from '../actions/products';
import { getSubCategories } from '../actions/subCatergories';
import { loadMyPlug } from '../actions/auth';
import {
  deleteSubCatergory,
  updateSubCatergory,
} from '../actions/subCatergories';
import { getPlugStats, getDueAmount } from '../actions/plugs';

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
const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
class OrderTable extends React.Component {
  componentDidMount() {
    this.props.getSubCategories();
  }
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };
  handleSubCatergoryChange = (singleSelect) => {
    this.setState({ singleSelect });
    // this.setState({ subCatergory:multipleSelect.value });
  };

  state = {
    subCatergory: {},
    visible: false,
    productId: '',
    was: '',
    price: '',
    originalPrice: '',
    emptyWas: '',
    onClearance: true,
    noClearance: false,
    alert: null,
    name: '',
    singleSelect: '',
  };
  state = {
    visible: false,
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };
  onSubmit = async () => {
    this.props.updateSubCatergory(this.state.id, {
      name: this.state.name && this.state.name,
      catergory:
        (this.state.singleSelect && this.state.singleSelect.value) ||
        this.state.subCatergory.catergory._id,
    });
  };
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  dateFormatter = (cell, row) => <>{row.createdOn.slice(0, 10)}</>;

  activeFormatter = (cell, row) => (
    <div className="d-flex align-items-center">
      <Badge
        color="info"
        href="/"
        onClick={(e) =>
          this.setState({ subCatergory: row, id: row._id, visible: true }) &
          e.preventDefault()
        }
      >
        <i class="fa fa-edit"></i>Edit
      </Badge>{' '}
      <Badge
        color="danger"
        href="/"
        style={{ marginLeft: '9px' }}
        onClick={(e) =>
          this.props.deleteSubCatergory(row._id, e) & e.preventDefault()
        }
      >
        Delete
      </Badge>
    </div>
  );

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
    return (
      <>
        {' '}
        {this.props.loading && this.props.loading && (
          <div className="example">
            <Spin size="large" />
          </div>
        )}
        {/* <Map/> */}
        {this.state.alert}
        <ToolkitProvider
          data={(this.props.subCatergories && this.props.subCatergories) || []}
          keyField="_id"
          columns={[
            {
              dataField: 'name',
              text: 'Name',
              sort: true,
            },

            {
              dataField: 'products.length',
              text: 'Products',
              sort: true,
            },
            {
              dataField: 'catergory.name',
              text: 'Catergory',
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
              dataField: 'actions',
              text: '',
              isDummyField: true,
              csvExport: false,
              formatter: this.activeFormatter,
            },
          ]}
          search
        >
          {(props) => (
            <Card>
              {' '}
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
                        This will open a print page with the visible rows of the
                        table.
                      </UncontrolledTooltip>
                      <UncontrolledTooltip
                        placement="top"
                        target="copy-tooltip"
                      >
                        This will copy to your clipboard the visible rows of the
                        table.
                      </UncontrolledTooltip>
                    </div>
                  </Col>
                </Row>{' '}
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
            </Card>
          )}
        </ToolkitProvider>
        <Drawer
          width={400}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          key={this.state.subCatergory && this.state.subCatergory._id}
        >
          <p
            className="site-description-item-profile-p"
            style={{ marginBottom: 24 }}
          >
            Edit Sub-Catergory
          </p>

          <Row>
            <Col span={12}>
              <FormGroup>
                <label
                  className="labels"
                  htmlFor="input-country"
                  style={{
                    fontSize: '13px',
                  }}
                >
                  Catergory name
                  <span className="text-danger"> *</span>
                </label>
                <Input
                  className="form-control"
                  id="input-username"
                  placeholder="eg Russell Hobbs fruit blender "
                  type="text"
                  name="name"
                  defaultValue={
                    this.state.subCatergory && this.state.subCatergory.name
                  }
                  onChange={this.handleNameChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {' '}
            <Col span={12}>
              <FormGroup>
                <label
                  className="labels"
                  htmlFor="input-country"
                  style={{
                    fontSize: '13px',
                  }}
                >
                  Catergory
                  <span className="text-danger"> *</span>
                </label>
                <Select
                  size="sm"
                  className="react-select react-select-primary"
                  classNamePrefix="react-select"
                  name="singleSelect"
                  defaultValue={
                    this.state.subCatergory && {
                      value: this.state.subCatergory.catergory._id,
                      label: this.state.subCatergory.catergory.name,
                    }
                  }
                  onChange={this.handleSubCatergoryChange}
                  options={
                    this.props.catergories &&
                    this.props.catergories.map((catergory) => ({
                      value: catergory._id,
                      label: catergory.name,
                    }))
                  }
                  placeholder="Select catergory"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row></Row>
          <Row>
            <Col span={12}>
              <Button
                block
                style={{ marginLeft: '6px' }}
                color="info"
                onClick={() => this.onSubmit()}
                size="sm"
              >
                {'   '}
                Update
              </Button>
            </Col>
          </Row>
        </Drawer>
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
  loading: state.allSubCatergories.loading,
  auth: state.auth,
  product: state.product.product,
  isAuthenticated: state.auth,
  cartItems: state.cart.cartItems,
  myPlug: state.myPlug.plug,
  orders: state.plugSales.orders,
  amountDue: state.unBalancedSales.stats,
  products: state.allProducts.products,
  subCatergories: state.allSubCatergories.subCatergories,
  catergories: state.allCatergories.catergories,
});

export default connect(mapStateToProps, {
  getProduct,
  deleteSubCatergory,
  updateSubCatergory,
  logout,
  loadMyPlug,
  setAlert,
  getSubCategories,
  getPlugStats,
  updateProduct,
  deleteProduct,
  getDueAmount,
})(OrderTable);
