// Import React hooks
import { useEffect, useState } from "react";

// Import React Router hooks
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

// Import authentication functions
import {
  getLoggedInAdmin,
  logoutAdmin,
} from "../../services/authService";

// Import notification functions
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../../services/notificationService";

// Import Ant Design components
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  Empty,
  Layout,
  List,
  Popover,
  Typography,
} from "antd";

// Import icons
import {
  BellOutlined,
  CheckOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

// Import Header CSS
import "./Header.css";

// Extract Header from Ant Design Layout
const { Header: AntHeader } = Layout;

// Extract Text from Typography
const { Text } = Typography;


function Header() {

  // ==========================================
  // NAVIGATION
  // ==========================================

  const navigate = useNavigate();

  // Get current URL
  const location = useLocation();


  // ==========================================
  // LOGGED-IN ADMIN
  // ==========================================

  const [loggedInAdmin, setLoggedInAdmin] = useState(
    getLoggedInAdmin()
  );


  // ==========================================
  // NOTIFICATION STATE
  // ==========================================

  const [notifications, setNotifications] = useState(
    getNotifications()
  );

  const [notificationOpen, setNotificationOpen] =
    useState(false);


  // Count unread notifications
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;


  // ==========================================
  // LISTEN FOR PROFILE CHANGES
  // ==========================================

  useEffect(() => {

    const handleProfileUpdate = () => {

      setLoggedInAdmin(
        getLoggedInAdmin()
      );

    };


    window.addEventListener(
      "adminProfileUpdated",
      handleProfileUpdate
    );


    return () => {

      window.removeEventListener(
        "adminProfileUpdated",
        handleProfileUpdate
      );

    };

  }, []);


  // ==========================================
  // GET CURRENT PAGE NAME
  // ==========================================

  const getPageName = () => {

    switch (location.pathname) {

      case "/dashboard":
        return "Dashboard";

      case "/dashboard/users":
        return "Users";

      case "/dashboard/forms":
        return "Forms";

      case "/dashboard/reports":
        return "Reports";

      case "/dashboard/settings":
        return "Settings";

      default:
        return "Dashboard";
    }

  };


  // ==========================================
  // MARK ONE NOTIFICATION AS READ
  // ==========================================

  const handleNotificationClick = (notificationId) => {

    const updatedNotifications =
      markNotificationAsRead(notificationId);

    setNotifications(updatedNotifications);

  };


  // ==========================================
  // MARK ALL NOTIFICATIONS AS READ
  // ==========================================

  const handleMarkAllAsRead = () => {

    const updatedNotifications =
      markAllNotificationsAsRead();

    setNotifications(updatedNotifications);

  };


  // ==========================================
  // NOTIFICATION PANEL
  // ==========================================

  const notificationContent = (

    <div className="notification-panel">

      {/* Notification Header */}

      <div className="notification-header">

        <div>

          <Text strong>
            Notifications
          </Text>

          <Text type="secondary">
            {unreadCount} unread
          </Text>

        </div>


        {unreadCount > 0 && (

          <Button
            type="link"
            size="small"
            icon={<CheckOutlined />}
            onClick={handleMarkAllAsRead}
          >
            Mark all as read
          </Button>

        )}

      </div>


      {/* Notification List */}

      <div className="notification-list">

        {notifications.length === 0 ? (

          <Empty
            description="No notifications"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />

        ) : (

          <List

            dataSource={notifications}

            renderItem={(notification) => (

              <List.Item

                className={
                  notification.read
                    ? "notification-item"
                    : "notification-item unread"
                }

                onClick={() =>
                  handleNotificationClick(
                    notification.id
                  )
                }

              >

                <div className="notification-item-content">

                  <div className="notification-title-row">

                    <Text
                      strong={!notification.read}
                    >
                      {notification.title}
                    </Text>


                    {!notification.read && (
                      <span className="unread-dot"></span>
                    )}

                  </div>


                  <Text
                    type="secondary"
                    className="notification-message"
                  >
                    {notification.message}
                  </Text>


                  <Text
                    type="secondary"
                    className="notification-time"
                  >
                    {notification.time}
                  </Text>

                </div>

              </List.Item>

            )}

          />

        )}

      </div>

    </div>
  );


  // ==========================================
  // USER DROPDOWN ITEMS
  // ==========================================

  const userMenuItems = [

    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },

    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
    },

  ];


  // ==========================================
  // USER MENU ACTION
  // ==========================================

  const handleUserMenuClick = ({ key }) => {

    // Profile
    if (key === "profile") {

      navigate("/dashboard/settings");

    }


    // Logout
    if (key === "logout") {

      logoutAdmin();

      navigate("/login");

    }

  };


  // ==========================================
  // HEADER UI
  // ==========================================

  return (

    <AntHeader className="admin-header">


      {/* ======================================
          LEFT SIDE - BREADCRUMB
      ====================================== */}

      <div className="header-left">

        <Breadcrumb
          items={[
            {
              title: "Admin Portal",
            },

            {
              title: getPageName(),
            },

          ]}
        />

      </div>


      {/* ======================================
          RIGHT SIDE
      ====================================== */}

      <div className="header-right">


        {/* ==================================
            NOTIFICATIONS
        ================================== */}

        <Popover

          content={notificationContent}

          trigger="click"

          placement="bottomRight"

          arrow={false}

          open={notificationOpen}

          onOpenChange={setNotificationOpen}

        >

          <Badge
            count={unreadCount}
            size="small"
            overflowCount={99}
            offset={[-2, 2]}
          >

            <Button
              type="text"
              shape="circle"
              icon={<BellOutlined />}
              className="notification-button"
            />

          </Badge>

        </Popover>


        {/* ==================================
            USER PROFILE
        ================================== */}

        <Dropdown

          menu={{
            items: userMenuItems,
            onClick: handleUserMenuClick,
          }}

          placement="bottomRight"

        >

          <div className="user-profile">

            <Avatar
              icon={<UserOutlined />}
            />

            <Text className="user-name">
              {loggedInAdmin?.name || "Admin"}
            </Text>

          </div>

        </Dropdown>


      </div>

    </AntHeader>

  );

}


export default Header;