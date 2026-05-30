import React, { createContext, useContext, useState } from "react";

// Define the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("midnight");

  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for accessing the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
