import { LayoutOne } from '@/layouts'
import React from 'react'

const index = () => {
  return (
    <LayoutOne topbar={true}>
      <div className="container py-5">
        {/* Header Section */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="display-4 mb-4">Privacy Policy</h1>
            <div className="w-50 mx-auto">
              <hr className="my-4" />
            </div>
            <p className="lead text-muted">
              Welcome to Bhunivesh. We are committed to protecting your personal information and your right to privacy.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-lg-5">
                <p className="mb-4">
                  This Privacy Policy explains how we collect, use, and disclose information through our website, 
                  Bhunivesh at propsavvyrealtors.com, which provides comprehensive real estate consultation 
                  and services in Gurgaon. If you have any questions or concerns about our policy or practices regarding 
                  your personal information, please contact us at propsavvyrealtors@gmail.com.
                </p>

                {/* Section 1 */}
                <div className="mb-5">
                  <h2 className="h4 mb-4">1. Information We Collect</h2>
                  <p>
                    We collect personal information that you voluntarily provide to us when you use our website. 
                    The information we collect depends on the context of your interactions with us, the choices 
                    you make, and the services you use. This information may include:
                  </p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <i className="bi bi-person-circle me-2"></i>
                      Personal Identifiers: Name, email address, phone number, and other contact details.
                    </li>
                    <li className="list-group-item">
                      <i className="bi bi-cart-check me-2"></i>
                      Transaction Data: Details about your real estate preferences and interactions with our website.
                    </li>
                    <li className="list-group-item">
                      <i className="bi bi-graph-up me-2"></i>
                      Usage Data: Information regarding how you interact with our website, including IP address, browser type, operating system, and pages visited.
                    </li>
                  </ul>
                </div>

                {/* Section 2 */}
                <div className="mb-5">
                  <h2 className="h4 mb-4">2. How We Use Your Information</h2>
                  <div className="card bg-light border-0 mb-3">
                    <div className="card-body">
                      <ul className="list-unstyled mb-0">
                        <li className="mb-3">
                          <i className="bi bi-check-circle-fill text-primary me-2"></i>
                          To provide real estate consultation services, respond to your inquiries, and offer assistance with property buying, selling, or investing in Gurgaon.
                        </li>
                        <li className="mb-3">
                          <i className="bi bi-check-circle-fill text-primary me-2"></i>
                          To personalize your experience on our website and improve our services.
                        </li>
                        <li className="mb-3">
                          <i className="bi bi-check-circle-fill text-primary me-2"></i>
                          To communicate with you regarding updates, offers, or services that may interest you.
                        </li>
                        <li>
                          <i className="bi bi-check-circle-fill text-primary me-2"></i>
                          To analyze usage patterns and enhance website functionality, ensuring a better user experience.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sections 3-9 */}
                <div className="mb-5">
                  <h2 className="h4 mb-4">3. Sharing of Your Information</h2>
                  <p>We may share your information in the following ways:</p>
                  <ul className="list-group list-group-flush mb-4">
                    <li className="list-group-item">
                      <strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf.
                    </li>
                    <li className="list-group-item">
                      <strong>Legal Compliance:</strong> We may disclose your information if required to do so by law.
                    </li>
                    <li className="list-group-item">
                      <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or asset sale.
                    </li>
                  </ul>
                </div>

                {/* Contact Section */}
                <div className="bg-light p-4 rounded-3 mt-5">
                  <h2 className="h4 mb-4">Contact Us</h2>
                  <address className="mb-0">
                    <strong>Bhunivesh</strong><br />
                    Unit No. 335, Tower A, Spaze i-Tech Park, Sector 49,<br />
                    Gurgaon, 122001 Haryana<br />
                    <br />
                    <strong>Email:</strong> <a href="mailto:propsavvyrealtors@gmail.com">propsavvyrealtors@gmail.com</a>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutOne>
  )
}

export default index