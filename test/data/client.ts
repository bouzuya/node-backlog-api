import { Test, test } from 'beater';
import * as assert from 'power-assert';
import { BacklogClient, newClient } from '../../src/data/client';

const category = '/data/client ';
const tests: Test[] = [
  test(category + 'newClient', () => {
    const apiKey = 'foo';
    const client: BacklogClient = newClient({ apiKey });
    assert(client._apiKey === apiKey); // internal api
  })
];

export { tests };
