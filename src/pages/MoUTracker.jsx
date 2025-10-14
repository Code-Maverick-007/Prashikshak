import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import for navigation
import { Plus, Building2, Calendar, CheckCircle, Clock, AlertCircle, Upload } from 'lucide-react';
import { companies as initialCompanies } from '../data/mouData';
import AddCompanyModal from '../components/AddCompanyModal';

// A helper to convert a name into a URL-friendly slug
const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w.-]+/g, '');

const MoUTracker = () => {
  const navigate = useNavigate(); // <-- Hook for navigation
  const [companies, setCompanies] = useState(initialCompanies);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const summaryStats = useMemo(() => {
    const activeMoUs = companies.filter(c => c.status === 'Active').length;
    const expiringSoon = companies.filter(c => c.status === 'Expiring').length;
    const partnerCompanies = companies.length;
    return { activeMoUs, expiringSoon, partnerCompanies };
  }, [companies]);

  const handleAddCompany = (newCompany) => {
    setCompanies(prevCompanies => [newCompany, ...prevCompanies]);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Expiring': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'Pending': return <AlertCircle className="w-5 h-5 text-blue-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-50 text-green-700 border-green-200';
      case 'Expiring': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Pending': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Industry Collaboration</h1>
          <p className="text-sm text-gray-500 mt-1">MoU Tracker & Partner Management</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => alert('Opening file upload dialog...')} className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Upload MoU</span>
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Company
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <CheckCircle className="w-5 h-5 text-green-600 mb-4" />
          <div className="text-2xl font-bold text-gray-900">{summaryStats.activeMoUs}</div>
          <div className="text-sm text-gray-500">Active MoUs</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <Clock className="w-5 h-5 text-yellow-600 mb-4" />
          <div className="text-2xl font-bold text-gray-900">{summaryStats.expiringSoon}</div>
          <div className="text-sm text-gray-500">Expiring Soon</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <Building2 className="w-5 h-5 text-blue-600 mb-4" />
          <div className="text-2xl font-bold text-gray-900">{summaryStats.partnerCompanies}</div>
          <div className="text-sm text-gray-500">Partner Companies</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {companies.map((company) => (
          <div key={company.name} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.type}</p>
                </div>
              </div>
              {getStatusIcon(company.status)}
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Status</span><span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(company.status)}`}>{company.status}</span></div>
              <div className="flex items-center justify-between"><span className="text-sm text-gray-600">MoU Count</span><span className="text-sm font-medium text-gray-900">{company.mous}</span></div>
              <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Rating</span><span className="text-sm font-medium text-gray-900">{company.rating}/5.0</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><Calendar className="w-4 h-4" /><span>{company.startDate} to {company.endDate}</span></div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate(`/mou/${slugify(company.name)}`)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  View MoUs
                </button>
                <button 
                  onClick={() => alert(`Setting reminder for ${company.name}`)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Set Reminder
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <AddCompanyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCompany}
      />
    </div>
  );
};

export default MoUTracker;