import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}
const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false
}) => {
  const hoverClasses = hoverable ? 'transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg' : '';
  return <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${hoverClasses} ${className}`} onClick={onClick}>
      {children}
    </div>;
};
export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({
  children,
  className = ''
}) => <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>;
export const CardBody: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({
  children,
  className = ''
}) => <div className={`p-4 ${className}`}>{children}</div>;
export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({
  children,
  className = ''
}) => <div className={`p-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>;
export default Card;