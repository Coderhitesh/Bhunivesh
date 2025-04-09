import React, { useState } from 'react';
import { CCol, CFormInput, CFormLabel, CButton } from '@coreui/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Form from '../../components/Form/Form';

const AddTeam = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
  });
  const [image, setImage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.position || !image) {
      toast.error('Please fill out all fields and upload an image.');
      return;
    }

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('position', formData.position);
    payload.append('image', image);

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8765/api/v1/create_team', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(res.data.message);
      // Reset the form
      setFormData({ name: '', position: '' });
      setImage(null);
    } catch (error) {
      console.error('Error uploading team data:', error);
      toast.error(error?.response?.data?.message || 'Failed to add team member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        heading="Add Team Member"
        btnText="Back"
        btnURL="/team/all_team"
        onSubmit={handleSubmit}
        formContent={
          <>
            <CCol md={6}>
              <CFormLabel htmlFor="name">Name</CFormLabel>
              <CFormInput
                id="name"
                name="name"
                placeholder="Enter team member's name"
                value={formData.name}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="position">Position</CFormLabel>
              <CFormInput
                id="position"
                name="position"
                placeholder="Enter position"
                value={formData.position}
                onChange={handleChange}
                
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="image">Upload Image</CFormLabel>
              <CFormInput
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </CCol>
            <CCol xs={12} className="mt-4">
              <CButton color="primary" type="submit" disabled={loading}>
                {loading ? 'Uploading...' : 'Submit'}
              </CButton>
            </CCol>
          </>
        }
      />
    </>
  );
};

export default AddTeam;
