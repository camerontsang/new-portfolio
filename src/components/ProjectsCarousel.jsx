import React from "react";
import { Carousel, Card } from "./ui/apple-cards-carousel";

export function ProjectsCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-4 overflow-x-hidden">
      <h2 className="max-w-7xl pl-4 mx-auto text-lg md:text-2xl font-bold text-gray-800 font-sans mb-2">
        My Projects
      </h2>
      <div className="overflow-x-hidden">
        <Carousel items={cards} />
      </div>
    </div>
  );
}

const ProjectContent = ({ project }) => {
  return (
    <>
      <div className="bg-gray-50 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-gray-600 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-6">
          <span className="font-bold text-gray-700">
            {project.description}
          </span>
        </p>
        
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span key={tech} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.github && (
          <div className="flex justify-center">
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span>View on GitHub</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </>
  );
};

const data = [
  {
    category: "AI & Machine Learning",
    title: "AI Music Recommender",
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <ProjectContent project={{
      description: "A sophisticated music recommender system powered by ChatGPT that provides personalized music suggestions based on user preferences, listening history, and mood analysis.",
      technologies: ["React", "Tailwind CSS", "OpenAI API", "Java", "Node.js"],
      github: "https://github.com/camerontsang/musAIc"
    }} />,
  },
  {
    category: "Data Science",
    title: "Data Analysis Tools",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <ProjectContent project={{
      description: "Advanced research-focused analytical tools for data processing, statistical analysis, and visualization. Built for academic research and data-driven insights.",
      technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Jupyter"],
      github: null
    }} />,
  },
  {
    category: "Web Development",
    title: "Modern Portfolio",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <ProjectContent project={{
      description: "This interactive portfolio built with React and Vite, featuring a ChatGPT-style interface, animated components, and responsive design.",
      technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion", "JavaScript"],
      github: null
    }} />,
  },
  {
    category: "Machine Learning",
    title: "Predictive Analytics Models",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: <ProjectContent project={{
      description: "Machine learning models for predictive analytics, including time series forecasting, classification algorithms, and deep learning implementations.",
      technologies: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "SQL"],
      github: null
    }} />,
  },
  
  
];