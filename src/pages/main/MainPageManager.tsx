import IStrategy from '../../infrastructure/patterns/strategy/Strategy';
import StrategyManager from '../../infrastructure/patterns/strategy/StrategyManager';
import PageSection from '../../model/PageSection';
import EducationStrategy from '../education/EducationStrategy';
import InterestsStrategy from '../interests/InterestsStrategy';
import PersonalSkillsStrategy from '../personalSkills/PersonalSkillsStrategy';
import SoftwareSkillsStrategy from '../softwareSkills/SoftwareSkillsStrategy';
import WorkExperiencesStrategy from '../workExperiences/WorkExperiencesStrategy';

const strategiesMapper: Record<string, IStrategy<JSX.Element, PageSection>> = {
    work_experiences: new WorkExperiencesStrategy('work_experiences'),
    education: new EducationStrategy('education'),
    software_skills: new SoftwareSkillsStrategy('software_skills'),
    personal_skills: new PersonalSkillsStrategy('personal_skills'),
    interests_hobbies: new InterestsStrategy('interests_hobbies'),
};

class MainPageManager {
    strategyManager: StrategyManager<JSX.Element, PageSection>;
    constructor(components: PageSection[]) {
        this.strategyManager = this.createStrategyManager(components);
    }
    render(component: PageSection): JSX.Element {
        var strategy = this.strategyManager.getStrategy(component.id);
        return strategy.doAction(component);
    }
    createStrategyManager(components: PageSection[]): StrategyManager<JSX.Element, PageSection> {
        var strategyManager = new StrategyManager<JSX.Element, PageSection>();
        components.forEach(component => {
            strategyManager.addStrategy(strategiesMapper[component.id]);
        });
        return strategyManager;
    }
}

export default MainPageManager;