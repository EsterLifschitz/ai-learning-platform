import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../services/apiService';
import StatusMessage from '../../components/Admin/StatusMessage/StatusMessage';
import AdminPanel from '../../components/Admin/AdminPanel/AdminPanel';
import './AdminDashboard.css';

function AdminDashboard() {
  const [prompts, setPrompts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await adminService.getAllPrompts(page, 10);
        setPrompts(res.data || []); 
        setTotalPages(res.pagination?.totalPages || 1);
        setTotalItems(res.pagination?.totalItems || 0);
      } catch (err) {
        setError(err.response?.data?.error || 'Access denied.');
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [page]);

  return (
    <div className="admin-page">
      <nav className="admin-nav">
        <div className="admin-brand">
          <div className="brand-icon">AI</div>
          <h1 className="brand-name">Control Center</h1>
        </div>
        <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="admin-signout-btn">
          Sign Out
        </button>
      </nav>

      <div className="admin-content">
        <div className="content-header">
          <div>
            <h2 className="content-title">System Audit Logs</h2>
          </div>
          <StatusMessage totalItems={totalItems} error={error} />
        </div>

        {loading ? (
          <div className="admin-loading-box"><div className="admin-spinner"></div></div>
        ) : (
          !error && <AdminPanel prompts={prompts} page={page} totalPages={totalPages} setPage={setPage} />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;