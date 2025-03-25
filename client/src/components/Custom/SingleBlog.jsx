import React, { useEffect, useState } from 'react';
import { LayoutOne } from '@/layouts';
import axios from 'axios';
import {
  Calendar,
  User,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  ChevronLeft,
  BookOpen
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SingleBlog = ({ slug }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/get_blog_by_slug/${slug}`);
        setBlog(data.data);
        setLoading(false);
      } catch (error) {
        console.log("Internal server error", error);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <LayoutOne topbar={true}>
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </LayoutOne>
    );
  }

  if (!blog) {
    return (
      <LayoutOne topbar={true}>
        <div className="container py-5 text-center">
          <h2>Blog post not found</h2>
        </div>
      </LayoutOne>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <LayoutOne topbar={true}>
      {/* Hero Section */}
      <div className="blog-hero position-relative">
        <img
          src={blog.largeImage.url}
          alt={blog.title}
          className="blog-hero-img"
        />
        <div className="blog-hero-overlay"></div>
        <div className="container position-relative">
          <div className="blog-hero-content text-white text-center">
            <h1 className="display-4 fw-bold mb-4">{blog.title}</h1>
            <div className="d-flex justify-content-center align-items-center gap-4">
              <div className="d-flex align-items-center">
                <User size={20} className="me-2" />
                <span>{blog.writer}</span>
              </div>
              <div className="d-flex align-items-center">
                <Calendar size={20} className="me-2" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              {/* <div className="d-flex align-items-center">
                <Clock size={20} className="me-2" />
                <span>5 min read</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            {/* Back Button */}
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-outline-primary mb-4 d-inline-flex align-items-center"
            >
              <ChevronLeft size={20} className="me-2" />
              Back to Blogs
            </button>

            {/* Content */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-body p-4 p-lg-5">
                <h1>{blog.title}</h1>
                {/* Blog Content */}
                <div 
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                ></div>

                {/* Meta Information */}
                {/* <div className="mt-5 pt-4 border-top">
                  <h4 className="h5 mb-3 d-flex align-items-center">
                    <BookOpen size={24} className="me-2 text-primary" />
                    Meta Information
                  </h4>
                  <div className="bg-light p-4 rounded-3">
                    <p className="mb-2"><strong>Title:</strong> {blog.MetaTitle}</p>
                    <p className="mb-2"><strong>Description:</strong> {blog.MetaDescription}</p>
                    <p className="mb-0"><strong>Keywords:</strong> {blog.MetaKeywords}</p>
                  </div>
                </div> */}

                {/* Share Section */}
                {/* <div className="mt-5 pt-4 border-top">
                  <h4 className="h5 mb-3 d-flex align-items-center">
                    <Share2 size={24} className="me-2 text-primary" />
                    Share this article
                  </h4>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary rounded-circle p-2">
                      <Facebook size={20} />
                    </button>
                    <button className="btn btn-outline-info rounded-circle p-2">
                      <Twitter size={20} />
                    </button>
                    <button className="btn btn-outline-secondary rounded-circle p-2">
                      <Linkedin size={20} />
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutOne>
  );
};

export default SingleBlog;