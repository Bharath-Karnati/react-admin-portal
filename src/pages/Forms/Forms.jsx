// Import React
import { useState } from "react";

import { useEmployees } from "../../context/EmployeeContext";
// Import Ant Design components
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  message,
} from "antd";

// Import icons
import {
  ArrowLeftOutlined,
  SaveOutlined,
} from "@ant-design/icons";

// Import navigation
import { useNavigate } from "react-router-dom";

// Import page CSS
import "./Forms.css";


function Forms() {

  const { addEmployee } = useEmployees();
  // React Router navigation
  const navigate = useNavigate();

  // Ant Design form instance
  const [form] = Form.useForm();

  // Track form submission
  const [loading, setLoading] = useState(false);


  // Handle form submission
 const handleSubmit = (values) => {

  setLoading(true);

  setTimeout(() => {

    // Convert the form data into our employee structure
    const employeeData = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      role: values.role,
      department: values.department,
      status: "Active",

      // Convert DatePicker value into our mock-data format
      joiningDate: values.joiningDate
        ? values.joiningDate.format("DD-MM-YYYY")
        : "",
    };


    // Add employee to shared EmployeeContext
    addEmployee(employeeData);


    // Show success message
    message.success(
      "Employee added successfully!"
    );


    // Clear form
    form.resetFields();

    setLoading(false);

  }, 500);
};


  return (
    <div className="forms-page">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="forms-header">

        <div>
          <h1>Add Employee</h1>

          <p>
            Create a new employee record in the admin portal.
          </p>
        </div>

        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/dashboard/users")}
        >
          Back to Users
        </Button>

      </div>


      {/* =====================================
          EMPLOYEE FORM
      ===================================== */}

      <Card className="forms-card">

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >

          {/* ================================
              PERSONAL INFORMATION
          ================================= */}

          <div className="form-section">

            <h2>Personal Information</h2>

            <p>
              Enter the employee's basic information.
            </p>

          </div>


          <Row gutter={20}>

            {/* Full Name */}
            <Col xs={24} md={12}>

              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter full name",
                  },
                ]}
              >

                <Input
                  placeholder="Enter full name"
                />

              </Form.Item>

            </Col>


            {/* Email */}
            <Col xs={24} md={12}>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter email",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >

                <Input
                  placeholder="example@gmail.com"
                />

              </Form.Item>

            </Col>


            {/* Phone */}
            <Col xs={24} md={12}>

              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter phone number",
                  },
                ]}
              >

                <Input
                  placeholder="Enter phone number"
                />

              </Form.Item>

            </Col>


            {/* Date of Birth */}
            <Col xs={24} md={12}>

              <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                rules={[
                  {
                    required: true,
                    message: "Please select date of birth",
                  },
                ]}
              >

                <DatePicker
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                />

              </Form.Item>

            </Col>

          </Row>


          {/* =================================
              EMPLOYMENT INFORMATION
          ================================= */}

          <div className="form-section">

            <h2>Employment Information</h2>

            <p>
              Define the employee's role and employment details.
            </p>

          </div>


          <Row gutter={20}>

            {/* Role */}
            <Col xs={24} md={12}>

              <Form.Item
                label="Role"
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Please select role",
                  },
                ]}
              >

                <Select
                  placeholder="Select role"
                  options={[
                    {
                      value: "Admin",
                      label: "Admin",
                    },
                    {
                      value: "Manager",
                      label: "Manager",
                    },
                    {
                      value: "Employee",
                      label: "Employee",
                    },
                  ]}
                />

              </Form.Item>

            </Col>


            {/* Department */}
            <Col xs={24} md={12}>

              <Form.Item
                label="Department"
                name="department"
                rules={[
                  {
                    required: true,
                    message: "Please select department",
                  },
                ]}
              >

                <Select
                  placeholder="Select department"
                  options={[
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
                    {
                      value: "Marketing",
                      label: "Marketing",
                    },
                  ]}
                />

              </Form.Item>

            </Col>


            {/* Joining Date */}
            <Col xs={24} md={12}>

              <Form.Item
                label="Joining Date"
                name="joiningDate"
                rules={[
                  {
                    required: true,
                    message: "Please select joining date",
                  },
                ]}
              >

                <DatePicker
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                />

              </Form.Item>

            </Col>


            {/* Employment Type */}
            <Col xs={24} md={12}>

              <Form.Item
                label="Employment Type"
                name="employmentType"
                initialValue="Full Time"
              >

                <Radio.Group>

                  <Radio value="Full Time">
                    Full Time
                  </Radio>

                  <Radio value="Part Time">
                    Part Time
                  </Radio>

                  <Radio value="Contract">
                    Contract
                  </Radio>

                </Radio.Group>

              </Form.Item>

            </Col>

          </Row>


          {/* =================================
              ADDRESS
          ================================= */}

          <div className="form-section">

            <h2>Address</h2>

            <p>
              Enter the employee's current address.
            </p>

          </div>


          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter address",
              },
            ]}
          >

            <Input.TextArea
              rows={4}
              placeholder="Enter complete address"
            />

          </Form.Item>


          {/* =================================
              FORM ACTIONS
          ================================= */}

          <div className="form-actions">

            <Space>

              <Button
                onClick={() => form.resetFields()}
              >
                Clear
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
              >
                Save Employee
              </Button>

            </Space>

          </div>

        </Form>

      </Card>

    </div>
  );
}


export default Forms;