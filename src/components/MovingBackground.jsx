import React from 'react';
import TextBackground from './TextBackground';

const MovingBackground = ({ show = true }) => {
  if (!show) return null;

  const layerStyle = {
    position: 'absolute',
    width: '100vw',
    height: '120px',
    left: 0,
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    >
      {/* Layer 1 - Moving Right */}
      <div style={{ ...layerStyle, top: '-20px' }}>
        <TextBackground
          texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
          velocity={25}
          className="text-gray-300 opacity-15"
        />
      </div>
      
      {/* Layer 2 - Moving Left */}
      <div style={{ ...layerStyle, top: '100px' }}>
        <TextBackground
          texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
          velocity={-25}
          className="text-gray-300 opacity-15"
        />
      </div>
      
      {/* Layer 3 - Moving Right */}
      <div style={{ ...layerStyle, top: '220px' }}>
        <TextBackground
          texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
          velocity={25}
          className="text-gray-300 opacity-15"
        />
      </div>
      
      {/* Layer 4 - Moving Left */}
      <div style={{ ...layerStyle, top: '340px' }}>
        <TextBackground
          texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
          velocity={-25}
          className="text-gray-300 opacity-15"
        />
      </div>
      
      {/* Layer 5 - Moving Right */}
      <div style={{ ...layerStyle, top: '460px' }}>
        <TextBackground
          texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
          velocity={25}
          className="text-gray-300 opacity-15"
        />
      </div>
      
      {/* Layer 6 - Moving Left */}
      <div style={{ ...layerStyle, top: '580px' }}>
        <TextBackground
          texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
          velocity={-20}
          className="text-gray-300 opacity-15"
        />
      </div>
      
      {/* Layer 7 - Moving Right */}
      <div style={{ ...layerStyle, top: '700px' }}>
        <TextBackground
          texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
          velocity={25}
          className="text-gray-300 opacity-15"
        />
      </div>
      
      {/* Layer 8 - Moving Left */}
      <div style={{ ...layerStyle, top: '820px' }}>
        <TextBackground
          texts={['Cameron Tsang - Data Science & Math @ NYU Shanghai']}
          velocity={-25}
          className="text-gray-300 opacity-15"
        />
      </div>
       {/* Layer 9 - Moving Right */}
       <div style={{ ...layerStyle, top: '940px' }}>
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