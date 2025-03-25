const PropertyInquery = require('../models/propertyInquery.model.js');

// Create and Save a new PropertyInquery

exports.createPropertyInquery = async (req, res) => {
    try {
        const { name, email, phone, message, property } = req.body;
        // Validate request
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required'
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: 'Phone is required'
            });
        }

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        if (!property) {
            return res.status(400).json({
                success: false,
                message: 'Property is required'
            });
        }

        // Create a PropertyInquery
        const newPropertyInquery = new PropertyInquery({
            name,
            email,
            phone,
            message,
            property
        });

        // Save PropertyInquery in the database
        await newPropertyInquery.save();
        res.status(201).json({
            success: true,
            message: 'PropertyInquery is created',
            data: newPropertyInquery
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

// Retrieve and return all propertyInquirys from the database.

exports.findAllPropertyInquirys = async (req, res) => {
    try {
        const propertyInquirys = await PropertyInquery.find().populate('property');
        if (propertyInquirys.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'PropertyInquirys not found'
            });
        }

        res.status(200).json({
            success: true,
            data: propertyInquirys
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

// Find a single propertyInquiry with a propertyInquiryId

exports.findOnePropertyInquiry = async (req, res) => {
    try {
        const id = req.params.id;
        const foundPropertyInquiry = await PropertyInquery.findById(id).populate('property');
        if (!foundPropertyInquiry) {
            return res.status(404).json({
                success: false,
                message: 'PropertyInquiry not found'
            });
        }
        res.status(200).json({
            success: true,
            data: foundPropertyInquiry
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
}

// Update a propertyInquiry identified by the propertyInquiryId in the request

// exports.updatePropertyInquiry = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { name, email, phone, message, property } = req.body;

//         // Validate request
//         if (!name) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Name is required'
//             });
//         }

//         if (!email) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Email is required'
//             });
//         }

//         if (!phone) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Phone is required'
//             });
//         }

//         if (!message) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Message is required'
//             });
//         }

//         if (!property) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Property is required'
//             });
//         }

//         // Find propertyInquiry and update it with the request body
//         const updatedPropertyInquiry = await PropertyInquery.findByIdAndUpdate(id, {
//             name,
//             email,
//             phone,
//             message,
//             property
//         }, { new: true });

//         if (!updatedPropertyInquiry) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'PropertyInquiry not found'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'PropertyInquiry is updated',
//             data: updatedPropertyInquiry
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: 'Internal Server Error',
//             error: error.message
//         })
//     }
// }

// Delete a propertyInquiry with the specified propertyInquiryId in the request

exports.deletePropertyInquiry = async (req, res) => {
    try {
        const id = req.params.id;
        const propertyInquiry = await PropertyInquery.findByIdAndDelete(id);
        if (!propertyInquiry) {
            return res.status(404).json({
                success: false,
                message: 'PropertyInquiry not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'PropertyInquiry is deleted'
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
