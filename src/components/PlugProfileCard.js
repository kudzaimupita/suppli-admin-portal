import React from 'react';

import {
  createPlug,
  getPlug,
  followPlug,
  unfollowPlug,
} from '../actions/plugs';
import { connect } from 'react-redux';
import { Avatar, Result, Button } from 'antd';
import { setAlert } from '../actions/alert';
import { updateOrder } from '../actions/orders';

import Select from 'react-select';
// reactstrap components
import { Badge, Table, Card, CardHeader, Media, Row } from 'reactstrap';

class Cards extends React.Component {
  state = {
    id: '',
    plugsBalanced: true,
    plugsNotBalanced: false,
    orderId: '',
    singleSelect: this.props.order[0] && {
      value: this.props.order[0].status,
      label: this.props.order[0].status,
    },
  };

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

  render() {
    console.log(this.state);
    return (
      <>
        {!this.props.order[0] && (
          <Card>
            {' '}
            <Result
              status="404"
              title="Hey there"
              subTitle="Select an order to view the details."
              // extra={<Button type="primary">Back Home</Button>}
            />
          </Card>
        )}
        {this.props.order[0] && (
          <Card className="card-profile" style={{ marginBottom: '30px' }}>
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="row" style={{ marginLeft: '20px' }}>
                  {this.props.order[0] && this.props.order[0] ? (
                    <h4>Order no:{'  '}</h4>
                  ) : (
                    <h4>Select an Order{'  '}</h4>
                  )}{' '}
                  {'  '}{' '}
                  <h4 className="mb-0" style={{ color: 'red' }} color="danger">
                    {' '}
                    {'  '}
                    {this.props.order[0] && this.props.order[0].orderID}
                  </h4>
                </div>
                <div className="col text-center" style={{ marginLeft: '30px' }}>
                  {this.props.order[0] && (
                    <Select
                      style={{ width: '600px' }}
                      // size="sm"
                      className="react-select react-select-primary"
                      classNamePrefix="react-select"
                      name="singleSelect"
                      value={this.state.singleSelect}
                      onChange={this.handleStatusChange}
                      options={[
                        { value: 'processing', label: 'Processing' },
                        { value: 'enroute', label: 'Enroute' },
                        { value: 'fullfilled', label: 'Fullfilled' },
                      ]}
                      // placeholder="Choose gender"
                    />
                  )}
                </div>{' '}
                {this.props.order[0] && (
                  <Button
                    style={{ marginLeft: '6px' }}
                    color="default"
                    size="sm"
                    onClick={() =>
                      this.onStatusSubmit(
                        this.props.order[0] && this.props.order[0]._id
                      )
                    }
                  >
                    {' '}
                    <i class="ni ni-fat-remove">
                      <small>Update </small>
                    </i>
                  </Button>
                )}
              </Row>
            </CardHeader>
            <Table responsive className="align-items-center table-flush">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <i className="ni ni-mobile-button text-black" /> Status
                  </th>
                  <td>
                    <Badge color="" className="badge-dot m2-4 ">
                      {this.props.order[0] &&
                      this.props.order[0].status === 'processing' ? (
                        <>
                          <i className="bg-danger" />
                          <i className="ni ni-shop"></i>
                        </>
                      ) : null}
                      {this.props.order[0] &&
                      this.props.order[0].status === 'fullfilled' ? (
                        <>
                          <i className="bg-success" />{' '}
                          <i className="ni ni-satisfied"></i>
                        </>
                      ) : null}
                      {this.props.order[0] &&
                      this.props.order[0].status === 'enroute' ? (
                        <>
                          <i className="bg-warning" />
                          <i className="ni ni-delivery-fast"></i>
                        </>
                      ) : null}
                      {this.props.order[0] &&
                      this.props.order[0].status === 'cancelled' ? (
                        <i className="bg-danger" />
                      ) : null}
                    </Badge>
                    {this.props.order[0] && this.props.order[0].status}
                    {this.props.order[0] && ':     '}{' '}
                    {this.props.order[0] &&
                    this.props.order[0].plugsBalanced ? (
                      <>
                        {' '}
                        <i class="fa fa-check-circle"></i> Paid for
                      </>
                    ) : (
                      <>
                        {' '}
                        {this.props.order[0] && (
                          <>
                            <i class="fa fa-times"></i>Not yet paid for
                          </>
                        )}
                      </>
                    )}
                  </td>
                </tr>

                <tr>
                  <th scope="row">
                    <i className="ni ni-circle-08 text-black" /> Customer
                  </th>
                  <td>
                    {' '}
                    <Media className="align-items-center">
                      {this.props.order[0] && (
                        <Avatar
                          shape="square"
                          size={32}
                          src={`http://localhost:5000/img/users/${
                            this.props.order[0] &&
                            this.props.order[0].userDetails[0].photo
                          }`}
                        />
                      )}

                      {this.props.order[0] &&
                        this.props.order[0].userDetails[0].name}
                    </Media>{' '}
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <i className="ni ni-mobile-button text-black" /> Contact &
                    Phone
                  </th>
                  <td>
                    {this.props.order[0] && this.props.order[0].phone} or{' '}
                    {this.props.order[0] &&
                      this.props.order[0].alternativePhone}
                    {this.props.order[0] && ':'}{' '}
                    {this.props.order[0] && this.props.order[0].email}{' '}
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <i className="ni ni-mobile-button text-black" />
                    Special instruction
                  </th>
                  <td>
                    {this.props.order[0] &&
                      this.props.order[0].specialInstruction}
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <i className="ni ni-mobile-button text-black" />
                    Payment method
                  </th>
                  <td>
                    {this.props.order[0] && this.props.order[0].paymentMethod}
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <i className="ni ni-pin-3 text-black" /> Shipping address
                  </th>
                  <td>
                    {' '}
                    {this.props.order[0] &&
                      this.props.order[0].shippingAddress.address}{' '}
                    {this.props.order[0] && ':'}
                    {this.props.order[0] &&
                      this.props.order[0].shippingAddress.city}{' '}
                    {this.props.order[0] && ':'}
                    {this.props.order[0] &&
                      this.props.order[0].shippingAddress.postalCode}{' '}
                    {this.props.order[0] &&
                      this.props.order[0].shippingAddress.country}
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <i className="ni ni-calendar-grid-58 text-black" /> Expected
                    On{' '}
                  </th>
                  <td>
                    {' '}
                    <strong>
                      {this.props.order[0] &&
                        this.props.order[0].expectedOn.slice(0, 10)}{' '}
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
                      <i className="ni ni-calendar-grid-58 text-black" /> Shops
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
            </Table>{' '}
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">
                    Products(
                    {this.props.order[0] &&
                      this.props.order[0].boughtProducts.length}
                    )
                  </th>
                  <th scope="col">Shop details</th>
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
                                by {product.plug.name}{' '}
                              </small>
                            </td>
                          </Media>
                        </Media>
                      </th>
                      <td className=" td-name">
                        <small color="info">
                          <strong>
                            {' '}
                            <i className="ni ni-pin-3 text-black" /> Address:
                          </strong>{' '}
                          {product.plug.name}{' '}
                        </small>

                        <br color="default" className="bg-default"></br>

                        <small color="info">
                          <strong>
                            <i className="ni ni-mobile-button text-black" />{' '}
                            Phone:
                          </strong>{' '}
                          {product.plug.phone}{' '}
                        </small>

                        <br color="default" className="bg-default"></br>

                        <small color="info">
                          <strong>
                            <i className="ni ni-credit-card text-black" />{' '}
                            Account no:
                          </strong>{' '}
                          {product.brandName}; <strong>:</strong>{' '}
                        </small>
                        <br color="default" className="bg-default"></br>
                        <small color="info">
                          <strong>
                            {' '}
                            <i className="ni ni-circle-08 text-black" /> Holder
                            name:{' '}
                          </strong>{' '}
                          <small>R</small> {product.price} * {product.quantity}{' '}
                        </small>
                        <br color="default" className="bg-default"></br>
                        <small color="info">
                          {' '}
                          <strong>
                            <i className="ni ni-shop text-black" /> Bank name:{' '}
                          </strong>{' '}
                          {product.plug.name}{' '}
                        </small>

                        <br color="default" className="bg-default"></br>
                        <small color="info">
                          {' '}
                          <strong>
                            {' '}
                            <i className="ni ni-money-coins text-black" />{' '}
                            Amount due:{' '}
                          </strong>
                          R{' '}
                          {product.price * product.quantity -
                            product.price * product.quantity * 0.15}{' '}
                        </small>
                      </td>
                      <td>
                        <div className="custom-control custom-checkbox custom-checkbox-success">
                          <input
                            className="custom-control-input"
                            // defaultChecked
                            // id="chk-todo-task-1"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="chk-todo-task-1"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}

                <tr>
                  <th scope="row">Subtotal</th>
                  <td>
                    {' '}
                    {/* <strong>R {this.props.cartTotalPrice}</strong> */}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        )}
      </>
    );
  }
}

Cards.defaultProps = {
  catergories: [],
  product: {},
  plug: {},
  order: [],
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  product: state.product.product,
  auth: state.auth.isAuthenticated,
  isAuthenticated: state.auth,
  plug: state.plug.plug,
  loading: state.auth.loading,
  createdPlugLoading: state.createdPlug.loading,
  catergories: state.catergories.catergories,
  order: state.order.order,
});

export default connect(mapStateToProps, {
  followPlug,
  updateOrder,
  unfollowPlug,
  setAlert,
  createPlug,
  getPlug,
})(Cards);
