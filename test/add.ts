import { Test, test } from 'beater';
import * as assert from 'power-assert';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';
import { add } from '../src/add';

const category = 'add ';
const tests: Test[] = [
  test(category + '1 + 2 = 3', () => {
    assert(add(1, 2) === 3);
  }),
  test(category + 'proxyquire & sinon', () => {
    assert(proxyquire);
    assert(sinon);
  })
];

export { tests };
