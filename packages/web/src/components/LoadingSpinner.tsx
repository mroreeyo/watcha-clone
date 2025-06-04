import React from 'react';
import '../styles/LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  color = '#FF0558' // 왓챠 핑크 컬러
}) => {
  return (
    <div className="loading-spinner-container">
      <div 
        className={`loading-spinner ${size}`}
        style={{ borderTopColor: color }}
      />
    </div>
  );
};

export default LoadingSpinner; 