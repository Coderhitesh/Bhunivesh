import React, { useState, useEffect } from 'react';
import {
    CTableDataCell,
    CTableRow,
    CSpinner,
    CPagination,
    CPaginationItem,
} from '@coreui/react';
import Table from '../../components/Table/Table';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AllTeam = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
        setLoading(true);
        try {

            const { data } = await axios.get('http://localhost:8765/api/v1/get_teams');
            setTeamMembers(data.data || []);
        } catch (error) {
            console.error('Error fetching team members:', error);
            toast.error('Failed to load team members. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteMember = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8765/api/v1/delete_team/${id}`);
            setTeamMembers((prevMembers) => prevMembers.filter((member) => member._id !== id));
            toast.success('Team member deleted successfully!');
        } catch (error) {
            console.error('Error deleting team member:', error);
            toast.error('Failed to delete the team member. Please try again.');
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
                handleDeleteMember(id);
            }
        });
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = teamMembers.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(teamMembers.length / itemsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    const heading = ['S.No', 'Name', 'Position', 'Image', 'Action'];

    return (
        <>
            {loading ? (
                <div className="spin-style">
                    <CSpinner color="primary" variant="grow" />
                </div>
            ) : (
                <Table
                    heading="All Team Members"
                    btnText="Add Member"
                    btnURL="/team/add_team"
                    tableHeading={heading}
                    tableContent={
                        currentData.map((member, index) => (
                            <CTableRow key={member._id}>
                                <CTableDataCell>{startIndex + index + 1}</CTableDataCell>
                                <CTableDataCell>{member.name}</CTableDataCell>
                                <CTableDataCell>{member.position}</CTableDataCell>
                                <CTableDataCell>
                                    <img src={member.image.url} alt={member.name} width={100} />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div className="action-parent">
                                        <div className="delete" onClick={() => confirmDelete(member._id)}>
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

export default AllTeam;
