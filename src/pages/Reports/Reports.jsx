// Import React hooks
import { useState } from "react";

// Import Ant Design components
import {
  Card,
  Col,
  DatePicker,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";

// Import icons
import {
  TeamOutlined,
  UserOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

// Import page CSS
import "./Reports.css";

import { useEmployees } from "../../context/EmployeeContext";

const { Title, Text } = Typography;


// Table columns
const columns = [
  {
    title: "Employee",
    dataIndex: "name",
    key: "name",
    render: (name) => (
      <Text strong>
        {name}
      </Text>
    ),
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status === "Active" ? "green" : "default"}>
        {status}
      </Tag>
    ),
  },
  {
    title: "Joining Date",
    dataIndex: "joiningDate",
    key: "joiningDate",
  },
];


function Reports() {
  
    const { employees } = useEmployees();

  // Filter state
  const [department, setDepartment] = useState("all");

  // Filter employees based on department
  const filteredEmployees =
    department === "all"
      ? employees
      : employees.filter(
          (employee) =>
            employee.department === department
        );


  return (
    <div className="reports-page">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="reports-header">

        <div>
          <Title level={2}>
            Employee Reports
          </Title>

          <Text type="secondary">
            Overview of employee records and workforce information
          </Text>
        </div>

      </div>


      {/* =====================================
          SUMMARY CARDS
      ===================================== */}

      <Row gutter={[20, 20]}>

        {/* Total Employees */}
        <Col xs={24} sm={12} lg={6}>

          <Card className="report-stat-card">

            <Statistic
              title="Total Employees"
              value={employees.length}
              prefix={<TeamOutlined />}
            />

          </Card>

        </Col>


        {/* Active Employees */}
        <Col xs={24} sm={12} lg={6}>

          <Card className="report-stat-card">

            <Statistic
              title="Active Employees"
              value={
                employees.filter(
                  (employee) =>
                    employee.status === "Active"
                ).length
              }
              prefix={<UserOutlined />}
            />

          </Card>

        </Col>


        {/* Inactive Employees */}
        <Col xs={24} sm={12} lg={6}>

          <Card className="report-stat-card">

            <Statistic
              title="Inactive Employees"
              value={
                employees.filter(
                  (employee) =>
                    employee.status === "Inactive"
                ).length
              }
              prefix={<UserDeleteOutlined />}
            />

          </Card>

        </Col>


        {/* Managers */}
        <Col xs={24} sm={12} lg={6}>

          <Card className="report-stat-card">

            <Statistic
              title="Managers"
              value={
                employees.filter(
                  (employee) =>
                    employee.role === "Manager"
                ).length
              }
              prefix={<UserSwitchOutlined />}
            />

          </Card>

        </Col>

      </Row>


      {/* =====================================
          FILTERS
      ===================================== */}

      <Card className="report-filter-card">

        <Space
          wrap
          size="middle"
        >

          <Select
            value={department}
            onChange={setDepartment}
            style={{ width: 200 }}
            options={[
              {
                value: "all",
                label: "All Departments",
              },
              {
                value: "Engineering",
                label: "Engineering",
              },
              {
                value: "HR",
                label: "Human Resources",
              },
              {
                value: "Finance",
                label: "Finance",
              },
            ]}
          />

          <DatePicker
            placeholder="Select date"
          />

        </Space>

      </Card>


      {/* =====================================
          EMPLOYEE REPORT TABLE
      ===================================== */}

      <Card className="report-table-card">

        <div className="report-table-header">

          <div>
            <Title level={4}>
              Employee Records
            </Title>

            <Text type="secondary">
              Showing {filteredEmployees.length} employees
            </Text>
          </div>

        </div>

        <Table
          columns={columns}
          dataSource={filteredEmployees}
          pagination={{
            pageSize: 5,
          }}
          scroll={{ x: true }}
        />

      </Card>

    </div>
  );
}


export default Reports;