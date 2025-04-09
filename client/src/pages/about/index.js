'use client'
import { LayoutOne } from "@/layouts";
import { Container, Row, Col } from "react-bootstrap";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getProducts, productSlug } from "@/lib/product";
import TitleSection from "@/components/titleSection";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import TestimonialCarouselItem from "@/components/testimonialCarousel";
// import testimonialData from "@/data/testimonial";
import CallToAction from "@/components/callToAction";
import AboutUsStyleOne from "@/components/aboutUs/aboutUsStyleOne";
import Feature from "@/components/features";
import featureData from "@/data/service"
import { useEffect, useState } from "react";

function AboutUs() {
  // const agents = getProducts(TeamData, "buying", "featured", 3);
  const featureDataSorted = getProducts(featureData, "buying", "featured", 3);

  const [agents, setAgents] = useState([]);

  const testimonialData = [
    {
      img: "client1.jpg",
      description: "Bhunivesh made buying my dream home a reality! Their team guided me through every step, making the entire process smooth and stress-free.",
      name: "Rahul Mehta",
      type: "Homebuyer",
    },
    {
      img: "client2.jpg",
      description: "As an investor, I needed a reliable partner to find the best properties. Bhunivesh provided excellent insights and helped me secure great deals!",
      name: "Amit Sharma",
      type: "Property Investor",
    },
    {
      img: "client3.jpg",
      description: "I was looking for a commercial property for my business, and Bhunivesh exceeded my expectations. Professional, efficient, and trustworthy!",
      name: "Neha Kapoor",
      type: "Business Owner",
    },
    {
      img: "client4.jpg",
      description: "Selling my property with Bhunivesh was a breeze. Their expert marketing strategies ensured I got the best price in no time!",
      name: "Ramesh Verma",
      type: "Property Seller",
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://www.api.test.propsavvyrealtors.com/api/v1/get_teams');
        const uniqueAgents = Array.from(new Map(data.data.map(item => [item._id, item])).values());
        console.log("uniqueAgents", uniqueAgents)
        setAgents(uniqueAgents.reverse());
      } catch (error) {
        console.log('Internal server error', error);
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: agents.length > 4, // Only infinite scroll if you have more than 4 agents
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  };


  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" +
        (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      <FaArrowLeft />
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      <FaArrowRight />
    </button>
  );

  const testiMonialsettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };

  const blogSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };

  return (
    <>
      <LayoutOne topbar={true}>
        <ShopBreadCrumb
          title="About Us"
          sectionPace=""
          currentSlug="About Us"
        />

        <AboutUsStyleOne sectionSpace="pb-90" />

        {/* <Feature
          classes="section-bg-1"
          servicebtn={true}
          iconTag={false}
          data={featureDataSorted}
          titleSectionData={{
            sectionClasses: "text-center",
            subTitle: "Our Services",
            title: "Our Main Focus",
          }}
        /> */}




        <div className="py-5 bg-light">
          <Container>
            <Row className="mb-4">
              <Col>
                <h3 className="text-center">Meet Our Team</h3>
              </Col>
            </Row>

            {/* Don't wrap Slider inside <Row> */}
            <Slider {...settings}>
              {agents.map((agent) => (
                <div key={agent._id} className="p-2">
                  <div className="card border-0 shadow-sm">
                    <img
                      src={agent.image?.url}
                      alt={agent.name}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{agent.name}</h5>
                      <p className="card-text text-muted">{agent.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </Container>
        </div>



        {/* <!-- TESTIMONIAL AREA START (testimonial-7) -->  */}
        <div
          className="ltn__testimonial-area bg-image-top pt-115 pb-70"
          style={{ backgroundImage: `url("../img/bg/20.jpg")` }}
        >
          <Container>
            <Row>
              <Col lg={12}>
                <TitleSection
                  sectionClasses="text-center"
                  headingClasses="section-subtitle-2"
                  titleSectionData={{
                    subTitle: "Our Testimonial",
                    title: "Clients Feedback",
                  }}
                />
              </Col>
            </Row>

            <Slider
              {...testiMonialsettings}
              className="ltn__testimonial-slider-5-active slick-arrow-1"
            >
              {testimonialData.map((data, key) => {
                return (
                  <TestimonialCarouselItem key={key} data={data} />
                );
              })}
            </Slider>
          </Container>
        </div>
        {/* <!-- TESTIMONIAL AREA END --> */}

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
    </>
  );
}

export default AboutUs;
