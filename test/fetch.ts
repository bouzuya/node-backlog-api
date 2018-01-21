import { Test, test } from 'beater';
import * as assert from 'power-assert';
import { fetch } from '../src/fetch';

const category = 'fetch ';
const tests: Test[] = [
  test(category + 'export fetch', () => {
    assert(typeof fetch === 'function');
  })
];

export { tests };
