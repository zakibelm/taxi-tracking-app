import assert from 'assert';
process.env.NEXT_PUBLIC_TITLE = 'Jarvis';
assert.strictEqual(process.env.NEXT_PUBLIC_TITLE, 'Jarvis');
console.log('ui unit: OK');
