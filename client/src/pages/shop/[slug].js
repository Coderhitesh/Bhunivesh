import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleProperty from "@/components/Custom/SingleProperty";

export async function generateMetadata({ params }) {
  try {
    const { slug } = params; // Get slug from server params

    const response = await axios.get(`http://localhost:8765/api/v1/get_property_slug/${slug}`);

    if (!response.data || !response.data.data) {
      throw new Error("Invalid response structure");
    }

    const property = response.data.data;

    return {
      title: property?.MetaTitle || "Property Details",
      description: property.MetaDescription || "Explore property details",
      openGraph: {
        title: property?.MetaTitle || "Property Details",
        description: property.MetaDescription || "Explore property details",
        images: [
          {
            url: property?.image?.url || "/default-property.jpg",
            width: 1200,
            height: 630,
            alt: property?.name || "Property Image",
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching property data:", error.message);

    return {
      title: "Property Details",
      description: "Explore our property collection",
      openGraph: {
        title: "Property Details",
        description: "Explore our property collection",
      },
    };
  }
}

const ProductDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  // console.log("slug",slug)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      axios
        .get(`http://localhost:8765/api/v1/get_property_slug/${slug}`)
        .then((response) => {
          setProduct(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return <SingleProperty slug={slug} />;
};

export default ProductDetails;
