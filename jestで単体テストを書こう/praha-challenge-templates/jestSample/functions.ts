import { NameApiService } from "./nameApiService";
import { DatabaseMock } from "./util";
import { IDatabaseMock } from "./util/IDatabaseMock";

export const sumOfArray = (numbers: number[]): number => {
  if (numbers.length == 0) {
    return 0;
  }
  return numbers.reduce((a: number, b: number): number => a + b);
};

export const asyncSumOfArray = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    resolve(sumOfArray(numbers));
  });
};

// 修正前
// export const asyncSumOfArraySometimesZero = (
//   numbers: number[]
// ): Promise<number> => {
//   return new Promise((resolve): void => {
//     try {
//       const database = new DatabaseMock(); // fixme: この関数をテストするには、DatabaseMockの使い方を変える必要がありそう！ヒント：依存性の注入
//       database.save(numbers);
//       resolve(sumOfArray(numbers));
//     } catch (error) {
//       resolve(0);
//     }
//   });
// };

// １回目の修正(モジュールを外部から受け取るようにしたがインターフェイスは未使用)
// export const asyncSumOfArraySometimesZero = (
//   numbers: number[],
//   database: DatabaseMock
// ): Promise<number> => {
//   return new Promise((resolve): void => {
//     try {
//       database.save(numbers);
//       resolve(sumOfArray(numbers));
//     } catch (error) {
//       resolve(0);
//     }
//   });
// };

// ２回目の修正(外部モジュールをインターフェイス化)
export const asyncSumOfArraySometimesZero = (
  numbers: number[],
  database: IDatabaseMock
): Promise<number> => {
  return new Promise((resolve): void => {
    try {
      database.save(numbers);
      resolve(sumOfArray(numbers));
    } catch (error) {
      resolve(0);
    }
  });
};


// 修正前
// export const getFirstNameThrowIfLong = async (
//   maxNameLength: number
// ): Promise<string> => {
//   const nameApiService = new NameApiService(); // fixme: この関数をテストするには、NameApiServiceの使い方を変える必要がありそう！ヒント：依存性の注入
//   const firstName = await nameApiService.getFirstName();

//   if (firstName.length > maxNameLength) {
//     throw new Error("first_name too long");
//   }
//   return firstName;
// };

// 修正後
export const getFirstNameThrowIfLong = async (
  maxNameLength: number,
  nameApiService: NameApiService
): Promise<string> => {
  const firstName = await nameApiService.getFirstName();

  if (firstName.length > maxNameLength) {
    throw new Error("first_name too long");
  }
  return firstName;
};
