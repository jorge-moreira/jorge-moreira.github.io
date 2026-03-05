import './SoftwareSkillsContent.css';
import { useEffect, useState } from 'react';
import SoftwareSkill from '../../model/SoftwareSkill';
import { getListSoftwareSkills } from '../../repositories/SoftwareSkillsRepository';

function SoftwareSkillsContent() {

    const [listSoftwareSkills, setListSoftwareSkills] = useState<SoftwareSkill[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getListSoftwareSkills();
            setListSoftwareSkills(response)
        }

        fetchData().catch(console.error);
    }, [])

    return (
        <div className='software-skills-list'>
            {listSoftwareSkills
                .map((softwareSkill, index) => (
                    <div className='software-skills-row' key={index}>
                        {softwareSkill.name}
                    </div>
                ))}
        </div>
    );
}

export default SoftwareSkillsContent;