import React from 'react';

import { Container, Row, Col, FormGroup } from 'reactstrap';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Catergories from '../../components/Catergories';
import { createCatergory } from '../../actions/catergories';
import { createProduct } from '../../actions/products';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import GeneralHeader from '../../components/Headers/GeneralHeader';
import { Upload, message, Input } from 'antd';

function getBase64(file, callback) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class Tables extends React.Component {
  state = {
    bannerLink: '',
    name: '',
    imageCover: null,
    imageBanner: null,
    loading: false,
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

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

  handleLinkChange = (e) => {
    this.setState({ bannerLink: e.target.value });
  };

  onSubmit = async (e) => {
    const data = new FormData();

    data.append('name', this.state.name);
    data.append('bannerLink', this.state.bannerLink);

    data.append('imageCover', this.state.imageCover);
    data.append('imageBanner', this.state.imageBanner);

    this.props.createCatergory(data);
    this.setState({ name: '', bannerLink: '' });
  };

  render() {
    console.log(this.state);
    const { loading, imageUrl, imageUrl1 } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <GeneralHeader />
        <Container className="mt--7  bg-secondary" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              {' '}
              <Catergories />
            </Col>
            <Col className="mb-5 mb-xl-0" xl="4">
              <div className="card bg-dark">
                <div className="card-body">
                  <div className="row justify-content-between align-items-center">
                    <div className="col">
                      <h4 style={{ color: 'white' }}>Create Catergory</h4>
                    </div>
                  </div>
                  <div className="mt-4">
                    <form className="form-primary">
                      <div className="form-group">
                        <Input
                          className="form-control"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleNameChange}
                          placeholder=" Catergory name "
                          type="text"
                        />
                      </div>
                      <div className="form-group">
                        <Input
                          className="form-control"
                          name="Link"
                          value={this.state.bannerLink}
                          onChange={this.handleLinkChange}
                          placeholder=" Banner link "
                          type="text"
                        />
                      </div>
                      <Row>
                        <Col xl="6">
                          <FormGroup>
                            {' '}
                            <label
                              className="labels"
                              htmlFor="input-country"
                              style={{ fontSize: '13px', color: 'white' }}
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
                                uploadButton
                              )}
                            </Upload>
                          </FormGroup>
                        </Col>
                        <Col xl="6">
                          <FormGroup>
                            <label
                              className="labels"
                              htmlFor="input-country"
                              style={{ fontSize: '13px', color: 'white' }}
                            >
                              Banner image
                              <span className="text-danger"> *</span>
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
                              {imageUrl ? (
                                <img
                                  src={imageUrl1}
                                  alt="avatar"
                                  style={{ width: '100%' }}
                                />
                              ) : (
                                uploadButton
                              )}
                            </Upload>
                          </FormGroup>
                        </Col>
                      </Row>

                      <button
                        type="button"
                        onClick={() => this.onSubmit()}
                        className="btn btn-block btn-info"
                      >
                        Create catergory
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.isAuthenticated,
  isAuthenticated: state.auth,
  loading: state.auth.loading,
  createdPlugLoading: state.createdPlug.loading,
  catergories: state.catergories.catergories,
  myPlug: state.myPlug,
});

export default connect(mapStateToProps, {
  createProduct,
  setAlert,

  createCatergory,
})(Tables);
