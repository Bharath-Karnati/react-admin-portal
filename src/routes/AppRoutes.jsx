// Import React Router components
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// Import Login page
import Login from "../pages/Login/login";

// Import Register page
import Register from "../pages/Register/register";

// Import Admin Layout
import AdminLayout from "../layouts/AdminLayout/AdminLayout";

// Import Dashboard page
import Dashboard from "../pages/Dashboard/dashboard";

// Import Users page
import Users from "../pages/Users/users";

import Forms from "../pages/Forms/Forms";

import Reports from "../pages/Reports/Reports";

import { EmployeeProvider } from "../context/EmployeeContext";

import Settings from "../pages/Settings/Settings";

// Import Protected Route
import ProtectedRoute from "./ProtectedRoute";

// Application routing component
function AppRoutes() {
  return (
    <BrowserRouter>
     <EmployeeProvider>
      <Routes>

        {/* =================================
            Authentication Routes
        ================================= */}

        {/* Login page */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register page */}
        <Route
          path="/register"
          element={<Register />}
        />


        {/* =================================
            Protected Admin Portal
        ================================= */}

        <Route element={<ProtectedRoute />}>

          {/* 
            AdminLayout contains:
            - Sidebar
            - Header
            - Outlet

            All pages inside this route
            will appear inside the Outlet.
          */}
          <Route
            path="/dashboard"
            element={<AdminLayout />}
          >

            {/* Dashboard */}
            {/* URL: /dashboard */}
            <Route
              index
              element={<Dashboard />}
            />

            {/* Users */}
            {/* URL: /dashboard/users */}
            <Route
              path="users"
              element={<Users />}
            />

            <Route
              path="forms"
              element={<Forms />}
            />
            <Route
              path="reports"
              element={<Reports />}
            />

            <Route
              path="settings"
              element={<Settings />}
            />

          </Route>

        </Route>


        {/* =================================
            Default Route
        ================================= */}

        {/* Any unknown URL → Login */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
     </EmployeeProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;