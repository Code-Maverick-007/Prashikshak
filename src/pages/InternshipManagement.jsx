import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import for navigation
import { Plus, Clock, Users, TrendingUp } from 'lucide-react';
import { internships as initialInternships } from '../data/internshipData';
import AddInternshipModal from '../components/AddInternshipModal'; // <-- Import the modal

// A simple helper to convert a name into a URL-friendly slug
const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const InternshipManagement = () => {
  const navigate = useNavigate(); // <-- Hook for navigation

  // --- STATE MANAGEMENT ---
  const [internships, setInternships] = useState(initialInternships);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- DYNAMIC SUMMARY CARDS ---
  const summaryStats = useMemo(() => {
    const totalInternships = internships.length;
    const totalApplicants = internships.reduce((sum, i) => sum + i.applicants, 0);
    const pendingReview = internships.filter(i => i.status === 'Pending').length;
    return { totalInternships, totalApplicants, pendingReview };
  }, [internships]);

  // --- HANDLER FUNCTIONS ---
  const handleAddInternship = (newInternship) => {
    setInternships(prev => [newInternship, ...prev]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-50 text-green-700 border-green-200';
      case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Inactive': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Internship Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage internship opportunities and applications</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add Internship
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <TrendingUp className="w-5 h-5 text-blue-600 mb-4" />
          <div className="text-2xl font-bold text-gray-900">{summaryStats.totalInternships}</div>
          <div className="text-sm text-gray-500 mt-1">Total Internships</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <Users className="w-5 h-5 text-green-600 mb-4" />
          <div className="text-2xl font-bold text-gray-900">{summaryStats.totalApplicants.toLocaleString()}</div>
          <div className="text-sm text-gray-500 mt-1">Total Applicants</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <Clock className="w-5 h-5 text-yellow-600 mb-4" />
          <div className="text-2xl font-bold text-gray-900">{summaryStats.pendingReview}</div>
          <div className="text-sm text-gray-500 mt-1">Pending Review</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {internships.map((internship) => (
          <div key={internship.name} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{internship.name}</h3>
                <p className="text-sm text-gray-500">{internship.company}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(internship.status)}`}>{internship.status}</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Category</span><span className="text-sm font-medium text-gray-900">{internship.category}</span></div>
              <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Duration</span><span className="text-sm font-medium text-gray-900">{internship.duration}</span></div>
              <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Vacancies</span><span className="text-sm font-medium text-gray-900">{internship.vacancies}</span></div>
              <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Applicants</span><span className="text-sm font-medium text-blue-600">{internship.applicants}</span></div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <button onClick={() => navigate(`/internships/${slugify(internship.name)}`)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">View Details</button>
                <button onClick={() => alert(`Managing ${internship.name}`)} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium">Manage</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <AddInternshipModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddInternship}
      />
    </div>
  );
};

export default InternshipManagement;