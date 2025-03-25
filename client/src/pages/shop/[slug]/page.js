import React from "react";
import axios from "axios";
import SingleProperty from "@/components/Custom/SingleProperty";

export async function generateMetadata({ params }) {
  try {
    if (!params || !params.slug) {
      throw new Error("Slug is missing from params");
    }

    const { slug } = params;
    const response = await axios.get(
      `http://localhost:8000/api/v1/get_property_slug/${slug}`
    );

    if (!response.data || !response.data.data) {
      throw new Error("Invalid response structure");
    }

    const property = response.data.data;

    return {
      title: property?.MetaTitle || "Property Details",
      description: property.MetaDescription || "Property details",
      openGraph: {
        title: property?.MetaTitle || "Property Details",
        description: property.MetaDescription || "Property details",
      },
    };
  } catch (error) {
    console.error("Error fetching property metadata:", error.message);

    return {
      title: "Property Details",
      description: "View property details",
      openGraph: {
        title: "Property Details",
        description: "View property details",
      },
    };
  }
}

const PropertyPage = ({ params }) => {
  if (!params || !params.slug) {
    return <p>Error: Property not found</p>;
  }

  return <SingleProperty slug={params.slug} />;
};

export default PropertyPage;
