import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { logout, toggleTheme } from './store';
import { logout, toggleTheme } from '../store/store'; 
export default function Layout() {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const darkMode = useSelector(state => state.auth.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate('/');
    document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
  }, [isAuth, darkMode, navigate]);

  return (
    <div className="d-flex">
      {/* Sidebar UI */}
      <div className="sidebar d-flex flex-column justify-content-between py-4 shadow">
        <div>
          <div className="text-center pb-3 mb-4 border-bottom border-secondary">
            <h4 className="text-white fw-bold m-0"><i className="bi bi-shield-lock-fill me-2"></i>EMS core</h4>
          </div>
          <nav>
            <Link to="/dashboard" className="nav-link"><i className="bi bi-grid-1x2-fill me-2"></i> Overview Control</Link>
            <Link to="/dashboard/employees" className="nav-link"><i className="bi bi-people-fill me-2"></i> Database Desk</Link>
          </nav>
        </div>
        <div className="px-3">
          <button className="btn btn-danger btn-sm w-100" onClick={() => dispatch(logout())}>Log Out Security</button>
        </div>
      </div>

      {/* Main Control Panel View */}
      <div className="main-content flex-grow-1">
        <header className="d-flex justify-content-between align-items-center mb-4 p-3 bg-body rounded shadow-sm border">
          <h5 className="fw-bold m-0 text-uppercase tracking-wide">Workspace System Panel</h5>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => dispatch(toggleTheme())}>
              {darkMode ? <i className="bi bi-sun-fill text-warning"></i> : <i className="bi bi-moon-stars-fill"></i>} Control Mode
            </button>
            <span className="badge bg-primary px-3 py-2">Node: Active Root Admin</span>
          </div>
        </header>

        {/* Child Pages Router Element View */}
        <main><Outlet /></main>
      </div>
    </div>
  );
}