import { User, Mail, Phone, Building2, Briefcase, Calendar } from 'lucide-react';

const Profile = () => {
  const internshipHistory = [
    {
      title: 'AI Research at Stanford',
      company: 'Stanford University',
      duration: 'Summer 2023',
      status: 'Completed',
    },
    {
      title: 'Data Analytics at Microsoft',
      company: 'Microsoft',
      duration: 'Fall 2022',
      status: 'Completed',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account information</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16">
            <div className="w-32 h-32 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center">
              <User className="w-16 h-16 text-blue-600" />
            </div>
            <div className="flex-1 sm:mt-16">
              <h2 className="text-2xl font-bold text-gray-900">Arjun Sharma</h2>
              <p className="text-gray-500">System Administrator</p>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors sm:mb-2">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">College</div>
              <div className="font-medium text-gray-900">IIT Delhi</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Department</div>
              <div className="font-medium text-gray-900">Computer Science</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Role</div>
              <div className="font-medium text-gray-900">Professor</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="font-medium text-gray-900">arjun@iitdelhi.ac.in</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Phone</div>
              <div className="font-medium text-gray-900">+91-123-456-7890</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Joined</div>
              <div className="font-medium text-gray-900">January 2022</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Internships</h3>
        </div>
        <div className="space-y-3">
          {internshipHistory.map((internship, index) => (
            <div key={index} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{internship.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{internship.company}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-gray-500">{internship.duration}</span>
                  <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full">
                    {internship.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Account Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-xs text-gray-500 mt-1">Internships Managed</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">156</div>
            <div className="text-xs text-gray-500 mt-1">Students Mentored</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-yellow-600">12</div>
            <div className="text-xs text-gray-500 mt-1">Active Projects</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">4.8</div>
            <div className="text-xs text-gray-500 mt-1">Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
