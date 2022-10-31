export default function subtract(numbers: number[]): number|string {
  const result = numbers.reduce((previousVal, currentVal) => previousVal - currentVal);
  if (result < 0) return 'negative number';
  
  return result;
}