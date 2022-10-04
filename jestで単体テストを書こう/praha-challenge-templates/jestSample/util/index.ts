import { IDatabaseMock } from "./IDatabaseMock";

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

// IDatabaseMockを実装するようにした
export class DatabaseMock implements IDatabaseMock{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public save(_: number[]): void {
    // memo: 課題のために、あえて時々saveが失敗するようにしている
    if (getRandomInt(10) < 2) {
      throw new Error("fail!");
    }
  }
}


// テスト用のmockデータを作ったが結局メソッドの実装はテスト側で行うので不要？
export class TestDatabaseMock implements IDatabaseMock{
  public save(_: number[]): void {}
}