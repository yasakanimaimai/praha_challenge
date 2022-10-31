export default function multiply(numbers: number[]): number|string {
  const result = numbers.reduce((previousVal, currentVal) => previousVal * currentVal);
  if (result > 1000) return 'big big number';

  return result;
}