import { useParams, Link } from 'react-router-dom';
import { initialSupportTickets } from '../data/supportTicketData';
import { ArrowLeft, User, Mail, Send } from 'lucide-react';

const QueryDetails = () => {
  const { ticketId } = useParams();
  const ticket = initialSupportTickets.find(t => t.id == ticketId);

  if (!ticket) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Support Ticket Not Found</h1>
        <Link to="/help" className="text-blue-600 hover:underline mt-4 inline-block">&larr; Back to Support Inbox</Link>
      </div>
    );
  }
  
  const getStatusColor = (status) => {
    if (status === 'Open') return 'bg-red-100 text-red-700';
    if (status === 'In Progress') return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link to="/help" className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Support Inbox
      </Link>
      
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{ticket.subject}</h1>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">{new Date(ticket.timestamp).toLocaleString()}</p>
        </div>

        <div className="p-6 border-b">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">User Details</h2>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-gray-700"><User className="w-4 h-4 text-gray-500"/> {ticket.user}</span>
            <span className="flex items-center gap-2 text-gray-700"><Mail className="w-4 h-4 text-gray-500"/> {ticket.email}</span>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Query</h2>
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{ticket.query}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Respond to Query</h2>
        <textarea placeholder={`Replying to ${ticket.user}...`} rows="5" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        <div className="flex items-center justify-between mt-4">
          <div>
            <label className="text-sm font-medium mr-2">Set Status:</label>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg bg-white">
              <option>In Progress</option>
              <option>Closed</option>
              <option>Open</option>
            </select>
          </div>
          <button onClick={() => alert('Response sent and status updated!')} className="btn-primary flex items-center gap-2"><Send className="w-4 h-4"/> Send Reply</button>
        </div>
      </div>
    </div>
  );
};

export default QueryDetails;