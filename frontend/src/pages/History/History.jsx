import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { learningService } from '../../services/apiService';
import './History.css';

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await learningService.getHistory();
        setHistory(res.data || []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load learning history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-page">
      <nav className="history-nav">
        <div className="nav-brand" onClick={() => navigate('/dashboard')}>
          <span className="brand-badge">AI</span>
          <h1 className="brand-title">Back to Dashboard</h1>
        </div>
        <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="logout-btn">
          Sign Out
        </button>
      </nav>

      <div className="history-container">
        <div className="history-header">
          <h2 className="history-title">Your Learning History</h2>
          <p className="history-subtitle">Review your past AI interactions and generated lessons.</p>
        </div>

        {error && <div className="error-banner">⚠️ {error}</div>}

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <span>Retrieving your secure history logs...</span>
          </div>
        ) : (
          <div className="history-list">
            {history.length === 0 ? (
              <div className="empty-state">
                You haven't generated any lessons yet. Start learning from the dashboard!
              </div>
            ) : (
              history.map((item) => (
                <div key={item._id} className="history-card">
                  <div className="card-meta">
                    <span className="meta-category-tags">
                      <span className="badge-cat">{item.category_id?.name || 'General'}</span>
                      <span className="badge-subcat">{item.sub_category_id?.name || 'Lesson'}</span>
                    </span>
                    <span className="meta-time-group">
                      <span className="meta-date">{new Date(item.created_at || item.createdAt).toLocaleDateString()}</span>
                      <span className="meta-time">
                        {new Date(item.created_at || item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="prompt-section">
                      <span className="section-label">Your Request:</span>
                      <p className="prompt-text">{item.prompt}</p>
                    </div>
                    {item.response && (
                      <div className="response-section">
                        <span className="section-label">AI Lesson Response:</span>
                        <div className="response-text">{item.response}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;