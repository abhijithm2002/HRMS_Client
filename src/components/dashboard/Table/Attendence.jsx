import React, { useState, useEffect } from 'react';
import '../../Dashboard.css'
import Sidebar from '../Sidebar';
import ReusableTable from './ReusableTable';
import { useAuth } from '../../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useDisclosure } from "@heroui/react";
import { fetchAttendanceRecords, updateAttendanceStatus } from '../../../services/userService'

const AttendanceDashboard = () => {
  const { isAuthenticated, loading, logout } = useAuth();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Status');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getAttendance = async () => {
    try {
      const data = await fetchAttendanceRecords();
      console.log('data',data)
      setAttendanceRecords(data);
    } catch (error) {
      console.error('Failed to fetch attendance records', error);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  const filteredAttendance = attendanceRecords.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'Status' || record.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (recordId, newStatus) => {
    console.log('recodrid and new status', recordId, newStatus)
    try {
      await updateAttendanceStatus(recordId, newStatus);
      setAttendanceRecords(prev =>
        prev.map(record =>
          record._id === recordId ? { ...record, status: newStatus } : record
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleAttendanceAction = (recordId, action) => {
    if (action === 'delete') {
      setAttendanceRecords(prev => prev.filter(record => record._id !== recordId));
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  const attendanceColumns = [
    { header: 'Sr no.', className: 'sr-no', cell: (item, index) => String(index + 1).padStart(2, '0') },
    { header: 'Employee Name', className: 'employee-name', cell: (item) => item.name },
    { header: 'Date', className: 'attendance-date', cell: (item) => new Date(item.startDate).toLocaleDateString() },
    { header: 'Task', className: 'attendance-task', cell: (item) => item.task || '-' },
    { 
      header: 'Status', 
      className: 'attendance-status', 
      cell: (item) => (
        <select
          value={item.status}
          onChange={(e) => handleStatusChange(item._id, e.target.value)}
          className={`status-select border rounded px-2 py-1 
            ${item.status === "Present" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}`}
        >
          <option value="Present" className="text-green-600">Present</option>
          <option value="Absent" className="text-red-600">Absent</option>
        </select>
      )
    },
    
    {
      header: 'Action',
      className: 'attendance-action',
      cell: (item, index, handleActionClick, onAction, openActionMenu) => (
        <div className="relative">
          <button
            className="action-btn"
            onClick={() => handleActionClick(item._id)}
            aria-label="Actions"
          >
            <svg className="ellipsis-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
          {openActionMenu === item._id && (
            <div className="action-dropdown-menu">
              <button onClick={() => onAction(item._id, 'edit')} className="dropdown-item">Edit</button>
              <button onClick={() => onAction(item._id, 'delete')} className="dropdown-item delete">Delete</button>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="dashobard">
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <div className="candidates-section">
            <div className="section-header">
            <div className="header-content">
              <h1 className="section-title">Attendance</h1>
              <div className="header-icons">
                  <button className="icon-btn" aria-label="Mail">
                    <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button className="icon-btn" aria-label="Notifications">
                    <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.83 10.83a4 4 0 015.66-5.66l1.25 1.25m0 0l1.38 1.38a4 4 0 015.66 5.66l-1.25 1.25m0 0l-1.38 1.38a4 4 0 01-5.66-5.66l1.25-1.25m0 0l-1.38-1.38a4 4 0 00-5.66 5.66l1.25 1.25" />
                    </svg>
                  </button>
                  <div className="user-menu">
                    <button
                      className="user-profile-btn"
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      aria-label="User menu"
                    >
                      <div className="user-avatar">
                        <svg className="avatar-icon" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                      <svg className="chevron-down" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {showUserMenu && (
                      <div className="user-dropdown">
                        <div className="dropdown-item"><span>Profile</span></div>
                        <div className="dropdown-item"><span>Settings</span></div>
                        <div className="dropdown-divider"></div>
                        <div className="dropdown-item" onClick={handleLogout}><span>Logout</span></div>
                      </div>
                    )}
                  </div>
                </div>
                </div>
            </div>

            <div className="filters-and-actions">
              <div className="filters">
                <select
                  id="status-filter"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="Status">Status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
              <div className="search-container">
                <input type="text" placeholder="Search employees..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input"/>
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
             
            </div>

            <ReusableTable
              data={filteredAttendance}
              columns={attendanceColumns}
              onAction={handleAttendanceAction}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
