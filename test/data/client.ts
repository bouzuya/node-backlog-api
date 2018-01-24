import { Test, test } from 'beater';
import * as assert from 'power-assert';
import {
  BacklogClient,
  getApiKey,
  getSpaceKey,
  newClient
} from '../../src/data/client';

const category = '/data/client ';
const tests: Test[] = [
  test(category, () => {
    const apiKey = 'apiKey1';
    const spaceKey = 'spaceKey1';
    const client: BacklogClient = newClient({ apiKey, spaceKey });
    assert(getApiKey(client) === apiKey);
    assert(getSpaceKey(client) === spaceKey);
  })
];

export { tests };
