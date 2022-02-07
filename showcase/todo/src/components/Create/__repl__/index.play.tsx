import {ReactNode} from 'react';

interface Props {
    children: ReactNode;
}

export function Wrapper({children}: Props) {
    return (
        <div style={{padding: 20}}>
            {children}
        </div>
    );
}
