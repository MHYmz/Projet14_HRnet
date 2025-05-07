import React from 'react';
import { flexRender } from '@tanstack/react-table';
import "./EmployeeTableCustom.css";

export default function EmployeeTable({ table }) {
    const formatDateToISO = (inputDate) => {
        const parsedDate = new Date(inputDate);
        return parsedDate.toLocaleDateString("fr-CA");
    };

    return (
        <section className="responsive-table-container">
            <table className="custom-staff-table">
                <thead>
                    {table.getHeaderGroups().map((group) => (
                        <tr key={group.id}>
                            {group.headers.map((column) => (
                                <th 
                                    key={column.id} 
                                    onClick={column.column.getToggleSortingHandler()} 
                                    className="sortable-column"
                                >
                                    {flexRender(column.column.columnDef.header, column.getContext())}
                                    {column.column.getCanSort() && (
                                        <span className="sorting-icon">
                                            {column.column.getIsSorted() === 'asc' ? '▲' : ''}
                                            {column.column.getIsSorted() === 'desc' ? '▼' : ''}
                                            {column.column.getIsSorted() === false ? '•' : ''}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="data-cell">
                                        {['startDate', 'dateOfBirth'].includes(cell.column.id)
                                            ? formatDateToISO(cell.getValue())
                                            : flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={table.getAllColumns().length} className="empty-data-row">
                                No record available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}
