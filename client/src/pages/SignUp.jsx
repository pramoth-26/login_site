import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [form, setForm] = useState({
    name: '', username: '', mobileno: '', email: '', description: '', password: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/signup', form);
      alert(res.data.message);
      navigate('/signin'); // ✅ Redirect to Sign In page
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
      {['name', 'username', 'mobileno', 'email', 'description', 'password'].map(field => (
        <input key={field} name={field} placeholder={field} onChange={handleChange} required className="auth-input" />
      ))}
      <button type="submit" className="auth-button">Sign Up</button>
    </form>
    <div className="auth-footer">
        Don't have an account? <a href="/signin" className="auth-link">Sign In</a>
    </div>
    </div>
  );
}

export default SignUp;
