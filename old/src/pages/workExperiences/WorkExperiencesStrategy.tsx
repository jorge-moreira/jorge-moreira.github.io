import SectionTitle from '../../components/sectionTitle/SectionTitle';
import IStrategy from '../../infrastructure/patterns/strategy/Strategy';
import PageSection from '../../model/PageSection';
import WorkExperiencesContent from './WorkExperiencesContent';

class WorkExperiencesStrategy implements IStrategy<JSX.Element, PageSection> {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    doAction(parameters?: PageSection | undefined): JSX.Element {
        if (parameters !== undefined) {
            return (
                <div id={parameters.id}>
                    <SectionTitle section={parameters} />
                    <WorkExperiencesContent />
                </div>
            );
        }

        throw `Error rendering ${this.name} section.`
    }
}

export default WorkExperiencesStrategy;