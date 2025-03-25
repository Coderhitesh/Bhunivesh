'use client'
import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import {
  FaUserAlt,
  FaEnvelope,
  FaPencilAlt,
  FaPhoneAlt,
  FaArrowDown,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      const res = await axios.post('http://localhost:8000/api/v1/create_inquery', formData)
      // alert('success')
      toast.success(res.data.message)
    } catch (error) {
      console.log("Internal server error", error)
      toast.error(error?.response?.data?.message || 'Internal server error. Please try again.')
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <>
      <Toaster position="top-right" />
      {/* <!-- CONTACT ADDRESS AREA START --> */}
      <div className="ltn__contact-address-area mb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
                <div className="ltn__contact-address-icon">
                  <img src="/img/icons/10.png" alt="Icon Image" />
                </div>
                <h3>Email Address</h3>
                <p>
                  info@bhunivesh.com
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
                <div className="ltn__contact-address-icon">
                  <img src="/img/icons/11.png" alt="Icon Image" />
                </div>
                <h3>Phone Number</h3>
                <p>
                  +91 9090267878
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
                <div className="ltn__contact-address-icon">
                  <img src="/img/icons/12.png" alt="Icon Image" />
                </div>
                <h3>Office Address</h3>
                <p>
                  Unit No 350, Tower-A Spaze I-Tech Park Sec 49, Sohna Road, Gurugram 122018
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- CONTACT ADDRESS AREA END --> */}

      {/* <!-- CONTACT MESSAGE AREA START --> */}
      <div className="ltn__contact-message-area mb-120 mb--100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__form-box contact-form-box box-shadow white-bg">
                <h4 className="title-2">Get A Quote</h4>
                <form id="contact-form" onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Name Field */}
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <span className="inline-icon">
                          <FaUserAlt />
                        </span>
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="col-md-6">
                      <div className="input-item input-item-email ltn__custom-icon">
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter email address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <span className="inline-icon">
                          <FaEnvelope />
                        </span>
                      </div>
                    </div>

                    {/* Service Type Dropdown */}
                    {/* <div className="col-md-6">
                      <div className="input-item input-item-email ltn__custom-icon">
                        <Form.Select
                          className="nice-select"
                          name="serviceType"
                          value={formData.serviceType || ""}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Service Type</option>
                          <option value="Property Management">Property Management</option>
                          <option value="Mortgage Service">Mortgage Service</option>
                          <option value="Consulting Service">Consulting Service</option>
                          <option value="Home Buying">Home Buying</option>
                          <option value="Home Selling">Home Selling</option>
                          <option value="Escrow Services">Escrow Services</option>
                        </Form.Select>
                        <span className="inline-icon">
                          <FaArrowDown />
                        </span>
                      </div>
                    </div> */}

                    {/* Phone Field */}
                    <div className="col-md-6">
                      <div className="input-item input-item-phone ltn__custom-icon">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                        <span className="inline-icon">
                          <FaPhoneAlt />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="input-item input-item-textarea ltn__custom-icon">
                    <textarea
                      name="message"
                      placeholder="Enter message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                    <span className="inline-icon">
                      <FaPencilAlt />
                    </span>
                  </div>

                  {/* Save Info Checkbox */}
                  {/* <p>
                    <label className="input-info-save mb-0">
                      <input type="checkbox" name="agree" /> Save my name, email, and website
                      in this browser for the next time I comment.
                    </label>
                  </p> */}

                  {/* Submit Button */}
                  <div className="btn-wrapper mt-0">
                    <button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">
                      Get a Free Service
                    </button>
                  </div>

                  <p className="form-messege mb-0 mt-20"></p>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- CONTACT MESSAGE AREA END --> */}

      {/* <!-- GOOGLE MAP AREA START --> */}
      <div className="google-map mb-120">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.199650108595!2d77.04059372521819!3d28.413231994006185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d229abb80e123%3A0xac9af8f5acc2e8a9!2sSpaze%20iTech%20Park!5e0!3m2!1sen!2sin!4v1742896412558!5m2!1sen!2sin"
          width="100%"
          height="100%"
        ></iframe>
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.199650108595!2d77.04059372521819!3d28.413231994006185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d229abb80e123%3A0xac9af8f5acc2e8a9!2sSpaze%20iTech%20Park!5e0!3m2!1sen!2sin!4v1742896412558!5m2!1sen!2sin" width="600" height="450" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
      </div>
      {/* <!-- GOOGLE MAP AREA END --> */}
    </>
  );
};

export default Contact;
