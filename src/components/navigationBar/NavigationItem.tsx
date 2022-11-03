import './NavigationItem.css';

interface NavigationItemProps {
    name: string;
    link: string;
    onClick?: () => void;
}

function NavigationItem({ link, name, onClick }: NavigationItemProps) {
    return (
        <div className='nav-bar-item'>
            <a href={link} onClick={onClick}>{name}</a>
        </div>
    );
}

export default NavigationItem;