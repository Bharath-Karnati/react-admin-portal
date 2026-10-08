// Import React hooks
import { useMemo } from "react";

// Import Ant Design components
import {
  Avatar,
  Button,
  Card,
  Col,
  Progress,
  Row,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";

// Import Ant Design icons
import {
  ArrowRightOutlined,
  TeamOutlined,
  UserOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UsergroupAddOutlined,
  RiseOutlined,
} from "@ant-design/icons";

// Import navigation
import { useNavigate } from "react-router-dom";

// Import employee context
import { useEmployees } from "../../context/EmployeeContext";

// Import CSS
import "./dashboard.css";

const { Title, Text } = Typography;


// =========================================
// DASHBOARD COMPONENT
// =========================================

function Dashboard() {

  const navigate = useNavigate();

  // Get employee data from shared context
  const { employees } = useEmployees();


  // =========================================
  // CALCULATE DASHBOARD STATISTICS
  // =========================================

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const managers = employees.filter(
    (employee) => employee.role === "Manager"
  ).length;


  // =========================================
  // ACTIVE EMPLOYEE PERCENTAGE
  // =========================================

  const activePercentage =
    totalEmployees > 0
      ? Math.round((activeEmployees / totalEmployees) * 100)
      : 0;


  // =========================================
  // DEPARTMENT SUMMARY
  // =========================================

  const departmentData = useMemo(() => {

    const departments = {};

    employees.forEach((employee) => {

      const department = employee.department || "Other";

      departments[department] =
        (departments[department] || 0) + 1;

    });

    return Object.entries(departments)
      .map(([department, count]) => ({
        department,
        count,
        percentage:
          totalEmployees > 0
            ? Math.round((count / totalEmployees) * 100)
            : 0,
      }))
      .sort((a, b) => b.count - a.count);

  }, [employees, totalEmployees]);


  // =========================================
  // RECENT EMPLOYEES
  // =========================================

  const recentEmployees = [...employees]
    .slice(-5)
    .reverse();


  // =========================================
  // TABLE COLUMNS
  // =========================================

  const columns = [

    {
      title: "Employee",
      dataIndex: "name",
      key: "name",

      render: (name) => (
        <div className="employee-cell">

          <Avatar
            className="employee-avatar"
            icon={<UserOutlined />}
          />

          <div>
            <div className="employee-name">
              {name}
            </div>

            <Text type="secondary">
              Employee
            </Text>
          </div>

        </div>
      ),
    },

    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (status) => (
        <Tag
          color={status === "Active" ? "green" : "red"}
        >
          {status}
        </Tag>
      ),
    },

    {
      title: "Joined Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
    },

  ];


  // =========================================
  // RETURN DASHBOARD
  // =========================================

  return (

    <div className="dashboard">


      {/* =====================================
          WELCOME SECTION
      ====================================== */}

      <div className="dashboard-welcome">

        <div>

          <Text className="welcome-label">
            ADMIN DASHBOARD
          </Text>

          <Title level={2}>
            Welcome back 👋
          </Title>

          <Text className="welcome-description">
            Here's a quick overview of your employee
            management portal.
          </Text>

        </div>


        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => navigate("/dashboard/forms")}
        >
          Add Employee
        </Button>

      </div>


      {/* =====================================
          STATISTICS CARDS
      ====================================== */}

      <Row
        gutter={[20, 20]}
        className="dashboard-stats"
      >

        {/* Total Employees */}

        <Col xs={24} sm={12} lg={6}>

          <Card className="stat-card">

            <div className="stat-icon blue">
              <TeamOutlined />
            </div>

            <Statistic
              title="Total Employees"
              value={totalEmployees}
            />

            <Text className="stat-description">
              Employees in the portal
            </Text>

          </Card>

        </Col>


        {/* Active Employees */}

        <Col xs={24} sm={12} lg={6}>

          <Card className="stat-card">

            <div className="stat-icon green">
              <UserOutlined />
            </div>

            <Statistic
              title="Active Employees"
              value={activeEmployees}
            />

            <Text className="stat-description">
              Currently active
            </Text>

          </Card>

        </Col>


        {/* Inactive Employees */}

        <Col xs={24} sm={12} lg={6}>

          <Card className="stat-card">

            <div className="stat-icon red">
              <UserDeleteOutlined />
            </div>

            <Statistic
              title="Inactive Employees"
              value={inactiveEmployees}
            />

            <Text className="stat-description">
              Currently inactive
            </Text>

          </Card>

        </Col>


        {/* Managers */}

        <Col xs={24} sm={12} lg={6}>

          <Card className="stat-card">

            <div className="stat-icon purple">
              <UsergroupAddOutlined />
            </div>

            <Statistic
              title="Managers"
              value={managers}
            />

            <Text className="stat-description">
              Management team
            </Text>

          </Card>

        </Col>

      </Row>


      {/* =====================================
          OVERVIEW SECTION
      ====================================== */}

      <Row
        gutter={[20, 20]}
        className="dashboard-overview"
      >


        {/* Employee Status */}

        <Col xs={24} lg={8}>

          <Card
            title="Employee Overview"
            className="dashboard-card"
          >

            <div className="overview-center">

              <Progress
                type="circle"
                percent={activePercentage}
                size={150}
              />

              <Title level={4}>
                Active Employees
              </Title>

              <Text type="secondary">
                {activeEmployees} out of {totalEmployees} employees
              </Text>

            </div>


            <div className="overview-summary">

              <div>
                <span className="summary-dot active"></span>
                Active
                <strong>{activeEmployees}</strong>
              </div>

              <div>
                <span className="summary-dot inactive"></span>
                Inactive
                <strong>{inactiveEmployees}</strong>
              </div>

            </div>

          </Card>

        </Col>


        {/* Department Summary */}

        <Col xs={24} lg={16}>

          <Card
            title="Department Overview"
            className="dashboard-card"
          >

            <div className="department-list">

              {departmentData.map((item) => (

                <div
                  className="department-item"
                  key={item.department}
                >

                  <div className="department-info">

                    <Text strong>
                      {item.department}
                    </Text>

                    <Text type="secondary">
                      {item.count} employee
                      {item.count !== 1 ? "s" : ""}
                    </Text>

                  </div>


                  <div className="department-progress">

                    <Progress
                      percent={item.percentage}
                      showInfo={false}
                    />

                    <Text>
                      {item.percentage}%
                    </Text>

                  </div>

                </div>

              ))}

            </div>

          </Card>

        </Col>

      </Row>


      {/* =====================================
          RECENT EMPLOYEES
      ====================================== */}

      <Card
        title="Recent Employees"
        className="dashboard-card recent-employees"
        extra={
          <Button
            type="link"
            onClick={() => navigate("/dashboard/users")}
          >
            View All
            <ArrowRightOutlined />
          </Button>
        }
      >

        <Table
          columns={columns}
          dataSource={recentEmployees}
          pagination={false}
          rowKey="key"
          scroll={{ x: 700 }}
        />

      </Card>


      {/* =====================================
          QUICK ACTIONS
      ====================================== */}

      <div className="quick-actions">

        <Title level={4}>
          Quick Actions
        </Title>

        <Row gutter={[16, 16]}>

          <Col xs={24} sm={8}>

            <Card
              hoverable
              className="quick-action-card"
              onClick={() => navigate("/dashboard/forms")}
            >

              <UserAddOutlined />

              <div>
                <Text strong>
                  Add Employee
                </Text>

                <Text type="secondary">
                  Register a new employee
                </Text>
              </div>

              <ArrowRightOutlined />

            </Card>

          </Col>


          <Col xs={24} sm={8}>

            <Card
              hoverable
              className="quick-action-card"
              onClick={() => navigate("/dashboard/users")}
            >

              <TeamOutlined />

              <div>
                <Text strong>
                  Manage Employees
                </Text>

                <Text type="secondary">
                  View and manage employees
                </Text>
              </div>

              <ArrowRightOutlined />

            </Card>

          </Col>


          <Col xs={24} sm={8}>

            <Card
              hoverable
              className="quick-action-card"
              onClick={() => navigate("/dashboard/reports")}
            >

              <RiseOutlined />

              <div>
                <Text strong>
                  View Reports
                </Text>

                <Text type="secondary">
                  Analyze employee data
                </Text>
              </div>

              <ArrowRightOutlined />

            </Card>

          </Col>

        </Row>

      </div>

    </div>
  );
}


export default Dashboard;