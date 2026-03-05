import './TimelineItem.css';
import { createRef, ReactNode, useEffect, useMemo, useRef, useState } from "react";

interface TimelineItemProps {
    children: ReactNode | ReactNode[] | JSX.Element | JSX.Element[];
    key?: number;
    title?: string;
    icon?: string;
    startDate?: Date;
    endDate?: Date;
    date?: Date;
}

function TimelineItem({ children, key, title, date, startDate, endDate, icon }: TimelineItemProps) {

    const timelineItemRef = createRef<HTMLDivElement>();

    const handleClick = () => {
        timelineItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div
            className="timeline-item"
            key={key !== undefined ? key : undefined} ref={timelineItemRef}
            onClick={handleClick}>
            <div className='timeline-item-content'>
                {children}
            </div>
            <span className="circle" />
        </div>
    );
}

export default TimelineItem;