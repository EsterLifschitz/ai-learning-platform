import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/apiService';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.phone) {
      setError('All fields are required.');
      return;
    }

    const phoneRegex = /^05\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid 10-digit phone number starting with 05 (e.g., 0501234567).');
      return;
    }

    try {
      setLoading(true);
      const res = await authService.register(formData);
      const userData = res.data;

      localStorage.setItem('token', userData.token);
      localStorage.setItem('role', userData.role || 'user');

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Esti"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="0501234567"
            />
          </div>
          <button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="auth-redirect">
          Already have an account? <Link to="/login" className="auth-link">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;