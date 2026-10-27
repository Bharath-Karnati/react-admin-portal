
import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "antd";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { logoutAdmin } from "../../services/authService";
import "./AdminLayout.css";

const { Content } = Layout;
const SESSION_TIMEOUT = 5 * 60 * 1000;

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const confirmingRef = useRef(false);

  // Session timeout after inactivity
  useEffect(() => {
    const handleTimeout = () => {
      logoutAdmin();
      window.alert("Your session has expired due to inactivity.");
      navigate("/login", { replace: true });
    };

    const resetTimer = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        handleTimeout,
        SESSION_TIMEOUT
      );
    };

    const activityEvents = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      clearTimeout(timeoutRef.current);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [navigate]);



useEffect(() => {
  if (location.pathname !== "/dashboard") {
    return;
  }

  let handlingBack = false;

  const addDashboardEntry = () => {
    window.history.pushState(
      { dashboardBoundary: true },
      "",
      window.location.href
    );
  };

  // Add a history entry when the Dashboard opens
  addDashboardEntry();

  const handlePopState = () => {
    if (handlingBack) return;
    handlingBack = true;

    // Restore the Dashboard history entry
    addDashboardEntry();

    const shouldLogout = window.confirm(
      "Are you sure you want to log out?"
    );

    if (shouldLogout) {
      logoutAdmin();
      navigate("/login", { replace: true });
    }

    handlingBack = false;
  };

  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, [location.pathname, navigate]);



  return (
    <Layout className="admin-layout">
      <Sidebar />
      <Layout>
        <Header />
        <Content className="admin-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
