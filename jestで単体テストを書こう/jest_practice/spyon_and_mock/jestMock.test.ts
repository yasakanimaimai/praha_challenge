import { describe, it, jest, expect } from '@jest/globals';
import { CalcModuleA, TextModuleA } from "./moduleA";
import { UseCase } from './usecase';

// テストファイルの最初で、mock化を行います。
// TestModuleAクラスをmock化する際に、CalcModuleAクラスも一緒にmock化されてしまうため、
// 一緒に処理を定義しておく必要があります。
jest.mock('./moduleA', () => {
  // moduleAのimport結果をmock
  return {
    // TextModuleAクラスのコンストラクタのmock定義
    TextModuleA: jest.fn().mockImplementation(() => {
      return {
        exec: jest.fn(),
      }
    }),
    // CalcModuleAクラスのコンストラクタのmock定義
    CalcModuleA: jest.fn().mockImplementation(() => {
      return {
        // execメソッドをmock化し、常に１を返すように設定
        exec: jest.fn().mockReturnValue(1)
      }
    })
  }
});

describe('jest.mockを使用したケース', () => {
  it('TextModuleA.exec mock', () => {
    // UseCaseクラスに渡すTextModuleAクラスのインスタンスを作成
    const t = new TextModuleA();
    // execメソッドのmock定義を取得
    const mockTextExec = t.exec as jest.Mock;
    // mock処理を仕込む
    mockTextExec.mockImplementation((a: string, b: string) => {
      return 'mock';
    })
    const usecase = new UseCase(t);
    // usecaseインスタンスないのCalcModuleAクラスのexecメソッドのmock定義を取得
    const mockCalcExec = usecase['calc'].exec;

    // テスト対象のメソッドを実行
    const result = usecase.getText('testA', 'planB');
    console.log(`mock result: ${result}`);

    // mock化したメソッドを実行
    expect(mockTextExec).toBeCalledWith('te', 'nB');
    expect(mockCalcExec).toBeCalledWith(5, 5);
    // テスト対象メソッドの結果を検証
    expect(result).toBe('mocktA1');
  })
});