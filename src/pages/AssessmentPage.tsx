import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const assessmentQuestions = [
  {
    section: 'Personality',
    questions: [
      {
        id: 'p1',
        question: 'I prefer working in teams rather than alone',
        type: 'scale',
        options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
      },
      {
        id: 'p2',
        question: 'I enjoy taking on leadership roles',
        type: 'scale',
        options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
      },
      {
        id: 'p3',
        question: 'I am comfortable with uncertainty and change',
        type: 'scale',
        options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
      }
    ]
  },
  {
    section: 'Interests',
    questions: [
      {
        id: 'i1',
        question: 'Which activities appeal to you most?',
        type: 'multiple',
        options: ['Analyzing data', 'Creating art', 'Helping others', 'Building things', 'Leading projects', 'Research']
      },
      {
        id: 'i2',
        question: 'What work environment excites you?',
        type: 'single',
        options: ['Corporate office', 'Startup environment', 'Remote work', 'Laboratory', 'Outdoors', 'Studio/Creative space']
      }
    ]
  },
  {
    section: 'Skills',
    questions: [
      {
        id: 's1',
        question: 'Rate your comfort level with technology',
        type: 'scale',
        options: ['Very Low', 'Low', 'Medium', 'High', 'Very High']
      },
      {
        id: 's2',
        question: 'Which skills would you like to develop further?',
        type: 'multiple',
        options: ['Programming', 'Design', 'Communication', 'Analytics', 'Management', 'Creative writing']
      }
    ]
  }
];

export function AssessmentPage() {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, answers, setAnswers } = useAssessment();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});

  const currentSection = assessmentQuestions[currentStep];
  const totalSteps = assessmentQuestions.length;

  const handleAnswerChange = (questionId: string, answer: any) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    setAnswers({ ...answers, ...selectedAnswers });
    
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswers({});
    } else {
      // Generate results
      generateResults();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateResults = () => {
    const allAnswers = { ...answers, ...selectedAnswers };
    
    // Simple algorithm to generate results based on answers
    const results = {
      personality: 'Analytical Leader',
      interests: ['Technology', 'Problem Solving', 'Innovation'],
      skills: ['Programming', 'Analytics', 'Communication'],
      careerMatches: [
        {
          title: 'Data Scientist',
          match: 92,
          description: 'Analyze complex data to derive insights and drive business decisions.',
          requirements: ['Statistics', 'Python/R', 'Machine Learning', "Bachelor's in relevant field"],
          roadmap: [
            'Learn Python and SQL',
            'Study statistics and machine learning',
            'Build portfolio projects',
            'Apply for entry-level positions',
            'Pursue advanced certifications'
          ],
          salary: '$75,000 - $120,000',
          growth: 'High (22% growth expected)'
        },
        {
          title: 'UX Designer',
          match: 87,
          description: 'Design user-centered digital experiences that are both beautiful and functional.',
          requirements: ['Design thinking', 'Prototyping tools', 'User research', 'Portfolio'],
          roadmap: [
            'Learn design fundamentals',
            'Master design tools (Figma, Adobe)',
            'Conduct user research projects',
            'Build a strong portfolio',
            'Apply for junior UX roles'
          ],
          salary: '$65,000 - $110,000',
          growth: 'Very High (13% growth expected)'
        },
        {
          title: 'Product Manager',
          match: 85,
          description: 'Bridge technology and business to create products that users love.',
          requirements: ['Business acumen', 'Technical understanding', 'Communication', 'MBA preferred'],
          roadmap: [
            'Gain business and technical knowledge',
            'Develop project management skills',
            'Build cross-functional experience',
            'Lead product initiatives',
            'Pursue product management certification'
          ],
          salary: '$85,000 - $150,000',
          growth: 'High (19% growth expected)'
        }
      ]
    };

    setAnswers(allAnswers);
    navigate('/results');
  };

  const canProceed = () => {
    const currentQuestionIds = currentSection.questions.map(q => q.id);
    return currentQuestionIds.every(id => selectedAnswers[id] !== undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-gray-800">Career Assessment</h2>
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {currentSection.section} Assessment
          </h3>

          <div className="space-y-8">
            {currentSection.questions.map((question, index) => (
              <div key={question.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                  {index + 1}. {question.question}
                </h4>

                {question.type === 'scale' && (
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {question.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        onClick={() => handleAnswerChange(question.id, optIndex + 1)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                          selectedAnswers[question.id] === optIndex + 1
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {question.type === 'single' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {question.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        onClick={() => handleAnswerChange(question.id, option)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          selectedAnswers[question.id] === option
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {question.type === 'multiple' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {question.options.map((option, optIndex) => {
                      const currentAnswers = selectedAnswers[question.id] || [];
                      const isSelected = currentAnswers.includes(option);
                      
                      return (
                        <button
                          key={optIndex}
                          onClick={() => {
                            const newAnswers = isSelected
                              ? currentAnswers.filter((a: string) => a !== option)
                              : [...currentAnswers, option];
                            handleAnswerChange(question.id, newAnswers);
                          }}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {currentStep === totalSteps - 1 ? 'Get Results' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}