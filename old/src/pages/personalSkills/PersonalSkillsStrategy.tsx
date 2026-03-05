import SectionTitle from '../../components/sectionTitle/SectionTitle';
import IStrategy from '../../infrastructure/patterns/strategy/Strategy';
import PageSection from '../../model/PageSection';
import PersonalSkillsContent from './PersonalSkillsContent';

class PersonalSkillsStrategy implements IStrategy<JSX.Element, PageSection> {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    doAction(parameters?: PageSection | undefined): JSX.Element {
        if (parameters !== undefined) {
            return (
                <div id={parameters.id}>
                    <SectionTitle section={parameters} />
                    <PersonalSkillsContent />
                </div>
            );
        }

        throw `Error rendering ${this.name} section.`
    }
}

export default PersonalSkillsStrategy;