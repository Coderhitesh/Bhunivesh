const Blog = require('../models/blog.model');
const { uploadImage, deleteImageFromCloudinary } = require('../Utils/Cloudnary');
const fs = require('fs').promises;

exports.createBlog = async (req, res) => {
    const uploadedImages = [];
    try {
        const { title, content,MetaTitle,MetaDescription,MetaKeywords } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }
        if (!MetaTitle) {
            return res.status(400).json({ message: "MetaTitle is required" });
        }
        if (!MetaDescription) {
            return res.status(400).json({ message: "MetaDescription is required" });
        }
        if (!MetaKeywords) {
            return res.status(400).json({ message: "MetaKeywords is required" });
        }
        if (!req.files) {
            return res.status(400).json({
                success: false,
                message: "Please upload a file",
            });
        }

        const blog = new Blog({
            title,
            content,
            MetaTitle,
            MetaDescription,
            MetaKeywords 
        });

        if (req.files) {
            const { image, largeImage } = req.files;

            if (image && image[0]) {
                const imgUrl = await uploadImage(image[0]?.path);
                blog.image = {
                    url: imgUrl.image,
                    public_id: imgUrl.public_id
                };
                uploadedImages.push(imgUrl.public_id);
                if (await fs.access(image[0].path).then(() => true).catch(() => false)) {
                    await fs.unlink(image[0].path);
                    console.log("unlink image")
                } else {
                    console.warn("File not found, skipping unlink:", image[0].path);
                }
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Please upload image"
                });
            }

            if (largeImage && largeImage[0]) {
                const imgUrl = await uploadImage(largeImage[0]?.path);
                blog.largeImage = {
                    url: imgUrl.image,
                    public_id: imgUrl.public_id
                };
                uploadedImages.push(imgUrl.public_id);
                if (await fs.access(image[0].path).then(() => true).catch(() => false)) {
                    await fs.unlink(image[0].path);
                    console.log("unlink image")
                } else {
                    console.warn("File not found, skipping unlink:", image[0].path);
                }
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Please upload large image"
                });
            }
        }

        const blogSave = await blog.save();
        if(!blogSave){
            for (let public_id of uploadedImages) {
                await deleteImageFromCloudinary(public_id);
            }
            return res.status(400).json({
                success: false,
                message: "Failed to save vendor and delete uploaded images"
            });
        }
        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: blog,
        });
    } catch (error) {
        console.log("Internal server error in creating blog", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.getAllBlog = async (req, res) => {
    try {
        const blogs = await Blog.find();
        if (!blogs) {
            return res.status(400).json({
                success: false,
                message: "No blogs found",
            })
        }
        res.status(200).json({
            success: true,
            message: "Blogs retrieved successfully",
            data: blogs
        })
    } catch (error) {
        console.log("Internal server error in getting all blogs", error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "Blog not found",
            })
        }
        res.status(200).json({
            success: true,
            message: "Blog retrieved successfully",
            data: blog
        })

    } catch (error) {
        console.log("Internal server error in getting blogs", error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "Blog not found",
            })
        }
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        })

    } catch (error) {
        console.log("Internal server error in deleting blog", error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.updateBlog = async (req, res) => {
    const uploadedImages = [];
    try {
        const { title, content,MetaTitle,MetaDescription,MetaKeywords  } = req.body;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Blog ID is required" });
        }

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Update title and content if provided
        if (title) blog.title = title;
        if (content) blog.content = content;
        if (MetaTitle) blog.MetaTitle = MetaTitle;
        if (MetaDescription) blog.MetaDescription = MetaDescription;
        if (MetaKeywords) blog.MetaKeywords = MetaKeywords;

        if (req.files) {
            const { image, largeImage } = req.files;

            // Handle image update
            if (image && image[0]) {
                if (blog.image && blog.image.public_id) {
                    // Delete old image from Cloudinary
                    await deleteImageFromCloudinary(blog.image.public_id);
                }
                const imgUrl = await uploadImage(image[0]?.path);
                blog.image = {
                    url: imgUrl.image,
                    public_id: imgUrl.public_id,
                };
                uploadedImages.push(imgUrl.public_id);
                if (await fs.access(image[0].path).then(() => true).catch(() => false)) {
                    await fs.unlink(image[0].path);
                }
            }

            // Handle large image update
            if (largeImage && largeImage[0]) {
                if (blog.largeImage && blog.largeImage.public_id) {
                    // Delete old large image from Cloudinary
                    await deleteImageFromCloudinary(blog.largeImage.public_id);
                }
                const imgUrl = await uploadImage(largeImage[0]?.path);
                blog.largeImage = {
                    url: imgUrl.image,
                    public_id: imgUrl.public_id,
                };
                uploadedImages.push(imgUrl.public_id);
                if (await fs.access(largeImage[0].path).then(() => true).catch(() => false)) {
                    await fs.unlink(largeImage[0].path);
                }
            }
        }

        const updatedBlog = await blog.save();
        if (!updatedBlog) {
            for (let public_id of uploadedImages) {
                await deleteImageFromCloudinary(public_id);
            }
            return res.status(400).json({
                success: false,
                message: "Failed to update blog and delete uploaded images",
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog,
        });
    } catch (error) {
        console.error("Internal server error in updating blog", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.getBlogBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const blog = await Blog.findOne({ slug: slug });
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Blog retrieved successfully",
            data: blog,
        });
    } catch (error) {
        console.error("Internal server error in getting blog by slug", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};