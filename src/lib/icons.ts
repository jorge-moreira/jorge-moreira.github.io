import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMoon, faSun, faFileLines, faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCode, faXmark, faBars, faArrowUpRightFromSquare, faCodeBranch, faChevronRight, faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';

const iconList = [
    faGithub,
    faLinkedinIn,
    faEnvelope,
    faCode,
    faXmark,
    faMoon,
    faSun,
    faBars,
    faArrowUpRightFromSquare,
    faFileLines,
    faCodeBranch,
    faCheck,
    faChevronDown,
    faCircle,
    faChevronRight
];

library.add(...iconList);

export const Icons = {
    Github: faGithub,
    Linkedin: faLinkedinIn,
    Mail: faEnvelope,
    Moon: faMoon,
    Sun: faSun,
    File: faFileLines,
    Circle: faCircle,
    Code: faCode,
    Close: faXmark,
    Menu: faBars,
    ExternalLink: faArrowUpRightFromSquare,
    Branch: faCodeBranch,
    ChevronRight: faChevronRight,
    ChevronDown: faChevronDown,
    Check: faCheck,
} as const;