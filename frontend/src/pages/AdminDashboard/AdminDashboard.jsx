import { useState, useEffect } from 'react';
import { adminService } from '../../services/apiService';
import AdminPanel from '../../components/Admin/AdminPanel/AdminPanel';
import './AdminDashboard.css';

function AdminDashboard() {
  const [prompts, setPrompts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userIdFilter, setUserIdFilter] = useState('');

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await adminService.getAllPrompts(page, 10, userIdFilter);
        setPrompts(res.data || []);
        setTotalPages(res.pagination?.totalPages || 1);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load admin logs.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [page, userIdFilter]);

  const handleFilterChange = (newUserId) => {
    setUserIdFilter(newUserId);
    setPage(1);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <div className="admin-header">
          <h2 className="admin-title">System Activity Log</h2>
          <p className="admin-subtitle">Monitor and audit all user prompts and AI responses</p>
        </div>

        {error && <div className="error-banner">⚠️ {error}</div>}

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <span>Loading database logs...</span>
          </div>
        ) : (
          <AdminPanel 
            prompts={prompts} 
            page={page} 
            totalPages={totalPages} 
            setPage={setPage} 
            onFilterChange={handleFilterChange}
          />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;