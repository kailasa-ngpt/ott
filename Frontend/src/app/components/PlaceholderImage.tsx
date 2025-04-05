// Frontend/src/components/PlaceholderImage.tsx
import React from 'react';

interface PlaceholderImageProps {
  width: number;
  height: number;
  text?: string;
  bgColor?: string;
  textColor?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width,
  height,
  text = 'Placeholder Image',
  bgColor = '#f0f0f0',
  textColor = '#666666',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: '100%', height: 'auto' }}
    >
      <rect width={width} height={height} fill={bgColor} />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={textColor}
        fontFamily="Arial, sans-serif"
        fontSize={Math.min(width, height) * 0.1}
      >
        {text}
      </text>
    </svg>
  );
};

export default PlaceholderImage;