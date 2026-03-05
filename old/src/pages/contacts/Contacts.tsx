import { useEffect, useState } from 'react';
import ContactModel from '../../model/Contact';
import { getListContacts } from '../../repositories/ContactsRepository';
import Contact from './Contact';

function Contacts() {
    const [listContacts, setListContacts] = useState<ContactModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getListContacts();
            setListContacts(response)
        }

        fetchData().catch(console.error);
    }, [])

    return (
        <div className='contacts'>
            {listContacts
                .map((contact, index) => (
                    <Contact contact={contact} index={index} />
                ))}
        </div>
    );
}

export default Contacts;