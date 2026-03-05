import { Type } from "class-transformer";

class Education {
    degree: string;
    educationalInstitution: string;
    @Type(() => Date) startDate: Date;
    @Type(() => Date) endDate: Date;
    studyArea: string;
}

export default Education;