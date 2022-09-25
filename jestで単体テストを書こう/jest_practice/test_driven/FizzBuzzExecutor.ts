import FizzBuzz from "./FizzBuzz";

export default class FizzBuzzExecutor {
  private fizzBuzz: FizzBuzz;
  constructor(fizzBuzz: FizzBuzz) {
    this.fizzBuzz = fizzBuzz;
  }

  public execute(startNum: number, endNum: number): void {
    for (let i = startNum; i <= endNum; i++) {
      this.fizzBuzz.execute(i);
    }
  }
}