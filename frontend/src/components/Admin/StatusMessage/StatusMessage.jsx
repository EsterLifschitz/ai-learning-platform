import './StatusMessage.css';

function StatusMessage({ totalItems, error }) {
  if (error) {
    return <div className="admin-error-box">⚠️ {error}</div>;
  }

  return (
    <div className="kpi-card">
      <div className="kpi-icon">📊</div>
      <div>
        <p className="kpi-label">Total Requests</p>
        <p className="kpi-value">{totalItems}</p>
      </div>
    </div>
  );
}

export default StatusMessage;