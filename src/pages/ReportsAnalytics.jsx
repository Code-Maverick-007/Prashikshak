import { useMemo } from 'react';
import { Download, TrendingUp, BarChart, FileText, Star, Users } from 'lucide-react';
// --- IMPORT ALL NECESSARY DATA ---
import { internships as allInternships } from '../data/internshipData';
import { companies as allCompanies } from '../data/mouData';
import { students as allStudents } from '../data/studentData';
import { departmentData } from '../data/reportsData';

const ReportsAnalytics = () => {
  // --- DYNAMIC SUMMARY CALCULATIONS ---
  const summaryStats = useMemo(() => {
    const internshipReports = allInternships.length;
    const totalCredits = departmentData.reduce((sum, dept) => sum + dept.credits, 0);
    const activeMoUs = allCompanies.filter(c => c.status === 'Active').length;
    const avgRating = allStudents.length > 0
      ? (allStudents.reduce((sum, s) => sum + s.rating, 0) / allStudents.length).toFixed(1)
      : 'N/A';
    const completionRate = allStudents.length > 0
      ? Math.round((allStudents.filter(s => s.progress === 100).length / allStudents.length) * 100)
      : 0;
    const activeStudents = allStudents.filter(s => s.status === 'Active').length;

    return { internshipReports, totalCredits, activeMoUs, avgRating, completionRate, activeStudents };
  }, [allInternships, allCompanies, allStudents, departmentData]); // <-- FIX: Added dependencies to update stats when data changes.

  // --- HELPER FUNCTION FOR VISUALS ---
  // <-- FIX: Returns full class names to be compatible with Tailwind's production build.
  const getStatVisuals = (label) => {
    switch (label) {
      case 'Internship Reports': return { bg: 'bg-blue-100', text: 'text-blue-600', Icon: BarChart };
      case 'Credit Summary': return { bg: 'bg-green-100', text: 'text-green-600', Icon: TrendingUp };
      case 'MoU Summary': return { bg: 'bg-yellow-100', text: 'text-yellow-600', Icon: FileText };
      case 'Avg Rating': return { bg: 'bg-purple-100', text: 'text-purple-600', Icon: Star };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600', Icon: Users };
    }
  };
  
  const topSummaryData = [
    { label: 'Internship Reports', value: summaryStats.internshipReports, subtext: 'Completed' },
    { label: 'Credit Summary', value: summaryStats.totalCredits.toLocaleString(), subtext: 'Total Credits' },
    { label: 'MoU Summary', value: summaryStats.activeMoUs, subtext: 'Active' },
    { label: 'Avg Rating', value: summaryStats.avgRating, subtext: 'Out of 5.0' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topSummaryData.map((stat, index) => {
          const { bg, text, Icon } = getStatVisuals(stat.label); // Get full class names
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${text}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.subtext}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Student Performance (Monthly Avg)</h2>
          <div className="h-64 flex items-end justify-between gap-3">
            {[65, 82, 58, 90, 75].map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1 gap-2">
                <div className="w-full bg-gray-100 rounded-t-lg h-full flex items-end">
                  <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg" style={{ height: `${value}%` }}></div>
                </div>
                <span className="text-xs font-medium text-gray-600">M{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Departmental Credits Distribution</h2>
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{dept.department}</span>
                  <span className="text-sm font-bold text-gray-900">{dept.credits.toLocaleString()} credits</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${dept.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Department-wise Analysis</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="th-style">Department</th>
                <th className="th-style">Credits Assigned</th>
                <th className="th-style">Avg Rating</th>
                <th className="th-style">Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {departmentData.map((dept, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 font-medium text-gray-900">{dept.department}</td>
                  <td className="px-6 py-4 text-gray-600">{dept.credits.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{dept.rating}/5.0</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full h-2 bg-gray-100 rounded-full max-w-[120px]">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${dept.percentage}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-600">{dept.percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Overall Summary</h2>
          <div className="flex gap-2">
            <button onClick={() => alert('Downloading PDF Report...')} className="btn-secondary"><Download className="w-4 h-4" /> PDF</button>
            <button onClick={() => alert('Downloading Excel Report...')} className="btn-secondary"><Download className="w-4 h-4" /> Excel</button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t">
          <div className="text-center"><div className="text-3xl font-bold text-blue-600">{summaryStats.avgRating}</div><div className="text-sm text-gray-500 mt-1">Avg Rating</div></div>
          <div className="text-center"><div className="text-3xl font-bold text-green-600">{summaryStats.totalCredits.toLocaleString()}</div><div className="text-sm text-gray-500 mt-1">Credits Assigned</div></div>
          <div className="text-center"><div className="text-3xl font-bold text-yellow-600">{summaryStats.completionRate}%</div><div className="text-sm text-gray-500 mt-1">Completion Rate</div></div>
          <div className="text-center"><div className="text-3xl font-bold text-purple-600">{summaryStats.activeStudents}</div><div className="text-sm text-gray-500 mt-1">Active Students</div></div>
        </div>
      </div>
      <style>{`
        .th-style { padding: 0.75rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 600; color: #4b5563; text-transform: uppercase; }
        .btn-secondary { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 0.75rem; transition: background-color 0.2s; }
        .btn-secondary:hover { background-color: #f9fafb; }
      `}</style>
    </div>
  );
};

export default ReportsAnalytics;