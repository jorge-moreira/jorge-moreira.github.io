import { Type } from "class-transformer";

class WorkExperience {
    companyName: string;
    @Type(() => Date) startDate: Date;
    @Type(() => Date) endDate?: Date;
    title: string;
}

export default WorkExperience;