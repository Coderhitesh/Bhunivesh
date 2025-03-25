import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaPlay } from "react-icons/fa";
import ModalVideo from "react-modal-video";
import { useState } from "react";
function AboutUsStyleOne({ sectionSpace }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      {/* <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="X7R-q9rsrtU"
        onClose={() => setOpen(false)}
      /> */}
      <div className={`ltn__about-us-area ${sectionSpace}`}>
        <Container>
          <Row>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-img-wrap about-img-left">
                <img src="/about.jpg" alt="About Us Image" />

              </div>
            </Col>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area mb-20">
                  <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                    About Bhunivesh
                  </h6>
                  <h1 className="section-title">
                    Your Trusted Partner in Property Sales<span>.</span>
                  </h1>
                  <p>
                    At Bhunivesh, we help you find your dream property with ease and
                    confidence. With a strong presence in the real estate market,
                    we specialize in connecting buyers with premium properties across
                    prime locations.
                  </p>
                </div>
                <ul className="ltn__list-item-half clearfix">
                  <li>
                    <i className="flaticon-home-2"></i>
                    Wide Range of Properties
                  </li>
                  <li>
                    <i className="flaticon-mountain"></i>
                    Prime Locations Available
                  </li>
                  <li>
                    <i className="flaticon-heart"></i>
                    Seamless Buying Experience
                  </li>
                  <li>
                    <i className="flaticon-secure"></i>
                    Transparent & Secure Transactions
                  </li>
                </ul>
                <div className="ltn__callout bg-overlay-theme-05 mt-30">
                  <p>
                  Whether you&apos;re looking for a residential home, commercial space,
                    or investment opportunity, Bhunivesh ensures a smooth and
                    hassle-free property buying experience.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AboutUsStyleOne;
