import { plainToInstance } from 'class-transformer';
import PageSection from '../model/PageSection';
import { get, getFileUrl, getByProperty } from './Database';

const pageSectionsCollection = 'page_sections'

async function getListPageSections(): Promise<PageSection[]> {
    var response = await get(pageSectionsCollection) as any[];
    return plainToInstance(PageSection, response);
}

async function getSectionImage(section: PageSection): Promise<string> {
    return getFileUrl(section.imagePath);
}

async function getSectionById(id: string): Promise<PageSection> {
    var response = await getByProperty(pageSectionsCollection, 'id', id);
    return plainToInstance(PageSection, response);
}

export { getListPageSections, getSectionImage, getSectionById };