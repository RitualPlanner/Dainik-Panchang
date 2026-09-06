// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');

const commitMsgFile = process.argv[2];
if (!commitMsgFile) {
  console.error('Error: No commit message file provided.');
  process.exit(1);
}

const commitMsg = fs.readFileSync(commitMsgFile, 'utf8').trim();

// Ignore merge / automatic git messages
if (commitMsg.startsWith('Merge branch') || commitMsg.startsWith('Merge pull request')) {
  process.exit(0);
}

// 1. Length check (max 100 characters)
if (commitMsg.length > 100) {
  console.error(`\x1b[31mError: Commit message is too long (${commitMsg.length} characters). Max length is 100 characters.\x1b[0m`);
  process.exit(1);
}

// 2. Format and Prefix check
const allowedTypes = [
  'feat',
  'refactor',
  'perf',
  'docs',
  'fix',
  'chore',
  'ci',
  'style',
  'build',
  'test',
  'revert'
];

const pattern = new RegExp(`^(${allowedTypes.join('|')})(\\([a-zA-Z0-9_\\-\\s]+\\))?\\!?\\:\\s.+`);

if (!pattern.test(commitMsg)) {
  console.error('\x1b[31mError: Invalid commit message format.\x1b[0m');
  console.error(`Message must start with one of these types: \x1b[33m${allowedTypes.join(', ')}\x1b[0m`);
  console.error('Format: \x1b[36mtype(scope)?: message\x1b[0m');
  console.error('Example: \x1b[32mfeat(ui): add navbar layout\x1b[0m');
  process.exit(1);
}
