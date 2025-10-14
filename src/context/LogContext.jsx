import { createContext, useContext, useState } from 'react';
import { logs as initialLogs } from '../data/auditLogData';

// Create the context
const LogContext = createContext();

// Create a provider component that will wrap our app
export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState(initialLogs);

  // Function to add a new log to the beginning of the list
  const addLog = (logData) => {
    const newLog = {
      ...logData,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), // Generate current timestamp
    };
    setLogs(prevLogs => [newLog, ...prevLogs]); // Prepend the new log
  };

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  );
};

// Create a custom hook to easily use the log context in any component
export const useLogs = () => useContext(LogContext);