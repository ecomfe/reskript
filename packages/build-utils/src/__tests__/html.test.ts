import {describe, test, expect} from 'vitest';
import {injectIntoHtml} from '../html';

describe('injectIntoHtml', () => {
    test('head start has head', () => {
        const output = injectIntoHtml(
            '<html><head></head></html>',
            {headStart: 'foo'}
        );
        expect(output.includes('<head>foo</head>')).toBe(true);
    });

    test('head start no head', () => {
        const output = injectIntoHtml(
            '<html></html>',
            {headStart: 'foo'}
        );
        expect(output.includes('<head>foo</head>')).toBe(true);
    });

    test('head end has head', () => {
        const output = injectIntoHtml(
            '<html><head></head></html>',
            {headEnd: 'foo'}
        );
        expect(output.includes('<head>foo</head>')).toBe(true);
    });

    test('head end no head', () => {
        const output = injectIntoHtml(
            '<html></html>',
            {headStart: 'foo'}
        );
        expect(output.includes('<head>foo</head>')).toBe(true);
    });

    test('body start has head', () => {
        const output = injectIntoHtml(
            '<html><head></head></html>',
            {bodyStart: 'foo'}
        );
        expect(output.includes('<head></head>foo')).toBe(true);
    });

    test('body start no head', () => {
        const output = injectIntoHtml(
            '<html></html>',
            {bodyStart: 'foo'}
        );
        expect(output.includes('</head>foo')).toBe(true);
    });

    test('body end has body', () => {
        const output = injectIntoHtml(
            '<html><body></body></html>',
            {bodyStart: 'foo'}
        );
        expect(output.includes('foo</body>')).toBe(true);
    });

    test('body end no body has html', () => {
        const output = injectIntoHtml(
            '<html></html>',
            {bodyEnd: 'foo'}
        );
        expect(output.includes('foo</html>')).toBe(true);
    });

    test('body end no body no html', () => {
        const output = injectIntoHtml(
            '<html>',
            {bodyEnd: 'foo'}
        );
        expect(output.includes('<html>foo')).toBe(true);
    });
});
