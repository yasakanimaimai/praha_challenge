import { describe, it, jest, expect } from '@jest/globals';
import { CalcModuleA, TextModuleA } from "./moduleA";
import { UseCase } from './usecase';

describe('spyOnでmockする方法', () => {
  it('TextModuleA.exec mock', () => {
    // UseCaseクラスに渡すModuleAクラスのインスタンスを作成
    const t = new TextModuleA();
    // execメソッドのmock化
    const mockTextExec = jest.spyOn(t, 'exec');
    // mock処理を仕込む
    mockTextExec.mockImplementation((a: string, b: string) => {
      return 'spy';
    });
    // UseCaseにspyOnしたmoduleAをセット
    const usecase = new UseCase(t);

    // usecaseがCalcModuleAのインスタンスを持っているので、
    // そのexecメソッドをmock化
    // spyOnしてimplementationなどしなければ実装元の関数が呼ばれ、監視対象になる
    const mockCalcExec = jest.spyOn(usecase['calc'], 'exec');

    // テスト対象のメソッドを実行
    const result = usecase.getText('testA', 'planB');
    console.log(`spyOn result: ${result}`);

    // mock化したメソッドの引数を検証
    expect(mockTextExec).toBeCalledTimes(1);
    expect(mockTextExec).toBeCalledWith('te', 'nB');
    expect(mockCalcExec).toBeCalledTimes(1);
    expect(mockCalcExec).toBeCalledWith(5, 5);
    // テスト対象メソッドの結果を検証
    expect(result).toBe('spytA9');
  })
});