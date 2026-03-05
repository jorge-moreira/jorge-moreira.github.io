import { plainToInstance } from 'class-transformer';
import Education from '../model/Education';
import { get } from './Database';

const educationCollection = 'education'

async function getListEducation(): Promise<Education[]> {
    var response = await get(educationCollection) as any[];
    return plainToInstance(Education, response);
}

export { getListEducation }