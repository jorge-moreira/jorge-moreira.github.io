import { plainToInstance } from 'class-transformer';
import WorkExperience from '../model/WorkExperience';
import { get } from './Database';

const workExperiencesCollection = 'work_experiences';

async function getListWorkExperiences(): Promise<WorkExperience[]> {
    var response = await get(workExperiencesCollection) as any[];
    return plainToInstance(WorkExperience, response);
}

export { getListWorkExperiences }