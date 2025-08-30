import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutModal from './Modal/LogoutModal';
import './Sidebar.css';

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLogoutOpen, setIsLogoutOpen] = useState(false); // State for logout modal
  const navigate = useNavigate();

  const navigationItems = [
    {
      section: 'Recruitment',
      items: [
        { id: 'candidates', label: 'Candidates', icon: 'person', path: '/dashboard' }
      ]
    },
    {
      section: 'Organization',
      items: [
        { id: 'employees', label: 'Employees', icon: 'users', path: '/employees' },
        { id: 'attendance', label: 'Attendance', icon: 'clock', path: '/attendance' },
        { id: 'leaves', label: 'Leaves', icon: 'calendar', path: '/leaves' }
      ]
    },
    {
      section: 'Others',
      items: [
        { id: 'logout', label: 'Logout', icon: 'logout' } // Removed path here
      ]
    }
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'person':
        return (
          <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'users':
        return (
          <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        );
      case 'clock':
        return (
          <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'calendar':
        return (
          <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'logout':
        return (
          <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleLogoutClick = () => {
    setIsLogoutOpen(true); // Open modal
  };

  const handleLogout = () => {
    console.log("User logged out!"); 
    // Clear tokens, reset auth state, redirect, etc.
    navigate('/'); // Redirect to login
  };

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-content">
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon"></div>
          <span className="logo-text">LOGO</span>
        </div>

        {/* Search */}
        <div className="sidebar-search">
          <div className="search-container">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-navigation">
          {navigationItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="nav-section">
              <h3 className="nav-section-title">{section.section}</h3>
              <ul className="nav-list">
                {section.items.map((item) => (
                  <li key={item.id} className="nav-item">
                    {item.id === 'logout' ? (
                      <button
                        className="nav-link flex items-center gap-2 w-full"
                        onClick={handleLogoutClick}
                      >
                        {getIcon(item.icon)}
                        <span className="nav-label">{item.label}</span>
                      </button>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                      >
                        {getIcon(item.icon)}
                        <span className="nav-label">{item.label}</span>
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Logout Modal */}
      <LogoutModal onLogout={handleLogout} isOpen={isLogoutOpen} setIsOpen={setIsLogoutOpen} />
    </aside>
  );
};

export default Sidebar;
