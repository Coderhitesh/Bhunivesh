const Property = require("../models/property.model");
const Location = require("../models/location.model");
const PropertyType = require("../models/propertyType.model");
const {
  uploadImage,
  deleteImageFromCloudinary,
} = require("../Utils/Cloudnary");
const fs = require("fs").promises;
const mongoose = require("mongoose");

// Create and Save a new Property

exports.createProperty = async (req, res) => {
  const uploadedImages = [];
  try {
    const {
      name,
      description,
      rating,
      completeAddress,
      startingPrice,
      location,
      propertyType,
      status,
      MetaTitle,
      MetaKeywords,
      MetaDescription,
    } = req.body;
    // Validate request

    let emptyFields = [];
    if (!name) emptyFields.push("Name");
    if (!description) emptyFields.push("Description");
    if (!completeAddress) emptyFields.push("Complete Address");
    if (!startingPrice) emptyFields.push("Starting Price");
    if (!location) emptyFields.push("Location");
    if (!propertyType) emptyFields.push("Property Type");
    if (!status) emptyFields.push("Status");
    if (!MetaTitle) emptyFields.push("Meta Title");
    if (!MetaKeywords) emptyFields.push("Meta Keywords");
    if (!MetaDescription) emptyFields.push("Meta Description");
    if (!MetaDescription) emptyFields.push("Meta Description");
    if (!rating) emptyFields.push("Rating");

    // Create a Property
    const newProperty = new Property({
      name,
      description,
      startingPrice,
      location,
      propertyType,
      completeAddress,
      propertyType,
      status,
      MetaTitle,
      MetaKeywords,
      MetaDescription,
      rating,
    });

    if (req.file) {
      const imgUrl = await uploadImage(req.file.path);
      const { image, public_id } = imgUrl;
      newProperty.image.url = image;
      newProperty.image.public_id = public_id;
      uploadedImages.push(newProperty.image.public_id);
      try {
        fs.unlink(req.file.path);
      } catch (error) {
        console.log("Error in deleting file form local storage");
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Save Property in the database
    const saveProperty = await newProperty.save();
    if (!saveProperty) {
      if (saveProperty.image.public_id) {
        await deleteImageFromCloudinary(saveProperty.image.public_id);
      }
      return res.status(400).json({
        success: false,
        message: "Failed to save Property",
      });
    }
    res.status(201).json({
      success: true,
      message: "Property is created",
      data: saveProperty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Retrieve and return all properties from the database.

exports.findAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("location")
      .populate("propertyType");
    if (properties.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Properties not found",
      });
    }
    res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Find a single property with a propertyId

exports.findOneProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const foundProperty = await Property.findById(id)
      .populate("location")
      .populate("propertyType");
    if (!foundProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
    res.status(200).json({
      success: true,
      data: foundProperty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update a property identified by the propertyId in the request

exports.updateProperty = async (req, res) => {
  const uploadedImages = [];
  try {
    const id = req.params.id;
    const {
      name,
      description,
      completeAddress,
      startingPrice,
      location,
      propertyType,
      status,
      MetaTitle,
      MetaKeywords,
      MetaDescription,
      rating,
    } = req.body;

    const emptyField = [];
    if (!name) emptyField.push("Name");
    if (!description) emptyField.push("Description");
    if (!completeAddress) emptyField.push("Complete Address");
    if (!startingPrice) emptyField.push("Starting Price");
    if (!location) emptyField.push("Location");
    if (!propertyType) emptyField.push("Property Type");
    if (!status) emptyField.push("Status");
    if (!rating) emptyField.push("Rating");
    // if (!MetaTitle) emptyField.push('Meta Title');
    // if (!MetaKeywords) emptyField.push('Meta Keywords');
    // if (!MetaDescription) emptyField.push('Meta Description');

    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    existingProperty.name = name;
    existingProperty.description = description;
    existingProperty.completeAddress = completeAddress;
    existingProperty.startingPrice = startingPrice;
    existingProperty.location = location;
    existingProperty.propertyType = propertyType;
    existingProperty.status = status;
    existingProperty.MetaTitle = MetaTitle;
    existingProperty.MetaKeywords = MetaKeywords;
    existingProperty.MetaDescription = MetaDescription;
    existingProperty.rating = rating;

    // Check if there's a file for image upload
    if (req.file) {
      if (existingProperty.image.public_id) {
        await deleteImageFromCloudinary(existingProperty.image.public_id);
      }
      const imgUrl = await uploadImage(req.file.path);
      const { image, public_id } = imgUrl;

      // Add the image object to updatedProperty
      existingProperty.image.url = image;
      existingProperty.image.public_id = public_id;

      // Add the public_id to the list of uploaded images
      uploadedImages.push(public_id);

      // Delete the local file
      await fs.unlink(req.file.path).catch((err) => {
        console.error("Error deleting local file:", err.message);
      });
    }

    const updatedDocument = await existingProperty.save();

    if (!updatedDocument) {
      // Delete the image from Cloudinary if update fails
      if (updatedProperty.image?.public_id) {
        await deleteImageFromCloudinary(updatedProperty.image.public_id);
      }
      return res.status(400).json({
        success: false,
        message: "Failed to update Property",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updatedDocument,
    });
  } catch (error) {
    console.error("Error updating property:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete a property with the specified propertyId in the request

exports.deleteProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (property.image.public_id) {
      await deleteImageFromCloudinary(property.image.public_id);
    }

    await Property.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Property is deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// find property by location and property type

exports.findPropertyByLocationAndPropertyType = async (req, res) => {
  try {
    const { location, type } = req.query;
    console.log("Query Parameters:", req.query); 

    const findLocation = await Location.findOne({ name: location });
    const findType = await PropertyType.findOne({ name: type });
   
    let query = {};
    if (location) query.location = findLocation._id;
    if (type) query.propertyType = findType._id;

    const propertieFind = await Property.find(query)
      .populate("location")
      .populate("propertyType");

    if (!propertieFind) {
      return res.status(404).json({
        success: false,
        message: "No properties found for the given location and property type",
      });
    }

    res.status(200).json({
      success: true,
      message: "Properties found for the given location and property type",
      data: propertieFind,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// property find by slug

exports.findPropertyBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;

    // Update query to search by 'slug' instead of '_id'
    const property = await Property.findOne({ slug: slug }).populate("location").populate("propertyType");
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
