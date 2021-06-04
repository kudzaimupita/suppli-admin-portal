import React from 'react';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Spinner,
} from 'reactstrap';

import DemoNavbar from '../components/Navbar';
import SimpleFooter from '../components/AdminFooter';

class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <section
            className="section section-shaped section-lg"
            style={{
              backgroundImage: `url(${require('../assets/img/brand/background1.png')})`,
            }}
          >
            <Container className="pt-lg-4">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card
                    className="bg-secondary shadow border-0"
                    style={{ marginBottom: 100, marginTop: 90 }}
                  >
                    <CardHeader className="bg-white pb-5">
                      {/* <div className="text-muted text-center mb-3">
                        <small>Sign up with</small>
                      </div> */}
                      <div className="text-muted text-center ">
                        <h1 style={{ marginTop: 10, color: '#172b4d' }}>
                          Reset password
                        </h1>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Enter your new password</small>
                      </div>
                      <Form role="form">
                        <FormGroup className="has-success">
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Password" type="password" />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup className="has-success">
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Confirm password"
                              type="password"
                            />
                          </InputGroup>
                        </FormGroup>
                        {/* 
                        <div className="text-muted">
                          <small>
                            Remember your account?{" "}
                            <a
                              href="/"
                              onClick={(e) => e.preventDefault()}
                            >
                              Sign in
                            </a>
                          </small>
                        </div> */}
                        {/* <Row className="my-4">
                          <Col xs="12">
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              <input
                                className="custom-control-input"
                                id="customCheckRegister"
                                type="checkbox"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheckRegister"
                              >
                                <span>
                                  I agree with the{" "}
                                  <a
                                    href="/"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    Already have an account?Sign in
                                  </a>
                                </span>
                              </label>
                            </div>
                          </Col>
                        </Row> */}
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="success"
                            type="button"
                          >
                            <Spinner
                              size="sm"
                              style={{ marginRight: 6 }}
                              // type="grow"
                              color="white"
                            />
                            Reset password
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Login;
