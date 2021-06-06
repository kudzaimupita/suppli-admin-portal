import React from 'react';
import ReactToPrint from 'react-to-print';
// react component for creating dynamic tables
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {
  Container,
  ButtonGroup,
  Col,
  FormGroup,
  Form,
  UncontrolledTooltip,
  Row,
  Button,
  Badge,
} from 'reactstrap';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { Avatar, Card, Upload, Input, message, Drawer, Spin } from 'antd';

// import {getAllCatergories } from '../actions/catergories';
import { getProduct, deleteProduct, updateProduct } from '../actions/products';
import { loadMyPlug } from '../actions/auth';
import {
  getCatergories,
  deleteCatergory,
  updateCatergory,
} from '../actions/catergories';
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
        }{' '}
        entries.
      </label>
    </div>
  ),
});

const { SearchBar } = Search;
function getBase64(file, callback) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class OrderTable extends React.Component {
  componentDidMount() {
    this.props.getCatergories();
  }
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  state = {
    bannerLink: '',
    visible: false,
    imagUrl1: '',
    imagUrl: '',
    imageCover: null,
    loading: false,
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    productId: '',
    was: '',
    price: '',
    originalPrice: '',
    emptyWas: '',
    onClearance: true,
    noClearance: false,
    alert: null,
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    // const data = this.state;
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  handleCoverChange = (info, file) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    this.setState({ imageCover: info.file.originFileObj });
    // this.setState({imageCover:info.file.})
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  handleBannerChange = (info, file) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    this.setState({ imageBanner: info.file.originFileObj });
    // this.setState({imageCover:info.file.})
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl1) =>
        this.setState({
          imageUrl1,
          loading: false,
        })
      );
    }
  };

  beforeUpload(file) {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG/JPEG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleBannerLinkChange = (e) => {
    this.setState({ bannerLink: e.target.value });
  };
  dateFormatter = (cell, row) => <>{row.createdOn.slice(0, 10)}</>;
  imageFormatter = (cell, row) => (
    <Avatar
      shape="square"
      size={24}
      src={`https://suppli-images.s3.af-south-1.amazonaws.com/${row.imageCover}`}
    />
  );
  activeFormatter = (cell, row) => (
    <div className="d-flex align-items-center">
      <Badge
        color="info"
        href="/"
        onClick={(e) =>
          this.setState({ catergory: row }) &
          this.setState({ visible: true }) &
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
          this.props.deleteCatergory(row._id, e) & e.preventDefault()
        }
      >
        Delete
      </Badge>
    </div>
  );

  dateFormatter = (cell, row) => <>{row.createdOn.slice(0, 10)}</>;

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
  uploadButton = (
    <div>
      {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  onSubSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();

    this.state.name && data.append('name', this.state.name);
    this.state.bannerLink && data.append('bannerLink', this.state.bannerLink);

    this.state.imageCover && data.append('imageCover', this.state.imageCover);
    this.state.imageBanner &&
      data.append('imageBanner', this.state.imageBanner);

    this.props.updateCatergory(data, this.state.catergory._id);
    this.setState({
      imageCover: '',
      imageBanner: '',
      bannerLink: '',
      name: '',
      visible: false,
    });
  };
  render() {
    const { loading, imageUrl, imageUrl1 } = this.state;
    // const
    console.log(this.state);
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        {this.props.loading && this.props.loading && (
          <div className="example">
            <Spin size="large" />
          </div>
        )}
        {this.state.alert}
        <ToolkitProvider
          data={(this.props.catergories && this.props.catergories) || []}
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
              dataField: 'plugs.length',
              text: 'Stores',
              sort: true,
            },
            {
              dataField: 'subCatergories.length',
              text: 'Subs',
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
          key={this.state.catergory && this.state.catergory._id}
        >
          <p
            className="site-description-item-profile-p"
            style={{ marginBottom: 24 }}
          >
            Edit catergory
          </p>
          <Form>
            {' '}
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
                      this.state.catergory && this.state.catergory.name
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
                    Banner Link
                    <span className="text-danger"> *</span>
                  </label>
                  <Input
                    className="form-control"
                    id="input-username"
                    placeholder="eg Russell Hobbs fruit blender "
                    type="text"
                    name="name"
                    defaultValue={
                      this.state.catergory && this.state.catergory.bannerLink
                    }
                    onChange={this.handleBannerLinkChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormGroup>
                  <label
                    className="labels"
                    htmlFor="input-country"
                    style={{ fontSize: '13px' }}
                  >
                    Cover image
                    <span className="text-danger"> *</span>
                  </label>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleCoverChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      <img
                        //  src={}
                        src={`https://suppli-images.s3.af-south-1.amazonaws.com/${
                          this.state.catergory &&
                          this.state.catergory.imageCover
                        }`}
                        alt="avatar"
                        style={{ width: '100%' }}
                      />
                    )}
                  </Upload>
                </FormGroup>
              </Col>
              <Col span={12}>
                <FormGroup>
                  <label
                    className="labels"
                    htmlFor="input-country"
                    style={{ fontSize: '13px' }}
                  >
                    Banner image<span className="text-danger"> *</span>
                  </label>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleBannerChange}
                  >
                    {imageUrl1 ? (
                      <img
                        src={imageUrl1}
                        alt="avatar"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      <img
                        //  src={}
                        src={`https://suppli-images.s3.af-south-1.amazonaws.com/${
                          this.state.catergory &&
                          this.state.catergory.imageBanner
                        }`}
                        alt="avatar"
                        style={{ width: '100%' }}
                      />
                    )}
                  </Upload>
                </FormGroup>{' '}
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Button
                  block
                  style={{ marginLeft: '6px' }}
                  color="info"
                  onClick={(e) => this.onSubSubmit(e)}
                  size="sm"
                >
                  {'   '}
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
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
  auth: state.auth,
  loading: state.allCatergories.loading,
  product: state.product.product,
  isAuthenticated: state.auth,
  cartItems: state.cart.cartItems,
  myPlug: state.myPlug.plug,
  orders: state.plugSales.orders,
  amountDue: state.unBalancedSales.stats,
  products: state.allProducts.products,
  catergories: state.allCatergories.catergories,
});

export default connect(mapStateToProps, {
  getProduct,

  updateCatergory,
  getCatergories,
  loadMyPlug,

  setAlert,
  deleteCatergory,
  getPlugStats,
  updateProduct,
  deleteProduct,
  getDueAmount,
})(OrderTable);
