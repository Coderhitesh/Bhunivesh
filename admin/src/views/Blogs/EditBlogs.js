import React, { useMemo, useRef } from 'react';
import { CCol, CFormInput, CFormLabel, CButton } from '@coreui/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import JoditEditor from 'jodit-react';
import Form from '../../components/Form/Form';
import { useParams } from 'react-router-dom';

function EditBlogs() {
    const { id } = useParams();
    const editor = useRef(null);
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        title: '',
        content: '',
        MetaTitle: '',
        MetaDescription: '',
        MetaKeywords: '',
    });
    const [smallImage, setSmallImage] = React.useState(null);
    const [largeImage, setLargeImage] = React.useState(null);
    const [smallImagePreview, setSmallImagePreview] = React.useState('');
    const [largeImagePreview, setLargeImagePreview] = React.useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    // Handle file selection with preview
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (type === 'image') {
            setSmallImage(file);
            setSmallImagePreview(URL.createObjectURL(file));
        } else if (type === 'large') {
            setLargeImage(file);
            setLargeImagePreview(URL.createObjectURL(file));
        }
    };

    const handleFetchBlog = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v1/get_blog/${id}`);
            const allData = data.data;
            setFormData({
                title: allData.title,
                content: allData.content,
                MetaTitle: allData.MetaTitle,
                MetaDescription: allData.MetaDescription,
                MetaKeywords: allData.MetaKeywords,
            });
            setSmallImage(allData.image.url);
            setLargeImage(allData.largeImage.url);
            setSmallImagePreview(allData.image.url); // Use the existing image URL for preview
            setLargeImagePreview(allData.largeImage.url); // Use the existing image URL for preview
        } catch (error) {
            console.log('Internal server error in getting blogs', error);
            toast.error(
                error?.response?.data?.errors?.[0] ||
                error?.response?.data?.message ||
                'Please try again later.'
            );
        }
    };

    React.useEffect(() => {
        handleFetchBlog();
    }, []);

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content || !formData.MetaTitle || !formData.MetaDescription || !formData.MetaKeywords || !smallImage || !largeImage) {
            toast.error('Please fill out all fields and upload both images.');
            return;
        }

        const payload = new FormData();
        payload.append('title', formData.title);
        payload.append('content', formData.content);
        payload.append('MetaTitle', formData.MetaTitle);
        payload.append('MetaDescription', formData.MetaDescription);
        payload.append('MetaKeywords', formData.MetaKeywords);
        payload.append('image', smallImage);
        payload.append('largeImage', largeImage);

        setLoading(true);
        try {
            const res = await axios.put(`http://localhost:8000/api/v1/update_blog/${id}`, payload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success(res.data.message);
        } catch (error) {
            console.error('Error submitting blog:', error);
            toast.error(
                error?.response?.data?.message || 'Failed to add the blog. Please try again later.'
            );
        } finally {
            setLoading(false);
        }
    };

    const config = useMemo(
        () => ({
            readonly: false,
            height: 400,
        }),
        []
    );

    return (
        <>
            <Form
                heading="Edit Blog"
                btnText="Back"
                btnURL="/blogs/all_blogs"
                onSubmit={handleSubmit}
                formContent={
                    <>
                        {/* Small Image Upload */}
                        <CCol md={6}>
                            <CFormLabel className="form_label" htmlFor="smallImage">Upload Small Image</CFormLabel>
                            {smallImagePreview && (
                                <div className="mb-3">
                                    <img
                                        src={smallImagePreview}
                                        alt="Small Preview"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px' }}
                                    />
                                </div>
                            )}
                            <CFormInput
                                type="file"
                                id="smallImage"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'image')}
                            />
                        </CCol>

                        {/* Large Image Upload */}
                        <CCol md={6}>
                            <CFormLabel className="form_label" htmlFor="largeImage">Upload Large Image</CFormLabel>
                            {largeImagePreview && (
                                <div className="mb-3">
                                    <img
                                        src={largeImagePreview}
                                        alt="Large Preview"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px' }}
                                    />
                                </div>
                            )}
                            <CFormInput
                                type="file"
                                id="largeImage"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'large')}
                            />
                        </CCol>

                        {/* Title Input */}
                        <CCol md={6}>
                            <CFormLabel className="form_label" htmlFor="title">Title</CFormLabel>
                            <CFormInput
                                id="title"
                                name="title"
                                placeholder="Enter blog title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </CCol>

                        <CCol md={6}>
                            <CFormLabel className="form_label" htmlFor="MetaTitle">Meta Title</CFormLabel>
                            <CFormInput
                                id="MetaTitle"
                                name="MetaTitle"
                                placeholder="Enter blog Meta Title"
                                value={formData.MetaTitle}
                                onChange={handleChange}
                            />
                        </CCol>

                        <CCol md={6}>
                            <CFormLabel className="form_label" htmlFor="MetaDescription">Meta Description</CFormLabel>
                            <CFormInput
                                id="MetaDescription"
                                name="MetaDescription"
                                placeholder="Enter blog Meta Description"
                                value={formData.MetaDescription}
                                onChange={handleChange}
                            />
                        </CCol>

                        <CCol md={6}>
                            <CFormLabel className="form_label" htmlFor="MetaKeywords">Meta Keywords</CFormLabel>
                            <CFormInput
                                id="MetaKeywords"
                                name="MetaKeywords"
                                placeholder="Enter blog Meta Keywords"
                                value={formData.MetaKeywords}
                                onChange={handleChange}
                            />
                        </CCol>

                        {/* Content Input */}
                        <CCol md={12} className="mt-3">
                            <CFormLabel className="form_label">Content</CFormLabel>
                            <JoditEditor
                                ref={editor}
                                value={formData.content}
                                config={config}
                                tabIndex={1}
                                onBlur={(newContent) =>
                                    setFormData((prevFormData) => ({ ...prevFormData, content: newContent }))
                                }
                            />
                        </CCol>

                        {/* Submit Button */}
                        <CCol xs={12} className="mt-4">
                            <CButton color="primary" type="submit" disabled={loading}>
                                {loading ? 'Please Wait...' : 'Submit'}
                            </CButton>
                        </CCol>
                    </>
                }
            />
        </>
    );
}

export default EditBlogs;
