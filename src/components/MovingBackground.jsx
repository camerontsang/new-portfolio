import React from 'react';
import TextBackground from './TextBackground';

const MovingBackground = ({ show = true }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Layer 1 - Moving Left */}
      <div className="absolute w-full h-32" style={{ top: '14.28%' }}>
        <TextBackground
          texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
          velocity={-25}
          className="text-gray-300 opacity-15"
        />
      </div>
      
      {/* Layer 2 - Moving Right */}
      <div className="absolute w-full h-32" style={{ top: '28.56%' }}>
        <TextBackground
          texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
          velocity={25}
          className="text-gray-300 opacity-15"
        />
      </div>
      
      {/* Layer 3 - Moving Left */}
      <div className="absolute w-full h-32" style={{ top: '42.84%' }}>
        <TextBackground
          texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
          velocity={-25}
          className="text-gray-300 opacity-15"
        />
      </div>
      
      {/* Layer 4 - Moving Right */}
      <div className="absolute w-full h-32" style={{ top: '57.12%' }}>
        <TextBackground
          texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
          velocity={25}
          className="text-gray-300 opacity-15"
        />
      </div>
      
      {/* Layer 5 - Moving Left */}
      <div className="absolute w-full h-32" style={{ top: '71.4%' }}>
        <TextBackground
          texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
          velocity={-20}
          className="text-gray-300 opacity-15"
        />
      </div>
      
      {/* Layer 6 - Moving Right */}
      <div className="absolute w-full h-32" style={{ top: '85.68%' }}>
        <TextBackground
          texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
          velocity={25}
          className="text-gray-300 opacity-15"
        />
      </div>
    </div>
  );
};

export default MovingBackground;