// Key used to store all registered admins
const REGISTERED_ADMINS_KEY = "registered_admins";

// Key used to store the currently logged-in admin
const AUTH_KEY = "admin_portal_auth";

/*
  Register a new admin.

  Multiple admins can be stored in the mock database.
*/
export const registerAdmin = (adminData) => {

  // Get existing admins from localStorage
  const existingData = localStorage.getItem(
    REGISTERED_ADMINS_KEY
  );

  // Convert existing data into an array
  const existingAdmins = existingData
    ? JSON.parse(existingData)
    : [];

  // Add the new admin to the array
  existingAdmins.push(adminData);

  // Save the updated admin list
  localStorage.setItem(
    REGISTERED_ADMINS_KEY,
    JSON.stringify(existingAdmins)
  );
};


/*
  Get all registered admins.
*/
export const getRegisteredAdmins = () => {

  const adminData = localStorage.getItem(
    REGISTERED_ADMINS_KEY
  );

  // If there are no admins yet
  if (!adminData) {
    return [];
  }

  return JSON.parse(adminData);
};


/*
  Login an admin.

  The entered email and password are checked
  against all registered admins.
*/
export const loginAdmin = (email, password) => {

  // Get all registered admins
  const registeredAdmins = getRegisteredAdmins();

  // Find an admin with matching credentials
  const admin = registeredAdmins.find(
    (user) =>
      user.email === email &&
      user.password === password
  );

  // No matching admin found
  if (!admin) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  // Save logged-in admin
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({
      name: admin.name,
      email: admin.email,
    })
  );

  return {
    success: true,
    message: "Login successful.",
  };
};


/*
  Check whether an admin is logged in.
*/
export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_KEY) !== null;
};


/*
  Get currently logged-in admin.
*/
export const getLoggedInAdmin = () => {

  const authData = localStorage.getItem(AUTH_KEY);

  if (!authData) {
    return null;
  }

  return JSON.parse(authData);
};


/*
  Logout the current admin.
*/
export const logoutAdmin = () => {
  localStorage.removeItem(AUTH_KEY);
};


// =========================================
// UPDATE LOGGED-IN ADMIN PROFILE
// =========================================

export function updateAdminProfile(updatedData) {

  // Get registered admins
  const registeredAdmins = getRegisteredAdmins();

  // Get currently logged-in admin
  const loggedInAdmin = getLoggedInAdmin();

  if (!loggedInAdmin) {
    return false;
  }

  // Update the matching admin in registered_admins
  const updatedAdmins = registeredAdmins.map((admin) => {

    if (admin.email === loggedInAdmin.email) {

      return {
        ...admin,
        name: updatedData.name,
      };

    }

    return admin;
  });


  // Save updated registered admins
  localStorage.setItem(
    "registered_admins",
    JSON.stringify(updatedAdmins)
  );


  // Update currently logged-in admin
  const updatedLoggedInAdmin = {
    ...loggedInAdmin,
    name: updatedData.name,
  };


  // Save current logged-in admin
  localStorage.setItem(
    "admin_portal_auth",
    JSON.stringify(updatedLoggedInAdmin)
  );


  // Tell other React components that profile changed
  window.dispatchEvent(
    new Event("adminProfileUpdated")
  );


  return true;
}

// =========================================
// UPDATE ADMIN PASSWORD
// =========================================

export function updateAdminPassword(currentPassword, newPassword) {

  // Get registered admins from localStorage
  const registeredAdmins = getRegisteredAdmins();

  // Get currently logged-in admin
  const loggedInAdmin = getLoggedInAdmin();

  // Make sure an admin is logged in
  if (!loggedInAdmin) {
    return {
      success: false,
      message: "No logged-in admin found.",
    };
  }


  // Find the logged-in admin using email
  const adminIndex = registeredAdmins.findIndex(
    (admin) => admin.email === loggedInAdmin.email
  );


  // Admin not found
  if (adminIndex === -1) {
    return {
      success: false,
      message: "Admin account not found.",
    };
  }


  // Check current password
  if (
    registeredAdmins[adminIndex].password !== currentPassword
  ) {

    return {
      success: false,
      message: "Current password is incorrect.",
    };

  }


  // Update password
  registeredAdmins[adminIndex] = {
    ...registeredAdmins[adminIndex],
    password: newPassword,
  };


  // Save updated admins
  localStorage.setItem(
    "registered_admins",
    JSON.stringify(registeredAdmins)
  );


  return {
    success: true,
    message: "Password updated successfully.",
  };
}