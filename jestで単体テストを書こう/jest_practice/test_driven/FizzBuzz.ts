export default class FizzBuzz {
  public execute(num: number): any {
    return num == 0 ? 0 : num % 15 == 0 ? 'FizzBuzz' : num % 5 == 0 ? 'Buzz' : num % 3 == 0 ? 'Fizz' : num;
  }
}