// Import Ant Design components
import { Button, Checkbox, DatePicker, Form, Input, Radio, Typography, message, } from "antd";

// Import icons from Ant Design Icons
import { LockOutlined, MailOutlined, UserOutlined, } from "@ant-design/icons";


import { registerAdmin } from "../../services/authService";

// Import Register page CSS
import "./register.css";

// Extract commonly used Typography components
const { Title, Text, Link } = Typography;


// Register component
function Register() {

   // Ant Design form instance
  const [form] = Form.useForm();

  // Function executed after successful form submission
  const handleRegister = (values) => {
  // Save the registered admin details
    registerAdmin({
      name: values.fullName,
      email: values.email,
      password: values.password,
    });

    // Show success message
  message.success("Account created successfully!");

  // Clear all form fields
  form.resetFields();

  // Check in browser console
  console.log("Admin registered successfully:", values);
  };


  // Return Register page UI
  return (
    <div className="register-container">

      {/* Register card */}
      <div className="register-card">

        {/* --------------------------------
            Page Header
        --------------------------------- */}
        <div className="register-header">

          {/* Application logo */}
          <div className="brand-logo">
            AP
          </div>

          {/* Page title */}
          <Title level={2}>
            Create Account
          </Title>

          {/* Page description */}
          <Text type="secondary">
            Register for the Admin Portal
          </Text>

        </div>


        {/* --------------------------------
            Registration Form
        --------------------------------- */}
        <Form
          name="register"
          form={form}
          layout="vertical"
          onFinish={handleRegister}
          className="register-form"
        >

          {/* --------------------------------
              Full Name
          --------------------------------- */}
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please enter your full name",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your full name"
              size="large"
            />
          </Form.Item>


          {/* --------------------------------
              Email
          --------------------------------- */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>


          {/* --------------------------------
              Password
          --------------------------------- */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter a password",
              },
              {
                min: 6,
                message: "Password must contain at least 6 characters",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Create a password"
              size="large"
            />
          </Form.Item>


          {/* --------------------------------
              Confirm Password
          --------------------------------- */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {

                  // Check whether confirmation matches password
                  if (
                    !value ||
                    getFieldValue("password") === value
                  ) {
                    return Promise.resolve();
                  }

                  // Return error when passwords don't match
                  return Promise.reject(
                    new Error("Passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
              size="large"
            />
          </Form.Item>


          {/* --------------------------------
              Date of Birth
          --------------------------------- */}
          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[
              {
                required: true,
                message: "Please select your date of birth",
              },
            ]}
          >
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              placeholder="Select your date of birth"
            />
          </Form.Item>


          {/* --------------------------------
              Gender - Radio
          --------------------------------- */}
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please select your gender",
              },
            ]}
          >
            <Radio.Group>

              <Radio value="male">
                Male
              </Radio>

              <Radio value="female">
                Female
              </Radio>

              <Radio value="other">
                Other
              </Radio>

            </Radio.Group>
          </Form.Item>


          {/* --------------------------------
              Terms & Conditions
          --------------------------------- */}
          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          "Please accept the terms and conditions"
                        )
                      ),
              },
            ]}
          >
            <Checkbox>
              I agree to the Terms and Conditions
            </Checkbox>
          </Form.Item>


          {/* --------------------------------
              Register Button
          --------------------------------- */}
          <Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              Create Account
            </Button>

          </Form.Item>

        </Form>


        {/* --------------------------------
            Login Link
        --------------------------------- */}
        <div className="login-link">

          <Text>
            Already have an account?{" "}

            <Link href="/login">
              Sign in
            </Link>
          </Text>

        </div>

      </div>

    </div>
  );
}


// Export Register component
export default Register;