import './EducationContent.css';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Education from '../../model/Education';
import { getListEducation } from '../../repositories/EducationRepository';
import Timeline from '../../components/timeline/Timeline';
import TimelineItem from '../../components/timeline/TimelineItem';

function EducationContent() {

    const [listEducation, setListEducation] = useState<Education[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getListEducation();
            setListEducation(response)
        }

        fetchData().catch(console.error);
    }, [])

    const sortedList = listEducation.sort((a, b) => Number(b.startDate) - Number(a.startDate));

    return (
        <Timeline>
            {sortedList
                .map((education, index) => (
                    <TimelineItem key={index}>
                        <div className='education-row'>
                            <div className='education-institution'>
                                {education.educationalInstitution}
                            </div>
                            <div>
                                {education.studyArea}
                            </div>
                            <div>
                                {education.degree}
                            </div>
                            <div className='education-period'>
                                {moment(education.startDate).format('YYYY')} {(() => {
                                    if (education.endDate?.isValid() && education.endDate.getUTCFullYear() !== education.startDate.getUTCFullYear()) {
                                        return `to ${moment(education.endDate).format('YYYY')}`;
                                    }
                                })()}
                            </div>
                        </div>
                    </TimelineItem>
                ))}
        </Timeline>

    );
}

export default EducationContent;