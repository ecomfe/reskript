import {TextEncoder} from 'util';
import Environment from 'jest-environment-jsdom';

export default class DomEnvironment extends Environment {
    async setup() {
        await super.setup();
        if (typeof this.global.TextEncoder === 'undefined') {
            this.global.TextEncoder = TextEncoder;
        }
    }
}
