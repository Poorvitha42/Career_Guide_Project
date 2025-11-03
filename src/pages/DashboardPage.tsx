import React from 'react';
import { useAssessment } from '../context/AssessmentContext';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  BookmarkIcon, 
  TrendingUp, 
  Target, 
  Award,
  Clock,
  BarChart3,
  Heart
} from 'lucide-react';

export function DashboardPage() {
  const { results, savedCareers } = useAssessment();
  const { user } = useAuth();

  const progressData = [
    { skill: 'Programming', current: 75, target: 90 },
    { skill: 'Communication', current: 85, target: 95 },
    { skill: 'Leadership', current: 60, target: 80 },
    { skill: 'Analytics', current: 70, target: 85 }
  ];

  if (!user) return null;
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Track your career journey and explore new opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Assessment Summary */}
            {results && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Your Assessment Results
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Personality</h3>
                    <p className="text-blue-600 font-medium">{results.personality}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Top Interests</h3>
                    <p className="text-green-600 font-medium text-sm">
                      {results.interests.join(', ')}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Key Skills</h3>
                    <p className="text-purple-600 font-medium text-sm">
                      {results.skills.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Assessment completed on</span>
                    <span className="text-sm font-medium text-gray-800">
                      {new Date(userData.assessmentDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Skill Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Skill Development Progress
              </h2>
              
              <div className="space-y-6">
                {progressData.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-800">{skill.skill}</span>
                      <span className="text-sm text-gray-600">
                        {skill.current}% / {skill.target}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(skill.current / skill.target) * 100}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Target: {skill.target}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Career Matches */}
            {results && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Your Top Career Matches
                </h2>
                
                <div className="space-y-4">
                  {results.careerMatches.slice(0, 3).map((career, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{career.title}</h3>
                        <p className="text-sm text-gray-600">{career.match}% match</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-800">{career.salary}</p>
                        <p className="text-xs text-green-600">{career.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-bold text-gray-800">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Assessment Status</span>
                  <span className="text-sm font-medium text-green-600">
                    {results ? 'Complete' : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Account Type</span>
                  <span className="text-sm font-medium text-gray-800">
                    {user.role === 'admin' ? 'Administrator' : 'Student'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium text-gray-800">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Saved Careers */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <BookmarkIcon className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-bold text-gray-800">Saved Careers</h3>
              </div>
              
              {savedCareers.length > 0 ? (
                <div className="space-y-3">
                  {savedCareers.slice(0, 5).map((career, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-800">{career.title}</h4>
                        <p className="text-xs text-gray-600">{career.match}% match</p>
                      </div>
                    </div>
                  ))}
                  {savedCareers.length > 5 && (
                    <p className="text-xs text-gray-500 text-center mt-2">
                      +{savedCareers.length - 5} more saved careers
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">
                  No saved careers yet. Complete your assessment to start saving career recommendations.
                </p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Quick Stats</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Career Matches</p>
                    <p className="text-xs text-gray-600">
                      {results ? results.careerMatches.length : 0} found
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <BarChart3 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Skills Tracked</p>
                    <p className="text-xs text-gray-600">{progressData.length} active</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Last Activity</p>
                    <p className="text-xs text-gray-600">Today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}