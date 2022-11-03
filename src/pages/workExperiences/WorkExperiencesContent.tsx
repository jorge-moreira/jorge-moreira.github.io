import './WorkExperienceContent.css';
import moment from 'moment';
import { useEffect, useState } from 'react';
import WorkExperience from '../../model/WorkExperience';
import { getListWorkExperiences } from '../../repositories/WorkExperiencesRepository';
import Timeline from '../../components/timeline/Timeline';
import TimelineItem from '../../components/timeline/TimelineItem';

function WorkExperiencesContent() {

    const [listWorkExperiences, setListWorkExperiences] = useState<WorkExperience[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getListWorkExperiences();
            setListWorkExperiences(response)
        }

        fetchData().catch(console.error);
    }, [])

    const sortedList = listWorkExperiences.sort((a, b) => Number(b.startDate) - Number(a.startDate));

    return (
        <Timeline>
            {sortedList
                .map((workExperience, index) => (
                    <TimelineItem key={index}>
                        <div className='work-experience-row'>
                            <div className='work-experience-company'>
                                {workExperience.companyName}
                            </div>
                            <div className='work-experience-title'>
                                {workExperience.title}
                            </div>
                            <div className='work-experience-period'>
                                {moment(workExperience.startDate).format('MMM YYYY')} to  {(() => {
                                    if (workExperience.endDate?.isValid()) {
                                        return moment(workExperience.endDate).format('MMM YYYY');
                                    }

                                    return 'Today';
                                })()}
                            </div>
                        </div>
                    </TimelineItem>
                ))}
        </Timeline>
    );
}

export default WorkExperiencesContent;