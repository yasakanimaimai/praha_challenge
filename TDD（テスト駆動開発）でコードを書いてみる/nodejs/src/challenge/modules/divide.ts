export default function divide(numbers: number[]){
  let result = numbers.reduce((previousVal, currentVal) => previousVal / currentVal);
  result = Math.floor(result * 1000) / 1000;
  return result;
}