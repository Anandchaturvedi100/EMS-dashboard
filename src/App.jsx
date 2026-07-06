import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from "./store/store"; // Sahi central store path, sirf EK baar!
import Login from "./features/auth/Login";
import Layout from "./layouts/Layout";
import DashboardOverview from "./features/employees/DashboardOverview";
import Employees from "./features/employees/Employees";
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Base Route */}
          <Route path="/" element={<Login />} />

          {/* Secure System Workspace Desk Layout Routes */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="employees" element={<Employees />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;