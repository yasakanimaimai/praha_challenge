import { 
  sumOfArray, 
  asyncSumOfArray, 
  asyncSumOfArraySometimesZero, 
  getFirstNameThrowIfLong 
} from "../functions";
import { NameApiService } from "../nameApiService";
import { DatabaseMock } from "../util";

describe('sumOfArray', () => {
  it('配列の[1, 2]を渡すと3になる', () => {
    expect(sumOfArray([1, 2])).toBe(3);
  });

  it('値が1つの配列を渡すとその値が返る', () => {
    expect(sumOfArray([1])).toBe(1);
  });

  it('空配列を渡すと0が返る', () => {
    expect(sumOfArray([])).toBe(0);
  });

  it('配列に0が含まれても正常に計算される', () => {
    expect(sumOfArray([0, 1])).toBe(1);
  });

  it('配列に負数が含まれても正常に計算される', () => {
    expect(sumOfArray([-1, 0])).toBe(-1);
  });

  // 下記のテストはTypeScriptで担保されているので不要
  // it('string型の配列を渡そうとすると型エラーになる', () => {
  //   expect(sumOfArray(['1', '2'])).toBe(-1);
  // });
});


describe('asyncSumOfArray', () => {

  it('配列の[1,2]を渡すと3になる', async () => {
    await expect(asyncSumOfArray([1,2])).resolves.toBe(3);
  });

  it('値が1つの配列を渡すとその値が返る', async () => {
    await expect(asyncSumOfArray([1])).resolves.toBe(1);
  });

  it('空配列を渡すと0が返る', async () => {
    await expect(asyncSumOfArray([])).resolves.toBe(0);
  });

  it('配列に0が含まれても正常に計算される', async () => {
    await expect(asyncSumOfArray([0, 1])).resolves.toBe(1);
  });

  it('配列に負数が含まれても正常に計算される', async () => {
    await expect(asyncSumOfArray([-1, 0])).resolves.toBe(-1);
  });
});


describe('asyncSumOfArraySometimesZero', () => {

  it('databaseへの保存が成功すると正常な計算結果を返す', async () => {
    const database = new DatabaseMock();
    const saveSpy = jest.spyOn(database, 'save').mockImplementation(() => {});
    await expect(asyncSumOfArraySometimesZero([1,2], database)).resolves.toBe(3);
    expect(saveSpy).toBeCalledTimes(1);
  });

  it('databaseへの保存が失敗すると0を返す', async () => {
    const database = new DatabaseMock();
    const saveSpy = jest.spyOn(database, 'save').mockImplementation(() => {
      throw new Error("fail!");
    })
    await expect(asyncSumOfArraySometimesZero([1,2], database)).resolves.toBe(0);
    expect(saveSpy).toBeCalledTimes(1);
  });
});

describe('getFirstNameThrowIfLong', () => {

  describe('apiがfirstNameの取得に成功するケース', () => {
    const nameApiService = new NameApiService();
    jest.spyOn(nameApiService, 'getFirstName').mockResolvedValue('john');

    it('firstNameの長さが上限以下ならfirstNameを返す', async () => {
      const maxNameLength = 4;
      await expect(getFirstNameThrowIfLong(maxNameLength, nameApiService)).resolves.toBe('john');
    });

    it('firstNameの長さが上限を超えるならErrorを返す', async () => {
      const maxNameLength = 3;
      await expect(getFirstNameThrowIfLong(maxNameLength, nameApiService)).rejects.toThrow('first_name too long');
    });
  });

  describe('apiがfirstNameの取得に失敗するケース', () => {
    const nameApiService = new NameApiService();
    jest.spyOn(nameApiService, 'getFirstName').mockRejectedValue(new Error('first_name too long!'));

    it('firstNameの長さがapiで規定されているMAX_LENGTHより大きい場合に例外がthrowされる', async () => {
      const maxNameLength = 9999;
      await expect(getFirstNameThrowIfLong(maxNameLength, nameApiService)).rejects.toThrow('first_name too long!');
    });
  });
});