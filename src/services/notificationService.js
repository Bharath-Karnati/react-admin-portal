// =========================================
// NOTIFICATION SERVICE
// =========================================

const NOTIFICATION_STORAGE_KEY =
  "admin_portal_notifications";


// =========================================
// DEFAULT NOTIFICATIONS
// =========================================

const defaultNotifications = [
  {
    id: 1,
    title: "New Employee Added",
    message: "A new employee has been added to the portal.",
    type: "employee",
    read: false,
    time: "10 minutes ago",
  },

  {
    id: 2,
    title: "Employee Report Updated",
    message: "The employee report has been updated.",
    type: "report",
    read: false,
    time: "30 minutes ago",
  },

  {
    id: 3,
    title: "Inactive Employee",
    message: "An employee is currently marked as inactive.",
    type: "warning",
    read: false,
    time: "1 hour ago",
  },

  {
    id: 4,
    title: "Profile Updated",
    message: "Your administrator profile was updated.",
    type: "profile",
    read: true,
    time: "2 hours ago",
  },

  {
    id: 5,
    title: "Welcome to Admin Portal",
    message: "Your admin portal is ready to use.",
    type: "system",
    read: true,
    time: "Today",
  },
];


// =========================================
// GET NOTIFICATIONS
// =========================================

export function getNotifications() {

  const savedNotifications =
    localStorage.getItem(
      NOTIFICATION_STORAGE_KEY
    );

  if (savedNotifications) {

    return JSON.parse(savedNotifications);

  }

  localStorage.setItem(
    NOTIFICATION_STORAGE_KEY,
    JSON.stringify(defaultNotifications)
  );

  return defaultNotifications;
}


// =========================================
// SAVE NOTIFICATIONS
// =========================================

export function saveNotifications(notifications) {

  localStorage.setItem(
    NOTIFICATION_STORAGE_KEY,
    JSON.stringify(notifications)
  );

}


// =========================================
// MARK NOTIFICATION AS READ
// =========================================

export function markNotificationAsRead(notificationId) {

  const notifications = getNotifications();

  const updatedNotifications =
    notifications.map((notification) => {

      if (notification.id === notificationId) {

        return {
          ...notification,
          read: true,
        };

      }

      return notification;

    });


  saveNotifications(updatedNotifications);

  return updatedNotifications;
}


// =========================================
// MARK ALL AS READ
// =========================================

export function markAllNotificationsAsRead() {

  const notifications = getNotifications();

  const updatedNotifications =
    notifications.map((notification) => ({
      ...notification,
      read: true,
    }));


  saveNotifications(updatedNotifications);

  return updatedNotifications;
}