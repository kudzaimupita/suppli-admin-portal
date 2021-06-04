import React from 'react';

import {
  UncontrolledCollapse,
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';

import UserHeader from '../../components/Headers/Header';

import PlugSettings from '../../components/PlugSettings';

import { createPlug, updatePlug } from '../../actions/plugs';
import { createProduct } from '../../actions/products';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

class Profile extends React.Component {
  state = {
    accountNumber: '',
    holderName: '',
    holderSurname: '',
    accountBranchCode: '',
    bankName: '',
    logo: '',
  };

  handleBranchCodeChange = (e) => {
    this.setState({ accountBranchCode: e.target.value });
  };

  handleNumberChange = (e) => {
    this.setState({ accountNumber: e.target.value });
  };

  handleBankNameChange = (e) => {
    this.setState({ bankName: e.target.value });
  };

  handleHolderNameChange = (e) => {
    this.setState({ holderName: e.target.value });
  };

  handleHolderSurnameChange = (e) => {
    this.setState({ holderSurname: e.target.value });
  };

  onSubmit = async (e) => {
    const data = new FormData();

    this.state.holderName &&
      data.append('accountHolderName', this.state.holderName);
    this.state.holderName &&
      data.append('accountHolderSurname', this.state.holderSurname);
    this.state.accountNumber &&
      data.append('accountNumber', this.state.accountNumber);
    this.state.accountBranchCode &&
      data.append('accountBranchCode', this.state.accountBranchCode);
    this.state.bankName && data.append('bankName', this.state.bankName);

    this.props.updatePlug(data, this.props.history);
  };

  render() {
    console.log(this.state);
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Button color="default" href="#collapseExample" id="linkToggler">
                <i className="ni ni-key-25 " /> Edit bank details
              </Button>
              <UncontrolledCollapse toggler="#linkToggler,#buttonToggler">
                <Card
                  className="card-stats mb-4 mb-xl-0 xc"
                  color="default"
                  style={{ marginTop: '20px' }}
                >
                  {' '}
                  <CardBody>
                    <Form>
                      {' '}
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                          size="sm"
                        >
                          Account number*
                        </label>
                        <Input
                          className="form-control"
                          id="input-username"
                          type="number"
                          size="sm"
                          defaultValue={
                            this.props.myPlug.plug &&
                            this.props.myPlug.plug.accountNumber
                          }
                          onChange={this.handleNumberChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                          size="sm"
                        >
                          Branch code
                        </label>
                        <Input
                          className="form-control"
                          id="input-username"
                          type="number"
                          size="sm"
                          onChange={this.handleBranchCodeChange}
                          defaultValue={
                            this.props.myPlug.plug &&
                            this.props.myPlug.plug.accountBranchCode
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                          size="sm"
                        >
                          Bank name*
                        </label>
                        <Input
                          className="form-control"
                          id="input-username"
                          type="text"
                          size="sm"
                          onChange={this.handleBankNameChange}
                          defaultValue={
                            this.props.myPlug.plug &&
                            this.props.myPlug.plug.bankName
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                          size="sm"
                        >
                          Account holder name*
                        </label>
                        <Input
                          className="form-control"
                          id="input-username"
                          type="text"
                          size="sm"
                          onChange={this.handleHolderNameChange}
                          defaultValue={
                            this.props.myPlug.plug &&
                            this.props.myPlug.plug.accountHolderName
                          }
                        />
                      </FormGroup>
                    </Form>

                    <p className="mt-3 mb-0 text-muted text-sm"></p>
                    <Col>
                      <Button
                        block
                        size="sm"
                        color="success"
                        onClick={() => this.onSubmit()}
                      >
                        Update bank details{' '}
                        <span className="text-white mr-1">
                          <i class="fa fa-cc-mastercard"></i>{' '}
                          <i class="fa fa-cc-visa"></i>
                        </span>{' '}
                      </Button>
                    </Col>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
            </Col>
            <Col className="order-xl-1" xl="8">
              {' '}
              <PlugSettings />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
Profile.defaultProps = {
  catergories: [],
};

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
  updatePlug,
  createPlug,
})(Profile);
