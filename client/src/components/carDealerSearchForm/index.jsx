'use client'
import { Container, Row, Col, Nav, Tab, Form } from "react-bootstrap";
import { FaCarAlt, FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

function CarDealerSearchForm({ navMenuClass, customClasses }) {
  const [location, setLocation] = useState([])
  const [type, setType] = useState([])
  const [search, setSearch] = useState({
    location: '',
    type: ''
  })

  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleFetchlocation = async () => {
    try {
      const { data } = await axios.get('https://api.propsavvyrealtors.com/api/v1/get_locations')
      setLocation(data.data)
    } catch (error) {
      console.log("Internal server error", error)
    }
  }

  const handleFetchType = async () => {
    try {
      const { data } = await axios.get('https://api.propsavvyrealtors.com/api/v1/get_propertyTypes')
      setType(data.data)
    } catch (error) {
      console.log("Internal server error", error)
    }
  }

  useEffect(() => {
    handleFetchlocation();
    handleFetchType();
  }, [])

  return (
    <>
      <div
        className={`ltn__car-dealer-form-area mt--65 mt-120 ${customClasses}`}
      >
        <Container>
          <Row>
            <Col xs={12}>
              <div className="ltn__car-dealer-form-tab">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  {/* <div
                    className={`ltn__tab-menu text-uppercase ${navMenuClass}`}
                  >
                    <Nav variant="pills">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          <FaCarAlt />
                          Find A Car
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          <FaUserAlt />
                          Get a Dealer
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div> */}

                  <Tab.Content className="tab-content bg-white box-shadow-1 ltn__border position-relative pb-10">
                    <Tab.Pane eventKey="first">
                      <div className="car-dealer-form-inner">
                        <form action="#" className="ltn__car-dealer-form-box">
                          <Row>
                            <Col
                              xs={12}
                              md={6}
                              lg={5}
                              className="ltn__car-dealer-form-item"
                            >
                              <Form.Select onChange={handleSearchChange} className="nice-select">
                                <option value="">Location</option>
                                {
                                  location && location.map((item, index) => (
                                    <option key={index} value={item?.name}>{item?.name}</option>
                                  ))
                                }
                              </Form.Select>
                            </Col>
                            {/* <Col
                              xs={12}
                              md={6}
                              lg={3}
                              className="ltn__car-dealer-form-item"
                            >
                              <Form.Select className="nice-select">
                                <option>Property Status</option>
                                <option value="1">Open house</option>
                                <option value="2">Rent</option>
                                <option value="3">Sale</option>
                                <option value="4">Sold</option>
                              </Form.Select>
                            </Col> */}
                            <Col
                              xs={12}
                              md={6}
                              lg={5}
                              className="ltn__car-dealer-form-item"
                            >
                              <Form.Select className="nice-select">
                                <option value="">Property Type</option>
                                {
                                  type && type.map((item, index) => (
                                    <option key={index} value={item?.name}>{item?.name}</option>
                                  ))
                                }
                              </Form.Select>
                            </Col>
                            <Col
                              xs={12}
                              md={6}
                              lg={2}
                              className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar"
                            >
                              <div className="btn-wrapper text-center mt-0">
                                <Link
                                  href="/shop/right-sidebar"
                                  className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                >
                                  Search
                                </Link>
                              </div>
                            </Col>
                          </Row>
                        </form>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default CarDealerSearchForm;
