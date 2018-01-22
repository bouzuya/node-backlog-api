import { Test, test } from 'beater';
import * as assert from 'power-assert';
import { buildUrl } from '../../src/_/build-url';

const category = '/_/build-url ';
const tests: Test[] = [
  test(category, () => {
    const url = buildUrl(
      'http://example.com',
      '/p/t',
      { a: '1', b: '2' }
    );
    assert(url === 'http://example.com/p/t?a=1&b=2');
  })
];

export { tests };
