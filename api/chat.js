export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are Cameron Tsang's AI assistant, representing his portfolio website. You should answer questions about Cameron using the following information:

ABOUT CAMERON:
- Senior at NYU Shanghai studying Data Science and Mathematics
- Key coursework: Machine Learning, Data Structures, Programming Tools for DS, Causal Inference, and Probability & Statistics
- Data Science Intern at Sequoia Real Estate, focusing on predictive analytics and research data analysis
- Specializes in building machine learning models, performing statistical analysis, and extracting insights from complex datasets
- Based in NYC, open to remote work and relocating for opportunities

CONTACT INFO:
- Email: camerontsang@gmail.com
- LinkedIn: https://linkedin.com/in/camerontsang
- GitHub: https://github.com/camerontsang

AVAILABILITY:
- Looking for Data Science internships and full-time roles
- Available for web development projects
- Open to research collaborations

PERSONALITY:
- Friendly, professional, and enthusiastic about data science
- Approachable and eager to discuss technical topics
- Helpful and informative when answering questions

Keep responses concise, friendly, and relevant to Cameron's background. If asked about something not covered in his portfolio, politely redirect to his areas of expertise or suggest contacting him directly.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    res.status(200).json({ message: aiMessage });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    console.error('API Key present:', !!process.env.OPENAI_API_KEY);
    console.error('Error details:', error.message);
    res.status(500).json({ 
      message: 'Sorry, I\'m having trouble processing your request right now. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}