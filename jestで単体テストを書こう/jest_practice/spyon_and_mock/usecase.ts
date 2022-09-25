import { CalcModuleA, TextModuleA } from "./moduleA";

export class UseCase {
  calc: CalcModuleA;
  constructor(readonly text: TextModuleA) {
    this.calc = new CalcModuleA(1);
  }

  public getText(textA: string, textB: string) {
    const s1 = textA.split('s');
    const s2 = textB.substr(-2);
    const c = this.calc.exec(textA.length, textB.length);
    const t = this.text.exec(s1[0], s2);
    return t + s1[s1.length -1] + c;
  }
}