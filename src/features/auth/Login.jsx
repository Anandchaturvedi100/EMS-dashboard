import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { login } from './store';
import { login } from "../../store/store"; 

export default function Login() {
  const [email, setEmail] = useState('anand@kumar.com');
  const [password, setPassword] = useState('anand123');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'anand@kumar.com' && password === 'anand123') {
      dispatch(login());
      navigate('/dashboard');
    } else {
      alert('Wrong Email or Password! (Use: anand@kumar.com / anand123)');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor: '#BD7E71'}}>
      <div className="card p-4 shadow-lg bg-info-subtle" style={{ width: '400px', borderRadius: '15px' }}>
        <h3 className="text-center mb-4 fw-bold text-dark">EMS Portal Login</h3>
        <p className="text-muted text-center small">Default: anand@kumar.com / anand123</p>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-dark fw-medium">Email address</label>
            <input type="email" className="form-file form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="form-label text-dark fw-medium">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">Sign In</button>
        </form>
      </div>
    </div>
  );
}