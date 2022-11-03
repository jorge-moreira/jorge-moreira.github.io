import { plainToInstance } from 'class-transformer';
import PersonalSkill from '../model/PersonalSkill';
import { get } from './Database';

const personalSkillsCollection = 'personal_skills'

async function getListPersonalSkills(): Promise<PersonalSkill[]> {
    var response = await get(personalSkillsCollection) as any[];
    return plainToInstance(PersonalSkill, response);
}

export { getListPersonalSkills }