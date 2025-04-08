import { useEffect, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import path from "path";
import fs from "fs/promises";
import { LayoutTwo } from "@/layouts";
import { Container, Row, Col } from "react-bootstrap";
import { getProducts, productSlug } from "@/lib/product";
import TitleSection from "@/components/titleSection";
import Feature from "@/components/features";
import featuresData from "@/data/service";
import HeroSectionStyleThree from "@/components/hero/styleThree";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CallToAction from "@/components/callToAction";
import VideoBanner from "@/components/banner/videoBanner";
import CarDealerSearchForm from "@/components/carDealerSearchForm";
import BrandCarouselOne from "@/components/brandCarousel";
import TestimonialStyleThree from "@/components/testimonialCarousel/indexThree";
import axios from "axios";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import ContactPopup from "@/components/Custom/ContactPopup";
import Head from "next/head";

function HomePage(props) {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const featureData = getProducts(featuresData, "buying", "featured", 3);
  const { data, brand, testimonialData } = props;

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

  const productCarouselsettings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />, // Ensure these arrow components exist
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { arrows: false, dots: true, slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 575,
        settings: { arrows: false, dots: true, slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const blogSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [allProperties, setAllProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await axios.get("https://www.api.test.propsavvyrealtors.com/api/v1/get_properties");
        setAllProperties(data.data || []);
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };
    fetchProperties();
  }, []);

  var settingsSlider = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const sliderSettings = {
    dots: true,
    infinite: allProperties.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleViewDetails = (slug) => {
    router.push(`/shop/${slug}`);
  };

  const [blogs, setBlogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get("https://www.api.test.propsavvyrealtors.com/api/v1/get_blogs");
        setBlogs(data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= blogs.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0 ? Math.max(blogs.length - 3, 0) : prevIndex - 3
    );
  };

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000); // Show popup after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleOpenPopUp = () => setShowPopup(true);
  const handleClosePopUp = () => setShowPopup(false);

  return (
    <>
      <Head>
        <link rel="icon" href="/logo.png" type="image/x-icon" />
      </Head>
      <LayoutTwo topbar={true}>
        <ContactPopup isOpen={showPopup} onClose={handleClosePopUp} />

        {/* <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId="_yhE9Wo-OtQ"
          onClose={() => setOpen(false)}
        /> */}
        {/* <!-- SLIDER AREA START (slider-11) --> */}
        <div className="ltn__slider-area ltn__slider-3 section-bg-2">
          <HeroSectionStyleThree data={data} />
        </div>

        {/* <!-- SLIDER AREA END --> */}
        {/* <CarDealerSearchForm navMenuClass="d-none" customClasses="" /> */}
        {/* <!-- CAR DEALER FORM AREA END --> */}


        {/* <!-- FEATURE AREA START ( Feature - 6) --> */}
        <Feature
          servicebtn={true}
          iconTag={false}
          data={featureData}
          classes=""
          headingClasses="section-subtitle-2"
          titleSectionData={{
            sectionClasses: "text-center",
            subTitle: "Our Services",
            title: "Our Main Focus",
          }}
        />
        {/* <!-- FEATURE AREA END -->

    <!-- SEARCH BY PLACE AREA START (testimonial-7) --> */}
        <div className="min-vh-100 bg-light py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-4 fw-bold mb-2">Featured Listings</h2>
              <p className="lead text-muted">
                Discover our exclusive property collection
              </p>
            </div>

            <div className="position-relative">
              {allProperties.length > 0 ? (
                <Slider {...settingsSlider} className="left-align-slider">
                  {allProperties.map((property) => (
                    <div key={property._id} className="px-2">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="position-relative">
                          <img
                            src={property.image?.url || "/default-property.jpg"}
                            alt={property.name}
                            className="card-img-top"
                            style={{ height: '250px', objectFit: 'cover' }}
                          />
                          <div className="position-absolute top-0 end-0 m-3">
                            <span className="badge bg-success">
                              {property.status}
                            </span>
                          </div>
                        </div>
                        <div className="card-body">
                          <h3 className="card-title h5 fw-bold mb-2">
                            {property.name}
                          </h3>
                          <p className="card-text text-muted small mb-3">
                            {property.completeAddress}
                          </p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <small className="text-muted d-block">Starting from</small>
                              <span className="h5 fw-bold mb-0">
                                ₹{property.startingPrice?.toLocaleString() || "N/A"}
                              </span>
                            </div>
                            <button
                              onClick={() => handleViewDetails(property.slug)}
                              className="btn theme-btn-1"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="text-center py-5">
                  <p className="text-muted h5">No properties available</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <!-- SEARCH BY PLACE AREA END -->

        {/* <!-- VIDEO AREA START --> */}
        <div className="ltn__video-popup-area">
          <VideoBanner />
        </div>
        {/* <!-- VIDEO AREA END --> */}

        {/* <!-- TESTIMONIAL AREA START --> */}
        <div className="ltn__testimonial-area ltn__testimonial-4 pt-70 pb-100 plr--9">
          <Container fluid>
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

            <Row>
              <Col lg={12}>
                <TestimonialStyleThree data={testimonialData} />
              </Col>
            </Row>
          </Container>
        </div>
        {/* <!-- TESTIMONIAL AREA END --> */}

        {/* <!-- BRAND LOGO AREA START --> */}
        <div className="ltn__brand-logo-area ltn__brand-logo-1 section-bg-1 pt-70 pb-110 plr--9">
          <Container fluid>
            <Row>
              <Col lg={12}>
                <TitleSection
                  sectionClasses="text-center"
                  headingClasses="section-subtitle-2"
                  titleSectionData={{
                    subTitle: "Our Trusted Partners",
                    // title: "Clients Feedback",
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <BrandCarouselOne data={brand} />
              </Col>
            </Row>
          </Container>
        </div>
        {/* <!-- BRAND LOGO AREA END --> */}

        {/* <!-- BLOG AREA START (blog-3) -->  */}
        <div className="pt-115 pb-100 plr--9">
          {/* Header Section */}
          <div className="text-center mb-5">
            <p className="text-primary mb-2 text-uppercase fw-semibold">
              Our Latest Updates
            </p>
            <h1 className="display-4 fw-bold mb-4 section-title">
              News & Insights
            </h1>
          </div>

          {/* Blog Grid */}
          <div className="row g-4">
            {blogs.slice(currentIndex, currentIndex + 3).map((blog) => (
              <div key={blog._id} className="col-12 col-md-6 col-lg-4">
                <div className="blog-card rounded-4 overflow-hidden">
                  {/* Image Container */}
                  <div className="blog-image-container">
                    <img
                      src={blog.image.url}
                      alt={blog.title}
                      className="blog-image"
                    />
                    <div className="blog-overlay"></div>
                  </div>

                  {/* Content */}
                  <div className="blog-content p-4">
                    {/* Meta Info */}
                    <div className="meta-info d-flex gap-3 mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <Calendar size={16} />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Clock size={16} />
                        <span>{blog.writer}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="h5 fw-bold mb-3 content-preview">
                      {blog.title}
                    </h3>

                    {/* Content Preview */}
                    {/* <div
                      className="content-preview mb-3"
                      dangerouslySetInnerHTML={{
                        __html: blog.content.replace(/<[^>]*>/g, '')
                      }}
                    /> */}

                    {/* Read More Link */}
                    <a
                      href={`/blog/${blog.slug}`}
                      className="read-more"
                    >
                      Read More
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {blogs.length > 3 && (
            <div className="d-flex justify-content-center gap-3 mt-5">
              <button
                onClick={prevSlide}
                className="nav-button"
                aria-label="Previous blogs"
              >
                <ChevronLeft size={24} className="rotate-180" />
              </button>
              <button
                onClick={nextSlide}
                className="nav-button"
                aria-label="Next blogs"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
        {/* <!-- BLOG AREA END -->

    <!-- CALL TO ACTION START (call-to-action-6) --> */}
        <div className="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
          <Container>
            <Row>
              <Col xs={12}>
                <CallToAction />
              </Col>
            </Row>
          </Container>
        </div>
        {/* <!-- CALL TO ACTION END --> */}

        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <button
            className="btn btn-primary shadow-lg rounded-pill px-4 py-2 d-flex align-items-center gap-2"
            style={{
              fontWeight: 500,
              fontSize: '16px',
              backgroundColor: '#C4D65A',
              border: 'none',
            }}
            onClick={handleOpenPopUp}
          >
            <i className="bi bi-chat-dots-fill"></i> Inquiry
          </button>
        </div>

      </LayoutTwo>
    </>
  );
}

export async function getStaticProps() {

  const filePath = path.join(process.cwd(), "src/data/hero/", "index-three.json");

  const brandfilePath = path.join(process.cwd(), "src/data/brand-logo/", "index.json");

  const testimonialFilePath = path.join(process.cwd(), "src/data/testimonial/", "index-three.json");

  const data = JSON.parse(await fs.readFile(filePath));
  const brand = JSON.parse(await fs.readFile(brandfilePath));
  const testimonialData = JSON.parse(await fs.readFile(testimonialFilePath));

  return {
    props: {
      data,
      brand,
      testimonialData
    },
  };
}

export default HomePage;
