import './SectionTitle.css'
import PageSection from '../../model/PageSection';
import Image from '../../components/image/Image';
import { useEffect, useState } from 'react';
import { getSectionImage } from '../../repositories/PageSectionsRepository';

interface SectionTitleProps {
    section: PageSection
}

function SectionTitle({ section }: SectionTitleProps) {

    const [sectionImage, setSectionImage] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await getSectionImage(section);
            setSectionImage(response)
        }

        fetchData().catch(console.error);
    })

    return (
        <div className='section-title'>
            <div className='section-title-image'>
                <Image source={sectionImage} alt={section.imagePath} />
            </div>
            <div className='section-title-name'>
                {section?.name}
            </div>
        </div>
    );
}

export default SectionTitle;