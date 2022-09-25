import Dollar from './Dollar';

describe('', () => {

  it('5ドル * 2 = 10ドル', () => {
    const five_dollar = new Dollar(5);
    five_dollar.times(2);
    expect(five_dollar.amount).toBe(10);
  });

});