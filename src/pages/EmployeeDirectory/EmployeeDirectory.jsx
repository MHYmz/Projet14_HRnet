import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useReactTable, getCoreRowModel, getFilteredRowModel } from '@tanstack/react-table';
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable';
import "./EmployeeDirectoryCustom.css"
import Header from '../../components/Header/Header';
import {FaEdit, FaTrashAlt} from "react-icons/fa";

export default function EmployeeDirectory() {
    const staffMembers = useSelector((state) => state.staffData.staffList) || [];

    const [employees, setEmployees] = useState(() => {
      try {
      const storedEmployees = localStorage.getItem("employees");
      return storedEmployees ? JSON.parse(storedEmployees) : staffMembers;
      } catch (error) {
        console.error("Failled to parse localStorage employees", error); 
        return staffMembers;
      }
    });
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
      localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    const deleteEmployee = useCallback((id) => {
      setEmployees((prevEmployees) => {
        const updatedEmployees = prevEmployees.filter((emp) => emp.id !== id);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        return updatedEmployees;
      });
    }, []);

    const editEmployee = useCallback((id) => {
      const employee = employees.find((emp) => emp.id === id);
      setSelectedEmployee(employee);
    }, [employees]);

    const saveEditEmployee = useCallback(() => {
      if (!selectedEmployee.firstName || !selectedEmployee.lastName) {
        alert("First Name and Last Name are required.");
        return;
      }
      
      setEmployees((prevEmployees) => {
        const updatedEmployees = prevEmployees.map((emp) =>
          emp.id === selectedEmployee.id ? selectedEmployee : emp
        );
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        return updatedEmployees;
      });
      setSelectedEmployee(null);
    }, [selectedEmployee]);
    
    
    const handleEditChange = (e) => {
      const { name, value } = e.target;
      setSelectedEmployee((prev) => {
        if (["street", "city", "state", "zipCode"].includes(name)) {
          return {
            ...prev,
            address: {
              ...prev.address,
              [name]: value,
            },
          };
        }
        return {
          ...prev,
          [name]: value,
        };
      });
    };
    
    
    
    const columns = useMemo(() => [
        { id: 'firstName', accessorKey: 'firstName', header: 'First Name' },
        { id: 'lastName', accessorKey: 'lastName', header: 'Last Name' },
        { id: 'startDate', accessorKey: 'startDate', header: 'Start Date' },
        { id: 'department', accessorKey: 'department', header: 'Department' },
        { id: 'dateOfBirth', accessorKey: 'dateOfBirth', header: 'Date of Birth' },
        { id: 'street', accessorKey: 'address.street', header: 'Street' },
        { id: 'city', accessorKey: 'address.city', header: 'City' },
        { id: 'state', accessorKey: 'address.state', header: 'State' },
        { id: 'zipCode', accessorKey: 'address.zipCode', header: 'Zip Code' },
        {
          id: 'actions',
          header: 'Actions',
          cell: ({ row }) => (
            <div>
              <FaEdit
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => editEmployee(row.original.id)}
              />
              <FaTrashAlt 
                style={{ cursor: "pointer" }}
                onClick={() => deleteEmployee(row.original.id)}
              />
            </div>
          )
        }
        
      ], [editEmployee, deleteEmployee]);

    
    
      const table = useReactTable({
        data: employees,
        columns,
        state: {globalFilter: filterText }, 
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setFilterText,
      });
      
      const filteredData = useMemo(
        () => table.getFilteredRowModel().rows.map(row => row.original),
        [table]
      );

      const paginatedData = useMemo(() => {
        return filteredData.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage
      )
    }, [filteredData, currentPage, rowsPerPage]);


      const totalPages = Math.ceil(filteredData.length / rowsPerPage);

      const handlePreviousPage = useCallback(() => {
        setCurrentPage((prev) => Math.max(0, prev -1));
    }, []);

    const handleNextPage = useCallback (() => {
        setCurrentPage(prev => Math.min (totalPages - 1 ? prev +1 : prev));
    }, [totalPages]);
    
    return (
       <div>
       < Header />
            <h2>Employee Directory</h2>
            <div className="header">
                <div className="entries-select">
                    <label>
                        Display 
                        <select
                            value={rowsPerPage}
                            onChange={(e) => {
                              setRowsPerPage(Number(e.target.value));
                              setCurrentPage(0);
                            }}
                        >
                            {[5, 10, 20, 50].map((size) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select> 
                        rows per page
                    </label>
                </div>
                <div className="search-box">
                    <label htmlFor="search">Search:</label>
                    <input
                        id="search"
                        value={filterText}
                        onChange={(e) => {
                        setFilterText(e.target.value);
                        setCurrentPage(0);
                          }}
                        placeholder="Search employees..."
                    />
                </div>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <strong>Total Results: {filteredData.length}</strong>
            </div>

            {selectedEmployee && (
            <div className="modal">
            <div className="modal-content">
            <h3>Edit User Information</h3>
            <input name="firstName" value={selectedEmployee.firstName} onChange={handleEditChange} placeholder="First Name" />
            <input name="lastName" value={selectedEmployee.lastName} onChange={handleEditChange} placeholder="Last Name" />
            <input name="dateOfBirth" value={selectedEmployee.dateOfBirth} onChange={handleEditChange} placeholder="Date of Birth" />
            <input name="startDate" value={selectedEmployee.startDate} onChange={handleEditChange} placeholder="Start Date" />
            <input name="department" value={selectedEmployee.department} onChange={handleEditChange} placeholder="Department" />
            <input name="street" value={selectedEmployee.address?.street || ""} onChange={handleEditChange} placeholder="Street" />
            <input name="city" value={selectedEmployee.address?.city || ""} onChange={handleEditChange} placeholder="City" />
            <input name="state" value={selectedEmployee.address?.state || ""} onChange={handleEditChange} placeholder="State" />
            <input name="zipCode" value={selectedEmployee.address?.zipCode || ""} onChange={handleEditChange} placeholder="Zip Code" />

            <div className="modal-actions">
            <button onClick={saveEditEmployee}>Save</button>
            <button onClick={() => setSelectedEmployee(null)}>Cancel</button>
            </div>
            </div>
            </div>
            )}

            <EmployeeTable table={{ ...table, rows: paginatedData.map(row => ({ original: row })) }} />

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 0 }>Previous</button>
                <span> Page {currentPage + 1} of {totalPages} </span>
                <button onClick={handleNextPage} disabled={currentPage >= totalPages -1 }>Next</button>
            </div>
            
            <Link to="/" className='go-back-button'>
            Go Back
            </Link>
        </div>
    );
}
