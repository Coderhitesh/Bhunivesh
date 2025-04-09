'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import { LayoutOne } from "@/layouts";
import { FaThLarge, FaThList, FaAngleDoubleLeft, FaAngleDoubleRight, FaFilter } from "react-icons/fa";
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
  const [location, setLocation] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const fetchLocation = async () => {
    try {
      const { data } = await axios.get('http://localhost:8765/api/v1/get_locations');
      setLocation(data.data);
    } catch (error) {
      console.log("Internal server error", error);
    }
  };

  const fetchPropertyType = async () => {
    try {
      const { data } = await axios.get('http://localhost:8765/api/v1/get_propertyTypes');
      setPropertyType(data.data);
    } catch (error) {
      console.log("Internal server error", error);
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:8765/api/v1/get_properties");
        setProperties(response.data.data);
        setFilteredProperties(response.data.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
    fetchLocation();
    fetchPropertyType();
  }, []);

  useEffect(() => {
    let filtered = properties;

    // Filter by search query
    if (query) {
      filtered = filtered.filter((property) =>
        property.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter((property) =>
        property.location._id === selectedLocation
      );
    }

    // Filter by property type
    if (selectedPropertyType) {
      filtered = filtered.filter((property) =>
        property.propertyType._id === selectedPropertyType
      );
    }

    setFilteredProperties(filtered);
    setCurrentItems(filtered.slice(offset, offset + pageLimit));
    setPageCount(Math.ceil(filtered.length / pageLimit));
  }, [query, selectedLocation, selectedPropertyType, properties, offset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * pageLimit) % filteredProperties.length;
    setOffset(newOffset);
  };

  const handleViewDetails = (slug) => {
    router.push(`/shop/${slug}`);
  };

  const clearFilters = () => {
    setSelectedLocation("");
    setSelectedPropertyType("");
    setQuery("");
  };

  return (
    <LayoutOne topbar={true}>
      <ShopBreadCrumb title="Properties" currentSlug="Properties" />
      <div className="ltn__product-area ltn__product-gutter mb-120">
        <Container>
          <Row className="mb-4">
            <Col xs={12}>
              <div className="d-flex justify-content-between align-items-center">
                <Button 
                  variant="" 
                  style={{borderColor:'#649A34',color:'#649A34'}}
                  onClick={() => setShowFilters(!showFilters)}
                  className="mb-3"
                >
                  <FaFilter className="me-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
                <div className="d-flex align-items-center">
                  <span className="me-3">Total Properties: {filteredProperties.length}</span>
                  {(selectedLocation || selectedPropertyType || query) && (
                    <Button variant="link" onClick={clearFilters}>Clear Filters</Button>
                  )}
                </div>
              </div>
            </Col>
          </Row>

          {showFilters && (
            <Row className="mb-4">
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Search by Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search properties..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {location.map((loc) => (
                      <option key={loc._id} value={loc._id}>
                        {loc.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Property Type</Form.Label>
                  <Form.Select
                    value={selectedPropertyType}
                    onChange={(e) => setSelectedPropertyType(e.target.value)}
                  >
                    <option value="">All Types</option>
                    {propertyType.map((type) => (
                      <option key={type._id} value={type._id}>
                        {type.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          )}

          <Row>
            <Col xs={12}>
              <Tab.Container defaultActiveKey="first">
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                      <Row>
                        {currentItems.length > 0 ? (
                          currentItems.map((property, key) => (
                            <Col key={key} xs={12} sm={6} lg={4}>
                              <Card className="property-card shadow-sm border-0 mb-4 h-100">
                                <div className="position-relative">
                                  <Card.Img 
                                    variant="top" 
                                    style={{ height: "300px", objectFit: "cover" }} 
                                    src={property.image.url} 
                                    className="property-image" 
                                  />
                                  <div className="position-absolute top-0 end-0 m-2">
                                    <span style={{background: '#649A34'}} className="badge">
                                      {property.propertyType.name}
                                    </span>
                                  </div>
                                </div>
                                <Card.Body className="d-flex flex-column">
                                  <Card.Title className="property-title h5 mb-3">{property.name}</Card.Title>
                                  <div className="mb-3">
                                    <p className="text-muted mb-2">
                                      <i className="fas fa-map-marker-alt me-2"></i>
                                      {property.completeAddress}
                                    </p>
                                    <p className="text-muted mb-0">
                                      <i className="fas fa-building me-2"></i>
                                      {property.location.name}
                                    </p>
                                  </div>
                                  <div className="mt-auto">
                                    <p style={{color: '#649A34'}} className="h5 mb-3">
                                      Starting Price: ₹{property.startingPrice.toLocaleString()}
                                    </p>
                                    <Button 
                                      onClick={() => handleViewDetails(property.slug)} 
                                      variant="primary" 
                                      className="w-100 theme-btn-1"
                                      style={{border: 'none'}}
                                    >
                                      View Details
                                    </Button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))
                        ) : (
                          <Col xs={12}>
                            <div className="text-center py-5">
                              <h3>No properties found</h3>
                              <p className="text-muted">Try adjusting your filters</p>
                            </div>
                          </Col>
                        )}
                      </Row>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>

              {filteredProperties.length > pageLimit && (
                <div className="ltn__pagination-area text-center mt-5">
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
              )}
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