// src/components/dashboard/Table/ReusableTable.js
import React, { useState, useEffect, useRef } from 'react';
import '../CandidatesTable.css'

const ReusableTable = ({ data, columns, onAction }) => {
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleActionClick = (id) => {
    setOpenActionMenu(openActionMenu === id ? null : id);
  };

  return (
    <div className="candidates-table-container">
      <table className="candidates-table">
        <thead>
          <tr className="table-header">
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id || index} className="table-row">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={column.className}>
                  {/*
                    The column.cell function now receives a third argument:
                    handleActionClick for opening the dropdown.
                    onAction to perform the actual action.
                  */}
                  {column.cell(item, index, handleActionClick, onAction, openActionMenu)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;