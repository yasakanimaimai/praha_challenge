import { describe, it, jest, expect, beforeEach, afterEach } from '@jest/globals';
import { CalcModuleA, TextModuleA } from "./moduleA";
import { UseCase } from './usecase';

describe('mockの結果を呼び出しごとに設定する場合', () => {
  it('定義した順番にその値が呼び出される', () => {
    // UseCaseクラスに渡すTextModuleAクラスのインスタンスを作成
    const t = new TextModuleA();
    // execメソッドのmock化
    const mockTextExec = jest.spyOn(t, 'exec');
    // mock処理を仕込む
    mockTextExec.mockImplementationOnce((a: string, b: string) => {
      return 'spy1';
    }).mockImplementationOnce(() => 'spy2')
    .mockReturnValueOnce('spy3');

    // 先に定義した値から順番に返される
    expect(t.exec('a', 'b')).toBe('spy1');
    expect(t.exec('a', 'b')).toBe('spy2');
    expect(t.exec('a', 'b')).toBe('spy3');
    // 定義したものを全て読んだ後は、デフォルトの処理が呼ばれる
    expect(t.exec('a', 'b')).toBe('ab');
  })
});

describe('jest.spyOn()でインスタンスを取得せずにmockする方法', () => {
  beforeEach(() => {
    // CalcModuleAクラスのexecメソッドをmock化
    jest.spyOn(CalcModuleA.prototype, 'exec');
    // TextModuleAクラスのexecメソッドをmock化
    jest.spyOn(TextModuleA.prototype, 'exec');
  });
  afterEach(() => {
    //test外で、mock定義を行うため、`afterEach()`で、mockの初期化やクリア処理を行う。
    //CalcModuleAクラスのexecメソッドのmock履歴をクリア
    (CalcModuleA.prototype.exec as jest.Mock).mockClear();
    //TextModuleAクラスのexecメソッドのmock定義を本来のものに戻す
    (TextModuleA.prototype.exec as jest.Mock).mockRestore();
  })

  it('TextModuleA.exec mock', () => {
    //TextModuleAクラスのexecメソッドのmock処理を仕込む
    (TextModuleA.prototype.exec as jest.Mock).mockImplementation((a: string, b: string) => {
      return 'spy';
    });

    // TestClassクラスに渡すTextModuleAクラスのインスタンスを作成
    const t = new TextModuleA();
    const usecase = new UseCase(t);

    // テスト対象のメソッドを実行
    const result = usecase.getText('testA', 'planB');
    console.log(`spyOn result: ${result}`);

    // mock化したメソッドの引数を検証
    expect(TextModuleA.prototype.exec).toBeCalledTimes(1);
    expect(TextModuleA.prototype.exec).toBeCalledWith('te', 'nB');
    expect(CalcModuleA.prototype.exec).toBeCalledTimes(1);
    expect(CalcModuleA.prototype.exec).toBeCalledWith(5, 5);
    // テスト対象メソッドの結果を検証
    expect(result).toBe('spytA9');
  })
});


// モジュール全体を読み込む
import * as moduleA from './moduleA';
describe('jest.spyOn()でコンストラクタをmockする方法', () => {
  // mock前の本来の処理を格納する
  const original = moduleA.CalcModuleA;

  beforeEach(() => {
    // mockしたいコンストラクタのクラスを指定することで、コンストラクタをmockできる
    // デフォルトの処理として、本来のコンストラクタを呼び出すようにする
    jest.spyOn(moduleA, 'CalcModuleA').mockImplementation((x) => {return new original(x)});
  })

  afterEach(() => {
    // CalcModuleAクラスのコンストラクタのmock定義を本来のものに戻す
    (CalcModuleA as jest.Mock).mockRestore();
  })

  it(`CalcModuleA.exec mock`, () => {
    // CalcModuleAクラスのコンストラクタをmockし、execメソッドが常に1000を返すように設定
    const mockCalcExec = jest.fn((a, b) => { return 1000 });
    (CalcModuleA as jest.Mock).mockImplementation((x: number) => {
      return {
        x,
        exec: mockCalcExec
      }
    });
    const t = new TextModuleA();
    const usecase = new UseCase(t);
    const result = usecase.getText('testA', 'planB');
    console.log(`spyOn result: ${result}`);

    // mock化したコンストラクタの呼び出し回数と引数を検証
    expect(CalcModuleA).toBeCalledTimes(1);
    expect(CalcModuleA).toBeCalledWith(1);
    // mock化したexecメソッドの引数を検証
    expect(mockCalcExec).toBeCalledWith(5, 5);
    expect(result).toBe('tenBtA1000');
  })
});