import add from './add';
import multiply from './multiply';
import subtract from './subtract';
import divide from './divide';

export const swichFourArithmeticOperations = (operationName: string, ...numbers: number[]) => {
  if (numbers.length === 0) throw Error('Lack of calculation target arg');
  if (numbers.length >= 31) throw Error('Over arg number');

  switch (operationName) {
    case 'add':
      return add(numbers);
    case 'multiply':
      return multiply(numbers);
    case 'subtract':
      return subtract(numbers);
    case 'divide':
      return divide(numbers);
    default:
      break;
  }
}