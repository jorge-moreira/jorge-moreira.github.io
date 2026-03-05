import './MainPage.css';
import { useEffect, useState } from 'react';
import PageSection from '../../model/PageSection';
import { getListPageSections } from '../../repositories/PageSectionsRepository';
import MainPageManager from './MainPageManager';

function MainPage() {
    const [sections, setSections] = useState<PageSection[]>([]);
    const [mainPageManager, setMainPageManager] = useState<MainPageManager>(new MainPageManager([]));

    useEffect(() => {
        const fetchData = async () => {
            const response = await getListPageSections();
            setSections(response);
            setMainPageManager(new MainPageManager(response));
        }

        fetchData().catch(console.error);
    }, [])

    return (
        <div className='sections'>
            {sections.map(section => (
                mainPageManager.render(section)
            ))}
        </div>
    );
}

export default MainPage;