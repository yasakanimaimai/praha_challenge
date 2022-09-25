import {describe, expect, it, jest} from '@jest/globals';
import { User, Repository } from './repository';
import { UseCase } from './index';

// テストケース側からfindで返す値を決めたいので、userを引数で渡す
const userMockRepository = (user?: User) => {
  // find時は時は引数で与えたUserを返す
  const findMock   = jest.fn().mockReturnValue(Promise.resolve(user));
  const insertMock = jest.fn();
  const updateMock = jest.fn();

  const mockRepository = jest.fn<Repository, []>().mockImplementation(() => ({
    find: findMock,
    update: updateMock,
    insert: insertMock,
  }));

  return {
    mockRepository,
    findMock,
    updateMock,
    insertMock,
  };
};


// 実際のテストコード
describe('usecase', () => {
  it('新規ユーザの場合、追加される', async () => {
    // repositoryのmock関数を作成
    const repository = userMockRepository();
    const usecase = new UseCase(repository.mockRepository());

    await usecase.execute('newUser', 'taro', 20);

    // findが正しい引数で呼ばれたか
    expect(repository.findMock).toHaveBeenCalledWith('newUser');

    // insertとupdateが正しい回数で呼ばれたか
    expect(repository.insertMock).toBeCalled();
    expect(repository.updateMock).not.toBeCalled();

    // 下記のよう確認もできる
    // expect(repository.insertMock.mock.calls.length).toBe(1);
    // expect(repository.updateMock.mock.calls.length).toBe(0);
    
    // insertメソッドの引数が想定通りか
    expect(repository.insertMock).toHaveBeenCalledWith({ id: 'newUser', name: 'taro', age: 20 });
  });

  it('更新ユーザの場合、更新される', async () => {
    const repository = userMockRepository({ id: 'updateUser', name: 'name', age: 33 });
    const usecase = new UseCase(repository.mockRepository());

    await usecase.execute('updateUser', 'taro', 20);

    expect(repository.insertMock).not.toBeCalled();
    expect(repository.updateMock).toBeCalled();

    expect(repository.updateMock).toHaveBeenCalledWith({ id: 'updateUser', name: 'taro', age: 20 });
  });
});