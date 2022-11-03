import './InterestsContent.css';
import { useEffect, useState } from 'react';
import PersonalSkill from '../../model/PersonalSkill';
import { getListInterestsAndHobbies } from '../../repositories/InterestsRepository';

function InterestsContent() {

    const [listInterests, setListInterests] = useState<PersonalSkill[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getListInterestsAndHobbies();
            setListInterests(response)
        }

        fetchData().catch(console.error);
    }, [])

    return (
        <div className='interests-list'>
            {listInterests
                .map((interest, index) => (
                    <div className='interests-row' key={index}>
                        {interest.name}
                    </div>
                ))}
        </div>
    );
}

export default InterestsContent;