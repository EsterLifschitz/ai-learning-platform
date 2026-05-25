import React, { useState } from 'react';
import './AdminPanel.css';

function AdminPanel({ prompts, page, totalPages, setPage, onFilterChange }) {
  const [filterInput, setFilterInput] = useState('');

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange(filterInput);
    }
  };

  const handleClearFilter = () => {
    setFilterInput('');
    if (onFilterChange) {
      onFilterChange('');
    }
  };

  return (
    <div className="table-wrapper">
      <form onSubmit={handleFilterSubmit} className="admin-filter-form">
        <input
          type="text"
          placeholder="Filter by User ID..."
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          className="admin-filter-input"
        />
        <button type="submit" className="admin-filter-btn">Filter</button>
        {filterInput && (
          <button type="button" onClick={handleClearFilter} className="admin-clear-btn">
            Clear
          </button>
        )}
      </form>

      <div className="scrollable-table">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User Details</th>
              <th>User Phone</th>
              <th>Prompt Content</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {prompts.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-table-row">
                  No activity records found in the database.
                </td>
              </tr>
            ) : (
              prompts.map((p) => (
                <tr key={p._id} className="table-row">
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {(p.user_id?.name || 'D')[0]}
                      </div>
                      <span className="user-name">
                        {p.user_id?.name || 'Deleted User'}
                      </span>
                    </div>
                  </td>
                  <td className="phone-cell">{p.user_id?.phone || 'N/A'}</td>
                  <td className="prompt-cell">
                    <div className="prompt-badge" title={p.prompt}>
                      {p.prompt}
                    </div>
                  </td>
                  <td className="date-cell">
                    {new Date(p.createdAt).toLocaleDateString()} &bull; {new Date(p.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-footer">
        <span className="page-indicator">
          Showing Page {page} of {totalPages}
        </span>
        <div className="pagination-buttons">
          <button 
            disabled={page === 1} 
            onClick={() => setPage((prev) => prev - 1)} 
            className="pag-btn"
          >
            &larr; Previous
          </button>
          <button 
            disabled={page === totalPages || totalPages === 0} 
            onClick={() => setPage((prev) => prev + 1)} 
            className="pag-btn"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;