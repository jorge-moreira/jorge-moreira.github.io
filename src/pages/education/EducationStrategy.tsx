import SectionTitle from '../../components/sectionTitle/SectionTitle';
import IStrategy from '../../infrastructure/patterns/strategy/Strategy';
import PageSection from '../../model/PageSection';
import EducationContent from './EducationContent';

class EducationStrategy implements IStrategy<JSX.Element, PageSection>  {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    doAction(parameters?: PageSection | undefined): JSX.Element {
        if (parameters !== undefined) {
            return (
                <div id={parameters.id}>
                    <SectionTitle section={parameters} />
                    <EducationContent />
                </div>
            );
        }

        throw `Error rendering ${this.name} section.`
    }
}

export default EducationStrategy;