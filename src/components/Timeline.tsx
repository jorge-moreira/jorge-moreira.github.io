import type { ReactNode } from 'react';

interface TimelineProps {
  children: ReactNode;
}

interface TimelineItemProps {
  isLast?: boolean;
  dotColor?: string;
  children: ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  return (
    <div className="space-y-20">
      {children}
    </div>
  );
}

export function TimelineItem({ isLast, dotColor = 'bg-primary', children }: TimelineItemProps) {
  return (
    <div className="relative pl-10">
      {/* Timeline dot aligned with job title */}
      <div className="absolute left-0 top-1.5">
        <div className={`w-3.5 h-3.5 rounded-full z-10 ${dotColor}`} />
      </div>
      
      {/* Connecting line to next dot (centered on dot) */}
      {!isLast && (
        <div 
          className="absolute top-4 w-px"
          style={{ 
            backgroundColor: 'var(--color-border)',
            left: 'calc(0.3125rem - 0.5px)',
            height: 'calc(100% + 5rem)'
          }}
        />
      )}
      
      {children}
    </div>
  );
}
