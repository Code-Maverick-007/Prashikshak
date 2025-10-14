import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Inbox, CheckCircle, Clock } from 'lucide-react';
import { initialSupportTickets } from '../data/supportTicketData';

const HelpSupport = () => {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState(initialSupportTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const summaryStats = useMemo(() => ({
    open: tickets.filter(t => t.status === 'Open').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    closed: tickets.filter(t => t.status === 'Closed').length,
  }), [tickets]);

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const statusMatch = statusFilter === 'All' || ticket.status === statusFilter;
      const searchMatch = searchQuery === '' || 
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.email.toLowerCase().includes(searchQuery.toLowerCase()); // Added email search
      return statusMatch && searchMatch;
    });
  }, [tickets, searchQuery, statusFilter]);

  const getStatusColor = (status) => {
    if (status === 'Open') return 'bg-red-100 text-red-700';
    if (status === 'In Progress') return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  return (
    <div className="space-y-6 p-6"> {/* Added default padding to the container */}
      <div className="mb-8"> {/* Increased bottom margin for header */}
        <h1 className="text-3xl font-extrabold text-gray-900">Support Inbox</h1> {/* Larger, bolder title */}
        <p className="text-base text-gray-500 mt-2">Manage and respond to user queries efficiently</p> {/* Refined description */}
      </div>

      {/* --- REFINED SUMMARY CARDS --- */}
     {/* --- NEW & IMPROVED SUMMARY CARDS --- */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  {/* Open Tickets Card */}
  <div className="flex items-center p-5 rounded-xl bg-red-100 border border-red-200">
    <Inbox className="w-7 h-7 text-red-600 mr-5 flex-shrink-0" />
    <div>
      <div className="text-3xl font-bold text-gray-900">{summaryStats.open}</div>
      <div className="text-sm text-gray-600 mt-1">Open Tickets</div>
    </div>
  </div>
  {/* In Progress Tickets Card */}
  <div className="flex items-center p-5 rounded-xl bg-yellow-100 border border-yellow-200">
    <Clock className="w-7 h-7 text-yellow-600 mr-5 flex-shrink-0" />
    <div>
      <div className="text-3xl font-bold text-gray-900">{summaryStats.inProgress}</div>
      <div className="text-sm text-gray-600 mt-1">In Progress</div>
    </div>
  </div>
  {/* Closed Tickets Card */}
  <div className="flex items-center p-5 rounded-xl bg-green-100 border border-green-200">
    <CheckCircle className="w-7 h-7 text-green-600 mr-5 flex-shrink-0" />
    <div>
      <div className="text-3xl font-bold text-gray-900">{summaryStats.closed}</div>
      <div className="text-sm text-gray-600 mt-1">Closed Tickets</div>
    </div>
  </div>
</div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200"> {/* Added subtle shadow */}
        <div className="p-4 border-b border-gray-100"> {/* Lighter border */}
          <div className="flex flex-col md:flex-row gap-3 items-center"> {/* Aligned items */}
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by subject, user, or email..." 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" // Increased padding, better focus ring
              />
            </div>
            {/* Status Filter */}
            <select 
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value)} 
              className="px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" // Increased padding
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200"> {/* Ensure table takes min-width */}
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th> {/* Bolder headers */}
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Updated</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100"> {/* Lighter divider */}
              {filteredTickets.length > 0 ? (
                filteredTickets.map(ticket => (
                  <tr 
                    key={ticket.id} 
                    onClick={() => navigate(`/help/${ticket.id}`)} 
                    className="hover:bg-blue-50 cursor-pointer transition-colors duration-150 ease-in-out" // Hover effect
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
                      <div className="text-xs text-gray-500">{ticket.email}</div> {/* Show email here */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ticket.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}> {/* Slightly more padding */}
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(ticket.timestamp).toLocaleString()}</td> {/* Format date better */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-gray-500 text-sm">
                    No support tickets found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Inline styles for consistency and specific elements */}
      <style>{`
        .summary-card {
          @apply flex items-center p-5 bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md;
        }
        .summary-card .icon-wrapper {
          @apply w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0; /* Larger, rounded background for icon */
        }
        .th-style { 
          @apply px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider; 
        }
        /* Specific Tailwind JIT colors */
        .bg-red-100 { background-color: rgb(254 226 226); } .text-red-700 { color: rgb(185 28 28); }
        .bg-yellow-100 { background-color: rgb(254 249 195); } .text-yellow-700 { color: rgb(161 98 7); }
        .bg-green-100 { background-color: rgb(209 250 229); } .text-green-700 { color: rgb(4 120 87); }
        .hover\:bg-blue-50:hover { background-color: rgb(239 246 255); }
      `}</style>
    </div>
  );
};

export default HelpSupport;