import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/apiService';
import './Login.css';

function Login() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!phone) {
      setError('Please enter your phone number.');
      return;
    }

    const phoneRegex = /^05\d{8}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid 10-digit phone number starting with 05 (e.g., 0501234567).');
      return;
    }

    try {
      setLoading(true);
      const res = await authService.login({ phone });
      const userData = res.data; 

      localStorage.setItem('token', userData.token);
      localStorage.setItem('role', userData.role || 'user');

      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid phone number or user does not exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              placeholder="0501234567"
            />
          </div>
          <button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="auth-redirect">
          Don't have an account? <Link to="/register" className="auth-link">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;