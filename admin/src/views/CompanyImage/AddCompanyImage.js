import React, { useState } from 'react';
import { CCol, CFormInput, CFormLabel, CButton } from '@coreui/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Form from '../../components/Form/Form';

const AddCompanyImage = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            toast.error('Please upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8765/api/v1/create_company_image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success(res.data.message);
            // Reset the form
            setImage(null);
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error(
                error?.response?.data?.message || 'Failed to upload the image. Please try again later.'
            );
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Form
                heading="Add Company Image"
                btnText="Back"
                btnURL="/company_image/all_company_image"
                onSubmit={handleSubmit}
                formContent={
                    <CCol md={6}>
                        <CFormLabel htmlFor="image">Upload Image</CFormLabel>
                        <CFormInput
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <CCol xs={12} className="mt-4">
                            <CButton color="primary" type="submit" disabled={loading}>
                                {loading ? 'Uploading...' : 'Submit'}
                            </CButton>
                        </CCol>
                    </CCol>
                }
            />
        </>
    );
};

export default AddCompanyImage;
