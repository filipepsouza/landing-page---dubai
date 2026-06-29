import React, { useState, useEffect } from 'react';

const CHARS = ['$', '€', '£', '¥', 'A', 'E', 'D', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

interface GoldScrambleProps {
  children: string;
  className?: string;
}

export const GoldScramble: React.FC<GoldScrambleProps> = ({ children, className = '' }) => {
  const [text, setText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isHovered) {
      let iteration = 0;
      interval = setInterval(() => {
        setText(
          children
            .split('')
            .map((letter, index) => {
              if (letter === ' ') return ' ';
              if (index < iteration) {
                return children[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration >= children.length) {
          clearInterval(interval);
        }

        iteration += 1 / 2;
      }, 30);
    } else {
      setText(children);
    }

    return () => clearInterval(interval);
  }, [isHovered, children]);

  return (
    <span
      className={`transition-colors duration-300 cursor-pointer ${isHovered ? 'text-gold' : 'text-white'} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </span>
  );
};
