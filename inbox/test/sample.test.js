// contract test code will go here
const assert = require('assert');

beforeEach((...args) => {
  console.debug('Hello');
  console.debug({ args });
});

describe('Add', () => {
  it('one plus one', () => {
    assert.equal(1 + 1, 2);
  });
  it('one plus two', () => {
    assert.equal(1 + 2, 3);
  });
});
