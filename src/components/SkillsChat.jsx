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
        { name: 'Python', level: 'Expert', description: 'My strongest language for data analysis, machine learning, and statistical computing' },
        { name: 'SQL', level: 'Intermediate', description: 'Database management, complex queries, and data extraction from relational databases' },
        { name: 'React & JavaScript', level: 'Intermediate', description: 'Modern web development, building interactive user interfaces and dynamic applications' },
        { name: 'HTML & CSS', level: 'Intermediate', description: 'Frontend markup, responsive design, and modern styling techniques' },
      ],
    },
    {
      category: '🤖 Machine Learning and AI',
      icon: <Database className="h-4 w-4" />,
      skills: [
        { name: 'PyTorch & TensorFlow', level: 'Intermediate', description: 'Deep learning frameworks for neural networks and advanced AI model development' },
        { name: 'Pandas & NumPy', level: 'Expert', description: 'Data manipulation, numerical computing, and comprehensive data analysis workflows' },
        { name: 'Matplotlib & Seaborn', level: 'Expert', description: 'Advanced data visualization, statistical plotting, and publication-quality graphics' },
      ],
    },
    {
      category: '📊 Data Analytics Tools',
      icon: <BarChart className="h-4 w-4" />,
      skills: [
        { name: 'Tableau', level: 'Intermediate', description: 'Business intelligence, interactive dashboards, and comprehensive data storytelling' },
        { name: 'Power BI', level: 'Beginner', description: 'Microsoft business analytics, report generation, and enterprise data visualization' },
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
    <div className="max-w-full">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Technical Skills</h1>
      <p className="mb-4 text-gray-600 leading-relaxed">Here's a breakdown of my technical expertise across different domains:</p>
      
      {skillsData.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="mt-6"
        >
          <h2 className="text-xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
            {section.icon}
            {section.category}
          </h2>
          
          <ul className="list-disc list-inside mb-4 space-y-2 text-gray-600">
            {section.skills.map((skill, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index * 0.1) + (idx * 0.05), duration: 0.3 }}
                className="text-gray-600"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <strong className="font-semibold text-gray-800">{skill.name}</strong>
                    <span className="ml-2 text-gray-600 leading-relaxed">- {skill.description}</span>
                  </div>
                  <Badge className={`${getLevelColor(skill.level)} px-2 py-1 text-xs flex-shrink-0`}>
                    {skill.level}
                  </Badge>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsChat;