import Dollar from './Dollar';

describe('', () => {

  it('miltiplication', () => {
    const five_dollar = new Dollar(5);
    const ten_dollar = five_dollar.times(2);
    expect(ten_dollar.amount).toBe(10);
    const fifteen_dolar = five_dollar.times(3);
    expect(fifteen_dolar.amount).toBe(15);
  });

});