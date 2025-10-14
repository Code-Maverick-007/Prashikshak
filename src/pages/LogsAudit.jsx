import { useState, useMemo } from 'react';
import { Filter, Download, User, FileEdit, LogIn, Shield, Search } from 'lucide-react';
import { logs as allLogs } from '../data/auditLogData';

const ITEMS_PER_PAGE = 5;

const LogsAudit = () => {
  const [logs, setLogs] = useState(allLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionTypeFilter, setActionTypeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const summaryStats = useMemo(() => ({
    loginEvents: logs.filter(log => log.type === 'auth').length,
    dataUpdates: logs.filter(log => log.type === 'update').length,
    submissions: logs.filter(log => log.type === 'submission').length,
    uploads: logs.filter(log => log.type === 'upload').length,
  }), [logs]);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const searchMatch = searchQuery === '' || 
        log.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
        log.details.toLowerCase().includes(searchQuery.toLowerCase());
      const actionMatch = actionTypeFilter === 'All' || log.type === actionTypeFilter;
      const dateMatch = dateFilter === '' || log.timestamp.startsWith(dateFilter);
      return searchMatch && actionMatch && dateMatch;
    });
  }, [logs, searchQuery, actionTypeFilter, dateFilter]);

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredLogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredLogs, currentPage]);

  const allActionTypes = ['All', 'auth', 'update', 'submission', 'upload'];
  
  const getActionIcon = (type) => {
    switch (type) {
      case 'auth': return <LogIn className="w-5 h-5 text-blue-600" />;
      case 'update': return <FileEdit className="w-5 h-5 text-green-600" />;
      case 'submission': return <User className="w-5 h-5 text-purple-600" />;
      case 'upload': return <Shield className="w-5 h-5 text-yellow-600" />;
      default: return <User className="w-5 h-5 text-gray-600" />;
    }
  };
  
  const getActionColor = (type) => {
    switch (type) {
      case 'auth': return 'bg-blue-100';
      case 'update': return 'bg-green-100';
      case 'submission': return 'bg-purple-100';
      case 'upload': return 'bg-yellow-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Logs & Audit Trails</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor system activities and user actions</p>
        </div>
        <button onClick={() => alert('Exporting all logs...')} className="btn-secondary">
          <Download className="w-4 h-4" />
          Export Logs
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        {/* --- FIXED FILTER BAR --- */}
       <div className="p-4 border-b border-gray-200">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    
    {/* Search Input with correct padding and positioning */}
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      <input 
        type="text" 
        placeholder="Search by user or details..." 
        value={searchQuery} 
        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} 
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    
    {/* Date Input with a class for the placeholder style */}
    <input 
      type="date" 
      value={dateFilter} 
      onChange={(e) => { setDateFilter(e.target.value); setCurrentPage(1); }} 
      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 date-input"
    />
    
    {/* Action Type Select Dropdown */}
    <select 
      value={actionTypeFilter} 
      onChange={(e) => { setActionTypeFilter(e.target.value); setCurrentPage(1); }} 
      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    >
      {allActionTypes.map(type => 
        <option key={type} value={type}>
          {type === 'All' ? 'All Action Types' : type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      )}
    </select>
            
  </div>
</div>

        <div className="divide-y divide-gray-200">
          {paginatedLogs.length > 0 ? (
            paginatedLogs.map((log) => (
              <div key={`${log.timestamp}-${log.user}`} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getActionColor(log.type)}`}>{getActionIcon(log.type)}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">{log.action}</h3>
                    <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500 flex items-center gap-1"><User className="w-3 h-3" />{log.user}</span>
                      <span className="text-xs text-gray-500">{log.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">No logs found matching your criteria.</div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{paginatedLogs.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}</span> to <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredLogs.length)}</span> of <span className="font-medium">{filteredLogs.length}</span> logs
          </div>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="pagination-btn">Previous</button>
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="pagination-btn">Next</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card"><LogIn className="w-5 h-5 text-blue-600" /><div className="stat">{summaryStats.loginEvents}</div><div className="label">Login Events</div></div>
        <div className="card"><FileEdit className="w-5 h-5 text-green-600" /><div className="stat">{summaryStats.dataUpdates}</div><div className="label">Data Updates</div></div>
        <div className="card"><User className="w-5 h-5 text-purple-600" /><div className="stat">{summaryStats.submissions}</div><div className="label">Submissions</div></div>
        <div className="card"><Shield className="w-5 h-5 text-yellow-600" /><div className="stat">{summaryStats.uploads}</div><div className="label">Uploads</div></div>
      </div>
      
      <style>{`
        .input-style { appearance: none; padding: 0.75rem 1rem; border: 1px solid #e5e7eb; border-radius: 0.75rem; width: 100%; color: #111827; }
        .input-style:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #3b82f6; box-shadow: 0 0 0 2px #3b82f6; }
        .date-input { color: #9ca3af; }
        .date-input:focus, .date-input:valid { color: #111827; }
        .date-input::-webkit-calendar-picker-indicator { cursor: pointer; }
        .pagination-btn { padding: 0.25rem 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; font-size: 0.875rem; }
        .pagination-btn:hover:not(:disabled) { background-color: #f9fafb; }
        .pagination-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-secondary { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 0.75rem; }
        .card { background-color: white; border-radius: 0.75rem; padding: 1.5rem; border: 1px solid #e5e7eb; }
        .stat { font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 0.75rem; }
        .label { font-size: 0.875rem; color: #6b7280; }
        /* Include Tailwind JIT colors */
        .bg-blue-100 { --tw-bg-opacity: 1; background-color: rgb(219 234 254 / var(--tw-bg-opacity)); }
        .bg-green-100 { --tw-bg-opacity: 1; background-color: rgb(220 252 231 / var(--tw-bg-opacity)); }
        .bg-purple-100 { --tw-bg-opacity: 1; background-color: rgb(243 232 255 / var(--tw-bg-opacity)); }
        .bg-yellow-100 { --tw-bg-opacity: 1; background-color: rgb(254 249 195 / var(--tw-bg-opacity)); }
      `}</style>
    </div>
  );
};

export default LogsAudit;