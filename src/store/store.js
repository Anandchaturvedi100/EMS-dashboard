import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial Mock Data for Fresher Project Demo
const initialEmployees = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com", role: "Frontend Developer", dept: "IT", status: "Active" },
  { id: 2, name: "Amit Verma", email: "amit@example.com", role: "UI/UX Designer", dept: "Design", status: "Active" },
  { id: 3, name: "Priya Patel", email: "priya@example.com", role: "HR Manager", dept: "HR", status: "On Leave" },
  { id: 4, name: "Vikas Singh", email: "vikas@example.com", role: "Backend Developer", dept: "IT", status: "Active" },
  { id: 5, name: "Neha Gupta", email: "neha@example.com", role: "QA Engineer", dept: "Testing", status: "Terminated" }
];

const employeeSlice = createSlice({
  name: 'employees',
  initialState: { list: initialEmployees },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push({ id: Date.now(), ...action.payload });
    },
    updateEmployee: (state, action) => {
      const index = state.list.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteEmployee: (state, action) => {
      state.list = state.list.filter(emp => emp.id !== action.payload);
    }
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    isAuthenticated: localStorage.getItem('isAuth') === 'true',
    darkMode: localStorage.getItem('theme') === 'dark'
  },
  reducers: {
    login: (state) => { 
      state.isAuthenticated = true; 
      localStorage.setItem('isAuth', 'true');
    },
    logout: (state) => { 
      state.isAuthenticated = false; 
      localStorage.setItem('isAuth', 'false');
    },
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('theme', state.darkMode ? 'dark' : 'light');
    }
  }
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export const { login, logout, toggleTheme } = authSlice.actions;

export const store = configureStore({
  reducer: {
    employees: employeeSlice.reducer,
    auth: authSlice.reducer
  }
});