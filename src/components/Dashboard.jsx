import React, { useState } from 'react';
import './Dashboard.css';
// import Header from './dashboard/Header';
import Sidebar from './dashboard/Sidebar';
import CandidatesTable from './dashboard/CandidatesTable';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useDisclosure } from "@heroui/react";
import AddCandidateModal from './dashboard/AddCandidateModal';

const Dashboard = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState('Status');
  const [selectedPosition, setSelectedPosition] = useState('Position');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // Sample candidates data
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Jacob William',
      email: 'jacob.william@example.com',
      phone: '(252) 555-0111',
      position: 'Senior Developer',
      status: 'New',
      experience: '1+',
      action: 'ellipsis'
    },
    {
      id: 2,
      name: 'Guy Hawkins',
      email: 'kenzi.lawson@example.com',
      phone: '(907) 555-0101',
      position: 'Human Resource I...',
      status: 'New',
      experience: '',
      action: 'ellipsis'
    },
    {
      id: 3,
      name: 'Arlene McCoy',
      email: 'arlene.mccoy@example.com',
      phone: '(302) 555-0107',
      position: 'Full Time Designer',
      status: 'Selected',
      experience: '',
      action: 'ellipsis'
    },
    {
      id: 4,
      name: 'Leslie Alexander',
      email: 'willie.jennings@example.com',
      phone: '(207) 555-0119',
      position: 'Full Time Developer',
      status: 'Rejected',
      experience: '0',
      action: 'ellipsis'
    }
  ]);

  // Filter candidates based on search and filters
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'Status' || candidate.status === selectedStatus;
    const matchesPosition = selectedPosition === 'Position' || candidate.position.includes(selectedPosition);

    return matchesSearch && matchesStatus && matchesPosition;
  });

  // Handle status change
  const handleStatusChange = (candidateId, newStatus) => {
    setCandidates(prev =>
      prev.map(candidate =>
        candidate.id === candidateId
          ? { ...candidate, status: newStatus }
          : candidate
      )
    );
  };

  // Handle candidate actions
  const handleCandidateAction = (candidateId, action) => {
    switch (action) {
      case 'download':
        console.log(`Downloading resume for candidate ${candidateId}`);
        break;
      case 'delete':
        setCandidates(prev => prev.filter(candidate => candidate.id !== candidateId));
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  // Show loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="">
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <div className="candidates-section">
            <div className="section-header">
              <div className="header-content">
                <h1 className="section-title">Candidates</h1>
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
                        <div className="dropdown-item">
                          <span>Profile</span>
                        </div>
                        <div className="dropdown-item">
                          <span>Settings</span>
                        </div>
                        <div className="dropdown-divider"></div>
                        <div className="dropdown-item" onClick={handleLogout}>
                          <span>Logout</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="filters-and-actions">
              <div className="filters">
                <div className="filter-group">
                  <select
                    id="status-filter"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="filter-select"
                  >
                    <option value="Status">Status</option>
                    <option value="New">New</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="filter-group">
                  <select
                    id="position-filter"
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="filter-select"
                  >
                    <option value="Position">Position</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Human Resource">Human Resource</option>
                    <option value="Full Time Designer">Full Time Designer</option>
                    <option value="Full Time Developer">Full Time Developer</option>
                  </select>
                </div>
              </div>

              <div className="search-and-add">
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                    <div>
                    <button
                  className="add-candidate-btn"
                  onClick={onOpen}
                >
                  Add Candidate
                </button>

                <AddCandidateModal isOpen={isOpen} onOpenChange={onOpenChange} />
                    </div>
                
              </div>
            </div>

            <CandidatesTable
              candidates={filteredCandidates}
              onStatusChange={handleStatusChange}
              onAction={handleCandidateAction}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
