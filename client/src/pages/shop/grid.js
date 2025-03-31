import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import { LayoutOne } from "@/layouts";
import { FaThLarge, FaThList, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Container, Row, Col, Nav, Tab, Form, Card, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Search from "@/components/search";
import CallToAction from "@/components/callToAction";
import { useRouter } from 'next/navigation';

function ShopGrid() {
  const [properties, setProperties] = useState([]);
  const router = useRouter();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const pageLimit = 6;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("https://www.api.test.propsavvyrealtors.com/api/v1/get_properties");
        setProperties(response.data.data);
        setFilteredProperties(response.data.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const filtered = properties.filter((property) =>
      property.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProperties(filtered);
    setCurrentItems(filtered.slice(offset, offset + pageLimit));
    setPageCount(Math.ceil(filtered.length / pageLimit));
  }, [query, properties, offset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * pageLimit) % filteredProperties.length;
    setOffset(newOffset);
  };

  const handleViewDetails = (slug) => {
    router.push(`/shop/${slug}`);
  }

  return (
    <LayoutOne topbar={true}>
      <ShopBreadCrumb title="Properties" currentSlug="Properties" />
      <div className="ltn__product-area ltn__product-gutter mb-120">
        <Container>
          <Row>
            <Col xs={12}>
              <Tab.Container defaultActiveKey="first">
                {/* <div className="ltn__shop-options">
                  <ul>
                    <li>
                      <div className="ltn__grid-list-tab-menu">
                        <Nav className="nav">
                          <Nav.Link eventKey="first">
                            <FaThLarge />
                          </Nav.Link>
                          <Nav.Link eventKey="second">
                            <FaThList />
                          </Nav.Link>
                        </Nav>
                      </div>
                    </li>
                    <li>
                      <div className="showing-product-number text-right">
                        <span>{`Showing ${offset + pageLimit} of ${filteredProperties.length} results`}</span>
                      </div>
                    </li>
                  </ul>
                </div> */}
                <Search spaceBottom="mb-30" setQuery={setQuery} />
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                      <Row>
                        {currentItems.map((property, key) => (
                          <Col key={key} xs={12} sm={6} lg={4}>
                            <Card className="property-card shadow-sm border-0 mb-4">
                              <Card.Img variant="top" style={{ height: "300px", objectFit: "cover" }} src={property.image.url} className="property-image" />
                              <Card.Body>
                                <Card.Title className="property-title">{property.name}</Card.Title>
                                <Card.Text className="property-location">{property.completeAddress}</Card.Text>
                                <Card.Text className="property-price">Starting Price: ₹{property.startingPrice.toLocaleString()}</Card.Text>
                                <Button style={{border:'none'}} onClick={()=>handleViewDetails(property.slug)} variant="primary" className="w-100 theme-btn-1">View Details</Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
              <div className="ltn__pagination-area text-center">
                <ReactPaginate
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  nextLabel={<FaAngleDoubleRight />}
                  previousLabel={<FaAngleDoubleLeft />}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination ltn__pagination justify-content-center"
                  activeClassName="active"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
        <Container>
          <Row>
            <Col xs={12}>
              <CallToAction />
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
}
export default ShopGrid;
