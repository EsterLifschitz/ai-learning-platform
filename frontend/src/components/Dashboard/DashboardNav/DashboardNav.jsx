import { useNavigate } from 'react-router-dom';
import './DashboardNav.css';

function DashboardNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="dashboard-nav">
      <div className="nav-left">
        <h1 className="nav-title">AI Learning Platform</h1>
        <button onClick={() => navigate('/history')} className="history-link-btn">
          📜 View My History
        </button>
      </div>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </nav>
  );
}

export default DashboardNav;