import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Orb from './Orb';
import TextBackground from './TextBackground';
import { ProjectsCarousel } from './ProjectsCarousel';
import SkillsChat from './SkillsChat';

export const ChatPortfolio = () => {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showBackground, setShowBackground] = useState(true);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages]);

  const topicResponses = {
    about: {
      text: `# About Me

I'm Cameron, a junior at **NYU Shanghai** studying Data Science and Mathematics. I'm passionate about using data to solve real-world problems and building intelligent systems.

## 🎓 Education
**NYU Shanghai** • Data Science & Mathematics  
*Key coursework:* Machine Learning, Data Structures, Programming Tools for DS, Causal Inference, and Probability & Statistics

## 🔬 Focus Areas
I specialize in building machine learning models, performing statistical analysis, and extracting insights from complex datasets to solve real-world problems.

## 💼 Experience
Data Science Intern & Research Assistant, focusing on predictive analytics and research data analysis.`,
      delay: 50
    },
    skills: {
      text: `# Technical Skills

Here's a breakdown of my technical expertise across different domains:

## 💻 Programming Languages
- **Python** (95%) - My strongest language for data analysis and ML
- **SQL** (90%) - Database management and complex queries  
- **React & JavaScript** (65%) - Web development
- **R** (75%) - Statistical computing and analysis

## 🤖 Machine Learning & AI
- **PyTorch & TensorFlow** (70%) - Deep learning frameworks
- **Scikit-learn** (85%) - Classical machine learning algorithms
- **Pandas & NumPy** (80%) - Data manipulation and numerical computing
- **Matplotlib & Seaborn** (75%) - Data visualization

## 🌐 Web Development
- **React** (65%) - Frontend development
- **JavaScript/TypeScript** (65%) - Modern web technologies
- **HTML/CSS** (70%) - Frontend markup and styling
- **Node.js** (60%) - Backend development

## 📊 Data Science Tools
- **Jupyter Notebooks** (90%) - Interactive data analysis
- **Git/GitHub** (80%) - Version control and collaboration
- **STATA** (70%) - Statistical analysis software
- **LaTeX** (65%) - Academic writing and documentation

## 🗄️ Databases & Analytics
- **SQL** (90%) - Query optimization and database design
- **Statistical Analysis** (85%) - Hypothesis testing and modeling
- **Data Cleaning** (90%) - Preprocessing and validation
- **Causal Inference** (75%) - Research methodology`,
      delay: 50
    },
    projects: {
      text: <ProjectsCarousel />,
      delay: 50
    },
    contact: {
      text: `# Get In Touch

I typically respond within 24 hours. Looking forward to hearing from you!

## 📧 Email
**Best for professional inquiries**  
[your-email@example.com](mailto:your-email@example.com)

## 💼 LinkedIn
**Professional networking and connections**  
[Connect with me →](https://linkedin.com/in/yourusername)

## 🐙 GitHub
**Check out my code and collaborate**  
[github.com/camerontsang →](https://github.com/camerontsang)

---

## 📍 Location & Availability

Currently based in **Shanghai, China**. Open to remote work and relocating for the right opportunity.

**Available for:**
- Data Science internships and full-time roles
- Web development projects  
- Research collaborations
- Freelance opportunities`,
      delay: 30
    }
  };

  const addBotMessage = (text) => {
    const messageId = Date.now();
    setMessages(prev => [...prev, { id: messageId, text: text, isBot: true, isTyping: false }]);
  };

  const handleTopicClick = (topic) => {
    setShowBackground(false); // Hide background when button is clicked
    
    const userMessage = { 
      id: Date.now() - 1, 
      text: `Tell me about ${topic}`, 
      isBot: false 
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Special handling for skills - show component instead of text
    if (topic === 'skills') {
      setTimeout(() => {
        const messageId = Date.now();
        setMessages(prev => [...prev, { 
          id: messageId, 
          component: <SkillsChat />, 
          isBot: true, 
          isTyping: false 
        }]);
      }, 200);
      return;
    }
    
    // Add bot response immediately for other topics
    setTimeout(() => {
      addBotMessage(topicResponses[topic].text);
    }, 200);
  };


  const handleSearch = () => {
    if (query.trim()) {
      setShowBackground(false); // Hide background when search is used
      
      const currentQuery = query;
      const userMessage = { 
        id: Date.now() - 1, 
        text: currentQuery, 
        isBot: false 
      };
      
      setMessages(prev => [...prev, userMessage]);
      setQuery('');
      
      // Generic response for custom queries
      setTimeout(() => {
        addBotMessage(`Thanks for your question! "${currentQuery}" is a great topic. 

I'd be happy to help! You can ask me about my background, technical skills, projects I've worked on, or how to get in touch. 

Try clicking one of the topic buttons above for detailed information, or feel free to ask me anything specific about my experience in data science, web development, or my journey at NYU Shanghai.`);
      }, 200);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setSelectedTopic('');
    setShowBackground(true); // Show background again when chat is cleared
  };

  return (
    <div className={`relative h-screen bg-gradient-to-br from-gray-50 to-gray-100 ${messages.length > 0 ? 'overflow-hidden' : 'overflow-hidden'}`}>
      {/* Background Text */}
      {showBackground && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          
          
          {/* Layer 2 - Moving Left */}
          <div className="absolute top-1/6 left-0 w-full h-1/7">
            <TextBackground
              texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
              velocity={-25}
              className="text-gray-300 opacity-15"
            />
          </div>
          
          {/* Layer 3 - Moving Right */}
          <div className="absolute top-2/6 left-0 w-full h-1/7">
            <TextBackground
              texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
              velocity={25}
              className="text-gray-300 opacity-15"
            />
          </div>
          
          {/* Layer 4 - Moving Left */}
          <div className="absolute top-3/6 left-0 w-full h-1/7">
            <TextBackground
              texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
              velocity={-25}
              className="text-gray-300 opacity-15"
            />
          </div>
          
          {/* Layer 5 - Moving Right */}
          <div className="absolute top-4/6 left-0 w-full h-1/7">
            <TextBackground
              texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
              velocity={25}
              className="text-gray-300 opacity-15"
            />
          </div>
          
          {/* Layer 6 - Moving Left */}
          <div className="absolute top-5/6 left-0 w-full h-1/7">
            <TextBackground
              texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
              velocity={-20}
              className="text-gray-300 opacity-15"
            />
          </div>
          {/* Layer 7  - Moving Right */}
          <div className="absolute bottom left-0 w-full h-1/7">
            <TextBackground
              texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
              velocity={25}
              className="text-gray-300 opacity-15"
            />
          </div>
          
        </div>
      )}
      
      {/* Header */}
      <header className="p-6 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
        
        </div>
      
      </header>

      {/* Main Content Container */}
      <div className="container mx-auto flex h-full max-w-5xl flex-col relative z-10">
        <main className={`flex-1 px-2 ${messages.length > 0 ? 'overflow-y-auto overflow-x-hidden' : 'overflow-y-auto'}`}>
          {/* Top Section - Logo and Greeting */}
          <div className="flex flex-col items-center" style={{ paddingTop: messages.length === 0 ? '120px' : '80px', paddingBottom: '32px' }}>
            {/* Logo/Avatar with Orb - Only show in center when no messages */}
            {messages.length === 0 && (
              <motion.div 
                className="mb-6 cursor-pointer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ 
                  width: '112px', 
                  height: '112px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={clearChat}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Orb Background - positioned absolutely behind */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 1
                }}>
                  <Orb
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    hue={200}
                    forceHoverState={false}
                  />
                </div>
                {/* Duck avatar - positioned in center */}
                <span 
                  className="text-4xl select-none"
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  🐤
                </span>
              </motion.div>
            )}

            {/* Fixed Top-Left Orb - Only show when chat is active */}
            {messages.length > 0 && (
              <motion.div 
                className="fixed top-4 left-4 z-50 cursor-pointer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ 
                  width: '80px', 
                  height: '80px',
                  position: 'fixed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={clearChat}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Orb Background - positioned absolutely behind */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 1
                }}>
                  <Orb
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    hue={200}
                    forceHoverState={false}
                  />
                </div>
                {/* Duck avatar - positioned in center */}
                <span 
                  className="text-3xl select-none"
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  🐤
                </span>
              </motion.div>
            )}

            {/* Greeting */}
            {messages.length === 0 && (
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-xl font-medium text-gray-800 mb-2">
                  Hey, I'm Cameron 👋
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  My portfolio
                </h2>
                <p className="text-gray-600">
                  Ask me anything or explore using the buttons below
                </p>
              </motion.div>
            )}
          </div>

          {/* Middle Section - Chat Messages */}
          <div className="flex-1 flex items-center justify-center min-h-0">
          <AnimatePresence>
            {messages.length > 0 && (
              <motion.div 
                className="w-full max-w-5xl space-y-6 flex-1 overflow-y-auto overflow-x-hidden py-4 sm:py-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#d1d5db #f3f4f6'
                }}
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`flex items-start space-x-4 max-w-4xl overflow-hidden ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isBot ? 'bg-blue-500' : 'bg-gray-500'
                      }`}>
                        <span className="text-white font-bold">
                          {message.isBot ? 'C' : 'U'}
                        </span>
                      </div>
                      
                      {/* Message */}
                      <div className={`rounded-2xl px-6 py-4 overflow-hidden ${
                        message.isBot 
                          ? 'bg-white shadow-lg text-gray-800' 
                          : 'bg-blue-500 text-white'
                      }`}>
                        <div className="text-base leading-relaxed overflow-x-hidden">
                          {message.component ? (
                            message.component
                          ) : typeof message.text === 'string' ? (
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]}
                              components={{
                                h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 text-gray-900">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-xl font-semibold mb-3 mt-6 text-gray-800">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-lg font-medium mb-2 mt-4 text-gray-700">{children}</h3>,
                                p: ({ children }) => <p className="mb-4 text-gray-600 leading-relaxed">{children}</p>,
                                ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-gray-600">{children}</ul>,
                                li: ({ children }) => <li className="text-gray-600">{children}</li>,
                                strong: ({ children }) => <strong className="font-semibold text-gray-800">{children}</strong>,
                                em: ({ children }) => <em className="italic text-gray-600">{children}</em>,
                                hr: () => <hr className="border-gray-200 my-6" />,
                                a: ({ href, children }) => (
                                  <a 
                                    href={href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                                  >
                                    {children}
                                  </a>
                                ),
                                code: ({ children }) => (
                                  <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
                                    {children}
                                  </code>
                                )
                              }}
                            >
                              {message.text}
                            </ReactMarkdown>
                          ) : (
                            message.text
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

          {/* Bottom Section - Controls */}
          <div className="sticky bottom-0 px-2 pt-3 md:px-0 md:pb-4">
            <div className="relative flex flex-col items-center gap-3">
            {/* Topic Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: messages.length === 0 ? 0.6 : 0 }}
          >
            <button 
              onClick={() => handleTopicClick('about')}
              className="flex items-center space-x-2 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all bg-white text-sm"
            >
              <span className="text-sm font-medium text-gray-700">About Me</span>
              <span className="text-lg">💭</span>
            </button>

            <button 
              onClick={() => handleTopicClick('skills')}
              className="flex items-center space-x-2 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all bg-white text-sm"
            >
              <span className="text-sm font-medium text-gray-700">Skills</span>
              <span className="text-lg">⚡</span>
            </button>

            <button 
              onClick={() => handleTopicClick('projects')}
              className="flex items-center space-x-2 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all bg-white text-sm"
            >
              <span className="text-sm font-medium text-gray-700">Projects</span>
              <span className="text-lg">📁</span>
            </button>

            <button 
              onClick={() => handleTopicClick('contact')}
              className="flex items-center space-x-2 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all bg-white text-sm"
            >
              <span className="text-sm font-medium text-gray-700">Contact</span>
              <span className="text-lg">✉️</span>
            </button>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="w-full max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: messages.length === 0 ? 0.8 : 0 }}
          >
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ask me anything..."
                className="w-full px-6 py-4 text-gray-600 bg-white rounded-full shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
              <button 
                onClick={handleSearch}
                disabled={!query.trim()}
                className={`absolute right-2 top-2 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors ${
                  !query.trim() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};