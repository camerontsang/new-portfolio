import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Orb from './Orb';
import { ProjectsCarousel } from './ProjectsCarousel';
import SkillsChat from './SkillsChat';
import MovingBackground from './MovingBackground';

export const ChatPortfolio = () => {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showBackground, setShowBackground] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

I'm Cameron, a senior at **NYU Shanghai** studying Data Science and Mathematics. 

## 🎓 Education
**NYU Shanghai** • Data Science & Mathematics  
*Key coursework:* Machine Learning, Data Structures, Programming Tools for DS, Causal Inference, and Probability & Statistics

## 💼 Experience
Data Science Intern @ Sequoia Real Estate, focusing on predictive analytics and research data analysis.

## 🔬 Focus Areas
I specialize in building machine learning models, performing statistical analysis, and extracting insights from complex datasets to solve real-world problems.`,
      delay: 50
    },
    
    projects: {
      text: <ProjectsCarousel />,
      delay: 50
    },
    contact: {
      text: `# Get In Touch

## 📧 Email
**Best for professional inquiries**  
[camerontsang@gmail.com](mailto:your-email@example.com)

## 💼 LinkedIn
**Professional networking and connections**  
[Connect with me →](https://linkedin.com/in/camerontsang)

## 🐙 GitHub
**Check out my code and collaborate**  
[github.com/camerontsang →](https://github.com/camerontsang)

---

Currently based in NYC. Open to remote work and relocating for the right opportunity.



**Available for:**
- Data Science internships and full-time roles
- Web development projects  
- Research collaborations`,
      delay: 30
    }
  };

  const addBotMessage = (text) => {
    const messageId = Date.now();
    setMessages(prev => [...prev, { id: messageId, text: text, isBot: true, isTyping: false }]);
  };

  const callChatAPI = async (userMessage) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error calling chat API:', error);
      return "I'm sorry, I'm having trouble responding right now. Please try again later or contact Cameron directly at camerontsang@gmail.com.";
    }
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


  const handleSearch = async () => {
    if (query.trim() && !isLoading) {
      setShowBackground(false);
      setIsLoading(true);
      
      const currentQuery = query;
      const userMessage = { 
        id: Date.now() - 1, 
        text: currentQuery, 
        isBot: false 
      };
      
      setMessages(prev => [...prev, userMessage]);
      setQuery('');
      
      // Add loading message
      const loadingMessageId = Date.now();
      setMessages(prev => [...prev, { 
        id: loadingMessageId, 
        text: "Thinking...", 
        isBot: true, 
        isTyping: true 
      }]);
      
      try {
        const response = await callChatAPI(currentQuery);
        
        // Remove loading message and add actual response
        setMessages(prev => prev.filter(msg => msg.id !== loadingMessageId));
        addBotMessage(response);
      } catch (error) {
        // Remove loading message and add error message
        setMessages(prev => prev.filter(msg => msg.id !== loadingMessageId));
        addBotMessage("I'm sorry, I'm having trouble responding right now. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const clearChat = () => {
    setMessages([]);
    setSelectedTopic('');
    setShowBackground(true); // Show background again when chat is cleared
  };

  return (
    <div className={`relative h-screen bg-gradient-to-br from-gray-50 to-gray-100 ${messages.length > 0 ? 'overflow-hidden' : 'overflow-hidden'}`}>
      {/* Moving Background */}
      <MovingBackground show={showBackground} />
      
      {/* Header */}
      <header className="p-6 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
        
        </div>
      
      </header>

      {/* Main Content Container */}
      <div className="container mx-auto flex h-full max-w-5xl flex-col relative z-10">
        <main className="flex-1 px-2 overflow-hidden">
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
          <div className="flex-1 flex items-center justify-center min-h-0 px-4">
          <AnimatePresence>
            {messages.length > 0 && (
              <motion.div 
                className="w-full max-w-5xl space-y-6 flex-1 overflow-y-auto overflow-x-hidden py-8 px-2 my-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#d1d5db #f3f4f6',
                  maxHeight: 'calc(100vh - 200px)'
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
                        <div className="text-base leading-relaxed overflow-x-hidden select-text">
                          {message.component ? (
                            message.component
                          ) : message.isTyping ? (
                            <div className="flex items-center space-x-1 select-none">
                              <span>{message.text}</span>
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                              </div>
                            </div>
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
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <span className="text-sm font-medium text-gray-700">About Me</span>
              <span className="text-lg">💭</span>
            </button>

            <button 
              onClick={() => handleTopicClick('skills')}
              className="flex items-center space-x-2 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all bg-white text-sm"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <span className="text-sm font-medium text-gray-700">Skills</span>
              <span className="text-lg">⚡</span>
            </button>

            <button 
              onClick={() => handleTopicClick('projects')}
              className="flex items-center space-x-2 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all bg-white text-sm"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <span className="text-sm font-medium text-gray-700">Projects</span>
              <span className="text-lg">📁</span>
            </button>

            <button 
              onClick={() => handleTopicClick('contact')}
              className="flex items-center space-x-2 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all bg-white text-sm"
              style={{ WebkitTapHighlightColor: 'transparent' }}
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
                disabled={!query.trim() || isLoading}
                className={`absolute right-2 top-2 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors ${
                  !query.trim() || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
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