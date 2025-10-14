import { useParams, Link } from 'react-router-dom';
import { students } from '../data/studentData'; // We'll look up the data here for now
import { ArrowLeft, Mail, Phone, BookOpen, Briefcase } from 'lucide-react';

const StudentProfile = () => {
  const { studentId } = useParams(); // Get the roll number from the URL
  
  // Find the student by their roll number
  const student = students.find(s => s.rollNo === studentId);

  if (!student) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Student Not Found</h1>
        <Link to="/students" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Back to Student Management
        </Link>
      </div>
    );
  }
  
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="space-y-6">
      <Link to="/students" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-4 font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Student Management
      </Link>
      
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-3xl font-bold text-gray-500">
            {student.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
            <p className="text-lg text-gray-600">{student.rollNo}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span><Mail className="w-4 h-4 inline mr-1" /> student@example.com</span>
              <span><Phone className="w-4 h-4 inline mr-1" /> +91 98765 43210</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase">College & Domain</h3>
            <p className="text-lg text-gray-800"><BookOpen className="w-5 h-5 inline mr-2" />{student.college} - {student.domain}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Current Internship</h3>
            <p className="text-lg text-gray-800"><Briefcase className="w-5 h-5 inline mr-2" />{student.internship}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Internship Progress</h3>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div
                  className={`h-full ${getProgressColor(student.progress)} rounded-full`}
                  style={{ width: `${student.progress}%` }}
                ></div>
              </div>
              <span className="font-bold text-lg text-gray-800">{student.progress}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;