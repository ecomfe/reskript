import {createElement, ComponentType, SVGAttributes, useCallback} from 'react';
import {PanelType} from '../interface.js';
import IconEdit from './icons/edit.svg?react';
import IconInfo from './icons/info.svg?react';
import IconHelp from './icons/help.svg?react';
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
