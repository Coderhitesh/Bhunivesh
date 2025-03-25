import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { FaRegUser, FaTags, FaRegCalendarAlt } from "react-icons/fa";

const BlogItem = ({ data, slug }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  return (
    <>
      <div className="ltn__blog-item ltn__blog-item-3">
        <div className="ltn__blog-img">
          <Link href={`/blog/${data.slug}`}>
            <img style={{ height: '300px', width: '100%' }} src={`${data.image?.url}`} alt={`${data.title}`} />
          </Link>
        </div>
        <div className="ltn__blog-brief">
          <div className="ltn__blog-meta">
            <ul>
              <li className="ltn__blog-author">
                <Link href={''}>
                  <FaRegUser className="me-2" />
                  by:
                  {data.writer}
                </Link>
              </li>
              {/* <li className="ltn__blog-tags">
                <Link href="#">
                  <Calendar size={16} />
                  <span>{formatDate(data.createdAt)}</span>
                </Link>
              </li> */}
            </ul>
          </div>
          <h3 className="ltn__blog-title">
            <Link href={`/blog/${data.slug}`}>{data.title}</Link>
          </h3>
          <div className="ltn__blog-meta-btn">
            <div className="ltn__blog-meta">
              <ul>
                <li className="ltn__blog-date">
                  <FaRegCalendarAlt className="me-2" />
                  {formatDate(data.createdAt)}
                </li>
              </ul>
            </div>
            <div className="ltn__blog-btn">
              <Link href={`/blog/${data.slug}`}>Read more <ArrowRight /></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
