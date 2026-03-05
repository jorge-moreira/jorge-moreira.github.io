import './Timeline.css';
import { ReactNode } from "react";

interface TimelineProps {
    children: ReactNode | ReactNode[]
    lineColor?: string;
}


function Timeline({ children, lineColor }: TimelineProps) {

    if (typeof window === 'object') {
        document.documentElement.style.setProperty('--line-color', lineColor !== undefined ? lineColor : 'black');
    }

    return (
        <div className="timeline-container">
            {children}
        </div>
    );
}

export default Timeline;