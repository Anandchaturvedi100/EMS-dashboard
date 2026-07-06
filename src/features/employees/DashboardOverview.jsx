import React from 'react';
import { useSelector } from 'react-redux';

export default function DashboardOverview() {
  const employees = useSelector(state => state.employees.list);

  const total = employees.length;
  const active = employees.filter(e => e.status === 'Active').length;
  const onLeave = employees.filter(e => e.status === 'On Leave').length;

  return (
    <div>
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card-custom p-4 bg-primary text-white d-flex justify-content-between align-items-center" style={{background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)'}}>
            <div><h5>Total Employees</h5><h2 className="fw-bold m-0">{total}</h2></div>
            <i className="bi bi-people-fill fs-1 opacity-50"></i>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-custom p-4 bg-success text-white d-flex justify-content-between align-items-center" style={{background: 'linear-gradient(45deg, #10b981, #047857)'}}>
            <div><h5>Active Members</h5><h2 className="fw-bold m-0">{active}</h2></div>
            <i className="bi bi-check-circle-fill fs-1 opacity-50"></i>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-custom p-4 bg-warning text-white d-flex justify-content-between align-items-center" style={{background: 'linear-gradient(45deg, #f59e0b, #b45309)'}}>
            <div><h5>On Leave</h5><h2 className="fw-bold m-0">{onLeave}</h2></div>
            <i className="bi bi-calendar-x-fill fs-1 opacity-50"></i>
          </div>
        </div>
      </div>

      <div className="card-custom p-4 mt-4">
        <h4 className="fw-bold mb-3">System Updates & Analytics</h4>
        <p className="text-muted">Welcome to the core control grid system. Use the sidebar tabs to securely look through records, create logs, or run state operations.</p>
      </div>
    </div>
  );
}