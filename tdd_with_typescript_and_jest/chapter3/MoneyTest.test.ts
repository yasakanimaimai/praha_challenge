import Dollar from './Dollar';

describe('', () => {

  it('Multiplication', () => {
    const five_dollar = new Dollar(5);
    const ten_dollar = five_dollar.times(2);
    expect(ten_dollar.amount).toBe(10);
    const fifteen_dolar = five_dollar.times(3);
    expect(fifteen_dolar.amount).toBe(15);
  });

  it('Equality', () => {
    const five_dollar = new Dollar(5);
    expect(five_dollar.equals(new Dollar(5))).toBeTruthy;
    expect(five_dollar.equals(new Dollar(6))).toBeFalsy;
  })

});