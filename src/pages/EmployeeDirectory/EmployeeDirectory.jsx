import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useReactTable,
   getCoreRowModel, 
   getFilteredRowModel,
   getPaginationRowModel 
  } from '@tanstack/react-table';
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable';
import "./EmployeeDirectoryCustom.css"
import Header from '../../components/Header/Header';

export default function EmployeeDirectory() {
    const staffMembers = useSelector((state) => state.staffData.staffList) || [];

    const [employees, setEmployees] = useState(() => {
      const stored = localStorage.getItem("employees");
      return stored ? JSON.parse(stored) : staffMembers;

    });
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
      localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    const deleteEmployee = useCallback((id) => {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    }, []);

    const editEmployee = useCallback((id) => {
      const employee = employees.find((emp) => emp.id === id);
      setSelectedEmployee(employee);
    }, [employees]);

    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10
    });

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
              <span
              role="button"
              aria-label="Edit"
              style={{ cursor: "pointer", marginRight: "10px", fontSize: "16px" }}
                onClick={() => editEmployee(row.original.id)}
                >
                  ✏️
                </span>
                <span
                role="button"
                aria-label="Delete"
                style={{ cursor: "pointer", fontSize: "16px" }}
                onClick={() => deleteEmployee(row.original.id)}
                >
                🗑️
                </span>
            </div>
          )
        }
        
      ], [editEmployee, deleteEmployee]);

    
    
      const table = useReactTable({
        data: employees,
        columns,
        state: {
          globalFilter: filterText,
          pagination,
        },
        onGlobalFilterChange: setFilterText,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
      });
      

      const totalPages = table.getPageCount();
    
    return (
       <div>
       < Header />
            <h2>Employee Directory</h2>
            <div className="header">
                <div className="entries-select">
                    <label>
                        Display 
                        <select
                            value={pagination.pageSize}
                            onChange={(e) => {
                              setPagination({
                                pageIndex: 0,
                                pageSize: Number(e.target.value)
                            });
                            }}
                        >
                            {[5, 10, 20, 50].map((size) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select> 
                        rows per page
                    </label>
                    </div>
           
                
                <label className="search-box">
                    <label htmlFor="search">Search:</label>
                    <input
                        value={filterText}
                        onChange={(e) => {
                            setFilterText(e.target.value);
                            setPagination({
                              pageIndex: 0,
                              pageSize: pagination.pageSize
                            });
                          }}
                          
                        placeholder="Search employees..."
                    />
                </label>
            </div>

            <div style={{ margin: '10px 0' }}>
                <strong>
                  Total Results: {table.getFilteredRowModel().rows.length}
                  </strong>
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

            <EmployeeTable table={table}/>

            <div className="pagination">
            <button 
            onClick={() => table.previousPage()} 
            disabled={!table.getCanPreviousPage()}
            >
            Previous 
            </button>
            
            <span> 
              Page {table.getState().pagination.pageIndex + 1} of {totalPages} 
            </span>
            
            <button 
            onClick={() => table.nextPage()} 
            disabled={!table.getCanNextPage()}>
              Next
              </button>
            </div>
            
            <Link to="/" className='go-back-button'> Go Back </Link>
        </div>
    );
}
