import { createContext, useState } from "react";

export const NotificationContext = createContext();

const initialState = {
  notification_title: "",
  notification_text: "",
  show: false
};

const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState(initialState);

  // Set notification text and show notification
  const showNotification = (
    notification_title = "",
    notification_text = "",
    timer = undefined
  ) => {
    if (timer === undefined) {
      setNotification(prevState => {
        return {
          ...prevState,
          notification_title: notification_title,
          notification_text: notification_text,
          show: true
        };
      });
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notification, setNotification, showNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
