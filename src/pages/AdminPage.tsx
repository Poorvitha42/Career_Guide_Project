import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Search
} from 'lucide-react';

interface Career {
  id: number;
  title: string;
  category: string;
  description: string;
  requirements: string[];
  trending: boolean;
}

interface AssessmentQuestion {
  id: string;
  section: string;
  question: string;
  type: string;
  options: string[];
}

export function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [careers, setCareers] = useState<Career[]>([
    {
      id: 1,
      title: 'AI Engineer',
      category: 'Technology',
      description: 'Develop AI solutions',
      requirements: ['Python', 'ML', 'Statistics'],
      trending: true
    },
    {
      id: 2,
      title: 'UX Designer',
      category: 'Design',
      description: 'Design user experiences',
      requirements: ['Figma', 'Research', 'Prototyping'],
      trending: false
    }
  ]);

  const [questions, setQuestions] = useState<AssessmentQuestion[]>([
    {
      id: 'p1',
      section: 'Personality',
      question: 'I prefer working in teams',
      type: 'scale',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    }
  ]);

  const [showCareerForm, setShowCareerForm] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);

  const stats = [
    { label: 'Total Users', value: '2,547', icon: Users, color: 'blue' },
    { label: 'Assessments Taken', value: '1,823', icon: BookOpen, color: 'green' },
    { label: 'Career Paths', value: '156', icon: BarChart3, color: 'purple' },
    { label: 'Success Rate', value: '94%', icon: Settings, color: 'orange' }
  ];

  const handleDeleteCareer = (id: number) => {
    setCareers(careers.filter(career => career.id !== id));
  };

  const handleEditCareer = (career: Career) => {
    setEditingCareer(career);
    setShowCareerForm(true);
  };

  const CareerForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6">
          {editingCareer ? 'Edit Career' : 'Add New Career'}
        </h3>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Career Title
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Data Scientist"
              defaultValue={editingCareer?.title || ''}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Technology</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Healthcare</option>
              <option>Finance</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the career..."
              defaultValue={editingCareer?.description || ''}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Requirements (comma-separated)
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Python, Statistics, Machine Learning"
              defaultValue={editingCareer?.requirements?.join(', ') || ''}
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="trending"
              className="rounded border-gray-300 text-blue-600"
              defaultChecked={editingCareer?.trending || false}
            />
            <label htmlFor="trending" className="ml-2 text-sm text-gray-700">
              Mark as trending career
            </label>
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingCareer ? 'Update Career' : 'Add Career'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowCareerForm(false);
                setEditingCareer(null);
              }}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage careers, assessments, and monitor platform performance.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'careers', label: 'Career Management' },
              { id: 'assessments', label: 'Assessments' },
              { id: 'users', label: 'Users' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: 'New user registered', user: 'Sarah Johnson', time: '2 minutes ago' },
                  { action: 'Assessment completed', user: 'Mike Chen', time: '15 minutes ago' },
                  { action: 'Career path updated', user: 'Admin', time: '1 hour ago' },
                  { action: 'User feedback received', user: 'Emma Davis', time: '2 hours ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-600">by {activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Careers Tab */}
        {activeTab === 'careers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Career Management</h2>
              <button
                onClick={() => setShowCareerForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Career
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search careers..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Career
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {careers.map(career => (
                      <tr key={career.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{career.title}</div>
                            <div className="text-sm text-gray-500">{career.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {career.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {career.trending ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Trending
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditCareer(career)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCareer(career.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Assessments Tab */}
        {activeTab === 'assessments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Assessment Questions</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-4">
                {questions.map(question => (
                  <div key={question.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-2">
                            {question.section}
                          </span>
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                            {question.type}
                          </span>
                        </div>
                        <p className="font-medium text-gray-800">{question.question}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Options: {question.options.join(', ')}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button className="text-blue-600 hover:text-blue-900 p-1">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">User Management</h3>
                <p className="text-gray-600">
                  User management features will be implemented here, including user profiles,
                  activity tracking, and account management.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Career Form Modal */}
      {showCareerForm && <CareerForm />}
    </div>
  );
}