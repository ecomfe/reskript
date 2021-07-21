import {createElement, ComponentType, SVGAttributes, useCallback} from 'react';
import {PanelType} from '../interface';
import {ReactComponent as IconEdit} from './icons/edit.svg';
import {ReactComponent as IconInfo} from './icons/info.svg';
import {ReactComponent as IconHelp} from './icons/help.svg';
import './index.css';

interface NavItemProps {
    type: PanelType;
    active: boolean;
    iconType: ComponentType<SVGAttributes<SVGElement>>;
    onClick: (type: PanelType) => void;
}

function NavItem({type, active, iconType, onClick}: NavItemProps) {
    const click = useCallback(
        () => onClick(type),
        [onClick, type]
    );

    return (
        <div className={active ? 'item active' : 'item'} onClick={click}>
            {createElement(iconType, {className: 'icon'})}
        </div>
    );
}

interface Props {
    panelType: PanelType;
    onNavigate: (panel: PanelType) => void;
}

export default function Sidebar({panelType, onNavigate}: Props) {
    return (
        <nav className="sidebar">
            <NavItem iconType={IconEdit} type="source" active={panelType === 'source'} onClick={onNavigate} />
            <NavItem iconType={IconInfo} type="description" active={panelType === 'description'} onClick={onNavigate} />
            <NavItem iconType={IconHelp} type="help" active={panelType === 'help'} onClick={onNavigate} />
        </nav>
    );
}
