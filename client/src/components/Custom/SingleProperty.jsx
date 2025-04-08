import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MapPin,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Calendar,
  CheckCircle2,
  Home,
  CheckCircle,
  User
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { LayoutOne } from "@/layouts";

const SingleProperty = ({ slug }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    property: "",
  });
  const [property, setProperty] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await axios.get(
          `https://www.api.test.propsavvyrealtors.com/api/v1/get_property_slug/${slug}`
        );
        setProperty(data.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchProperty();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const propertyData = { ...formData, property: property?._id };
      await axios.post(
        "https://www.api.test.propsavvyrealtors.com/api/v1/create_property_inquery",
        propertyData
      );
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setFormData({ name: "", email: "", phone: "", message: "", property: "" });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    }
  };

  if (!property) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <LayoutOne topbar={true}>
      <div className="property-page">
        {/* Success Toast */}
        <div
          className={`position-fixed top-0 end-0 p-3 ${showSuccess ? "show" : "hide"
            }`}
          style={{ zIndex: 1050 }}
        >
          <div
            className="toast show bg-success text-white"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header bg-success text-white">
              <CheckCircle2 className="me-2" size={20} />
              <strong className="me-auto">Success</strong>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowSuccess(false)}
              ></button>
            </div>
            <div className="toast-body">Your inquiry has been sent successfully!</div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="property-hero position-relative">
          <img
            src={property.image.url}
            alt={property.name}
            className="w-100 property-hero-img"
          />
          <div className="property-hero-overlay"></div>
          <div className="container position-relative">
            <div className="property-hero-content text-white">
              <h1 style={{color:'white'}} className="display-4 fw-bold mb-3">{property.name}</h1>
              <p style={{color:'white'}} className="lead mb-4">
                <MapPin className="me-2" />
                {property.completeAddress}
              </p>
              <div className="d-flex align-items-center gap-4">
                <span className="fs-3 fw-bold">
                  ₹{property.startingPrice.toLocaleString()}
                </span>
                <div className="rating d-flex align-items-center">
                  <Star className="text-warning me-2" fill="currentColor" />
                  <span className="fs-5">{property.rating}/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-5">
          <div className="row g-4">
            {/* Property Details */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="h3 mb-0">Property Details</h2>
                    {/* <div className="d-flex gap-2">
                      <button className="btn btn-outline-primary rounded-circle p-2">
                        <Heart size={20} />
                      </button>
                      <button className="btn btn-outline-primary rounded-circle p-2">
                        <Share2 size={20} />
                      </button>
                    </div> */}
                  </div>

                  <div className="row g-4 mb-4">
                    <div className="col-md-4">
                      <div className="feature-card text-center p-3 border rounded-3">
                        <Home size={24} style={{color:'#6A9D38'}} className="mb-2" />
                        <h5 className="mb-1">{property?.propertyType?.name}</h5>
                        <p className="text-muted small mb-0">Property Type</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="feature-card text-center p-3 border rounded-3">
                        <CheckCircle size={24} className="mb-2" style={{color:'#6A9D38'}} />
                        <h5 className="mb-1">{property.status}</h5>
                        <p className="text-muted small mb-0">Status</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="feature-card text-center p-3 border rounded-3">
                        <MapPin size={24} className="mb-2" style={{color:'#6A9D38'}} />
                        <h5 className="mb-1">{property?.location?.name}</h5>
                        <p className="text-muted small mb-0">Location</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="h4 mb-3">Description</h3>
                  <p className="text-muted">{property.description}</p>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h3 className="h4 text-center mb-4">Schedule a Visit</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <User size={18} />
                        </span>
                        <input
                          type="text"
                          name="name"
                          className="form-control bg-light border-0 mb-0"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <Mail size={18} />
                        </span>
                        <input
                          type="email"
                          name="email"
                          className="form-control bg-light border-0 mb-0"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <Phone size={18} />
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control bg-light border-0 mb-0"
                          placeholder="Your Phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    {/* <div className="mb-3">
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <Calendar size={18} />
                        </span>
                        <input
                          type="date"
                          name="visitDate"
                          className="form-control bg-light border-0"
                          required
                        />
                      </div>
                    </div> */}
                    <div className="mb-4">
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <MessageCircle size={18} />
                        </span>
                        <textarea
                          name="message"
                          className="form-control bg-light border-0 mb-0"
                          placeholder="Your Message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="3"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2"
                      style={{background:'#6A9D38',color:'white'}}
                    >
                      Schedule Visit
                      <ArrowRight size={18} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutOne>
  );
}

export default SingleProperty;
