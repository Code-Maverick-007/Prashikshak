import { useState, useMemo } from 'react';
import { Plus, Search, Filter, MoreVertical } from 'lucide-react';
import { colleges as initialColleges } from '../data/collegeData'; // Import initial data
import AddCollegeModal from '../components/AddCollegeModal'; // <-- Import the new modal component

const CollegeManagement = () => {
  // --- STATE MANAGEMENT ---
  const [colleges, setColleges] = useState(initialColleges); // <-- NEW: Manage college list in state
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- NEW: State for modal visibility
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');

  const allRegions = ['All', ...new Set(colleges.map(c => c.location))];
  const allStatuses = ['All', 'Active', 'Pending', 'Suspended'];

  const filteredColleges = useMemo(() => {
    // Now filter the 'colleges' state array, not the static import
    return colleges.filter(college => {
      const searchMatch = (
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const statusMatch = statusFilter === 'All' || college.status === statusFilter;
      const regionMatch = regionFilter === 'All' || college.location === regionFilter;
      return searchMatch && statusMatch && regionMatch;
    });
  }, [searchQuery, statusFilter, regionFilter, colleges]); // <-- Add 'colleges' to dependency array

  // --- HANDLER FUNCTIONS ---
  // <-- NEW: Function to add a new college to the state
  const handleAddCollege = (newCollege) => {
    setColleges(prevColleges => [newCollege, ...prevColleges]); // Add to the beginning of the list
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Suspended': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">College Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor college partnerships</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} // <-- NEW: Open the modal
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New College
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors bg-white appearance-none"
              >
                {allRegions.map(region => <option key={region} value={region}>{region === 'All' ? 'All Regions' : region}</option>)}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors bg-white appearance-none"
              >
                {allStatuses.map(status => <option key={status} value={status}>{status === 'All' ? 'All Statuses' : status}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">College Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Coordinator</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredColleges.length > 0 ? (
                filteredColleges.map((college) => (
                  <tr key={college.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap"><div className="font-medium text-gray-900">{college.name}</div></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{college.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{college.coordinator}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(college.status)}`}>{college.status}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => alert(`Actions for ${college.name}`)} className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center py-10 text-gray-500">No colleges found matching your criteria.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* --- RENDER THE MODAL --- */}
      {/* <-- NEW: Add the modal component here --> */}
      <AddCollegeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCollege}
      />
    </div>
  );
};

export default CollegeManagement;