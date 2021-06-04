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
                          Forgot your password?
                        </h1>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Enter your email address</small>
                      </div>
                      <Form role="form">
                        <FormGroup className="has-success">
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type="email" />
                          </InputGroup>
                        </FormGroup>

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
