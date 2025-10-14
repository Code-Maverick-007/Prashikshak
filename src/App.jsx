import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MobileNav from './components/MobileNav';
import Dashboard from './pages/Dashboard';
import CollegeManagement from './pages/CollegeManagement';
import InternshipManagement from './pages/InternshipManagement';
import MoUTracker from './pages/MoUTracker';
import StudentManagement from './pages/StudentManagement';
import FeedbackAnalytics from './pages/FeedbackAnalytics';
import NotificationsBroadcast from './pages/NotificationsBroadcast';
import LogsAudit from './pages/LogsAudit';
import ReportsAnalytics from './pages/ReportsAnalytics';
import Profile from './pages/Profile';
import HelpSupport from './pages/HelpSupport';
import Settings from './pages/Settings';
import HomePage from './pages/HomePage';
import InternshipDetails from './components/InternshipDetails';
import CompanyMoUDetails from './pages/CompanyMoUDetails';
import StudentProfile from './pages/StudentProfile';
import QueryDetails from './pages/QueryDetails';
import { useState } from 'react';
import { useLogs } from './context/LogContext';

// This component defines the main layout for signed-in users
const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="lg:ml-64">
        <TopBar setIsSidebarOpen={setIsSidebarOpen} />
        <main className="p-4 lg:p-6 pb-20 lg:pb-6">
          <Outlet /> {/* Child routes will be rendered here */}
        </main>
      </div>
      <MobileNav />
    </div>
  );
};


function App() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Routes>
      {/* Public routes, accessible to everyone */}
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in/*" element={<div className="flex justify-center items-center min-h-screen"><SignIn routing="path" path="/sign-in" /></div>} />
      <Route path="/sign-up/*" element={<div className="flex justify-center items-center min-h-screen"><SignUp routing="path" path="/sign-up" /></div>} />

      {/* Protected routes, only accessible when signed in */}
      <Route
        path="/*"
        element={
          <SignedIn>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/colleges" element={<CollegeManagement />} />
                <Route path="/internships" element={<InternshipManagement />} />
                <Route path="/mou" element={<MoUTracker />} />
                <Route path="/students" element={<StudentManagement />} />
                <Route path="/feedback" element={<FeedbackAnalytics />} />
                <Route path="/notifications" element={<NotificationsBroadcast />} />
                <Route path="/logs" element={<LogsAudit />} />
                <Route path="/reports" element={<ReportsAnalytics />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/help" element={<HelpSupport />} />
                <Route path="/settings/*" element={<Settings />} />
                
                {/* Redirect any other signed-in path to the dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
                <Route path="/internships/:internshipId" element={<InternshipDetails />} />
                <Route path="/mou/:companyId" element={<CompanyMoUDetails />} />
                <Route path="/students/:studentId" element={<StudentProfile />} />
                <Route path="/help/:ticketId" element={<QueryDetails />} /> 
              </Route>
            </Routes>
          </SignedIn>
        }
      />
    </Routes>
  );
}

export default App;