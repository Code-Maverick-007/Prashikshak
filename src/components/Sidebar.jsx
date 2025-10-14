import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Briefcase, FileText, Users, BarChart3, Bell, FileSearch, HelpCircle, Settings, X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/colleges', label: 'College Management', icon: Building2 },
    { path: '/mou', label: 'Industry Collaboration', icon: FileText },
    { path: '/internships', label: 'Internship Management', icon: Briefcase },
    { path: '/students', label: 'Student Management', icon: Users },
    { path: '/reports', label: 'Reports & Analytics', icon: BarChart3 },
    { path: '/notifications', label: 'Notifications & Broadcast', icon: Bell },
    { path: '/logs', label: 'Logs & Audit Trails', icon: FileSearch },
    { path: '/help', label: 'Help & Support', icon: HelpCircle },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}
      <aside className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Prashikshak</h1>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700"><X className="w-5 h-5" /></button>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-88px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;