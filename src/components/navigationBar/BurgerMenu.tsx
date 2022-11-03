import './BurgerMenu.css'

interface BurgerMenuProps {
    onClick: () => void;
    isNavExpanded: boolean;
}

function BurgerMenu({ onClick, isNavExpanded }: BurgerMenuProps) {
    return (
        <div className='burger'>
            <input type="checkbox" onClick={onClick} className={isNavExpanded ? 'expanded' : undefined} />
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default BurgerMenu;