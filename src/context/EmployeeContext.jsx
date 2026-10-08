// Import React functionality
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Import initial mock employees
import { initialEmployees } from "../data/mockData";


// Create Employee Context
const EmployeeContext = createContext();


// LocalStorage key
const EMPLOYEE_STORAGE_KEY = "admin_portal_employees";


// Employee Provider
export function EmployeeProvider({ children }) {

  // Load employees from localStorage when the application starts.
  // If no saved data exists, use the initial mock data.
  const [employees, setEmployees] = useState(() => {

    const savedEmployees =
      localStorage.getItem(EMPLOYEE_STORAGE_KEY);

    if (savedEmployees) {
      return JSON.parse(savedEmployees);
    }

    return initialEmployees;
  });


  // Save employee data whenever employees change.
  useEffect(() => {

    localStorage.setItem(
      EMPLOYEE_STORAGE_KEY,
      JSON.stringify(employees)
    );

  }, [employees]);


  // Add a new employee
  const addEmployee = (employeeData) => {

    const newEmployee = {
      ...employeeData,

      // Generate a unique key
      key: Date.now(),

      // Make sure status has a default value
      status: employeeData.status || "Active",
    };


    // Add the new employee to the existing list
    setEmployees((currentEmployees) => [
      ...currentEmployees,
      newEmployee,
    ]);
  };


  // Delete an employee
  const deleteEmployee = (employeeId) => {

    setEmployees((currentEmployees) =>
      currentEmployees.filter(
        (employee) => employee.key !== employeeId
      )
    );
  };


  // Update an employee
  const updateEmployee = (employeeId, updatedData) => {

    setEmployees((currentEmployees) =>
      currentEmployees.map((employee) =>
        employee.key === employeeId
          ? {
              ...employee,
              ...updatedData,
            }
          : employee
      )
    );
  };


  // Provide employee data and functions
  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        deleteEmployee,
        updateEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}


// Custom hook for using employee context
export function useEmployees() {

  return useContext(EmployeeContext);

}