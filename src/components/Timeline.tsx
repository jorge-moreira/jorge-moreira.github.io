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
      <div className="absolute left-0 top-1">
        <div className={`w-3.5 h-3.5 rounded-full z-10 ${dotColor}`} />
      </div>
      
      {/* Connecting line to next dot (centered on dot) */}
      {!isLast && (
        <div 
          className="absolute w-px"
          style={{ 
            backgroundColor: 'var(--color-border)',
            left: 'calc(0.4375rem - 0.5px)',
            top: 'calc(0.25rem + 0.875rem)',
            height: 'calc(100% + 5rem - 0.25rem - 0.875rem)'
          }}
        />
      )}
      
      {children}
    </div>
  );
}
