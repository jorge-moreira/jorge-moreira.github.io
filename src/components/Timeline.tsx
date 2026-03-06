import { ReactNode } from 'react';

interface TimelineProps {
  children: ReactNode;
}

interface TimelineItemProps {
  dotColor: string;
  isLast?: boolean;
  children: ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  return (
    <div className="space-y-20">
      {children}
    </div>
  );
}

export function TimelineItem({ dotColor, isLast, children }: TimelineItemProps) {
  return (
    <div className="relative pl-10">
      {/* Timeline dot aligned with job title */}
      <div className="absolute left-0 top-1.5">
        <div className={`w-5 h-5 rounded-full shadow-lg z-10 ${dotColor}`} />
      </div>
      
      {/* Connecting line to next dot (centered on dot) */}
      {!isLast && (
        <div 
          className="absolute top-6.5 w-0.5"
          style={{ 
            backgroundColor: 'hsl(var(--color-border))',
            left: 'calc(0.625rem - 0.0625rem)', // Center of w-5 dot minus half of w-0.5 line
            height: 'calc(100% + 5rem)' // Extends through content + gap to reach next dot center
          }}
        />
      )}
      
      {children}
    </div>
  );
}
