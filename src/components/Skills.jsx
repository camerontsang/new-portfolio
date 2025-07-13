
'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Code, Database, BarChart } from 'lucide-react';
import { useState } from 'react';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const skillsData = [
    {
      category: 'Programming Languages',
      icon: <Code className="h-5 w-5" />,
      skills: [
        { name: 'Python', level: 'Expert' },
        { name: 'SQL', level: 'Intermediate' },
        { name: 'React & JavaScript', level: 'Intermediate' },
        { name: 'HTML & CSS', level: 'Intermediate' },
      ],
      color: 'bg-blue-50 text-blue-600 border border-blue-200',
    },
    {
      category: 'Machine Learning and AI',
      icon: <Database className="h-5 w-5" />,
      skills: [
        { name: 'PyTorch & TensorFlow', level: 'Intermediate' },
        { name: 'Pandas & NumPy', level: 'Expert' },
        { name: 'Matplotlib & Seaborn', level: 'Expert' },
      ],
      color: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    },
    {
      category: 'Other Tools',
      icon: <BarChart className="h-5 w-5" />,
      skills: [
        { name: 'Tableau', level: 'Intermediate' },
        { name: 'Power BI', level: 'Beginner' },
      ],
      color: 'bg-purple-50 text-purple-600 border border-purple-200',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

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
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className="mx-auto w-full max-w-5xl rounded-4xl"
    >
      <Card className="w-full border-none px-0 pb-12 shadow-none">
        <CardHeader className="px-0 pb-6">
          <CardTitle className="text-primary px-0 text-4xl font-bold">
            Skills Matrix
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            {skillsData.map((section, index) => (
              <Button
                key={index}
                variant={selectedCategory === index ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(selectedCategory === index ? null : index)}
                className="flex items-center gap-2"
              >
                {section.icon}
                {section.category}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="px-0">
          {selectedCategory !== null ? (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  {skillsData[selectedCategory].icon}
                  {skillsData[selectedCategory].category}
                </h3>
                <div className="grid gap-3">
                  {skillsData[selectedCategory].skills.map((skill, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <Badge className={`${getLevelColor(skill.level)} px-2 py-1 text-xs`}>
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-600">Click on a category above to explore my skills</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Skills;
