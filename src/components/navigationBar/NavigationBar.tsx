import { Children, cloneElement, ReactElement, useState } from 'react';
import BurgerMenu from './BurgerMenu';
import './NavigationBar.css'

interface NavigationBarProps {
    title: string;
    link: string;
    children?: ReactElement | ReactElement[]
}

function NavigationBar({ title, link, children }: NavigationBarProps) {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const handleOnClick = () => {
        if (window.innerWidth < 1280) {
            setIsNavExpanded(!isNavExpanded);
        }
    };

    const childrenWithOnClickAction = children != undefined &&
        Children.map(children, child => {
            return cloneElement(child, { onClick: handleOnClick });
        });

    return (
        <div className="nav-bar">
            {children !== undefined && <BurgerMenu onClick={handleOnClick} isNavExpanded={isNavExpanded} />}
            <div className='nav-bar-title'>
                <a href={link}>{title}</a>
            </div>
            <div className={isNavExpanded ? 'nav-bar-items expanded' : 'nav-bar-items'}>
                {childrenWithOnClickAction}
            </div>
            {isNavExpanded && <div className='nav-bar-expanded-background' onClick={handleOnClick} />}
        </div>
    );
}

export default NavigationBar;