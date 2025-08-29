import React, { useState, useEffect, useRef } from 'react';
import './CandidatesTable.css';
import { updateCandidateStatus } from '../../services/userService';

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

  const handleStatusChange = async (candidateId, newStatus) => {
    console.log('candidateid', candidateId, newStatus)
    try {
      await updateCandidateStatus(candidateId, newStatus);
      onStatusChange(candidateId, newStatus); 
      setOpenActionMenu(null);
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Try again!");
    }
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
            <tr key={candidate._id} className="table-row">
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
                    onChange={(e) => handleStatusChange(candidate._id, e.target.value)}
                    className={`status-select ${getStatusStyle(candidate.status)}`}
                  >
                    <option value="New">New</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Ongoing">Ongoing</option>
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
                
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatesTable;
