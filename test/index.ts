import { Test, run } from 'beater';
import { tests as underscoreTests } from './_';
import { tests as dataTests } from './data';

const tests = ([] as Test[])
  .concat(dataTests)
  .concat(underscoreTests);

run(tests).catch(() => process.exit(1));
