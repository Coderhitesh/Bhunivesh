const CompanyImage = require('../models/companyImage.model');
const { uploadImage, deleteImageFromCloudinary } = require('../Utils/Cloudnary');
const fs = require('fs').promises;

exports.createCompanyImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an image',
            });
        }

        // Upload Image
        const imgUrl = await uploadImage(req.file.path);
        if (!imgUrl || !imgUrl.image || !imgUrl.public_id) {
            throw new Error('Image upload failed');
        }

        // Save Image URL to Database
        const companyImage = new CompanyImage({
            image: {
                url: imgUrl.image,
                public_id: imgUrl.public_id
            }
        });

        await companyImage.save();

        // Delete Local File After Upload
        try {
            await fs.unlink(req.file.path);
        } catch (error) {
            console.error('Error deleting file from local storage:', error);
        }

        return res.status(200).json({
            success: true,
            message: 'Company Image uploaded successfully',
            data: companyImage
        });

    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


exports.updateCompanyImage = async (req, res) => {
    try {
        const { id } = req.params;
        const companyImage = await CompanyImage.findById(id);
        if (!companyImage) {
            return res.status(404).json({
                success: false,
                message: 'Company Image not found',
            });
        }

        if (req.file) {
            await deleteImageFromCloudinary(companyImage.image.public_id);
            const imgUrl = await uploadImage(req.file.path);
            companyImage.image = {
                url: imgUrl.image,
                public_id: imgUrl.public_id
            };
            try {
                await fs.unlink(req.file.path);
            } catch (error) {
                console.error('Error deleting file from local storage:', error);
            }
        }

        await companyImage.save();
        return res.status(200).json({
            success: true,
            message: 'Company Image updated successfully',
            data: companyImage
        });
    } catch (error) {
        console.log("Internal server error", error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.getAllCompanyImages = async (req, res) => {
    try {
        const companyImages = await CompanyImage.find();
        if(companyImages.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Company Images not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Company Images retrieved successfully',
            data: companyImages
        });
    } catch (error) {
        console.log("Internal server error", error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.getSingleCompanyImage = async (req, res) => {
    try {
        const { id } = req.params;
        const companyImage = await CompanyImage.findById(id);
        if (!companyImage) {
            return res.status(404).json({
                success: false,
                message: 'Company Image not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Company Image retrieved successfully',
            data: companyImage
        });
    } catch (error) {
        console.log("Internal server error", error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.deleteCompanyImage = async (req, res) => {
    try {
        const { id } = req.params;
        const companyImage = await CompanyImage.findById(id);
        if (!companyImage) {
            return res.status(404).json({
                success: false,
                message: 'Company Image not found',
            });
        }
        await deleteImageFromCloudinary(companyImage.image.public_id);
        await CompanyImage.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: 'Company Image deleted successfully',
        });
    } catch (error) {
        console.log("Internal server error", error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}