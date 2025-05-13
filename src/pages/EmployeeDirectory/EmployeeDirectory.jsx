import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useReactTable, getCoreRowModel, getFilteredRowModel } from '@tanstack/react-table';
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable';
import "./EmployeeDirectoryCustom.css"
import Header from '../../components/Header/Header';

export default function EmployeeDirectory() {
    const staffMembers = useSelector((state) => state.staffData.staffList) || [];

    const [filterText, setFilterText] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

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
      ], []);
      
      const table = useReactTable({
        data: staffMembers,
        columns,
        state: {globalFilter: filterText }, 
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setFilterText,
      });
      
      const filteredData = table.getFilteredRowModel().rows.map(row => row.original)

      const paginatedData = filteredData.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage
      )


      const totalPages = Math.ceil(filteredData.length / rowsPerPage);
      const canGoBack = currentPage > 0;
      const canGoForward = currentPage < totalPages - 1;

      const handlePreviousPage = () => {
        if (canGoBack) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (canGoForward) setCurrentPage(currentPage + 1);
    };
    
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

            <EmployeeTable table={{ ...table, rows: paginatedData.map(row => ({ original: row })) }} />
            
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={!canGoBack}>Previous</button>
                <span> Page {currentPage + 1} of {totalPages} </span>
                <button onClick={handleNextPage} disabled={!canGoForward}>Next</button>
            </div>
            
            <Link to="/" className='go-back-button'>
            Go Back
            </Link>
        </div>
    );
}
