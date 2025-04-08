import React, { useState, useEffect } from 'react';
import {
    CTableDataCell,
    CTableRow,
    CSpinner,
    CPagination,
    CPaginationItem,
    CNavLink,
} from '@coreui/react';
import Table from '../../components/Table/Table';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AllCompanyImage = () => {
    const [companyImages, setCompanyImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchCompanyImages();
    }, []);

    const fetchCompanyImages = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('https://www.api.test.propsavvyrealtors.com/api/v1/get_all_company_images');
            setCompanyImages(data.data || []);
        } catch (error) {
            console.error('Error fetching images:', error);
            toast.error('Failed to load company images. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteImage = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`https://www.api.test.propsavvyrealtors.com/api/v1/delete_company_image/${id}`);
            setCompanyImages((prevImages) => prevImages.filter((img) => img._id !== id));
            toast.success('Company image deleted successfully!');
        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('Failed to delete the company image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteImage(id);
            }
        });
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = companyImages.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(companyImages.length / itemsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    const heading = ['S.No', 'Image', 'Action'];

    return (
        <>
            {loading ? (
                <div className="spin-style">
                    <CSpinner color="primary" variant="grow" />
                </div>
            ) : (
                <Table
                    heading="All Company Images"
                    btnText="Add Image"
                    btnURL="/company_image/add_company_image"
                    tableHeading={heading}
                    tableContent={
                        
                        currentData.map((item, index) => (
                            <CTableRow key={item._id}>
                                <CTableDataCell>{startIndex + index + 1}</CTableDataCell>
                                <CTableDataCell>
                                    <img src={item.image.url} alt="Company Image" width={100} />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div className="action-parent">
                                        {/* <CNavLink href={`#/company_images/edit/${item._id}`} className='edit'>
                                            <i className="ri-pencil-fill"></i>
                                        </CNavLink> */}
                                        <div className="delete" onClick={() => confirmDelete(item._id)}>
                                            <i className="ri-delete-bin-fill"></i>
                                        </div>
                                    </div>
                                </CTableDataCell>
                            </CTableRow>
                        ))
                    }
                    pagination={
                        <CPagination className="justify-content-center">
                            <CPaginationItem
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Previous
                            </CPaginationItem>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <CPaginationItem
                                    key={index}
                                    active={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </CPaginationItem>
                            ))}
                            <CPaginationItem
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next
                            </CPaginationItem>
                        </CPagination>
                    }
                />
            )}
        </>
    );
};

export default AllCompanyImage;
