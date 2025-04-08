import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Send, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const ContactPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://www.api.test.propsavvyrealtors.com/api/v1/create_inquery', formData);
      toast.success("Inquery sent successfully");
      setShowPopup(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.log("Internal server error", error);
      toast.error(error?.response?.data?.message || 'Internal server error. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <Toaster position="top-right" />
      <div style={{marginTop:'0px'}} className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          {/* Header */}
          <div style={{ backgroundColor: '#679E3E' }} className="modal-header text-white border-0 px-4 py-3">
            <h5 style={{ color: 'white' }} className="modal-title fw-bold">Contact Us</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-0 mb-0"
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    className="form-control bg-light border-0 mb-0"
                    placeholder="Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    className="form-control bg-light border-0"
                    placeholder="Your Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <MessageSquare size={18} />
                  </span>
                  <textarea
                    className="form-control bg-light border-0 mb-0"
                    placeholder="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="theme-btn-1 btn btn-effect-1 w-100 py-3 d-flex align-items-center justify-content-center gap-2"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;