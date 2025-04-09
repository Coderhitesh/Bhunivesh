import React, { useState } from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaComments, FaWhatsappSquare } from 'react-icons/fa';

const CallToActionButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleButtons = () => {
    setIsExpanded(!isExpanded);
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/+919090267878', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+919090267878';
  };

  const handleEmail = () => {
    window.location.href = 'mailto:info@bhunivesh.in';
  };

  return (
    <div className="cta-buttons-container fixed-bottom mb-4 ms-4">
      {/* Action Buttons */}
      <div className={`action-buttons ${isExpanded ? 'show' : ''}`}>
        <button 
          onClick={handleWhatsApp}
          className="btn btn-success rounded-circle action-button mb-2 d-flex align-items-center justify-content-center"
          style={{ width: '50px', padding:'0px', height: '50px' }}
          title="WhatsApp"
        >
          <FaWhatsapp className="fs-4" />
        </button>
        
        <button 
          onClick={handleCall}
          className="btn btn-primary rounded-circle action-button mb-2 d-flex align-items-center justify-content-center"
          style={{ width: '50px', padding:'0px', height: '50px' }}
          title="Call Us"
        >
          <FaPhone className="fs-4" />
        </button>
        
        <button 
          onClick={handleEmail}
          className="btn btn-danger rounded-circle action-button mb-2 d-flex align-items-center justify-content-center"
          style={{ width: '50px', padding:'0px', height: '50px' }}
          title="Email Us"
        >
          <FaEnvelope className="fs-4" />
        </button>
      </div>

      {/* Main Toggle Button */}
      <button 
        onClick={toggleButtons}
        className="btn btn-dark rounded-circle main-button d-flex align-items-center justify-content-center"
        style={{ width: '60px', padding:'0px', height: '60px' }}
      >
        <FaComments className="fs-3" />
      </button>
    </div>
  );
};

export default CallToActionButtons;