// Import React Router hook
// useNavigate allows us to navigate between pages
import { useLocation, useNavigate } from "react-router-dom";

// Import Ant Design components
import { Layout, Menu } from "antd";

// Import icons from Ant Design Icons
import {
  DashboardOutlined,
  FileTextOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";

// Import Sidebar CSS
import "./Sidebar.css";


// Extract Sider from Ant Design Layout
const { Sider } = Layout;


// Sidebar component
function Sidebar() {

  // Create navigation function
  const navigate = useNavigate();

  // Get the current URL
  const location = useLocation();

  // Determine the active menu item from the current URL
const getSelectedKey = () => {
  if (location.pathname === "/dashboard") {
    return "dashboard";
  }

  if (location.pathname === "/dashboard/users") {
    return "users";
  }

  if (location.pathname === "/dashboard/forms") {
    return "forms";
  }

  if (location.pathname === "/dashboard/reports") {
    return "reports";
  }

  if (location.pathname === "/dashboard/settings") {
    return "settings";
  }

  return "dashboard";
};

  // Handle sidebar menu click
  const handleMenuClick = ({ key }) => {

    // Navigate according to selected menu item
    switch (key) {

      case "dashboard":
        navigate("/dashboard");
        break;

      case "users":
        navigate("/dashboard/users");
        break;

      case "forms":
        navigate("/dashboard/forms");
        break;

      case "reports":
        navigate("/dashboard/reports");
        break;

      case "settings":
        navigate("/dashboard/settings");
        break;

      default:
        break;
    }
  };


  // Sidebar menu items
  const menuItems = [
    // --------------------------------
    // Main section
    // --------------------------------
    {
      type: "group",

      label: "MAIN",

      children: [
        {
          key: "dashboard",
          icon: <DashboardOutlined />,
          label: "Dashboard",
        },
      ],
    },


    // --------------------------------
    // Management section
    // --------------------------------
    {
      type: "group",

      label: "MANAGEMENT",

      children: [
        {
          key: "users",
          icon: <TeamOutlined />,
          label: "Users",
        },

        {
          key: "forms",
          icon: <FileTextOutlined />,
          label: "Forms",
        },

        {
          key: "reports",
          icon: <FileTextOutlined />,
          label: "Reports",
        },
      ],
    },


    // --------------------------------
    // System section
    // --------------------------------
    {
      type: "group",

      label: "SYSTEM",

      children: [
        {
          key: "settings",
          icon: <SettingOutlined />,
          label: "Settings",
        },
      ],
    },
  ];


  // Return Sidebar UI
  return (
    <Sider
      width={240}
      className="admin-sidebar"
    >

      {/* --------------------------------
          Application Logo
      --------------------------------- */}
      <div className="sidebar-logo">

        {/* Logo icon */}
        <div className="sidebar-logo-icon">
          AP
        </div>

        {/* Application name */}
        <span>
          Admin Portal
        </span>

      </div>


      {/* --------------------------------
          Sidebar Navigation
      --------------------------------- */}
      <Menu
        mode="inline"
        items={menuItems}
        selectedKeys={[getSelectedKey()]}
        onClick={handleMenuClick}
        className="sidebar-menu"
      />

    </Sider>
  );
}


// Export Sidebar component
export default Sidebar;