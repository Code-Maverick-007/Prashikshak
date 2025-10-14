import { useParams, Link } from 'react-router-dom';
import { internships } from '../data/internshipData'; // We'll look up the data here for now
import { ArrowLeft, Building, Users, Calendar, CheckCircle } from 'lucide-react';

// A simple helper to convert a name into a URL-friendly slug
const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const InternshipDetails = () => {
  const { internshipId } = useParams(); // Get the ID from the URL (e.g., 'software-engineering-internship')
  
  // Find the internship that matches the slug in the URL
  const internship = internships.find(i => slugify(i.name) === internshipId);

  if (!internship) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Internship Not Found</h1>
        <Link to="/internships" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Back to all internships
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/internships" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Internship Management
      </Link>
      
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">{internship.name}</h1>
        <p className="text-lg text-gray-500 mt-1">at {internship.company}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 border-t pt-6">
          <div className="flex items-center gap-3">
            <Building className="w-6 h-6 text-gray-500"/>
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium text-gray-800">{internship.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-gray-500"/>
            <div>
              <p className="text-sm text-gray-500">Applicants / Vacancies</p>
              <p className="font-medium text-gray-800">{internship.applicants} / {internship.vacancies}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-gray-500"/>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium text-gray-800">{internship.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-gray-500"/>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-gray-800">{internship.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;