import { plainToInstance } from 'class-transformer';
import Contact from '../model/Contact';
import { get, getFileUrl } from './Database';

const contactsCollection = 'contacts'

async function getListContacts(): Promise<Contact[]> {
    var response = await get(contactsCollection) as any[];
    return plainToInstance(Contact, response);
}

async function getContactImage(contact: Contact): Promise<string> {
    return getFileUrl(contact.imagePath);
}

export { getListContacts, getContactImage }