import {render} from '@testing-library/react';
import Create from '../index';

const noop = () => {};

test('render', () => {
    const {container} = render(<Create onSubmit={noop} />);
    expect(container.querySelector('input[type="text"]')).toBeTruthy();
});
