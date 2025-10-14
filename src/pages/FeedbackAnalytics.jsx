import { useState, useMemo } from 'react'; // <-- Import useState and useMemo
import { Download, TrendingUp, Star } from 'lucide-react';
// Import initial data with aliases
import { 
  companyFeedback as initialCompanyFeedback, 
  skillRatings as initialSkillRatings, 
  studentPerformance as initialStudentPerformance 
} from '../data/feedbackData';

const FeedbackAnalytics = () => {
  // --- STATE MANAGEMENT ---
  // Manage all data arrays in state so they can be updated later
  const [companyFeedback, setCompanyFeedback] = useState(initialCompanyFeedback);
  const [skillRatings, setSkillRatings] = useState(initialSkillRatings);
  const [studentPerformance, setStudentPerformance] = useState(initialStudentPerformance);

  // --- DYNAMIC SUMMARY CALCULATIONS ---
  // useMemo ensures these calculations only run when the underlying data changes
  const summaryStats = useMemo(() => {
    // Calculate average rating from all companies
    const avgRating = companyFeedback.length > 0
      ? (companyFeedback.reduce((acc, curr) => acc + curr.rating, 0) / companyFeedback.length).toFixed(1)
      : 0;

    // Calculate average student score as "Satisfaction"
    const satisfaction = studentPerformance.length > 0
      ? Math.round(studentPerformance.reduce((acc, curr) => acc + curr.score, 0) / studentPerformance.length)
      : 0;
      
    // Calculate total feedback submissions
    const totalFeedback = companyFeedback.reduce((acc, curr) => acc + curr.feedback, 0);

    return {
      avgRating,
      satisfaction,
      totalFeedback,
      totalFirms: companyFeedback.length,
    };
  }, [companyFeedback, studentPerformance]); // Dependencies for recalculation

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Feedback Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Industry Collaboration & Student Performance Insights</p>
        </div>
        <button 
          onClick={() => alert('Generating and downloading PDF report...')}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* --- DYNAMIC COMPANY FEEDBACK CARD --- */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Feedback by Company</h2>
              <p className="text-sm text-gray-500">Total {summaryStats.totalFirms} firms</p>
            </div>
          </div>
          <div className="space-y-4">
            {companyFeedback.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{item.company}</span>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">{item.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(item.feedback / 200) * 100}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-500 min-w-[3ch]">{item.feedback}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Ratings (this was already dynamic based on the imported array) */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Skill Ratings</h2>
          <div className="space-y-4">
            {skillRatings.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                  <span className="text-sm font-bold text-gray-900">{item.rating}/{item.maxRating}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" style={{ width: `${(item.rating / item.maxRating) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Top-performing Students</h2>
            <p className="text-sm text-gray-500">Based on overall scores</p>
          </div>
          <button 
            onClick={() => alert('Navigating to all student performance reports...')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm"
          >
            <TrendingUp className="w-4 h-4" />
            View All
          </button>
        </div>
        <div className="space-y-3">
          {studentPerformance.map((student, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{student.name}</div>
                  <div className="text-sm text-gray-500">{student.domain}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{student.score}%</div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">{student.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- DYNAMIC OVERALL SUMMARY --- */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Overall Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{summaryStats.avgRating}</div>
            <div className="text-sm text-gray-500 mt-1">Avg Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{summaryStats.satisfaction}%</div>
            <div className="text-sm text-gray-500 mt-1">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">1,200</div>
            <div className="text-sm text-gray-500 mt-1">Credits Assigned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{summaryStats.totalFeedback}</div>
            <div className="text-sm text-gray-500 mt-1">Total Feedback</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackAnalytics;