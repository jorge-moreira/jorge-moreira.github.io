import { plainToInstance } from 'class-transformer';
import Profile from '../model/Profile';
import { get, getFileUrl } from './Database';

const profileCollection = 'profile'

async function getProfile(): Promise<Profile> {
    var response = await get(profileCollection) as any;
    return plainToInstance(Profile, response);
}

function getProfileImage(profile: Profile): Promise<string> {
    return getFileUrl(profile.imagePath);
}

export { getProfile, getProfileImage }