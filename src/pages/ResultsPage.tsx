import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { Star, TrendingUp, MapPin, DollarSign, BookOpen, Heart } from 'lucide-react';

export function ResultsPage() {
  const navigate = useNavigate();
  const { answers, results, setResults, savedCareers, setSavedCareers } = useAssessment();

  useEffect(() => {
    if (!answers || Object.keys(answers).length === 0) {
      navigate('/assessment');
      return;
    }

    // Generate results based on answers
    const mockResults = {
      personality: 'Analytical Leader',
      interests: ['Technology', 'Problem Solving', 'Innovation'],
      skills: ['Programming', 'Analytics', 'Communication'],
      careerMatches: [
        {
          title: 'Data Scientist',
          match: 92,
          description: 'Analyze complex data to derive insights and drive business decisions using statistical methods and machine learning.',
          requirements: ['Statistics', 'Python/R', 'Machine Learning', "Bachelor's in relevant field"],
          roadmap: [
            'Learn Python programming and SQL databases',
            'Study statistics and machine learning fundamentals',
            'Build portfolio with real-world data projects',
            'Apply for entry-level data analyst positions',
            'Pursue advanced certifications (AWS, Google Cloud)'
          ],
          salary: '$75,000 - $120,000',
          growth: 'High (22% growth expected)'
        },
        {
          title: 'UX/UI Designer',
          match: 87,
          description: 'Design user-centered digital experiences that are both beautiful and functional, improving user satisfaction.',
          requirements: ['Design thinking', 'Prototyping tools', 'User research', 'Strong portfolio'],
          roadmap: [
            'Learn design fundamentals and color theory',
            'Master design tools (Figma, Adobe Creative Suite)',
            'Conduct user research and usability testing',
            'Build a comprehensive design portfolio',
            'Apply for junior UX/UI designer positions'
          ],
          salary: '$65,000 - $110,000',
          growth: 'Very High (13% growth expected)'
        },
        {
          title: 'AI/ML Engineer',
          match: 85,
          description: 'Develop and implement artificial intelligence solutions to solve complex business problems.',
          requirements: ['Machine Learning', 'Deep Learning', 'Python', 'Mathematics', "Master's preferred"],
          roadmap: [
            'Master Python and machine learning libraries',
            'Study deep learning and neural networks',
            'Build AI projects and contribute to open source',
            'Gain experience with cloud AI platforms',
            'Apply for ML engineer roles at tech companies'
          ],
          salary: '$90,000 - $160,000',
          growth: 'Extremely High (40+ % growth expected)'
        }
      ]
    };

    setResults(mockResults);
  }, [answers, navigate, setResults]);

  const handleSaveCareer = (career: any) => {
    if (!savedCareers.find(c => c.title === career.title)) {
      setSavedCareers([...savedCareers, career]);
    }
  };

  const handleRetakeAssessment = () => {
    navigate('/assessment');
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your personalized results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Career Assessment Results
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your responses, we've identified your personality traits, interests, and skills
            to recommend the best career paths for you.
          </p>
        </div>

        {/* Personality Insights */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 ml-3">Personality Type</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600 mb-2">{results.personality}</p>
            <p className="text-gray-600">
              You demonstrate strong analytical thinking combined with natural leadership abilities.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 ml-3">Key Interests</h3>
            </div>
            <div className="space-y-2">
              {results.interests.map((interest, index) => (
                <span
                  key={index}
                  className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 ml-3">Top Skills</h3>
            </div>
            <div className="space-y-2">
              {results.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Career Matches */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Your Perfect Career Matches
          </h2>
          
          <div className="space-y-6">
            {results.careerMatches.map((career, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-2xl font-bold text-gray-800 mr-3">
                          {career.title}
                        </h3>
                        <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                          <span className="text-sm font-semibold">{career.match}% Match</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                        {career.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    {/* Requirements */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                        Key Requirements
                      </h4>
                      <ul className="space-y-2">
                        {career.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-center text-gray-600">
                            <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Salary & Growth */}
                    <div>
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                          <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                          Salary Range
                        </h4>
                        <p className="text-gray-600 font-medium">{career.salary}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                          Job Growth
                        </h4>
                        <p className="text-gray-600 font-medium">{career.growth}</p>
                      </div>
                    </div>
                  </div>

                  {/* Career Roadmap */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                      Career Roadmap
                    </h4>
                    <div className="space-y-3">
                      {career.roadmap.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-orange-600 font-semibold text-sm">
                              {stepIndex + 1}
                            </span>
                          </div>
                          <p className="text-gray-600 pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleSaveCareer(career)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Save to Dashboard
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <button
            onClick={handleRetakeAssessment}
            className="bg-white text-gray-700 font-semibold py-3 px-8 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors mr-4"
          >
            Retake Assessment
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            View Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}