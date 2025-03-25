import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleBlog from "@/components/Custom/SingleBlog";

// ✅ Server-Side Metadata Fetching (for SEO)
export async function generateMetadata({ params }) {
  try {
    const { slug } = params; // Use params instead of useRouter()
    const response = await fetch(`http://localhost:8000/api/v1/get_blog_by_slug/${slug}`);
    const data = await response.json();

    if (!data || !data.data) {
      throw new Error("Invalid response structure");
    }

    const blog = data.data;

    return {
      title: blog?.MetaTitle || "Blog Details",
      description: blog?.MetaDescription || "Explore our latest blogs",
      openGraph: {
        title: blog?.MetaTitle || "Blog Details",
        description: blog?.MetaDescription || "Explore our latest blogs",
        images: [
          {
            url: blog?.image?.url || "/default-blog.jpg",
            width: 1200,
            height: 630,
            alt: blog?.title || "Blog Image",
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching blog metadata:", error.message);

    return {
      title: "Blog Details",
      description: "Explore our latest blogs",
      openGraph: {
        title: "Blog Details",
        description: "Explore our latest blogs",
      },
    };
  }
}

// ✅ BlogDetails Component
const BlogDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      axios
        .get(`http://localhost:8000/api/v1/get_blog_by_slug/${slug}`)
        .then((response) => {
          setBlog(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching blog:", error);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <SingleBlog slug={slug} />
  );
};

export default BlogDetails;
