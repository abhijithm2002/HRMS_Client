import React, { useState, useEffect, useRef } from 'react';
import './CandidatesTable.css';

const CandidatesTable = ({ candidates, onStatusChange, onAction }) => {
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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

  const getStatusStyle = (status) => {
    switch (status) {
      case 'New':
        return 'status-new';
      case 'Selected':
        return 'status-selected';
      case 'Rejected':
        return 'status-rejected';
      default:
        return 'status-default';
    }
  };

  const handleActionClick = (candidateId) => {
    setOpenActionMenu(openActionMenu === candidateId ? null : candidateId);
  };

  const handleStatusChange = (candidateId, newStatus) => {
    onStatusChange(candidateId, newStatus);
    setOpenActionMenu(null);
  };

  const handleAction = (candidateId, action) => {
    onAction(candidateId, action);
    setOpenActionMenu(null);
  };

  return (
    <div className="candidates-table-container">
      <table className="candidates-table">
        <thead>
          <tr className="table-header">
            <th>Sr no.</th>
            <th>Candidates Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Status</th>
            <th>Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={candidate.id} className="table-row">
              <td className="sr-no">{String(index + 1).padStart(2, '0')}</td>
              <td className="candidate-name">{candidate.name}</td>
              <td className="candidate-email">{candidate.email}</td>
              <td className="candidate-phone">{candidate.phone}</td>
              <td className="candidate-position">{candidate.position}</td>
              <td className="candidate-status">
                {candidate.status === 'Selected' ? (
                  <span className={`status-badge ${getStatusStyle(candidate.status)}`}>
                    {candidate.status}
                  </span>
                ) : (
                  <select
                    value={candidate.status}
                    onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                    className={`status-select ${getStatusStyle(candidate.status)}`}
                  >
                    <option value="New">New</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                )}
              </td>
              <td className="candidate-experience">{candidate.experience}</td>
              <td className="candidate-action" ref={dropdownRef}>
                <button
                  className="action-btn"
                  onClick={() => handleActionClick(candidate.id)}
                  aria-label="Actions"
                >
                  <svg className="ellipsis-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
                
                {openActionMenu === candidate.id && (
                  <div className="action-dropdown">
                    <button
                      className="dropdown-item"
                      onClick={() => handleAction(candidate.id, 'download')}
                    >
                      <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Resume
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => handleAction(candidate.id, 'delete')}
                    >
                      <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Candidate
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatesTable;
