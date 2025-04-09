import React, { useState } from 'react';
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
      await axios.post('https://www.api.test.propsavvyrealtors.com/api/v1/create_inquery', formData);
      toast.success('Inquiry sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to send inquiry.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1050 }}
    >
      <Toaster position="top-right" />

      <div className="bg-white rounded-4 shadow-lg p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold text-dark m-0">Contact Us</h4>
          <button className="btn btn-sm btn-light" onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="d-grid gap-2">
          <div className="form-floating">
            <input
              type="text"
              className="form-control mb-0"
              id="nameInput"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="nameInput"><User size={14} className="me-1" /> Your Name</label>
          </div>

          <div className="form-floating">
            <input
              type="email"
              className="form-control mb-0"
              id="emailInput"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="emailInput"><Mail size={14} className="me-1" /> Your Email</label>
          </div>

          <div className="form-floating">
            <input
              type="tel"
              className="form-control"
              id="phoneInput"
              placeholder="Your Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label htmlFor="phoneInput"><Phone size={14} className="me-1" /> Phone Number</label>
          </div>

          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Your Message"
              id="messageInput"
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={{ height: '120px' }}
              required
            ></textarea>
            <label htmlFor="messageInput"><MessageSquare size={14} className="me-1" /> Message</label>
          </div>

          <button type="submit" className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2 py-2">
            Send Message <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPopup;
