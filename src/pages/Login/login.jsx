// Import required Ant Design components
import {Button, Checkbox, Form, Input, Typography, message,} from "antd";

// Import icons from Ant Design Icons
import { LockOutlined, MailOutlined, } from "@ant-design/icons";

// Import Link from React Router
import { Link as RouterLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { loginAdmin } from "../../services/authService";

import { useEffect } from "react";

import { logoutAdmin } from "../../services/authService";

// Import CSS file for Login page styling
import "./Login.css";

// Get commonly used Typography components
const { Title, Text, Link } = Typography;


function Login() {
    useEffect(() => {
    // Clear the existing session whenever the Login page opens
    logoutAdmin();
  }, []);
  const navigate = useNavigate();
  // This function executes when the login form is successfully submitted
  const handleLogin = (values) => {
  // Check the entered email and password
  const result = loginAdmin(
    values.email,
    values.password
  );

  // Login successful
  if (result.success) {
    message.success("Login successful!");

    navigate("/dashboard", { replace: true });
    // Go to Dashboard
    navigate("/dashboard");
  } else {
    // Login failed
    message.error(result.message);
  }
};


  // Return the Login page UI
  return (
    <div className="login-container">

      
      <div className="login-card">

        {/* -----------------------------
            Logo and page heading
        ------------------------------ */}
        <div className="login-header">

          {/* Application logo */}
          <div className="brand-logo">
            AP
          </div>

          {/* Page title */}
          <Title level={2}>
            Admin Portal
          </Title>

          {/* Page description */}
          <Text type="secondary">
            Sign in to manage your account
          </Text>

        </div>


        {/* -----------------------------
            Login Form
        ------------------------------ */}
        <Form
          name="login"

          // Display form labels above the inputs
          layout="vertical"

          // Function executed after successful validation
          onFinish={handleLogin}

          autoComplete="off"

          // CSS class for additional styling
          className="login-form"
        >

          {/* -----------------------------
              Email field
          ------------------------------ */}
          <Form.Item
            label="Email"
            name="email"

            // Validation rules for email
            rules={[
              {
                // Email is mandatory
                required: true,
                message: "Please enter your email",
              },
              {
                // Validate email format
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input
              // Mail icon displayed inside the input
              prefix={<MailOutlined />}

              // Placeholder text
              placeholder="Enter your email"

              // Ant Design input size
              size="large"
            />
          </Form.Item>


          {/* -----------------------------
              Password field
          ------------------------------ */}
          <Form.Item
            label="Password"
            name="password"

            // Password validation
            rules={[
              {
                // Password is mandatory
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password
              // Lock icon displayed inside the input
              prefix={<LockOutlined />}

              // Placeholder text
              placeholder="Enter your password"

              // Large input
              size="large"
            />
          </Form.Item>


          {/* -----------------------------
              Remember Me & Forgot Password
          ------------------------------ */}
          <div className="login-options">

            {/* Remember me checkbox */}
            <Form.Item
              name="remember"

              // Checkbox value is stored using checked property
              valuePropName="checked"

              // Remove default Form.Item styling
              noStyle
            >
              <Checkbox>
                Remember me
              </Checkbox>
            </Form.Item>


            {/* Forgot password link */}
            <Link href="#">
              Forgot password?
            </Link>

          </div>


          {/* -----------------------------
              Login button
          ------------------------------ */}
          <Form.Item>

            <Button
              // Primary Ant Design button
              type="primary"

              // Submit the form
              htmlType="submit"

              // Large button
              size="large"

              // Button takes full available width
              block
            >
              Sign In
            </Button>

          </Form.Item>

        </Form>


        {/* -----------------------------
            Registration link
        ------------------------------ */}
        <div className="register-link">

          <Text>
            Don't have an account?{" "}

            {/* Registration link */}
            <RouterLink to="/register">
              Register now
            </RouterLink>
          </Text>

        </div>

      </div>

    </div>
  );
}


// Export Login component so it can be
// imported and used in other files
export default Login;