import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import GeneralHeader from '../../components/Headers/GeneralHeader';
import { Input } from 'antd';

import SubCatergories from '../../components/SubCatergories';
import { createSubCatergory } from '../../actions/subCatergories';
import { createProduct } from '../../actions/products';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import Select from 'react-select';

class Tables extends React.Component {
  state = {
    singleSelect: '',
    name: '',
  };
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleSubCatergoryChange = (singleSelect) => {
    this.setState({ singleSelect });
  };

  onSubmit = async (e) => {
    this.props.createSubCatergory({
      name: this.state.name,
      catergory: this.state.singleSelect.value,
    });
    this.setState({ name: '', singleSelect: '' });
  };

  render() {
    console.log(this.state);
    return (
      <>
        <GeneralHeader />
        <Container className="mt--7  bg-secondary" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              {' '}
              <SubCatergories />
            </Col>
            <Col className="mb-5 mb-xl-0" xl="4">
              <div className="card bg-dark">
                {/* Card body */}
                <div className="card-body">
                  <div className="row justify-content-between align-items-center">
                    <div className="col">
                      <h4 style={{ color: 'white' }}>Create sub-catergory</h4>
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
                          placeholder="name "
                          type="text"
                        />
                      </div>
                      <div className="mt-4">
                        <div className="form-group">
                          {' '}
                          <Select
                            size="sm"
                            className="react-select react-select-primary"
                            classNamePrefix="react-select"
                            name="singleSelect"
                            value={this.state.singleSelect}
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
                        </div>
                      </div>
                      <button
                        onClick={() => this.onSubmit()}
                        type="button"
                        className="btn btn-block btn-info"
                      >
                        Create
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

  createSubCatergory,
})(Tables);
