import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useReactTable, getCoreRowModel} from '@tanstack/react-table';
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable';

export default function EmployeeDirectory() {
    const staffMembers = useSelector((state) => state.staffData.staffList) || [];



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
        data: staffMembers || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
      });
      

    return (
        <div>
            <h2>Employee Directory</h2>
            <EmployeeTable table={table} />
            <Link to="/">Go Back</Link>
        </div>
    );
}
