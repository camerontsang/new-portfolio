'use client';

import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Code, Database, BarChart } from 'lucide-react';

const SkillsChat = () => {
  const skillsData = [
    {
      category: '💻 Programming Languages',
      icon: <Code className="h-4 w-4" />,
      skills: [
        { name: 'Python', level: 'Expert' },
        { name: 'SQL', level: 'Intermediate' },
        { name: 'React & JavaScript', level: 'Intermediate' },
        { name: 'HTML & CSS', level: 'Intermediate' },
        { name: 'R', level: 'Intermediate' },
      ],
    },
    {
      category: '🤖 Machine Learning and AI',
      icon: <Database className="h-4 w-4" />,
      skills: [
        { name: 'PyTorch & TensorFlow', level: 'Intermediate' },
        { name: 'Pandas & NumPy', level: 'Expert' },
        { name: 'Matplotlib & Seaborn', level: 'Expert' },
        { name: 'Scikit-learn', level: 'Expert' },
        { name: 'Jupyter Notebooks', level: 'Expert' },
      ],
    },
    {
      category: '📊 Data Analytics Tools',
      icon: <BarChart className="h-4 w-4" />,
      skills: [
        { name: 'Tableau', level: 'Intermediate' },
        { name: 'Power BI', level: 'Beginner' },
        { name: 'Excel', level: 'Expert' },
        { name: 'STATA', level: 'Intermediate' },
        { name: 'Git/GitHub', level: 'Intermediate' },
      ],
    },
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Beginner':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="max-w-full px-4 md:px-8 lg:px-12">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Technical Skills</h1>
      <p className="mb-6 text-gray-600 leading-relaxed">Here's a comprehensive overview of my technical expertise across different domains:</p>
      
      {skillsData.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="mt-8 mb-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            {section.icon}
            {section.category}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {section.skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index * 0.1) + (idx * 0.05), duration: 0.3 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <span className="font-medium text-gray-800">{skill.name}</span>
                <Badge className={`${getLevelColor(skill.level)} px-2 py-1 text-xs flex-shrink-0 ml-2`}>
                  {skill.level}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
      
      {/* Extra content to maintain width */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-gray-700 leading-relaxed">
          <strong className="text-gray-800">Experience Focus:</strong> I specialize in building machine learning models, 
          performing statistical analysis, and extracting actionable insights from complex datasets to solve real-world problems. 
          My experience spans from data preprocessing and feature engineering to model deployment and performance optimization.
        </p>
      </div>
    </div>
  );
};

export default SkillsChat;