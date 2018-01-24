import { Test, test } from 'beater';
import * as assert from 'power-assert';
import { HttpMethod } from '../../src/data/http-method';

const category = '/data/http-method ';
const tests: Test[] = [
  test(category, () => {
    const deleteMethod: HttpMethod = 'DELETE';
    const get: HttpMethod = 'GET';
    const patch: HttpMethod = 'PATCH';
    const post: HttpMethod = 'POST';
    assert(deleteMethod === 'DELETE');
    assert(get === 'GET');
    assert(patch === 'PATCH');
    assert(post === 'POST');
  })
];

export { tests };
