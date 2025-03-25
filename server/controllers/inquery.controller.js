const Inquery = require('../models/inquery.model');

// Create and Save a new Inquery

exports.createInquery = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
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

        // Create a Inquery
        const newInquery = new Inquery({
            name,
            email,
            phone,
            message
        });

        // Save Inquery in the database
        await newInquery.save();
        res.status(201).json({
            success: true,
            message: 'Inquery is created',
            data: newInquery
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

// Retrieve and return all inquerys from the database.

exports.findAllInquerys = async (req, res) => {
    try {
        const inquerys = await Inquery.find();
        if (inquerys.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Inquerys not found'
            });
        }
        res.status(200).json({
            success: true,
            data: inquerys
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

exports.deleteInquery = async (req, res) => {
    try {
        const { id } = req.params;
        const findInquiry = await Inquery.findByIdAndDelete(id)
        if (!findInquiry) {
            return res.status(404).json({
                success: false,
                message: 'Inquery not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Inquery is deleted'
        })

    } catch (error) {
        console.log("Internal server error", error)
        res.status(500).json({
            success: false,
            message: 'Internal sever error',
            error: error.message
        })
    }
}