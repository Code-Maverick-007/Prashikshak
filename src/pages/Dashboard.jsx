import { Briefcase, Users, FileText, Building2, TrendingUp } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { dashboardStats, recentActivities } from '../data/dashboardData';

// A helper object to map string names to actual icon components
const icons = {
  Briefcase,
  Users,
  FileText,
  Building2,
};

// A helper function to get color classes
const getColorClasses = (color) => {
  switch (color) {
    case 'blue': return { bg: 'bg-blue-50', text: 'text-blue-600' };
    case 'green': return { bg: 'bg-green-50', text: 'text-green-600' };
    case 'purple': return { bg: 'bg-purple-50', text: 'text-purple-600' };
    case 'yellow': return { bg: 'bg-yellow-50', text: 'text-yellow-600' };
    default: return { bg: 'bg-gray-50', text: 'text-gray-600' };
  }
};


const Dashboard = () => {
  const { user } = useUser(); // Get the logged-in user's data from Clerk

  return (
    <div className="space-y-6">
      <div>
        {/* Greet the user by name */}
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName || 'Admin'}!</h1>
        <p className="text-sm text-gray-500 mt-1">Here's a summary of the portal's activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => {
          const Icon = icons[stat.icon];
          const colors = getColorClasses(stat.color);
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;