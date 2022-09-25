export type User = {
  id: string,
  name: string,
  age: number,
};

// Repositoryのinterface
export interface Repository {
  find(id: User['id']): Promise<User | undefined>;
  insert(user: User): Promise<void>;
  update(user: User): Promise<void>;
};

// Repositoryの実装
class dbRepository implements Repository {
  async find(id: User['id']) {
    console.log('dbからfind');
    return {
      id: '123',
      name: 'Iori',
      age: 26,
    };
  }

  async insert(user: User): Promise<void> {
    console.log('dbに新規登録');
  }

  async update(user: User): Promise<void> {
    console.log('dbにupdate');
  }
}