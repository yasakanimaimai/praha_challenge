import add from './add';
import multiply from './multiply';
import subtract from './subtract';
import divide from './divide';

export interface Operators {
  add: (numbers: number[]) => number | string;
  multiply: (numbers: number[]) => number | string;
  subtract: (numbers: number[]) => number | string;
  divide: (numbers: number[]) => number | string;
}

export class fourArithmeticOperations {

  private operators: Operators;

  constructor(operators: Operators) {
    this.operators = operators;
  };
  
  exec(operationName: string, ...numbers: number[]): number|string {
    if (numbers.length === 0) throw Error('Lack of calculation target arg');
    if (numbers.length >= 31) throw Error('Over arg number');
  
    switch (operationName) {
      case 'add':
        return this.operators.add(numbers);
      case 'multiply':
        return this.operators.multiply(numbers);
      case 'subtract':
        return this.operators.subtract(numbers);
      case 'divide':
        return this.operators.divide(numbers);
      default:
        return '';
    }
  }
}