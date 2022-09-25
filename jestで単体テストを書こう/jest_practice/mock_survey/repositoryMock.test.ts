import { describe, it, jest, expect } from '@jest/globals';
import { User, UserRepository, UserUsecase } from './repositoryMock';

describe("UserUsecase", () => {
    it("idでユーザーを取得する", () => {
        const repository = {} as UserRepository;
        const expected = {} as User;
        const get = jest.fn().mockReturnValue(expected);
        // 線が出るがテストは正しく実行される
        repository.get = get;

        expect(new UserUsecase(repository).get("id")).toEqual(expected);
        expect(get).toBeCalledWith("id");
    });
});