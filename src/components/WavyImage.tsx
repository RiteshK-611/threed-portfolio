import React from 'react';

interface WavyImageProps {
    src: string,
    alt: string,
    className: string
}

const WavyImage = ({ src, alt, className } : WavyImageProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 wave-animation">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-30" />
      </div>
      <img src={src} alt={alt} className="relative z-10 w-full h-full object-cover" />
    </div>
  );
};

export default WavyImage;