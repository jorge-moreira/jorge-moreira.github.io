import './Contact.css';
import ContactModel from '../../model/Contact';
import Image from '../../components/image/Image';
import { useEffect, useState } from 'react';
import { getContactImage } from '../../repositories/ContactsRepository';

interface ContactProps {
    contact: ContactModel;
    index: number;
}

function Contact({ contact, index }: ContactProps) {
    const [contactImage, setContactImage] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await getContactImage(contact);
            setContactImage(response);
        }

        fetchData().catch(console.error);
    }, [])

    return (
        <a target='_blank'
            rel='noreferrer'
            className='contact'
            href={contact.isLink ? contact.link : undefined}
            tooltip-title={contact.value}
            key={index}>

            <Image source={contactImage} alt={contact.key} />
        </a>
    );
}

export default Contact;