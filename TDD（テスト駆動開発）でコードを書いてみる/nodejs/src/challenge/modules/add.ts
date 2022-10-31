export default function add(numbers: number[]): number|string {
  const result = numbers.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
  if (result > 1000) return 'too big';
  return result;
}