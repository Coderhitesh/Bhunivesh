import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TitleSection from "@/components/titleSection";
import { Users, BarChart2, Home } from "lucide-react";

function Feature({ classes, headingClasses }) {
  const data = [
    {
      title: "Personalized Services",
      shortDescription: "We tailor our real estate solutions to meet your unique needs and preferences.",
      icon: <Users size={40} />,
      buttonText: "Learn More",
      active: true,
    },
    {
      title: "Market Insights",
      shortDescription: "Stay ahead with our in-depth analysis of real estate trends and opportunities.",
      icon: <BarChart2 size={40} />,
      buttonText: "Discover More",
      active: false,
    },
    {
      title: "Exclusive Listings",
      shortDescription: "Browse through our handpicked premium properties in the most sought-after locations.",
      icon: <Home size={40} />,
      buttonText: "View Listings",
      active: false,
    },
  ];

  return (
    <div className={`ltn__feature-area pt-50 pb-90 ${classes}`}>
      <Container>
        <Row>
          <Col xs={12}>
            <TitleSection
              titleSectionData={{
                title: "What Bhunivesh Provides",
                subtitle: "Your Trusted Real Estate Partner",
                sectionClasses: "text-center",
              }}
              sectionClasses="text-center"
              headingClasses={headingClasses}
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          {data.map((item, key) => (
            <Col key={key} xs={12} sm={6} lg={4}>
              <div
                className={`ltn__feature-item ltn__feature-item-6 text-center bg-white box-shadow-1 ${
                  item.active ? "active" : ""
                }`}
              >
                <div className="ltn__feature-icon">{item.icon}</div>
                <div className="ltn__feature-info">
                  <h3>{item.title}</h3>
                  <p>{item.shortDescription}</p>
                  <Link className="ltn__service-btn" href="#">
                    {item.buttonText}
                    <i className="flaticon-right-arrow"></i>
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Feature;
