import { plainToInstance } from 'class-transformer';
import SoftwareSkill from '../model/SoftwareSkill';
import { get } from './Database';

const softwareSkillsCollection = 'software_skills'

async function getListSoftwareSkills(): Promise<SoftwareSkill[]> {
    var response = await get(softwareSkillsCollection) as any[];
    return plainToInstance(SoftwareSkill, response);
}

export { getListSoftwareSkills }