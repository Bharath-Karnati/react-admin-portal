import { useState } from "react";

import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Switch,
  Typography,
  message,
} from "antd";

import {
  BellOutlined,
  LockOutlined,
  MailOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  getLoggedInAdmin,
  updateAdminProfile,
  updateAdminPassword,
} from "../../services/authService";


import "./Settings.css";

const { Title, Text } = Typography;


function Settings() {

  const loggedInAdmin = getLoggedInAdmin();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const [passwordModalOpen, setPasswordModalOpen] =
    useState(false);

  const [passwordLoading, setPasswordLoading] =
    useState(false);

const [passwordForm] = Form.useForm();

  const [portalNotifications, setPortalNotifications] =
    useState(true);

  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [layout, setLayout] = useState("comfortable");

  // =========================================
    // CHANGE PASSWORD
 // =========================================

    const handlePasswordChange = (values) => {

    setPasswordLoading(true);


    setTimeout(() => {

        const result = updateAdminPassword(
        values.currentPassword,
        values.newPassword
        );


        if (!result.success) {

        message.error(result.message);

        setPasswordLoading(false);

        return;
        }


        message.success(
        "Password changed successfully."
        );


        // Clear password fields
        passwordForm.resetFields();


        // Close modal
        setPasswordModalOpen(false);


        setPasswordLoading(false);

    }, 500);
    };


  // =========================================
  // SAVE SETTINGS
  // =========================================

  const handleSave = (values) => {

  setLoading(true);

  setTimeout(() => {

    // Update admin name and email in localStorage
    updateAdminProfile({
      name: values.name,
      email: values.email,
    });


    // Save other settings
    console.log("Settings:", {
      ...values,
      portalNotifications,
      emailNotifications,
      layout,
    });


    message.success("Settings saved successfully");

    setLoading(false);

  }, 500);
};


  // =========================================
  // RESET SETTINGS
  // =========================================

  const handleReset = () => {

    form.resetFields();

    setPortalNotifications(true);

    setEmailNotifications(true);

    setLayout("comfortable");

    message.info("Settings restored");
  };


  return (

    <div className="settings-page">


      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div className="settings-header">

        <div>

          <Text className="settings-label">
            SYSTEM SETTINGS
          </Text>

          <Title level={2}>
            Settings
          </Title>

          <Text type="secondary">
            Manage your account, notifications, appearance and security.
          </Text>

        </div>

      </div>


      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          name: loggedInAdmin?.name || "",
          email: loggedInAdmin?.email || "",
        }}
      >


        {/* =====================================
            PROFILE
        ====================================== */}

        <Card className="settings-card">

          <div className="settings-section-header">

            <div className="section-icon">
              <UserOutlined />
            </div>

            <div>

              <Title level={4}>
                Profile
              </Title>

              <Text type="secondary">
                Update your administrator account information.
              </Text>

            </div>

          </div>


          <Divider />


          <Row gutter={[24, 20]}>

            <Col xs={24} md={8}>

              <div className="profile-preview">

                <Avatar
                  size={72}
                  icon={<UserOutlined />}
                  className="profile-avatar"
                />

                <div>

                  <Text strong className="profile-name">
                    {loggedInAdmin?.name || "Administrator"}
                  </Text>

                  <Text type="secondary">
                    Administrator
                  </Text>

                </div>

              </div>

            </Col>


            <Col xs={24} md={16}>

              <Row gutter={16}>

                <Col xs={24} sm={12}>

                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your name",
                      },
                    ]}
                  >

                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter full name"
                    />

                  </Form.Item>

                </Col>


                <Col xs={24} sm={12}>

                  <Form.Item
                    label="Email Address"
                    name="email"
                    >
                    <Input
                        prefix={<MailOutlined />}
                        disabled
                    />
                    </Form.Item>

                </Col>

              </Row>

            </Col>

          </Row>

        </Card>


        {/* =====================================
            NOTIFICATIONS
        ====================================== */}

        <Card className="settings-card">

          <div className="settings-section-header">

            <div className="section-icon">
              <BellOutlined />
            </div>

            <div>

              <Title level={4}>
                Notifications
              </Title>

              <Text type="secondary">
                Choose how you want to receive portal notifications.
              </Text>

            </div>

          </div>


          <Divider />


          <div className="settings-option">

            <div className="option-content">

              <Text strong>
                Portal Notifications
              </Text>

              <Text type="secondary">
                Receive notifications inside the admin portal.
              </Text>

            </div>

            <Switch
              checked={portalNotifications}
              onChange={setPortalNotifications}
            />

          </div>


          <div className="settings-option">

            <div className="option-content">

              <Text strong>
                Email Notifications
              </Text>

              <Text type="secondary">
                Receive important updates through email.
              </Text>

            </div>

            <Switch
              checked={emailNotifications}
              onChange={setEmailNotifications}
            />

          </div>

        </Card>


        {/* =====================================
            APPEARANCE
        ====================================== */}

        <Card className="settings-card">

          <div className="settings-section-header">

            <div className="section-icon">
              <span className="appearance-symbol">
                Aa
              </span>
            </div>

            <div>

              <Title level={4}>
                Appearance
              </Title>

              <Text type="secondary">
                Customize how information is displayed.
              </Text>

            </div>

          </div>


          <Divider />


          <div className="appearance-option">

            <div className="option-content">

              <Text strong>
                Layout Density
              </Text>

              <Text type="secondary">
                Choose how much space is used between interface elements.
              </Text>

            </div>


            <Radio.Group
              value={layout}
              onChange={(event) =>
                setLayout(event.target.value)
              }
            >

              <Radio value="comfortable">
                Comfortable
              </Radio>

              <Radio value="compact">
                Compact
              </Radio>

            </Radio.Group>

          </div>

        </Card>


        {/* =====================================
            SECURITY
        ====================================== */}

        <Card className="settings-card">

          <div className="settings-section-header">

            <div className="section-icon">
              <LockOutlined />
            </div>

            <div>

              <Title level={4}>
                Security
              </Title>

              <Text type="secondary">
                Manage your account security.
              </Text>

            </div>

          </div>


          <Divider />


          <div className="security-row">

            <div className="option-content">

              <Text strong>
                Password
              </Text>

              <Text type="secondary">
                Update your account password regularly.
              </Text>

            </div>


            <Button
            onClick={() => setPasswordModalOpen(true)}
            >
            Change Password
            </Button>

          </div>


          <div className="security-info">

            <LockOutlined />

            <Text type="secondary">
              Your account is protected by password authentication.
            </Text>

          </div>

        </Card>


        {/* =====================================
            ACTION BUTTONS
        ====================================== */}

        <div className="settings-actions">

          <Button
            onClick={handleReset}
          >
            Reset
          </Button>


          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SaveOutlined />}
            className="save-button"
          >
            Save Changes
          </Button>

        </div>


      </Form>


      {/* =====================================
            CHANGE PASSWORD MODAL
        ====================================== */}

        <Modal
        title="Change Password"
        open={passwordModalOpen}
        onCancel={() => {
            passwordForm.resetFields();
            setPasswordModalOpen(false);
        }}
        footer={null}
        destroyOnHidden
        >

        <div className="password-modal-description">

            <Text type="secondary">
            Enter your current password and choose a new password
            for your admin account.
            </Text>

        </div>


        <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handlePasswordChange}
        >


            {/* Current Password */}

            <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
                {
                required: true,
                message: "Please enter your current password",
                },
            ]}
            >

            <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter current password"
            />

            </Form.Item>


            {/* New Password */}

            <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
                {
                required: true,
                message: "Please enter a new password",
                },
                {
                min: 6,
                message: "Password must be at least 6 characters",
                },
            ]}
            >

            <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter new password"
            />

            </Form.Item>


            {/* Confirm Password */}

            <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
                {
                required: true,
                message: "Please confirm your new password",
                },
                ({ getFieldValue }) => ({
                validator(_, value) {

                    if (
                    !value ||
                    getFieldValue("newPassword") === value
                    ) {
                    return Promise.resolve();
                    }

                    return Promise.reject(
                    new Error("Passwords do not match")
                    );
                },
                }),
            ]}
            >

            <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm new password"
            />

            </Form.Item>


            {/* Buttons */}

            <div className="password-modal-actions">

            <Button
                onClick={() => {
                passwordForm.resetFields();
                setPasswordModalOpen(false);
                }}
            >
                Cancel
            </Button>


            <Button
                type="primary"
                htmlType="submit"
                loading={passwordLoading}
                className="save-button"
            >
                Update Password
            </Button>

            </div>

        </Form>

        </Modal>

    </div>
  );
}


export default Settings;