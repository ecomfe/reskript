import {ReactNode} from 'react';
import './index.css';

export interface Props {
    title: string;
    children: ReactNode;
}

export default function Notice({title, children}: Props) {
    return (
        <div className="mask">
            <div className="notice">
                <h3 className="title">{title}</h3>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
