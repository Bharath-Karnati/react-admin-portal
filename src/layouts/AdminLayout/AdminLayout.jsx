// Import React Router Outlet
// Outlet displays the currently selected child page
import { Outlet } from "react-router-dom";

// Import Ant Design Layout
import { Layout } from "antd";

// Import reusable Sidebar
import Sidebar from "../../components/Sidebar/Sidebar";

// Import reusable Header
import Header from "../../components/Header/Header";

// Import Admin Layout CSS
import "./AdminLayout.css";

// Extract Content from Ant Design Layout
const { Content } = Layout;

function AdminLayout() {
  return (
    <Layout className="admin-layout">

      {/* Reusable Sidebar */}
      <Sidebar />

      <Layout>

        {/* Reusable Header */}
        <Header />

        {/* Page content */}
        <Content className="admin-content">
          <Outlet />
        </Content>

      </Layout>
    </Layout>
  );
}

export default AdminLayout;