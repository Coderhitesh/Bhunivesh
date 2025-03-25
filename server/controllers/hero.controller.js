const Hero = require('../models/hero.model');
const { uploadImage, deleteImageFromCloudinary } = require('../Utils/Cloudnary');
const fs = require('fs').promises;

// Create and Save a new Hero

exports.createHero = async (req, res) => {
    const uploadedImages = [];
    try {
        const { title, description } = req.body;
        // Validate request
        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            });
        }

        if (!description) {
            return res.status(400).json({
                success: false,
                message: 'Description is required'
            });
        }

        // Create a Hero
        const newHero = new Hero({
            title,
            description
        });

        if (req.file) {
            const imgUrl = await uploadImage(req.file.path)
            const { image, public_id } = imgUrl;
            newHero.image.url = image;
            newHero.image.public_id = public_id;
            uploadedImages.push(newHero.image.public_id)
            try {
                fs.unlink(req.file.path)
            } catch (error) {
                console.log('Error in deleting file form local storage')
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'Please upload an image',
            })
        }

        // Save Hero in the database
        const saveHeror = await newHero.save();
        if (!saveHeror) {
            if (saveHeror.image.public_id) {
                await deleteImageFromCloudinary(saveHeror.image.public_id)
            }
            return res.status(400).json({
                success: false,
                message: 'Failed to save Hero',
            })
        }
        res.status(201).json({
            success: true,
            message: 'Hero is created',
            data: newHero
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

// Retrieve and return all heros from the database.

exports.findAllHeros = async (req, res) => {
    try {
        const heros = await Hero.find();
        if(heros.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Heros not found'
            });
        }
        res.status(200).json({
            success: true,
            data: heros
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

// Find a single hero with a heroId

exports.findOneHero = async (req, res) => {
    try {
        const id = req.params.id;
        const foundHero = await Hero.findById(id);
        if (!foundHero) {
            return res.status(404).json({
                success: false,
                message: 'Hero not found'
            });
        }
        res.status(200).json({
            success: true,
            data: foundHero
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

// Update a hero identified by the heroId in the request

exports.updateHero = async (req, res) => {
    const uploadedImages = [];
    try {
        const id = req.params.id;
        const { title, description } = req.body;
        // Validate request
        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            });
        }

        if (!description) {
            return res.status(400).json({
                success: false,
                message: 'Description is required'
            });
        }

        const hero = await Hero.findById(id);
        if (!hero) {
            return res.status(404).json({
                success: false,
                message: 'Hero not found'
            });
        }

        hero.title = title || hero.title;
        hero.description = description || hero.description;

        if (req.file) {
            if (hero.image.public_id) {
                await deleteImageFromCloudinary(hero.image.public_id)
            }
            const imgUrl = await uploadImage(req.file.path)
            const { image, public_id } = imgUrl;
            hero.image.url = image;
            hero.image.public_id = public_id;
            uploadedImages.push(hero.image.public_id)
            try {
                fs.unlink(req.file.path)
            } catch (error) {
                console.log('Error in deleting file form local storage')
            }
        }

        // Save Hero in the database
        const saveHero = await hero.save();
        if (!saveHero) {
            if (saveHero.image.public_id) {
                await deleteImageFromCloudinary(saveHero.image.public_id)
            }
            return res.status(400).json({
                success: false,
                message: 'Failed to update Hero',
            })
        }
        res.status(200).json({
            success: true,
            message: 'Hero is updated',
            data: hero
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

// Delete a hero with the specified heroId in the request

exports.deleteHero = async (req, res) => {
    try {
        const id = req.params.id;
        const hero = await Hero.findById(id);
        if (!hero) {
            return res.status(404).json({
                success: false,
                message: 'Hero not found'
            });
        }
        if (hero.image.public_id) {
            await deleteImageFromCloudinary(hero.image.public_id)
        }
        await Hero.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Hero is deleted'
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

exports.updateHeroStatus = async (req, res) => {
    try {
        const { id } = req.params; // Extract the id from the request parameters
        const { status } = req.body; // Extract the status from the request body

        // Validate the status field
        if (typeof status !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value. Status must be a boolean.',
            });
        }

        // Find and update the hero by id
        const updatedHero = await Hero.findByIdAndUpdate(
            id,
            { status }, // Update the status field
            { new: true } // Return the updated document
        );

        // If hero not found, return an error
        if (!updatedHero) {
            return res.status(404).json({
                success: false,
                message: 'Hero not found.',
            });
        }

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Hero status updated successfully.',
            data: updatedHero,
        });
    } catch (error) {
        console.error('Error updating hero status:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
        });
    }
};