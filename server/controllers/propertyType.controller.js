const PropertyType = require('../models/propertyType.model.js');

// Create and Save a new PropertyType

exports.createPropertyType = async (req, res) => {
    try {
        const { name } = req.body;
        // Validate request
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required'
            });
        }

        // Create a PropertyType
        const newPropertyType = new PropertyType({
            name
        });

        // Save PropertyType in the database
        await newPropertyType.save();
        res.status(201).json({
            success: true,
            message: 'PropertyType is created',
            data: newPropertyType
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

// Retrieve and return all propertyTypes from the database.

exports.findAllPropertyTypes = async (req, res) => {
    try {
        const propertyTypes = await PropertyType.find();
        if(propertyTypes.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'PropertyTypes not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: propertyTypes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Find a single propertyType with a propertyTypeId

exports.findOnePropertyType = async (req, res) => {
    try {
        const id = req.params.id;
        const foundPropertyType = await PropertyType.findById(id);
        if (!foundPropertyType) {
            return res.status(404).json({
                success: false,
                message: 'PropertyType not found'
            });
        }
        res.status(200).json({
            success: true,
            data: foundPropertyType
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Update a propertyType identified by the propertyTypeId in the request

exports.updatePropertyType = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;

        // Validate Request
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required'
            });
        }

        // Find propertyType and update it with the request body
        const updatedPropertyType = await PropertyType.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedPropertyType) {
            return res.status(404).json({
                success: false,
                message: 'PropertyType not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'PropertyType is updated',
            data: updatedPropertyType
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

// Delete a propertyType with the specified propertyTypeId in the request

exports.deletePropertyType = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPropertyType = await PropertyType.findByIdAndDelete(id);
        if (!deletedPropertyType) {
            return res.status(404).json({
                success: false,
                message: 'PropertyType not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'PropertyType is deleted',
            data: deletedPropertyType
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};