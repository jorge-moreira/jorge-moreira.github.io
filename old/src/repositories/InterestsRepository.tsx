import { plainToInstance } from "class-transformer";
import Interest from "../model/Interest";
import { get } from "./Database";

const interestsAndHobbiesCollection = 'interests_hobbies'

async function getListInterestsAndHobbies(): Promise<Interest[]> {
    var response = await get(interestsAndHobbiesCollection) as any[];
    return plainToInstance(Interest, response);
}

export { getListInterestsAndHobbies }