import './PersonalSkillsContent.css';
import { useEffect, useState } from 'react';
import PersonalSkill from '../../model/PersonalSkill';
import { getListPersonalSkills } from '../../repositories/PersonalSkillsRepository';

function PersonalSkillsContent() {

    const [listPersonalSkills, setListPersonalSkills] = useState<PersonalSkill[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getListPersonalSkills();
            setListPersonalSkills(response)
        }

        fetchData().catch(console.error);
    }, [])

    return (
        <div className='personal-skills-list'>
            {listPersonalSkills
                .map((personalSkill, index) => (
                    <div className='personal-skills-row' key={index}>
                        {personalSkill.name}
                    </div>
                ))}
        </div>
    );
}

export default PersonalSkillsContent;