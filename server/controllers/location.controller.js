const location = require('../models/location.model');

// Create and Save a new Location
exports.createLocation = async (req, res) => {
    try {
        const { name } = req.body;
        // Validate request
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required'
            });
        }

        // Create a Location
        const newLocation = new location({
            name
        });

        // Save Location in the database
        await newLocation.save();
        res.status(201).json({
            success: true,
            message: 'Location is created',
            data: newLocation
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
};

// Retrieve and return all locations from the database.
exports.findAllLocations = async (req, res) => {
    try {
        const locations = await location.find();
        if(locations.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Locations not found'
            });
        }
        res.status(200).json({
            success: true,
            data: locations
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

// Find a single location with a locationId
exports.findOneLocation = async (req, res) => {
    try {
        const id = req.params.id;
        const foundLocation = await location.findById(id);
        if (!foundLocation) {
            return res.status(404).json({
                success: false,
                message: 'Location not found'
            });
        }
        res.status(200).json({
            success: true,
            data: foundLocation
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

// Update a location identified by the locationId in the request

exports.updateLocation = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        // Validate request
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required'
            });
        }

        const updatedLocation = await location.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedLocation) {
            return res.status(404).json({
                success: false,
                message: 'Location not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Location updated',
            data: updatedLocation
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

// Delete a location with the specified locationId in the request

exports.deleteLocation = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedLocation = await location.findByIdAndDelete(id);
        if (!deletedLocation) {
            return res.status(404).json({
                success: false,
                message: 'Location not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Location is deleted'
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

