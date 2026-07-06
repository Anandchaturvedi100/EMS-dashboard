import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { addEmployee, updateEmployee, deleteEmployee } from './store';
import { addEmployee, updateEmployee, deleteEmployee } from '../../store/store';

export default function Employees() {
  const employees = useSelector(state => state.employees.list);
  const dispatch = useDispatch();

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Form Modal State
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', email: '', role: '', dept: 'IT', status: 'Active' });

  // Filter Engine
  const filteredData = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || emp.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = filterDept === 'All' || emp.dept === filterDept;
    return matchesSearch && matchesDept;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleOpenModal = (emp = null) => {
    if (emp) {
      setEditMode(true);
      setFormData(emp);
    } else {
      setEditMode(false);
      setFormData({ id: '', name: '', email: '', role: '', dept: 'IT', status: 'Active' });
    }
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateEmployee(formData));
    } else {
      dispatch(addEmployee(formData));
    }
    setShowModal(false);
  };

  return (
    <div className="card-custom p-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h4 className="fw-bold m-0">Manage Employees</h4>
        <button className="btn btn-primary btn-md shadow-sm" onClick={() => handleOpenModal()}>
          <i className="bi bi-plus-lg me-2"></i>Add Employee
        </button>
      </div>

      {/* --- Search & Filter Row --- */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Search by name or email..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={filterDept} onChange={(e) => { setFilterDept(e.target.value); setCurrentPage(1); }}>
            <option value="All">All Departments</option>
            <option value="IT">IT</option>
            <option value="Design">Design</option>
            <option value="HR">HR</option>
            <option value="Testing">Testing</option>
          </select>
        </div>
      </div>

      {/* --- Responsive Table --- */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(emp => (
              <tr key={emp.id}>
                <td className="fw-semibold">{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td><span className="badge bg-secondary">{emp.dept}</span></td>
                <td>
                  <span className={`badge ${emp.status === 'Active' ? 'bg-success' : emp.status === 'On Leave' ? 'bg-warning' : 'bg-danger'}`}>
                    {emp.status}
                  </span>
                </td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleOpenModal(emp)}><i className="bi bi-pencil"></i></button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => dispatch(deleteEmployee(emp.id))}><i className="bi bi-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Pagination Rules --- */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-sm btn-outline-secondary" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
          <span className="small fw-medium">Page {currentPage} of {totalPages}</span>
          <button className="btn btn-sm btn-outline-secondary" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
        </nav>
      )}

      {/* --- Responsive Embedded Form CRUD Modal --- */}
      {showModal && (
        <div className="modal d-block show" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-info">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">{editMode ? 'Edit Employee Data' : 'Onboard New Employee'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body">
                  <div className="mb-3"><label className="form-label">Full Name</label><input type="text" className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></div>
                  <div className="mb-3"><label className="form-label">Email</label><input type="email" className="form-control" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required /></div>
                  <div className="mb-3"><label className="form-label">Role</label><input type="text" className="form-control" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required /></div>
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <select className="form-select" value={formData.dept} onChange={e => setFormData({...formData, dept: e.target.value})}>
                      <option value="IT">IT</option><option value="Design">Design</option><option value="HR">HR</option><option value="Testing">Testing</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                      <option value="Active">Active</option><option value="On Leave">On Leave</option><option value="Terminated">Terminated</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Database Logs</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}