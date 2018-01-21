import { Test, test } from 'beater';
import * as assert from 'power-assert';
import { BacklogClient, newClient } from '../../src/data/client';

const category = '/data/client ';
const tests: Test[] = [
  test(category + 'newClient', () => {
    const apiKey = 'apiKey1';
    const spaceKey = 'spaceKey1';
    const client: BacklogClient = newClient({ apiKey, spaceKey });
    assert(client._apiKey === apiKey); // internal api
    assert(client._spaceKey === spaceKey); // internal api
  })
];

export { tests };
