import { Test, test } from 'beater';
import * as assert from 'power-assert';
import { getBaseUrl } from '../../src/_/get-base-url';

const category = '/get-base-url ';
const tests: Test[] = [
  test(category, () => {
    assert(getBaseUrl('space') === 'https://space.backlog.jp');
  })
];

export { tests };
