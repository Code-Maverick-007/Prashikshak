import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download } from 'lucide-react';
import { students as allStudents } from '../data/studentData';

const ITEMS_PER_PAGE = 10; // How many students to show per page

const StudentManagement = () => {
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  const [students, setStudents] = useState(allStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('All');
  const [domainFilter, setDomainFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // --- DERIVED DATA & FILTERING ---
  const allColleges = ['All', ...new Set(students.map(s => s.college))];
  const allDomains = ['All', ...new Set(students.map(s => s.domain))];

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const searchMatch = (
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.domain.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const collegeMatch = collegeFilter === 'All' || student.college === collegeFilter;
      const domainMatch = domainFilter === 'All' || student.domain === domainFilter;
      return searchMatch && collegeMatch && domainMatch;
    });
  }, [students, searchQuery, collegeFilter, domainFilter]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredStudents, currentPage]);

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-sm text-gray-500 mt-1">Track student progress and internship status</p>
        </div>
        <button onClick={() => alert('Exporting student data as CSV...')} className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, college, domain..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select value={collegeFilter} onChange={(e) => { setCollegeFilter(e.target.value); setCurrentPage(1); }} className="input-style bg-white">
                {allColleges.map(c => <option key={c} value={c}>{c === 'All' ? 'All Colleges' : c}</option>)}
              </select>
              <select value={domainFilter} onChange={(e) => { setDomainFilter(e.target.value); setCurrentPage(1); }} className="input-style bg-white">
                {allDomains.map(d => <option key={d} value={d}>{d === 'All' ? 'All Domains' : d}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="th-style">Student</th>
                <th className="th-style">College</th>
                <th className="th-style">Domain</th>
                <th className="th-style">Internship</th>
                <th className="th-style">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedStudents.map((student) => (
                <tr key={student.rollNo} onClick={() => navigate(`/students/${student.rollNo}`)} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.rollNo}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.college}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.domain}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.internship}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-full h-2 bg-gray-100 rounded-full max-w-[120px]">
                        <div className={`h-full ${getProgressColor(student.progress)} rounded-full`} style={{ width: `${student.progress}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{student.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredStudents.length)}</span> to <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredStudents.length)}</span> of <span className="font-medium">{filteredStudents.length}</span> students
          </div>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="pagination-btn">Previous</button>
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="pagination-btn">Next</button>
          </div>
        </div>
      </div>
       <style>{`
        .input-style { appearance: none; padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 0.75rem; }
        .th-style { padding: 0.75rem 1.5rem; text-align: left; font-size: 0.75rem; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.05em; }
        .pagination-btn { padding: 0.25rem 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; font-size: 0.875rem; transition: background-color 0.2s; }
        .pagination-btn:hover:not(:disabled) { background-color: #f9fafb; }
        .pagination-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

export default StudentManagement;