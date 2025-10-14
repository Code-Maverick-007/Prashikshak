import { useParams, Link } from 'react-router-dom';
import { companies } from '../data/mouData'; // Data for the company info
import { detailedMoUs } from '../data/detailedMouData'; // Data for the MoU list
import { ArrowLeft, FileText, Download, Calendar, CheckCircle } from 'lucide-react';

// A helper to convert a name into a URL-friendly slug
const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w.-]+/g, '');

const CompanyMoUDetails = () => {
  const { companyId } = useParams(); // Get the slug from the URL
  
  // Find the company and its MoUs
  const company = companies.find(c => slugify(c.name) === companyId);
  const moUs = detailedMoUs[companyId] || [];

  if (!company) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Company Not Found</h1>
        <Link to="/mou" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Back to Collaborations
        </Link>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Expiring': return 'bg-yellow-100 text-yellow-700';
      case 'Pending': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <Link to="/mou" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-4 font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Collaborations
      </Link>
      
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
        <p className="text-lg text-gray-500 mt-1">{company.type}</p>
        
        <div className="flex items-center gap-4 mt-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(company.status)}`}>
              {company.status}
            </span>
            <span className="text-sm text-gray-600">Rating: {company.rating}/5.0</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">MoU Documents ({moUs.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Document Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Upload Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {moUs.map(mou => (
                <tr key={mou.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{mou.documentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{mou.uploadDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(mou.status)}`}>
                      {mou.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href={mou.fileUrl} download className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyMoUDetails;