import { Dummy } from '../src/dummy';

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('DummyClass is instantiable', () => {
    expect(new Dummy()).toBeInstanceOf(Dummy);
  });

  it('getPerson should return a new Person', () => {
    const result = new Dummy().getPerson('john');
    expect(result.name).toEqual('john');
  });
});
