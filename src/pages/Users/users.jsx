// Import React
import { useState } from "react";

// Import Ant Design components
import {
  Avatar,
  Badge,
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  DatePicker,
} from "antd";

// Import icons
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useEmployees } from "../../context/EmployeeContext";

import dayjs from "dayjs";

// Import page CSS
import "./Users.css";

// Extract Typography components
const { Title, Text } = Typography; 

function Users() {

  const {
    employees,
    deleteEmployee,
  } = useEmployees();

  // Search text
  const [searchText, setSearchText] = useState("");

  // Selected status filter
  const [statusFilter, setStatusFilter] = useState("all");


  // Controls whether the Add User modal is visible
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Stores the user currently being edited
    const [editingUser, setEditingUser] = useState(null);

    // Ant Design form instance
    const [form] = Form.useForm();

  /*
    Filter users based on search text
    and selected status.
  */
  const filteredUsers = employees.filter((user) => {

    const matchesSearch =
      user.name
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /*
    Delete a user.
  */
  const handleDelete = (userId) => {

    deleteEmployee(userId);

    message.success(
      "Employee deleted successfully!"
    );
  };

/*
  Add a new user to the table.
*/
const handleAddUser = (values) => {

  // Create a new user object
  const newUser = {
    key: Date.now(),
    name: values.name,
    email: values.email,
    role: values.role,
    status: values.status,
     joinedDate: values.joinedDate.format("YYYY-MM-DD"),
  };

  // Add new user to the existing users
  setUsers((currentUsers) => [
    ...currentUsers,
    newUser,
  ]);

  // Show success message
  message.success("User added successfully!");

  // Clear form
  form.resetFields();

  // Close modal
  setIsModalOpen(false);
};


/*
  Open the Edit User modal
  with the selected user's existing data.
*/
const handleEdit = (user) => {
  // Store the selected user
  setEditingUser(user);

  // Open the modal
  setIsModalOpen(true);

  // Fill the form with existing user data
  form.setFieldsValue({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,

    // Convert string date back into a DatePicker value
    joiningDate: dayjs(user.joiningDate),
  });
};


/*
  Update an existing user.
*/
const handleUpdateUser = (values) => {

  // Update the selected user
  setUsers((currentUsers) =>
    currentUsers.map((user) => {

      // Find the user being edited
      if (user.key === editingUser.key) {
        return {
          ...user,
          name: values.name,
          email: values.email,
          role: values.role,
          status: values.status,
          joiningDate: values.joiningDate.format(
            "YYYY-MM-DD"
          ),
        };
      }

      // Keep other users unchanged
      return user;
    })
  );

  // Show success message
  message.success("User updated successfully!");

  // Clear form
  form.resetFields();

  // Clear editing state
  setEditingUser(null);

  // Close modal
  setIsModalOpen(false);
};

  /*
    Table columns.
  */
  const columns = [
    {
      title: "User",
      key: "user",
      render: (_, user) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <Text strong>{user.name}</Text>
            <br />
            <Text type="secondary">
              {user.email}
            </Text>
          </div>
        </Space>
      ),
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag>{role}</Tag>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Badge
          status={
            status === "Active"
              ? "success"
              : "default"
          }
          text={status}
        />
      ),
    },

    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, user) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(user)}
          />

          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              handleDelete(user.key)
            }
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="users-page">

      {/* Page header */}
      <div className="users-page-header">

        <div>
          <Title level={2}>
            Users
          </Title>

          <Text type="secondary">
            Manage users and their account information.
          </Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Add User
        </Button>

      </div>

      {/* Users card */}
      <Card className="users-card">

        {/* Search and filter */}
        <div className="users-toolbar">

          <Input
            placeholder="Search by name or email"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
            allowClear
          />

          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              {
                value: "all",
                label: "All Status",
              },
              {
                value: "Active",
                label: "Active",
              },
              {
                value: "Inactive",
                label: "Inactive",
              },
            ]}
          />

        </div>

        {/* Users table */}
        <Table
          columns={columns}
          dataSource={filteredUsers}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
          }}
        />

      </Card>

     {/* Add User Modal */}
        <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onCancel={() => {
            // Close modal
            setIsModalOpen(false);

            // Clear form
            form.resetFields();
        }}
        footer={null}
        >
        <Form
            form={form}
            layout="vertical"
            onFinish={
              editingUser
                ? handleUpdateUser
                : handleAddUser
            }
            autoComplete="off"
        >

            {/* Full Name */}
            <Form.Item
            label="Full Name"
            name="name"
            rules={[
                {
                required: true,
                message: "Please enter the user's name",
                },
            ]}
            >
            <Input placeholder="Enter full name" />
            </Form.Item>

            {/* Email */}
            <Form.Item
            label="Email"
            name="email"
            rules={[
                {
                required: true,
                message: "Please enter the email",
                },
                {
                type: "email",
                message: "Please enter a valid email",
                },
            ]}
            >
            <Input placeholder="Enter email address" />
            </Form.Item>

            {/* Role */}
            <Form.Item
            label="Role"
            name="role"
            rules={[
                {
                required: true,
                message: "Please select a role",
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

            {/* Status */}
            <Form.Item
            label="Status"
            name="status"
            rules={[
                {
                required: true,
                message: "Please select a status",
                },
            ]}
            >
            <Select
                placeholder="Select status"
                options={[
                {
                    value: "Active",
                    label: "Active",
                },
                {
                    value: "Inactive",
                    label: "Inactive",
                },
                ]}
            />
            </Form.Item>

            {/* Joining Date */}
            <Form.Item
              label="Joining Date"
              name="joiningDate"
              rules={[
                {
                  required: true,
                  message: "Please select the joining date",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
                placeholder="Select joining date"
              />
            </Form.Item>

            {/* Form buttons */}
            <div className="user-form-actions">

            <Button
                onCancel={() => {
                setIsModalOpen(false);
                form.resetFields();
                setEditingUser(null);
              }}
            >
                Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
            >
              {editingUser ? "Update User" : "Add User"}
            </Button>

            </div>

        </Form>
        </Modal>


    </div>
  );
}

export default Users;