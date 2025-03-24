import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ColorSpotProps {
  className?: string;
  colors?: string[];
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  animate?: boolean;
  numberOfSpots?: number;
}

const ColorSpots = ({
  className,
  colors = ['#9b87f5', '#D946EF', '#F97316', '#0EA5E9', '#8B5CF6'],
  blur = 'xl',
  animate = true,
  numberOfSpots = 5
}: ColorSpotProps) => {
  const [spots, setSpots] = useState<Array<{
    id: number;
    x: string;
    y: string;
    size: string;
    color: string;
    delay: string;
  }>>([]);

  useEffect(() => {
    // Generate random spots
    const newSpots = Array.from({ length: numberOfSpots }).map((_, index) => {
      const randomX = `${Math.floor(Math.random() * 100)}%`;
      const randomY = `${Math.floor(Math.random() * 100)}%`;
      const randomSize = `${Math.floor(Math.random() * 20) + 10}%`;
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomDelay = `${Math.random() * 2}s`;
      
      return {
        id: index,
        x: randomX,
        y: randomY,
        size: randomSize,
        color: randomColor,
        delay: randomDelay
      };
    });
    
    setSpots(newSpots);
  }, [colors, numberOfSpots]);

  const getBlurClass = (blur: string) => {
    return {
      'sm': 'blur-sm',
      'md': 'blur-md',
      'lg': 'blur-lg',
      'xl': 'blur-xl',
      '2xl': 'blur-2xl',
      '3xl': 'blur-3xl'
    }[blur] || 'blur-xl';
  };

  return (
    <div className={cn('fixed inset-0 overflow-hidden opacity-30 pointer-events-none z-0', className)}>
      {spots.map((spot) => (
        <div
          key={spot.id}
          className={cn(
            'absolute rounded-full opacity-20 color-spot',
            getBlurClass(blur),
            animate ? 'transition-all duration-[3000ms]' : ''
          )}
          style={{
            left: spot.x,
            top: spot.y,
            width: spot.size,
            height: spot.size,
            backgroundColor: spot.color,
            animationDelay: spot.delay,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  );
};

export default ColorSpots;