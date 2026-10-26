# React Admin Portal

## Project Overview

The React Admin Portal is a web application developed to manage employee information through a simple and organized dashboard. It provides a common interface for viewing employee details, adding new users, updating records, and checking employee reports.

The application was built using React.js and Ant Design, with React Router for navigation. For this version, employee records and admin account information are managed using mock data and browser `localStorage`, so a separate backend is not required to run the application.

## Technologies Used

- **React.js** – Building reusable UI components.
- **JavaScript** – Implementing application logic and interactions.
- **Vite** – Development server and build tool.
- **Ant Design** – UI components such as forms, tables, cards, and modals.
- **React Router** – Managing navigation and application routes.
- **Context API** – Sharing employee data across components.
- **CSS3** – Styling and layout customization.
- **localStorage** – Storing demo account information and employee records in the browser.

## Features

### 1. Admin Authentication
- Admin registration and login.
- Form validation for required fields.
- Protected routes for authenticated users.
- Logout functionality.

### 2. Dashboard
- Summary cards displaying total employees, active employees, inactive employees, and managers.
- Employee overview and department summary.
- Quick access to other sections of the portal.

### 3. User Management
- View employee records in a table.
- Search employees by name or email.
- Filter employees by status.
- Add new employee records.
- Edit existing employee details.
- Delete employee records.
- Manage information such as name, email, role, department, status, and joining date.

### 4. Reports
- View employee records and workforce summaries.
- Display employee counts by status and role.
- Filter records by department and joining date.

### 5. Settings
- Manage admin profile information.
- Update the admin's display name.
- Change the password for the demo account.

### 6. Notifications
- View notifications through the header.
- Manage notification read status.

## Project Structure

```text
react-admin-portal/
├── public/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   └── Sidebar/
│   ├── context/
│   │   └── EmployeeContext.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── layouts/
│   │   └── AdminLayout/
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Forms/
│   │   ├── Register/
│   │   ├── Reports/
│   │   ├── Settings/
│   │   └── Users/
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   ├── authService.js
│   │   └── notificationService.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── README.md
```

## Setup Instructions

### 1. Prerequisites

Make sure Node.js and npm are installed on your system.

Check the installed versions:

```bash
node -v
npm -v
```

### 2. Clone the repository

```bash
git clone https://github.com/Bharath-Karnati/react-admin-portal.git
```

Navigate to the project directory:

```bash
cd react-admin-portal
```

### 3. Install dependencies

Run the following command in the project directory:

```bash
npm install
```

This installs the packages required by the application.

### 4. Start the application

```bash
npm run dev
```

Vite will display a local URL in the terminal, usually:

```text
http://localhost:5173
```

Open that URL in your browser to access the application.

## Application Workflow

1. Open the application in the browser.
2. Register an admin account or log in using a registered account.
3. Navigate to the dashboard to view employee summaries.
4. Open the Users section to search, add, edit, or delete employee records.
5. Open Reports to review employee information and use the available filters.
6. Use Settings to manage the demo admin profile and password.
7. Log out when finished.

## Data Management

Employee data is shared across relevant components through React Context API. The `EmployeeContext` manages adding, updating, and deleting employee records.

The application saves employee records in browser `localStorage`, allowing the demo data to remain available after a page refresh in the same browser.

Admin registration, login, profile information, and notifications also use browser storage in this frontend-only implementation.

## Testing

The application can be tested manually in the browser.

Recommended test cases include:

- Register an admin account and log in.
- Verify that protected pages require authentication.
- Add an employee and check whether the new record appears in the Users table.
- Edit an employee and confirm the changes are reflected in the table and Reports page.
- Delete an employee and verify that the record is removed.
- Test search and department/status/date filters.
- Refresh the browser and check whether saved demo data remains available.
- Update the admin profile and password, then verify the expected behavior.
- Log out and confirm that protected pages are no longer accessible.

## Current Limitations

- This version uses mock data and browser storage instead of a backend database.
- Data is stored locally in the browser and is not shared between different users or devices.
- Authentication and password handling are intended for demonstration purposes only.
- `localStorage` is not a secure place to store passwords or sensitive authentication data.
- A production version would require a backend API, a database, server-side authorization, and secure password handling.

## Future Enhancements

- Integrate a backend API and database.
- Implement secure authentication and role-based access control.
- Add pagination and more advanced employee filters.
- Improve form validation and error handling.
- Add automated tests for important application workflows.
- Deploy the application to a hosting platform.

## Conclusion

This project demonstrates the development of a React-based admin interface with reusable components, routing, form validation, employee management, and shared state management. It provides a foundation for building a more complete employee administration system with backend integration in the future.
