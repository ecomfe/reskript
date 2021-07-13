import {ReactNode} from 'react';
import './Button.css';

export interface Props {
    children: ReactNode;
    onClick?: () => void;
}

export default function Button({children, onClick}: Props) {
    return (
        <button type="button" className="button" onClick={onClick}>
            {children}
        </button>
    );
}
