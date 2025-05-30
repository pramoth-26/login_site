import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import '../styles/auth.css';


function SignIn() {
  const [form, setForm] = useState({ username: '', password: '' });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/signin', form);
      const { user, token } = res.data;

      // Save full user data in context (with id for fetching details later)
      setUser({ ...user, token });

      // Redirect to home
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.error || 'Sign in failed');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign In</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="auth-input"
          />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button">Sign In</button>
      </form>
      <div className="auth-footer">
          Don't have an account? <a href="/signup" className="auth-link">Create Account</a>
      </div>
    </div>
  );
}

export default SignIn;
