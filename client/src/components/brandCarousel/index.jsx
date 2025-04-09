'use client';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BrandCarouselOne = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get('http://localhost:8765/api/v1/get_all_company_images');
        setBrands(res.data.data.reverse());
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchBrands();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container py-4">
      <Slider {...settings}>
        {brands.map((brand) => (
          <div key={brand._id} className="p-2">
            <div
              className="bg-white rounded shadow-sm d-flex align-items-center justify-content-center"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src={brand.image?.url}
                alt="Brand"
                className="img-fluid"
                style={{ maxHeight: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandCarouselOne;
