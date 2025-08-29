// src/pages/Employees.js (Updated)
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import ReusableTable from './ReusableTable';
import { useAuth } from '../../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { fetchEmployees, deleteEmployee} from '../../../services/userService'
import { useDisclosure } from '@heroui/react';
import '../../Dashboard.css'
import EditEmployeeModal from '../Modal/EditEmployeeModal';

const Employees = () => {
  const { isAuthenticated, loading, logout } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('Position');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { isOpen: isModalOpen, onOpen: openModal, onOpenChange: setModalOpen } = useDisclosure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const getEmployees = async () => {
    try {
      const data = await fetchEmployees();
      console.log('fetched details',data)
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          employee.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPosition = selectedPosition === 'Position' || employee.position.includes(selectedPosition);

    return matchesSearch && matchesPosition;
  });

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  // New action handlers for employees
  const handleEmployeeAction = async (employeeId, action) => {
    console.log('employeeid', employeeId, action)
    const employee = employees.find(emp => emp._id === employeeId);
    if (action === 'delete') {
      try {
        await deleteEmployee(employeeId);
        setEmployees(prev => prev.filter(employee => employee._id !== employeeId));
        console.log(`Employee ${employeeId} deleted successfully.`);
      } catch (error) {
        console.error("Failed to delete employee:", error);
      }
    } else if (action === 'edit') {
      console.log(`Editing employee with ID: ${employeeId}`);
      setSelectedEmployee(employee);
      setModalOpen(true);
    }
  };
  const handleEmployeeUpdated = () => {
    // Refetch employees after editing
    getEmployees();
  };

  const employeesColumns = [
    { header: 'Sr no.', className: 'sr-no', cell: (item, index) => String(index + 1).padStart(2, '0') },
    { header: 'Employee Name', className: 'employee-name', cell: (item) => item.name },
    { header: 'Email', className: 'employee-email', cell: (item) => item.email },
    { header: 'Phone Number', className: 'employee-phone', cell: (item) => item.phone },
    { header: 'Position', className: 'employee-position', cell: (item) => item.position },
    { header: 'Department', className: 'employee-department', cell: (item) => item.department },
    { header: 'Start Date', className: 'employee-start-date', cell: (item) => new Date(item.startDate).toLocaleDateString() },
    
    // Updated Action column cell to include the dropdown logic
    {
      header: 'Action',
      className: 'candidate-action',
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
              <button 
                onClick={() => onAction(item._id, 'edit')} 
                className="dropdown-item"
              >
                Edit
              </button>
              <button 
                onClick={() => onAction(item._id, 'delete')} 
                className="dropdown-item delete"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )
    }
  ];

  if (loading) return <div className="loading">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <div className="candidates-section">
            <div className="section-header">
              <div className="header-content">
                <h1 className="section-title">Employees</h1>
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
              <div className="filter-group">
                <select id="position-filter" value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)} className="filter-select">
                  <option value="Position">Position</option>
                  <option value="Intern">Intern</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior </option>
                  <option value="Team Lead">Team Lead</option>
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
              data={filteredEmployees}
              columns={employeesColumns}
              onAction={handleEmployeeAction}
            />
            {selectedEmployee && (
              <EditEmployeeModal
                isOpen={isModalOpen}
                onOpenChange={setModalOpen}
                employeeData={selectedEmployee}
                onEmployeeUpdated={handleEmployeeUpdated}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Employees;