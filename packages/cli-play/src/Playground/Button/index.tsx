import {ReactNode} from 'react';
import './index.css';

export interface Props {
    disabled?: boolean;
    children: ReactNode;
    onClick?: () => void;
}

export default function Button({disabled, children, onClick}: Props) {
    return (
        <button disabled={disabled} type="button" className="button" onClick={onClick}>
            {children}
        </button>
    );
}
