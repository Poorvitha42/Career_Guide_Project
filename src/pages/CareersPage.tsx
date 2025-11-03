import React, { useState } from 'react';
import { Search, Filter, TrendingUp, DollarSign, Clock, MapPin } from 'lucide-react';

const careerData = [
  {
    id: 1,
    title: 'Artificial Intelligence Engineer',
    category: 'Technology',
    description: 'Develop and implement AI solutions to solve complex problems across industries.',
    salary: '$95,000 - $180,000',
    growth: 'Very High (40%+)',
    skills: ['Machine Learning', 'Python', 'Deep Learning', 'TensorFlow'],
    trending: true
  },
  {
    id: 2,
    title: 'Sustainability Consultant',
    category: 'Environmental',
    description: 'Help organizations reduce their environmental impact and implement sustainable practices.',
    salary: '$65,000 - $110,000',
    growth: 'High (28%)',
    skills: ['Environmental Science', 'Data Analysis', 'Project Management', 'Policy Development'],
    trending: true
  },
  {
    id: 3,
    title: 'Digital Marketing Specialist',
    category: 'Marketing',
    description: 'Create and execute digital marketing campaigns across various online platforms.',
    salary: '$45,000 - $85,000',
    growth: 'High (22%)',
    skills: ['SEO', 'Social Media', 'Analytics', 'Content Creation'],
    trending: false
  },
  {
    id: 4,
    title: 'Cybersecurity Analyst',
    category: 'Technology',
    description: 'Protect organizations from cyber threats by monitoring and analyzing security risks.',
    salary: '$70,000 - $130,000',
    growth: 'Very High (35%)',
    skills: ['Network Security', 'Risk Assessment', 'Incident Response', 'Ethical Hacking'],
    trending: true
  },
  {
    id: 5,
    title: 'Data Scientist',
    category: 'Technology',
    description: 'Extract insights from complex data to drive business decisions and strategy.',
    salary: '$80,000 - $140,000',
    growth: 'Very High (31%)',
    skills: ['Statistics', 'Python/R', 'Machine Learning', 'Data Visualization'],
    trending: true
  },
  {
    id: 6,
    title: 'UX/UI Designer',
    category: 'Design',
    description: 'Design intuitive and engaging user experiences for digital products and services.',
    salary: '$60,000 - $115,000',
    growth: 'High (24%)',
    skills: ['User Research', 'Prototyping', 'Figma', 'Design Systems'],
    trending: false
  }
];

const categories = ['All', 'Technology', 'Design', 'Marketing', 'Environmental', 'Healthcare', 'Finance'];

export function CareersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);

  const filteredCareers = careerData.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
    const matchesTrending = !showTrendingOnly || career.trending;
    
    return matchesSearch && matchesCategory && matchesTrending;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Career Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exciting career paths including emerging fields in AI, sustainability,
            and digital innovation. Find your perfect career match today.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Careers
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showTrendingOnly}
                  onChange={(e) => setShowTrendingOnly(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Trending Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCareers.length} career{filteredCareers.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Career Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map(career => (
            <div
              key={career.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{career.title}</h3>
                      {career.trending && (
                        <TrendingUp className="w-5 h-5 text-orange-500 ml-2" />
                      )}
                    </div>
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {career.category}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {career.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                    <span className="font-medium">{career.salary}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="font-medium">Growth: {career.growth}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-sm">
                    Learn More
                  </button>
                  <button className="bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCareers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No careers found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters to find more opportunities.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Career?
          </h2>
          <p className="text-xl mb-6 text-blue-100">
            Take our comprehensive assessment to get personalized career recommendations.
          </p>
          <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
}