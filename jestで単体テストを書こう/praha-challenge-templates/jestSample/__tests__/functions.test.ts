import { 
  sumOfArray, 
  asyncSumOfArray, 
  asyncSumOfArraySometimesZero, 
  getFirstNameThrowIfLong 
} from "../functions";
import { NameApiService } from "../nameApiService";
import { DatabaseMock, TestDatabaseMock } from "../util";
import { IDatabaseMock } from "../util/IDatabaseMock";

it('sumOfArray test', () => {

  // 通常
  const numArray : number[] = [1, 2, 3];
  expect(sumOfArray(numArray)).toBe(6);

  // 値が一つの配列
  const oneNumArray : number[] = [1];
  expect(sumOfArray(oneNumArray)).toBe(1);

  // 空の配列
  const emptyArray : number[] = [];
  // エラーの場合は関数でラップする必要がある
  // expect(() => sumOfArray(emptyArray)).toThrow();
  // 空の配列なら0を返すようにsumOfArrayを修正
  expect(sumOfArray(emptyArray)).toBe(0);

  // 0が含まれている配列
  const containZeroArray : number[] = [0, 1, 2];
  expect(sumOfArray(containZeroArray)).toBe(3);

  // 負数が含まれている配列
  const containMinusArray : number[] = [-1, 0, 1, 2];
  expect(sumOfArray(containMinusArray)).toBe(2);

  // 文字列の配列
  // TSが型チェックエラーを教えてくれるので必要なさそう
  // const strArray : string[] = ['aa', 'bb', 'cc'];
  // expect(() => sumOfArray(strArray)).toThrow();

  // 数字の変数
  // TSが型チェックエラーを教えてくれるので必要なさそう
  // const num : number = 1;
  // expect(() => sumOfArray(num)).toThrow();
});




// 非同期関数
// 正常
it('asyncSumOfArray normal', async () => {
  expect.assertions(2);
  const numArray : number[] = [1, 2, 3];
  // returnを付けなくてもpassしてしまうのはなぜか？
  // awaitでも通るがこれはOK？
  await asyncSumOfArray(numArray).then(data => {
    expect(data).toBe(6);
  });
  // 以下のように書き換えることもできる
  await expect(asyncSumOfArray(numArray)).resolves.toBe(6);
});

// 値が１つの配列
it('asyncSumOfArray oneNumArray', () => {
  expect.assertions(1);
  const oneNumArray : number[] = [1];
  return expect(asyncSumOfArray(oneNumArray)).resolves.toBe(1);
});

// 空の配列
it('asyncSumOfArray emptyArray', () => {
  expect.assertions(1);
  const emptyArray : number[] = [];

  // こっちは通るが
  // return expect(asyncSumOfArray(emptyArray)).rejects.toThrow();
  
  // こっちが通らないのはなぜか
  // return asyncSumOfArray(emptyArray).catch(e => 
  //   expect(e).toThrow
  // );

    // 空の配列なら0を返すようにsumOfArrayを修正
    return expect(asyncSumOfArray(emptyArray)).resolves.toBe(0);

});

// 0を含む配列
it('asyncSumOfArray containZeroArray', () => {
  expect.assertions(1);
  const containZeroArray : number[] = [0, 1, 2];
  return expect(asyncSumOfArray(containZeroArray)).resolves.toBe(3);
});

// 負数を含む配列
it('asyncSumOfArray containMinusArray', () => {
  expect.assertions(1);
  const containMinusArray : number[] = [-1, 0, 1, 2];
  return expect(asyncSumOfArray(containMinusArray)).resolves.toBe(2);
});

// 型が不正な配列
// TSが型チェックエラーを教えてくれるので必要なさそう
// it('asyncSumOfArray unTypeArray', () => {
//   expect.assertions(1);
//   const unMatchTypeArray : string[] = ["aa", "bb", "cc"];
//   return expect(asyncSumOfArray(unMatchTypeArray)).rejects.toThrow();
// });




// 非同期関数
// 通常ケース
it('asyncSumOfArraySometimesZero normal', async () => {
  expect.assertions(4);
  const numArray : number[] = [1, 2, 3];
  
  // jest.fnを使うやり方
  const databaseMock = {save: jest.fn()};
  await expect(asyncSumOfArraySometimesZero(numArray, databaseMock)).resolves.toBe(6);
  // mockのsave()がasyncSumOfArraySometimesZero()で呼び出されていることを確認
  expect(databaseMock.save).toBeCalledTimes(1);

  // spyOnを使うやり方
  const database = new DatabaseMock();
  const saveSpy = jest.spyOn(database, 'save').mockImplementation(() => {});
  await expect(asyncSumOfArraySometimesZero(numArray, database)).resolves.toBe(6);
  // mockのsave()がasyncSumOfArraySometimesZero()で呼び出されていることを確認
  expect(saveSpy).toBeCalledTimes(1);
});

// 通常ケース(インターフェイスを使ったバージョン)
it('asyncSumOfArraySometimesZero normal ver interface', async () => {
  expect.assertions(4);
  const numArray : number[] = [1, 2, 3];
  
  // jest.fnを使うやり方
  const databaseMock = {save: jest.fn<IDatabaseMock, []>()};
  await expect(asyncSumOfArraySometimesZero(numArray, databaseMock)).resolves.toBe(6);
  // mockのsave()がasyncSumOfArraySometimesZero()で呼び出されていることを確認
  expect(databaseMock.save).toBeCalledTimes(1);

  // spyOnを使うやり方
  const database = new TestDatabaseMock();
  const saveSpy = jest.spyOn(database, 'save').mockImplementation(() => {});
  await expect(asyncSumOfArraySometimesZero(numArray, database)).resolves.toBe(6);
  // mockのsave()がasyncSumOfArraySometimesZero()で呼び出されていることを確認
  expect(saveSpy).toBeCalledTimes(1);
});



// save()が失敗するケース
it('asyncSumOfArraySometimesZero fail', async () => {
  expect.assertions(4);
  const numArray : number[] = [1, 2, 3];
  
  // jest.fnを使うやり方
  const databaseMock = {save: jest.fn()};
  // save()がエラーを吐くように実装 
  databaseMock.save.mockImplementation(() => {
    throw new Error();
  });
  await expect(asyncSumOfArraySometimesZero(numArray, databaseMock)).resolves.toBe(0);
  // mockのsave()がasyncSumOfArraySometimesZero()で呼び出されていることを確認
  expect(databaseMock.save).toBeCalledTimes(1);


  // spyOnを使うやり方
  const database = new DatabaseMock();
  const saveSpy = jest.spyOn(database, 'save').mockImplementation(() => {throw new Error();});
  await expect(asyncSumOfArraySometimesZero(numArray, database)).resolves.toBe(0);
  // mockのsave()がasyncSumOfArraySometimesZero()で呼び出されていることを確認
  expect(saveSpy).toBeCalledTimes(1);
});


// 通常ケース
it('getFirstNameThrowIfLong normal', async () => {
  expect.assertions(2);
  const maxNameLength :number = 5;
  const firstName:string = 'John';

  // jest.fnだとMAX_LENGTHをprivateプロパティとして保持できないのでできなさそう
  // const nameApiServiceMock = { 
  //   MAX_LENGTH: 4,
  //   getFirstName: jest.fn()
  // };
  // nameApiServiceMock.getFirstName.mockImplementation((firstName: string): string => {
  //   return firstName;
  // });
  // await expect(getFirstNameThrowIfLong(3, nameApiServiceMock)).toBe(firstName);

  // spyOnを使ったやり方
  const nameApiService = new NameApiService();
  jest.spyOn(nameApiService, 'getFirstName').mockResolvedValueOnce(firstName);
  await expect(getFirstNameThrowIfLong(maxNameLength, nameApiService)).resolves.toBe(firstName);
  expect(nameApiService.getFirstName).toBeCalledTimes(1);
});

// firstnameが上限より長いケース
it('getFirstNameThrowIfLong normal', async () => {
  expect.assertions(2);
  const maxNameLength :number = 5;
  const firstName:string = 'John Smith';

  const nameApiService = new NameApiService();
  jest.spyOn(nameApiService, 'getFirstName').mockResolvedValueOnce(firstName);
  await expect(getFirstNameThrowIfLong(maxNameLength, nameApiService)).rejects.toThrow("first_name too long");
  expect(nameApiService.getFirstName).toBeCalledTimes(1);
});